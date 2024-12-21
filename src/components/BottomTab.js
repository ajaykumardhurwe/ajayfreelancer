// import React from 'react';
// // import './BottomTab.css';
// import '../styles/BottomTab.css'

// const BottomTab = () => {
//   return (
//     <div className="bottom-tab">
//       <a href="#home">Home</a>
//       <a href="#search">Search</a>
//       <a href="#profile">Profile</a>
//     </div>
//   );
// };

// export default BottomTab;






// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
// import '../styles/BottomTab.css';

// const BottomTab = () => {
//   const [activeTab, setActiveTab] = useState('home');

//   return (
//     <div className="bottom-tab">
//       <a
//         href="#home"
//         className={activeTab === 'home' ? 'active' : ''}
//         onClick={() => setActiveTab('home')}
//       >
//         <FontAwesomeIcon icon={faHome} />
//         {/* <span>Home</span> */}
//       </a>
//       <a
//         href="#search"
//         className={activeTab === 'search' ? 'active' : ''}
//         onClick={() => setActiveTab('search')}
//       >
//         <FontAwesomeIcon icon={faSearch} />
//         {/* <span>Search</span> */}
//       </a>
//       <a
//         href="#profile"
//         className={activeTab === 'profile' ? 'active' : ''}
//         onClick={() => setActiveTab('profile')}
//       >
//         <FontAwesomeIcon icon={faUser} />
//         {/* <span>Profile</span> */}
//       </a>
//     </div>
//   );
// };

// export default BottomTab;





import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faUser, faPlusCircle, faCompass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/BottomTab.css';

const BottomTab = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="bottom-tab">
      <Link
        to="/"
        className={activeTab === 'home' ? 'active' : ''}
        onClick={() => setActiveTab('home')}
      >
        <FontAwesomeIcon icon={faHome} />
      </Link>

      <Link
        to="/search"
        className={activeTab === 'search' ? 'active' : ''}
        onClick={() => setActiveTab('search')}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Link>

      <Link
        to="/post"
        className={activeTab === 'post' ? 'active' : ''}
        onClick={() => setActiveTab('post')}
      >
        <FontAwesomeIcon icon={faPlusCircle} />
      </Link>

      <Link
        to="/explorer"
        className={activeTab === 'explorer' ? 'active' : ''}
        onClick={() => setActiveTab('explorer')}
      >
        <FontAwesomeIcon icon={faCompass} />
      </Link>

      <Link
        to="/profile"
        className={activeTab === 'profile' ? 'active' : ''}
        onClick={() => setActiveTab('profile')}
      >
        <FontAwesomeIcon icon={faUser} />
      </Link>
    </div>
  );
};

export default BottomTab;
