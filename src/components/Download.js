// import React from 'react';

// const Download = () => {
//   return (
//     <div className="content">
//       <h1>Download</h1>
//       <p>Learn more Download us on this page.</p>
//     </div>
//   );
// };

// export default Download;




import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs } from '../services/firebaseConfig'; // Import Firebase functions
// import '../styles/Download.css';

const Download = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [data, setData] = useState([]);

  // Function to add data to Firebase Firestore
  const addData = async () => {
    if (title && description && link) {
      try {
        await addDoc(collection(db, "downloads"), {
          title,
          description,
          link,
        });
        setTitle('');
        setDescription('');
        setLink('');
        fetchData(); // Refresh data after adding
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please fill all fields");
    }
  };

  // Fetch data from Firestore
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "downloads"));
    const fetchedData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content">
      <h1>Download</h1>
      <p>Learn more and download content from this page.</p>

      {/* Form to input data */}
      <div className="form-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="url"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button onClick={addData}>Save Data</button>
      </div>

      {/* Display saved links */}
      <h2>Saved Links</h2>
      <div className="links-list">
        {data.map((item) => (
          <div key={item.id} className="link-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button
              onClick={() => window.open(item.link, '_blank')}
            >
              Open Link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Download;
