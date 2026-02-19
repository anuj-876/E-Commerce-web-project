import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  ShoppingCart,
  LocalShipping,
  Security,
  Support,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeaturedProducts from '../components/Products/FeaturedProducts';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <ShoppingCart sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Easy Shopping',
      description: 'Browse and shop from thousands of products with ease.',
    },
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and safely to your door.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Secure Payment',
      description: 'Shop with confidence with our secure payment system.',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: '24/7 Support',
      description: 'Our customer support team is here to help you anytime.',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Welcome to E-Shop
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              lineHeight: 1.6,
            }}
          >
            Discover amazing products at unbeatable prices. 
            Your one-stop destination for all your shopping needs.
          </Typography>
          <Box sx={{ mt: 4 }}>
            {!isAuthenticated() ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    mr: 2,
                    mb: { xs: 2, sm: 0 },
                    bgcolor: 'white',
                    color: '#1976d2',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Browse Products
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  bgcolor: 'white',
                  color: '#1976d2',
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
              >
                Start Shopping
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Why Choose E-Shop?
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Experience the best in online shopping with our amazing features
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 2,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <FeaturedProducts limit={8} />
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}
              >
                10K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Happy Customers
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}
              >
                5K+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Products Available
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} sx={{ color: '#ffc107', fontSize: 30 }} />
                ))}
              </Box>
              <Typography variant="h6" color="text.secondary">
                5-Star Rating
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          Ready to Start Shopping?
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Join thousands of satisfied customers and discover amazing deals today!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(isAuthenticated() ? '/products' : '/register')}
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderRadius: 2,
          }}
        >
          {isAuthenticated() ? 'Shop Now' : 'Join E-Shop Today'}
        </Button>
      </Container>
    </Box>
  );
};

export default Home;