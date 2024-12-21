// import React, { useState } from 'react';
// // import '../sstyles/Drawer.css';
// import '../styles/Drawer.css'
// const Drawer = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="drawer">
//       <button className="toggle-btn" onClick={toggleDrawer}>☰</button>
//       {isOpen && (
//         <div className="drawer-content">
//           <a href="#home">Home</a>
//           <a href="#about">About</a>
//           <a href="#services">Services</a>
//           <a href="#contact">Contact</a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Drawer;





import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaInstagram, FaWhatsapp, FaFacebook, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../styles/Drawer.css';

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="drawer">
      <button className="toggle-btn" onClick={toggleDrawer}>☰</button>
      {isOpen && (
        <div className="drawer-content">
          <Link to="/" onClick={toggleDrawer}>
            <FaHome /> Home
          </Link>
          <Link to="/about" onClick={toggleDrawer}>
            <FaInfoCircle /> About
          </Link>
          <Link to="/services" onClick={toggleDrawer}>
            <FaServicestack /> Services
          </Link>
          <Link to="/contact" onClick={toggleDrawer}>
            <FaEnvelope /> Contact
          </Link>
          <Link to="/socialmedia" onClick={toggleDrawer}>
            {/* <FaEnvelope />  */}
          
            <FaWhatsapp/>
            <FaLinkedin></FaLinkedin>
            <FaFacebook></FaFacebook>
            <FaYoutube/>
            <FaInstagram/>
            <FaTwitter/>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Drawer;
