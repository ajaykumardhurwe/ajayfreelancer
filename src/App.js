// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//      <h1>Hello world</h1>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Drawer from './components/Drawer';
import BottomTab from './components/BottomTab';
import CrudOperations from './components/CrudOperations';
import About from './components/About'
import Services from './components/Services';
import Contact from './components/Contact';
import SocialMedia from './components/SocialMedia';
import Search from './components/Search';
import Post from './components/Post';
import Explorer from './components/Explorer';
import Profile from './components/Profile';
import Download from './components/Download';
import Class from './components/Class';
// import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        <Drawer />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<CrudOperations />} />
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/services" element={<Services></Services>}/>
            <Route path='/contact' element={<Contact></Contact>}/>
            <Route path='/search' element={<Search></Search>}/>
            <Route path='/post' element={<Post></Post>}/>
            <Route path='/explorer' element={<Explorer></Explorer>}/>
            <Route path='/profile' element={<Profile></Profile>}/>
            <Route path='/download' element={<Download></Download>}/>
            <Route path='/classes' element={<Class></Class>}/>
           
            <Route path='/socialmedia' element={<SocialMedia></SocialMedia>}/>
          </Routes>
        </main>

        <BottomTab />
      </div>


    </Router>
  );
};

export default App;