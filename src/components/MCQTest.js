import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getDocs as fetchDocs,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
// import '../styles/MCQTest.css';

const MCQTest = () => {
  const [mcqs, setMcqs] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [user, setUser] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // Time in seconds

  const mcqCollectionRef = collection(db, 'mcqs');
  const scoreCollectionRef = collection(db, 'scores');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserAttemptCount(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchMCQs = async () => {
      const data = await getDocs(mcqCollectionRef);
      setMcqs(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchMCQs();
  }, []);

  useEffect(() => {
    if (!testCompleted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, testCompleted]);

  const fetchUserAttemptCount = async (currentUser) => {
    const userQuery = query(scoreCollectionRef, where('userId', '==', currentUser.uid));
    const querySnapshot = await fetchDocs(userQuery);
    setAttemptCount(querySnapshot.size);
  };

  const handleAnswerSelection = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNavigation = (direction) => {
    if (direction === 'next' && currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSkip = () => {
    handleNavigation('next');
  };

  const handleSubmit = () => {
    calculateScore();
    setTestCompleted(true);
    saveScoreHistory();
  };

  const calculateScore = () => {
    let newScore = 0;
    mcqs.forEach((mcq, index) => {
      if (selectedAnswers[index] === mcq.answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const saveScoreHistory = async () => {
    if (user) {
      const currentAttempt = attemptCount + 1;
      await addDoc(scoreCollectionRef, {
        userId: user.uid,
        email: user.email,
        score,
        date: new Date().toISOString(),
        attempt: currentAttempt,
      });
      setAttemptCount(currentAttempt);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setTestCompleted(false);
    setScore(0);
    setTimeLeft(60 * 60); // Reset timer to 60 minutes
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!user) return <div>Please sign in to take the test.</div>;

  if (testCompleted) {
    return (
      <div>
        <h2>Test Completed</h2>
        <h3>Score: {score}/{mcqs.length}</h3>
        <p>Associated with: {user.displayName || user.email}</p>
        <p>Attempt: {attemptCount}</p>
        <h3>Review your answers:</h3>
        <ul>
          {mcqs.map((mcq, index) => (
            <li key={mcq.id}>
              <p><strong>Q{index + 1}: {mcq.question}</strong></p>
              <p>Your Answer: {selectedAnswers[index] || "No answer selected"}</p>
              <p>Correct Answer: {mcq.answer}</p>
              <p>Explanation: {mcq.explanation}</p>
            </li>
          ))}
        </ul>
        <button onClick={handleRestart}>Restart Test</button>
      </div>
    );
  }

  if (mcqs.length === 0) return <div>Loading questions...</div>;

  const currentMCQ = mcqs[currentQuestionIndex];

  return (
    <div>
      <h2>Welcome {user.displayName || user.email}!</h2>
      <h3>Time Left: {formatTime()}</h3>
      <div>
        <h3>Question {currentQuestionIndex + 1}/{mcqs.length}</h3>
        <p>{currentMCQ.question}</p>
        <ul>
          {currentMCQ.options.map((option, index) => (
            <li key={index}>
              <button
                className={selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        <div className="navigation-buttons">
          <button
            onClick={() => handleNavigation('prev')}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button onClick={handleSkip}>Skip</button>
          <button
            onClick={() => handleNavigation('next')}
            disabled={currentQuestionIndex === mcqs.length - 1}
          >
            Next
          </button>
          {currentQuestionIndex === mcqs.length - 1 && (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQTest;























// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { db, auth } from '../services/firebaseConfig';
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   addDoc,
//   query,
//   where,
// } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';

// const MCQApp = () => {
//   const { id } = useParams(); // Used to determine if a specific MCQ detail is requested
//   const [mcqs, setMcqs] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [user, setUser] = useState(null);
//   const [testCompleted, setTestCompleted] = useState(false);
//   const [score, setScore] = useState(0);
//   const [attemptCount, setAttemptCount] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(60 * 60); // Time in seconds
//   const [mcqDetail, setMcqDetail] = useState(null);

//   const mcqCollectionRef = collection(db, 'mcqs');
//   const scoreCollectionRef = collection(db, 'scores');

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         fetchUserAttemptCount(currentUser);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (id) {
//       // Fetch specific MCQ details
//       const fetchMCQDetail = async () => {
//         const mcqDoc = doc(db, 'mcqTests', id);
//         const mcqData = await getDoc(mcqDoc);
//         if (mcqData.exists()) {
//           setMcqDetail(mcqData.data());
//         } else {
//           console.log('MCQ not found');
//         }
//       };
//       fetchMCQDetail();
//     } else {
//       // Fetch all MCQs for the test
//       const fetchMCQs = async () => {
//         const data = await getDocs(mcqCollectionRef);
//         setMcqs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//       };
//       fetchMCQs();
//     }
//   }, [id]);

//   useEffect(() => {
//     if (!testCompleted && timeLeft > 0) {
//       const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//       return () => clearInterval(timer);
//     }
//     if (timeLeft === 0) {
//       handleSubmit();
//     }
//   }, [timeLeft, testCompleted]);

//   const fetchUserAttemptCount = async (currentUser) => {
//     const userQuery = query(scoreCollectionRef, where('userId', '==', currentUser.uid));
//     const querySnapshot = await getDocs(userQuery);
//     setAttemptCount(querySnapshot.size);
//   };

//   const handleAnswerSelection = (option) => {
//     const updatedAnswers = [...selectedAnswers];
//     updatedAnswers[currentQuestionIndex] = option;
//     setSelectedAnswers(updatedAnswers);
//   };

//   const handleNavigation = (direction) => {
//     if (direction === 'next' && currentQuestionIndex < mcqs.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else if (direction === 'prev' && currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleSkip = () => {
//     handleNavigation('next');
//   };

//   const handleSubmit = () => {
//     calculateScore();
//     setTestCompleted(true);
//     saveScoreHistory();
//   };

//   const calculateScore = () => {
//     let newScore = 0;
//     mcqs.forEach((mcq, index) => {
//       if (selectedAnswers[index] === mcq.answer) {
//         newScore += 1;
//       }
//     });
//     setScore(newScore);
//   };

//   const saveScoreHistory = async () => {
//     if (user) {
//       const currentAttempt = attemptCount + 1;
//       await addDoc(scoreCollectionRef, {
//         userId: user.uid,
//         email: user.email,
//         score,
//         date: new Date().toISOString(),
//         attempt: currentAttempt,
//       });
//       setAttemptCount(currentAttempt);
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedAnswers([]);
//     setTestCompleted(false);
//     setScore(0);
//     setTimeLeft(60 * 60); // Reset timer to 60 minutes
//   };

//   const formatTime = () => {
//     const minutes = Math.floor(timeLeft / 60);
//     const seconds = timeLeft % 60;
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   if (!user) return <div>Please sign in to access the MCQ test.</div>;

//   if (id && mcqDetail) {
//     // Render specific MCQ details
//     return (
//       <div>
//         <h1>{mcqDetail.title}</h1>
//         <img src={mcqDetail.image} alt={mcqDetail.title} />
//         <p>{mcqDetail.description}</p>
//       </div>
//     );
//   }

//   if (testCompleted) {
//     return (
//       <div>
//         <h2>Test Completed</h2>
//         <h3>Score: {score}/{mcqs.length}</h3>
//         <p>Associated with: {user.displayName || user.email}</p>
//         <p>Attempt: {attemptCount}</p>
//         <button onClick={handleRestart}>Restart Test</button>
//       </div>
//     );
//   }

//   if (mcqs.length === 0) return <div>Loading questions...</div>;

//   const currentMCQ = mcqs[currentQuestionIndex];

//   return (
//     <div>
//       <h2>Welcome {user.displayName || user.email}!</h2>
//       <h3>Time Left: {formatTime()}</h3>
//       <div>
//         <h3>Question {currentQuestionIndex + 1}/{mcqs.length}</h3>
//         <p>{currentMCQ.question}</p>
//         <ul>
//           {currentMCQ.options.map((option, index) => (
//             <li key={index}>
//               <button
//                 className={selectedAnswers[currentQuestionIndex] === option ? 'selected' : ''}
//                 onClick={() => handleAnswerSelection(option)}
//               >
//                 {option}
//               </button>
//             </li>
//           ))}
//         </ul>
//         <div className="navigation-buttons">
//           <button
//             onClick={() => handleNavigation('prev')}
//             disabled={currentQuestionIndex === 0}
//           >
//             Previous
//           </button>
//           <button onClick={handleSkip}>Skip</button>
//           <button
//             onClick={() => handleNavigation('next')}
//             disabled={currentQuestionIndex === mcqs.length - 1}
//           >
//             Next
//           </button>
//           {currentQuestionIndex === mcqs.length - 1 && (
//             <button
//               onClick={handleSubmit}
//               disabled={selectedAnswers[currentQuestionIndex] === undefined}
//             >
//               Submit
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MCQApp;