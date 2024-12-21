// import React from 'react';

// const Class = () => {
//   return (
//     <div className="content">
//       <h1>Class</h1>
//       <p>Discover our Class here.</p>
//     </div>
//   );
// };

// export default Class;

import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles/Class.css';

const Class = () => {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ title: '', description: '', photos: [], link: '' });

  const cardsCollectionRef = collection(db, 'cards');

  // Fetch cards from Firebase
  useEffect(() => {
    const fetchCards = async () => {
      const data = await getDocs(cardsCollectionRef);
      setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchCards();
  }, []);

  // Add a new card
  const addCard = async () => {
    await addDoc(cardsCollectionRef, newCard);
    setNewCard({ title: '', description: '', photos: [], link: '' });
  };

  // Update an existing card
  const updateCard = async (id, updatedData) => {
    const cardDoc = doc(db, 'cards', id);
    await updateDoc(cardDoc, updatedData);
  };

  // Delete a card
  const deleteCard = async (id) => {
    const cardDoc = doc(db, 'cards', id);
    await deleteDoc(cardDoc);
  };

  return (
    <div className="content">
      <h1>Class</h1>
      <p>Discover our Class here.</p>

      <div className="add-card">
        <input
          type="text"
          placeholder="Title"
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newCard.description}
          onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Link"
          value={newCard.link}
          onChange={(e) => setNewCard({ ...newCard, link: e.target.value })}
        />
        <button onClick={addCard}>Add Card</button>
      </div>

      <div className="card-list">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <h2>{card.title}</h2>
            <Carousel
              responsive={{
                superLargeDesktop: {
                  breakpoint: { max: 4000, min: 1024 },
                  items: 3,
                },
                desktop: {
                  breakpoint: { max: 1024, min: 768 },
                  items: 2,
                },
                tablet: {
                  breakpoint: { max: 768, min: 464 },
                  items: 1,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                },
              }}
            >
              {card.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Slide ${index}`} className="carousel-image" />
              ))}
            </Carousel>
            <p>{card.description}</p>
            <a href={card.link} target="_blank" rel="noopener noreferrer">
              Visit Link
            </a>
            <button onClick={() => deleteCard(card.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Class;
