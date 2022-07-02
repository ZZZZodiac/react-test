import React from 'react';
import'./App.css'
import MainContent from './Components/Card/MainContent';
import Header from './Components/Header/Header';
import MyData from './Data/current-loans.json';


function App() {

  return (
    <div className="App">
         <Header/>
        <hr/>
        <div className="main">
          <MainContent/>
        </div>
        
    </div>
  );
}

export default App;
