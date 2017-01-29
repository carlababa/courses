import React from 'react';
import Navbar from '../components/Navbar';
import Content from '../components/Content';
import '../css/App.css';

const App = () => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Navbar />
    <main className="mdl-layout__content">
      <div className="page-content">
        <Content />
      </div>
    </main>
  </div>
);

export default App;
