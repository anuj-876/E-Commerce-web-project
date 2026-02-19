import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 4,
        },
        position: 'relative',
      }}
    >
      {/* Featured Badge */}
      {product.isFeatured && (
        <Chip
          label="Featured"
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
          }}
        />
      )}

      {/* Stock Status Badge */}
      {product.countInStock <= 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
          }}
        >
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            Out of Stock
          </Typography>
        </Box>
      )}

      {/* Product Image */}
      <CardMedia
        component="img"
        height="220"
        image={product.image || '/placeholder.png'}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          cursor: 'pointer',
          backgroundColor: '#f5f5f5',
        }}
        onClick={handleViewDetails}
      />

      {/* Product Content */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Category Badge */}
        {product.category && (
          <Chip
            label={product.category.name}
            size="small"
            variant="outlined"
            sx={{ mb: 1 }}
          />
        )}

        {/* Product Name */}
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline', color: 'primary.main' },
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          onClick={handleViewDetails}
        >
          {product.name}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: 40,
          }}
        >
          {product.description}
        </Typography>

        {/* Rating */}
        {product.numReviews > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Rating value={product.rating || 0} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              ({product.numReviews})
            </Typography>
          </Box>
        )}

        {/* Brand */}
        {product.brand && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Brand: {product.brand}
          </Typography>
        )}

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 2 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </Typography>
          {product.originalPrice && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: 'line-through',
                color: 'text.secondary',
              }}
            >
              ${product.originalPrice.toFixed(2)}
            </Typography>
          )}
        </Box>

        {/* Stock Info */}
        <Typography
          variant="caption"
          sx={{
            color: product.countInStock > 5 ? 'success.main' : 'warning.main',
            display: 'block',
            mt: 1,
          }}
        >
          {product.countInStock > 0
            ? `${product.countInStock} in stock`
            : 'Out of stock'}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ pt: 0 }}>
        <Button
          size="small"
          onClick={handleViewDetails}
          sx={{ flex: 1 }}
        >
          View Details
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          disabled={product.countInStock <= 0}
          onClick={handleAddToCart}
          startIcon={<ShoppingCartIcon />}
          sx={{ flex: 1 }}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
