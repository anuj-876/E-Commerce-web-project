import React, { useState } from 'react';
import { TextField, Box, IconButton, CircularProgress, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { productsAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const SearchProducts = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const response = await productsAPI.getProducts();
      const filtered = response.data
        .filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase()) ||
          product.description.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setResults(filtered);
      setOpen(true);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (product) => {
    setSearchTerm('');
    setResults([]);
    setOpen(false);
    if (onSelect) {
      onSelect(product);
    } else {
      navigate(`/products/${product._id}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setResults([]);
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => {
          if (results.length > 0) setOpen(true);
        }}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          ),
          endAdornment: searchTerm && (
            <IconButton size="small" onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          ),
        }}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            paddingRight: 1,
          },
        }}
      />

      {/* Search Results Dropdown */}
      {open && results.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 1300,
            maxHeight: 300,
            overflow: 'auto',
          }}
        >
          <List sx={{ py: 0 }}>
            {results.map((product) => (
              <ListItem key={product._id} disablePadding>
                <ListItemButton
                  onClick={() => handleSelectProduct(product)}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 1,
                  }}
                >
                  {product.image && (
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      sx={{
                        width: 40,
                        height: 40,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                  )}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <ListItemText
                      primary={product.name}
                      secondary={`$${product.price}`}
                      primaryTypographyProps={{
                        noWrap: true,
                        variant: 'body2',
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption',
                      }}
                    />
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SearchProducts;
