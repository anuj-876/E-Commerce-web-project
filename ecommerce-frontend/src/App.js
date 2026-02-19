import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Categories from './pages/Categories';

// Admin Components
import { AdminRoute } from './components/ProtectedRoute';
import AdminDashboard from './pages/Admin/Dashboard';
import AddProduct from './components/Admin/AddProduct';
import AddCategory from './components/Admin/AddCategory';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

// Simple placeholder components for routes that we haven't created yet
const ProfilePage = () => (
  <Box sx={{ py: 4, textAlign: 'center' }}>
    <h2>User Profile</h2>
    <p>User profile and settings will be displayed here.</p>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <Header />
              
              <Box component="main" sx={{ flexGrow: 1, px: { xs: 2, md: 4 } }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  
                  {/* Admin Routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/add-product" 
                    element={
                      <AdminRoute>
                        <AddProduct />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/products" 
                    element={
                      <AdminRoute>
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                          <h2>Manage Products</h2>
                          <p>Product management page coming soon...</p>
                        </Box>
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/categories" 
                    element={
                      <AdminRoute>
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                          <h2>Manage Categories</h2>
                          <p>Category management page coming soon...</p>
                        </Box>
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/add-category" 
                    element={
                      <AdminRoute>
                        <AddCategory />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/orders" 
                    element={
                      <AdminRoute>
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                          <h2>Manage Orders</h2>
                          <p>Order management page coming soon...</p>
                        </Box>
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <AdminRoute>
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                          <h2>Manage Users</h2>
                          <p>User management page coming soon...</p>
                        </Box>
                      </AdminRoute>
                    } 
                  />
                  
                  {/* 404 Route */}
                  <Route 
                    path="*" 
                    element={
                      <Box sx={{ py: 8, textAlign: 'center' }}>
                        <h1>404 - Page Not Found</h1>
                        <p>The page you're looking for doesn't exist.</p>
                      </Box>
                    } 
                  />
                </Routes>
              </Box>

              <Footer />
            </Box>

            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
