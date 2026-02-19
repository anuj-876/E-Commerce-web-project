import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
  TextField,
  Rating,
} from '@mui/material';
import { productsAPI } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProduct(id);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch product');
      toast.error('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    addToCart(product, quantity);
    setQuantity(1);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Alert severity="error" sx={{ my: 4 }}>
        {error || 'Product not found'}
      </Alert>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Button onClick={() => navigate('/products')} sx={{ mb: 3 }}>
        ← Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.image || '/placeholder.png'}
              alt={product.name}
              sx={{ width: '100%', height: 'auto', maxHeight: 500, objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {product.name}
          </Typography>

          {product.category && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Category: {product.category.name}
            </Typography>
          )}

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rating || 0} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.numReviews || 0} reviews)
            </Typography>
          </Box>

          {/* Price */}
          <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
            ${product.price}
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          {product.richDescription && (
            <Box
              dangerouslySetInnerHTML={{ __html: product.richDescription }}
              sx={{ mb: 3 }}
            />
          )}

          {/* Stock Status */}
          <Typography variant="body1" sx={{ mb: 3 }}>
            Stock:{' '}
            <Typography
              component="span"
              sx={{
                color: product.countInStock > 0 ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of Stock'}
            </Typography>
          </Typography>

          {/* Brand */}
          {product.brand && (
            <Typography variant="body1" sx={{ mb: 3 }}>
              Brand: <strong>{product.brand}</strong>
            </Typography>
          )}

          {/* Add to Cart Section */}
          {product.countInStock > 0 && (
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1, max: product.countInStock }}
                sx={{ width: 100 }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          )}

          {product.countInStock <= 0 && (
            <Typography variant="h6" color="error" sx={{ mb: 3 }}>
              Out of Stock
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
