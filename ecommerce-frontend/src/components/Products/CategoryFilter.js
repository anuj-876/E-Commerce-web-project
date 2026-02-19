import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';

const CategoryFilter = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  loading = false,
  variant = 'select', // 'select' or 'chips'
}) => {
  if (loading) {
    return <CircularProgress size={30} />;
  }

  // Chip variant for horizontal display
  if (variant === 'chips') {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip
          label="All Categories"
          onClick={() => onCategoryChange('')}
          variant={selectedCategory === '' ? 'filled' : 'outlined'}
          color={selectedCategory === '' ? 'primary' : 'default'}
        />
        {categories.map((category) => (
          <Chip
            key={category._id}
            label={category.name}
            onClick={() => onCategoryChange(category._id)}
            variant={selectedCategory === category._id ? 'filled' : 'outlined'}
            color={selectedCategory === category._id ? 'primary' : 'default'}
          />
        ))}
      </Box>
    );
  }

  // Select variant (default)
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        label="Category"
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
