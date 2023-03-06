import React from 'react';
import logo from './logo.svg';
import './App.css';
import PathFinderViz from './Components/PathFinderViz/PathFinderViz';
import Footer from './Components/PathFinderViz/Footer/Footer';

function App() {
  return (
    <div className="App">
      <PathFinderViz />
      <Footer />
    </div>
  );
}

export default App;
