import React from 'react';
import SearchBar from './MemoSearch';
import logo from './logo.svg';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>memos</h1>
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
