// import React from 'react';
// // import './Header.css';
// import '../styles/Header.css'

// const Header = () => {
//   return (
//     <header className="header">
//       <h1>Ajay Freelancer</h1>
//     </header>
//   );
// };

// export default Header;


//////////////////


// import React from 'react';
// import '../styles/Header.css';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="video-container">
//         <video autoPlay muted loop className="background-video">
//           <source src="G:\E backup\Full Stack web Development\Ajay Freelancer\ajayfreelancer\public\Assest\bgvideo.mp4" type="video/mp4" />
//         </video>
//       </div>
//       <div className="header-content">
//         <h1>Ajay Freelancer</h1>
//       </div>
//     </header>
//   );
// };

// export default Header;









//////////

// import React from 'react';
// import '../styles/Header.css';

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="video-container">
//         <video autoPlay muted loop className="background-video">
//           <source 
//             src="G:/E backup/Full Stack web Development/Ajay Freelancer/ajayfreelancer/public/Assest/bgvideo.mp4" 
//             type="video/mp4" 
//           />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//       <div className="header-content">
//         <h1>Ajay Freelancer</h1>
//         <p>Empowering freelancers with knowledge and tools</p>
//       </div>
//     </header>
//   );
// };

// export default Header;


//////////


import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="video-container">
        <video autoPlay muted loop className="background-video">
          <source src="G:/E backup/Full Stack web Development/Ajay Freelancer/ajayfreelancer/public/Assest/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="header-content">
        <h1>Ajay Freelancer</h1>
        {/* <p>Empowering freelancers with knowledge and tools</p> */}
      </div>
    </header>
  );
};

export default Header;
