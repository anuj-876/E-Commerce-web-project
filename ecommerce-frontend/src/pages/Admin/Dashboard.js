import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Add as AddIcon,
  List as ListIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { productsAPI, categoriesAPI } from '../../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);

      setStats({
        products: productsRes.data?.length || 0,
        categories: categoriesRes.data?.length || 0,
        orders: 0, // TODO: Add orders endpoint
        users: 0, // TODO: Add users endpoint
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card sx={{ height: '100%', borderTop: `4px solid ${color}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: 40, color, mr: 2 }} />
          <Box>
            <Typography variant="h4" component="div" fontWeight="bold">
              {loading ? '...' : value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const ManagementCard = ({ title, description, icon: Icon, color, actions }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: 32, color, mr: 1.5 }} />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        {actions.map((action, idx) => (
          <Button
            key={idx}
            size="small"
            variant={action.variant || 'outlined'}
            startIcon={action.icon}
            onClick={action.onClick}
            fullWidth={actions.length === 1}
            sx={{ mr: actions.length > 1 && idx === 0 ? 1 : 0 }}
          >
            {action.label}
          </Button>
        ))}
      </CardActions>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Header */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DashboardIcon sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome back, {user?.name || 'Admin'}! 👋
            </Typography>
            <Typography variant="body1">
              Manage your e-commerce platform from this dashboard
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.products}
            icon={InventoryIcon}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Categories"
            value={stats.categories}
            icon={CategoryIcon}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Orders"
            value={stats.orders}
            icon={ShoppingCartIcon}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Users"
            value={stats.users}
            icon={PeopleIcon}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Management Cards */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ManagementCard
            title="Products"
            description="Add new products, edit existing ones, or manage inventory"
            icon={InventoryIcon}
            color="#4caf50"
            actions={[
              {
                label: 'Add Product',
                icon: <AddIcon />,
                variant: 'contained',
                onClick: () => navigate('/admin/add-product'),
              },
              {
                label: 'Manage All',
                icon: <ListIcon />,
                onClick: () => navigate('/admin/products'),
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ManagementCard
            title="Categories"
            description="Organize your products by creating and managing categories"
            icon={CategoryIcon}
            color="#2196f3"
            actions={[
              {
                label: 'Add Category',
                icon: <AddIcon />,
                variant: 'contained',
                onClick: () => navigate('/admin/add-category'),
              },
              {
                label: 'Manage All',
                icon: <ListIcon />,
                onClick: () => navigate('/admin/categories'),
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ManagementCard
            title="Orders"
            description="View and manage customer orders, update order status"
            icon={ShoppingCartIcon}
            color="#ff9800"
            actions={[
              {
                label: 'View Orders',
                icon: <ListIcon />,
                variant: 'contained',
                onClick: () => navigate('/admin/orders'),
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ManagementCard
            title="Users"
            description="Manage user accounts, roles, and permissions"
            icon={PeopleIcon}
            color="#9c27b0"
            actions={[
              {
                label: 'View Users',
                icon: <ListIcon />,
                variant: 'contained',
                onClick: () => navigate('/admin/users'),
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
