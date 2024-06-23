import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FaceSwap Admin
        </Typography>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>Category</Link>
        <Link to="/images" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>Images</Link>
        <Link to="/notification" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>PromotionalMessages</Link>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>Dashboard</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
