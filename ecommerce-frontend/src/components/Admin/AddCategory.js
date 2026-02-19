import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Paper,
} from '@mui/material';
import { categoriesAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    color: '#1976d2',
  });

  const popularIcons = [
    '📱', '💻', '📷', '🎧', '⌚', '🎮', '📺', '🖥️',
    '👕', '👗', '👔', '👞', '👟', '👜', '🎒', '👓',
    '📚', '✏️', '📝', '🖊️', '📖', '📰', '🗂️', '📌',
    '🏠', '🛋️', '🛏️', '🪴', '🌱', '🔧', '🔨', '🪛',
    '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸',
    '🍔', '🍕', '🍜', '🍰', '☕', '🥤', '🍷', '🍺',
    '🎨', '🎭', '🎪', '🎬', '🎤', '🎸', '🎹', '🎺',
    '💄', '💅', '💍', '🎁', '🎉', '🎈', '🎊', '🎀',
  ];

  const colorPresets = [
    { name: 'Blue', value: '#2196f3' },
    { name: 'Green', value: '#4caf50' },
    { name: 'Red', value: '#f44336' },
    { name: 'Orange', value: '#ff9800' },
    { name: 'Purple', value: '#9c27b0' },
    { name: 'Pink', value: '#e91e63' },
    { name: 'Teal', value: '#009688' },
    { name: 'Indigo', value: '#3f51b5' },
    { name: 'Brown', value: '#795548' },
    { name: 'Grey', value: '#607d8b' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconSelect = (icon) => {
    setFormData((prev) => ({
      ...prev,
      icon: icon,
    }));
  };

  const handleColorSelect = (color) => {
    setFormData((prev) => ({
      ...prev,
      color: color,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name) {
      toast.error('Please enter a category name');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await categoriesAPI.createCategory(formData);

      if (response.data) {
        toast.success('Category added successfully!');
        // Reset form
        setFormData({
          name: '',
          icon: '',
          color: '#1976d2',
        });
        // Navigate back to admin dashboard after a short delay
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data || 'Failed to add category';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error adding category:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Add New Category
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Category Name */}
            <TextField
              label="Category Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 3 }}
              helperText="Enter a unique category name (e.g., Electronics, Clothing)"
            />

            {/* Icon Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Select Icon (Optional)
              </Typography>
              <TextField
                label="Or type your own emoji/icon"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
                helperText="Type an emoji or select from below"
              />
              <Paper
                sx={{
                  p: 2,
                  maxHeight: 200,
                  overflow: 'auto',
                  border: '1px solid #e0e0e0',
                }}
              >
                <Grid container spacing={1}>
                  {popularIcons.map((icon, index) => (
                    <Grid item key={index}>
                      <Button
                        variant={formData.icon === icon ? 'contained' : 'outlined'}
                        onClick={() => handleIconSelect(icon)}
                        sx={{
                          minWidth: 50,
                          fontSize: '1.5rem',
                          p: 1,
                        }}
                      >
                        {icon}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>

            {/* Color Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Select Color
              </Typography>
              <TextField
                label="Or enter custom color (hex)"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                fullWidth
                type="color"
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                {colorPresets.map((preset, index) => (
                  <Grid item key={index}>
                    <Button
                      variant={formData.color === preset.value ? 'contained' : 'outlined'}
                      onClick={() => handleColorSelect(preset.value)}
                      sx={{
                        minWidth: 100,
                        bgcolor: formData.color === preset.value ? preset.value : 'transparent',
                        borderColor: preset.value,
                        color: formData.color === preset.value ? 'white' : preset.value,
                        '&:hover': {
                          bgcolor: preset.value,
                          color: 'white',
                          borderColor: preset.value,
                        },
                      }}
                    >
                      {preset.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Preview */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Preview
              </Typography>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: formData.color,
                  color: 'white',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h3" sx={{ mb: 1 }}>
                  {formData.icon || '❓'}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {formData.name || 'Category Name'}
                </Typography>
              </Paper>
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Add Category'}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/admin')}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddCategory;
