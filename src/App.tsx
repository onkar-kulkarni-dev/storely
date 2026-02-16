import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/home/Home';
import Layout from './layout';
import { BrowserRouter } from 'react-router-dom';
import CustomRoutes from './common/routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <CustomRoutes />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
