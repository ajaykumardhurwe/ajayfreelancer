import React from 'react';
import MCQTestScreen from './CMCQTestScreen';
import CPost from './CPost';
import CClassScreen from './CClassScreen';
import CHome from './CHome'
import CEnglishClass from './CEnglishClass'
const Contact = () => {
  return (
    <div className="content">
      <h1>Hello Ajay</h1>
<h1>This is Home Screen</h1>
<CHome></CHome>
      <h1>This is MCQTestScreen</h1>

      <MCQTestScreen></MCQTestScreen>
      <h1>This is PostScreen</h1>
<CPost></CPost>
<h1>This is ClassScreen</h1>
<CClassScreen></CClassScreen>
<h1>This is EnglishClassScreen</h1>
<CEnglishClass></CEnglishClass>
      <p></p>
    </div>
  );
};

export default Contact;
