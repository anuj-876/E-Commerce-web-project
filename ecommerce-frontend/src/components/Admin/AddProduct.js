import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { productsAPI, categoriesAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    richDescription: '',
    price: '',
    brand: '',
    category: '',
    countInStock: '',
    isFeatured: false,
    rating: 0,
    numReviews: 0,
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      setError('Failed to fetch categories');
      toast.error('Failed to fetch categories');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.description || !formData.price || !formData.category || !image) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Create FormData for multipart upload
      const productFormData = new FormData();
      productFormData.append('name', formData.name);
      productFormData.append('description', formData.description);
      productFormData.append('richDescription', formData.richDescription);
      productFormData.append('price', formData.price);
      productFormData.append('brand', formData.brand);
      productFormData.append('category', formData.category);
      productFormData.append('countInStock', formData.countInStock || 0);
      productFormData.append('isFeatured', formData.isFeatured);
      productFormData.append('rating', formData.rating || 0);
      productFormData.append('numReviews', formData.numReviews || 0);
      productFormData.append('image', image);

      const response = await productsAPI.createProduct(productFormData);

      if (response.data) {
        toast.success('Product added successfully!');
        // Reset form
        setFormData({
          name: '',
          description: '',
          richDescription: '',
          price: '',
          brand: '',
          category: '',
          countInStock: '',
          isFeatured: false,
          rating: 0,
          numReviews: 0,
        });
        setImage(null);
        setImagePreview(null);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add product';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error adding product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Add New Product
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Product Image *
              </Typography>
              <Box
                sx={{
                  border: '2px dashed #1976d2',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f5f5f5',
                  '&:hover': { backgroundColor: '#eeeeee' },
                  mb: 2,
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="image-input"
                />
                <label htmlFor="image-input" style={{ cursor: 'pointer', width: '100%', display: 'block' }}>
                  {imagePreview ? (
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={{ maxHeight: 200, borderRadius: 1 }}
                    />
                  ) : (
                    <Typography color="text.secondary">Click to upload product image</Typography>
                  )}
                </label>
              </Box>
              {image && <Typography variant="caption">{image.name}</Typography>}
            </Box>

            {/* Product Details */}
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Product Details
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
              <TextField
                label="Product Name *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />

              <FormControl fullWidth required>
                <InputLabel>Category *</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Category *"
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                fullWidth
              />

              <TextField
                label="Price *"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                fullWidth
                required
                inputProps={{ step: '0.01' }}
              />

              <TextField
                label="Stock Count"
                name="countInStock"
                type="number"
                value={formData.countInStock}
                onChange={handleInputChange}
                fullWidth
              />

              <TextField
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleInputChange}
                fullWidth
                inputProps={{ min: 0, max: 5, step: 0.1 }}
              />
            </Box>

            {/* Description */}
            <TextField
              label="Description *"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              label="Rich Description (HTML)"
              name="richDescription"
              value={formData.richDescription}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            {/* Checkboxes */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                }
                label="Mark as Featured"
              />
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
                {loading ? <CircularProgress size={24} /> : 'Add Product'}
              </Button>
              <Button variant="outlined" size="large" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddProduct;
