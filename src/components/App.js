import React, { Component } from 'react';
import Navbar from '../components/Navbar.js';
import Content from '../components/Content.js';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Navbar />
        <main className="mdl-layout__content">
          <div className="page-content">
            <Content />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
