import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Badge 
} from '@mui/material';
import { 
  ShoppingCart, 
  AccountCircle, 
  Store,
  Login,
  Logout,
  Dashboard 
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from '../Cart/CartDrawer';

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleCartClick = () => {
    setCartDrawerOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2', boxShadow: 3 }}>
      <Toolbar>
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={handleLogoClick}
        >
          <Store sx={{ mr: 1, fontSize: 30 }} />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 0,
              fontWeight: 'bold',
              letterSpacing: 1
            }}
          >
            E-Shop
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, ml: 4 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/products')}
            sx={{ 
              mr: 2,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Products
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/categories')}
            sx={{ 
              mr: 2,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Categories
          </Button>
          
          {/* Admin Dashboard Link */}
          {isAuthenticated() && isAdmin() && (
            <Button 
              color="inherit" 
              startIcon={<Dashboard />}
              onClick={() => navigate('/admin')}
              sx={{ 
                mr: 2,
                bgcolor: 'rgba(255,215,0,0.2)',
                '&:hover': { bgcolor: 'rgba(255,215,0,0.3)' }
              }}
            >
              Admin Dashboard
            </Button>
          )}
        </Box>

        {/* Right side - Cart and Auth buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Shopping Cart */}
          <IconButton 
            color="inherit" 
            onClick={handleCartClick}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={getTotalItems()} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isAuthenticated() ? (
            <>
              {/* User Profile */}
              <Button 
                color="inherit" 
                startIcon={<AccountCircle />}
                onClick={handleProfileClick}
                sx={{ mr: 1 }}
              >
                {user?.email?.split('@')[0] || 'Profile'}
              </Button>
              
              {/* Logout */}
              <Button 
                color="inherit" 
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ 
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Login */}
              <Button 
                color="inherit" 
                startIcon={<Login />}
                onClick={handleLoginClick}
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              
              {/* Register */}
              <Button 
                variant="outlined" 
                color="inherit"
                onClick={handleRegisterClick}
                sx={{ 
                  borderColor: 'white',
                  '&:hover': { 
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)' 
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Cart Drawer */}
      <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </AppBar>
  );
};

export default Header;