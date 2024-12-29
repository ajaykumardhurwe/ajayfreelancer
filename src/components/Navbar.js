// import React from 'react';
// // import './Navbar.css';
// import '../styles/Navbar.css'
// import Home from './Home';
// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <ul>
//         <li><a href="#home">Home</a></li>
//         <li><a href="#about">About</a></li>
//         <li><a href="#services">Services</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.js















// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Navbar.css';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/services">Services</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;




import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/download">Download</Link></li>
        <li><Link to="/project">Project</Link></li>
        <li><Link to="/services">Services</Link></li>
        {/* <li><Link to="/backup">Backup</Link></li> */}

      </ul>
    </nav>
  );
};

export default Navbar;
