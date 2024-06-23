import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import AuthProvider from './components/AuthProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CategoryComponent from './pages/CategoryComponent';
import ImagesComponent from './pages/ImagesComponent';
import PromotionalMessages from './pages/PromotionalMessages';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' , width: '100vw'}}>
          <Container style={{ marginTop: '20px', flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<CategoryComponent />} />
              <Route path="/images" element={<ImagesComponent/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/notification' element={<PromotionalMessages />}/>
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
