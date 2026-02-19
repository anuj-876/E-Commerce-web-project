import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Chip,
} from '@mui/material';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const CartDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #eee',
          }}
        >
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Items List */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Your cart is empty
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  onClose();
                  navigate('/products');
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {cartItems.map((item, index) => (
                <Box key={item.product?._id}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      py: 2,
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: 'auto', mr: 2 }}>
                      <Avatar
                        variant="rounded"
                        src={item.product?.image || '/placeholder.png'}
                        sx={{ width: 60, height: 60 }}
                      />
                    </ListItemAvatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.product?.name}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Chip
                              label={`Qty: ${item.quantity}`}
                              size="small"
                              variant="outlined"
                              sx={{ mr: 1 }}
                            />
                          </Box>
                        }
                      />
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>

                    <IconButton
                      edge="end"
                      size="small"
                      color="error"
                      onClick={() => handleRemove(item.product?._id)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItem>
                  {index < cartItems.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {cartItems.length > 0 && (
          <Box
            sx={{
              borderTop: '1px solid #eee',
              p: 2,
            }}
          >
            {/* Price Summary */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal:
                </Typography>
                <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Tax (10%):
                </Typography>
                <Typography variant="body2">${tax.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Total:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Actions */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{ mb: 1 }}
            >
              Checkout
            </Button>
            <Button fullWidth variant="outlined" onClick={handleViewCart} sx={{ mb: 1 }}>
              View Cart
            </Button>
            <Button
              fullWidth
              variant="text"
              color="error"
              size="small"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
