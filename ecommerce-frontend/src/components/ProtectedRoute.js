import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Container } from '@mui/material';

// Protected route component for authenticated users
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin-only protected route
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            backgroundColor: '#fff3e0',
            borderRadius: 2,
            border: '1px solid #ff9800',
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            🚫 Access Denied
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You do not have permission to access this page. This area is restricted to administrators only.
          </Typography>
        </Box>
      </Container>
    );
  }

  return children;
};
