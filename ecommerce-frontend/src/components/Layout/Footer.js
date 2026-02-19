import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';
import { Store, Email, Phone, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2c3e50',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Store sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                E-Shop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
              Your one-stop destination for quality products. 
              We provide the best shopping experience with 
              secure payments and fast delivery.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link 
                href="/products" 
                color="inherit" 
                underline="hover"
                sx={{ mb: 1, '&:hover': { color: '#3498db' } }}
              >
                Products
              </Link>
              <Link 
                href="/categories" 
                color="inherit" 
                underline="hover"
                sx={{ mb: 1, '&:hover': { color: '#3498db' } }}
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                color="inherit" 
                underline="hover"
                sx={{ mb: 1, '&:hover': { color: '#3498db' } }}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                color="inherit" 
                underline="hover"
                sx={{ '&:hover': { color: '#3498db' } }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                support@eshop.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">
                123 E-commerce St, Digital City
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 4,
            pt: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2026 E-Shop. All rights reserved. Built with React & Node.js
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;