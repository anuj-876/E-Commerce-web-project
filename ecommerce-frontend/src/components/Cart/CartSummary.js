import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartSummary = ({ variant = 'full' }) => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, getTotalItems, loading } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const itemCount = getTotalItems();

  // Mini variant for header
  if (variant === 'mini') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          p: 1,
          borderRadius: 1,
          '&:hover': { backgroundColor: 'action.hover' },
        }}
        onClick={() => navigate('/cart')}
      >
        <ShoppingCartIcon />
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {itemCount}
          </Typography>
          <Typography variant="caption">${subtotal.toFixed(2)}</Typography>
        </Box>
      </Box>
    );
  }

  // Full variant for page
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <ShoppingCartIcon color="primary" />
          <Typography variant="h6">Order Summary</Typography>
        </Box>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {cartItems.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            {/* Items Preview */}
            <List sx={{ mb: 2, maxHeight: 200, overflow: 'auto' }}>
              {cartItems.map((item) => (
                <ListItem key={item.product?._id} disableGutters sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.product?.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {item.quantity}x ${item.price.toFixed(2)}
                      </Typography>
                    }
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Price Breakdown */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal:</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Tax (10%):</Typography>
                <Typography>${tax.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Shipping:</Typography>
                <Typography sx={{ color: 'success.main', fontWeight: 500 }}>Free</Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Actions */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/checkout')}
              sx={{ mb: 1 }}
            >
              Proceed to Checkout
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CartSummary;
