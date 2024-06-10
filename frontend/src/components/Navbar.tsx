import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { AppBar, Box, Toolbar, Button } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar 
      position="sticky"
      sx={{ top: 0, backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <Toolbar>
        <Box sx={{ height: '40px', marginRight: '16px' }}>
          <Logo height="100%" width="100%" />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button sx={{ color: '#000', textTransform: 'none', fontSize: '1.2rem' }}>
            Discover Ello
          </Button>
          <Button sx={{ color: '#000', textTransform: 'none', fontSize: '1.2rem' }}>
            Parent Resources
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
