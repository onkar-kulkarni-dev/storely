import React from 'react';
import './App.css';
import Layout from './layout';
import { BrowserRouter } from 'react-router-dom';
import CustomRoutes from './common/routes/Routes';
import '@smastrom/react-rating/style.css'

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
