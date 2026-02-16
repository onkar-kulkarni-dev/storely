import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
import Layout from './layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
