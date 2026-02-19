# 🛍️ Full-Stack E-Commerce Platform

A complete, production-ready e-commerce application built with React.js, Node.js, Express, and MongoDB. Features role-based authentication, real-time shopping cart, admin dashboard, and comprehensive product management.

![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Cloud-47A248?logo=mongodb)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.8-007FFF?logo=mui)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📖 Project Overview

This is a complete full-stack e-commerce platform with separate frontend and backend applications, designed for learning and demonstration purposes. The project showcases modern web development best practices, including:

- RESTful API architecture
- JWT-based authentication
- Role-based access control
- Real-time state management
- MongoDB database integration
- Material Design UI
- Responsive web design

## 🏗️ Architecture

```
ecommerce-platform/
├── ecommerce-frontend/          # React.js frontend application
│   ├── Port: 3001
│   └── Tech: React, Material-UI, Axios, React Router
│
├── nodejs-ecommerce-api/        # Node.js backend API
│   ├── Port: 3000
│   └── Tech: Express, MongoDB, JWT, Multer
│
└── README.md                    # This file
```

## ✨ Features

### 🎨 Frontend Features
- ✅ Modern React 19 with functional components
- ✅ Material-UI components and theming
- ✅ Role-based authentication (Admin/User)
- ✅ Admin dashboard with statistics
- ✅ Product browsing and search
- ✅ Category filtering
- ✅ Real-time shopping cart
- ✅ Product and category management (Admin)
- ✅ Image preview and upload
- ✅ Toast notifications
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Protected routes

### 🔧 Backend Features
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Password hashing with bcrypt
- ✅ Image upload with Multer
- ✅ Shopping cart persistence
- ✅ CRUD operations for:
  - Users
  - Products
  - Categories
  - Orders
  - Shopping Carts
- ✅ Error handling middleware
- ✅ CORS configuration

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Projects
```

### 2. Backend Setup
```bash
# Navigate to backend
cd nodejs-ecommerce-api

# Install dependencies
npm install

# Create .env file
echo "API_URL=/api/v1" > .env
echo "secret=your-jwt-secret" >> .env
echo "MONGODB_URL=your-mongodb-connection-string" >> .env

# Start backend server
npm start
# Server runs on http://localhost:3000
```

### 3. Frontend Setup
```bash
# Navigate to frontend
cd ../ecommerce-frontend

# Install dependencies
npm install

# Create .env file
echo "PORT=3001" > .env
echo "REACT_APP_API_URL=http://localhost:3000/api/v1" >> .env

# Start frontend
npm start
# Application opens on http://localhost:3001
```

### 4. Create Admin User
```javascript
// In MongoDB or using Mongosh
use your_database_name

db.users.updateOne(
  { email: "your@email.com" },
  { $set: { isAdmin: true } }
)
```

## 📁 Project Structure

### Frontend (`ecommerce-frontend/`)
```
src/
├── components/
│   ├── Admin/
│   │   ├── AddProduct.js
│   │   └── AddCategory.js
│   ├── Auth/
│   │   ├── Login.js
│   │   └── Register.js
│   ├── Cart/
│   │   ├── CartDrawer.js
│   │   └── CartSummary.js
│   ├── Layout/
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── Products/
│   │   ├── ProductCard.js
│   │   ├── ProductList.js
│   │   ├── ProductDetail.js
│   │   ├── CategoryFilter.js
│   │   ├── FeaturedProducts.js
│   │   └── SearchProducts.js
│   └── ProtectedRoute.js
├── context/
│   ├── AuthContext.js
│   └── CartContext.js
├── pages/
│   ├── Admin/
│   │   └── Dashboard.js
│   ├── Home.js
│   ├── Cart.js
│   ├── Categories.js
│   └── Checkout.js
├── services/
│   └── api.js
└── App.js
```

### Backend (`nodejs-ecommerce-api/`)
```
├── config/
│   └── database.config.js
├── helpers/
│   ├── auth-check.js
│   ├── error-handler.js
│   └── jwt.js
├── models/
│   ├── user.js
│   ├── product.js
│   ├── category.js
│   ├── order.js
│   ├── order-item.js
│   └── cart.js
├── routes/
│   ├── users.js
│   ├── products.js
│   ├── categories.js
│   ├── orders.js
│   └── cart.js
├── public/
│   └── uploads/
└── app.js
```

## 🔐 Authentication Flow

1. **User registers** → Password hashed with bcrypt
2. **User logs in** → JWT token generated
3. **Token stored** in localStorage
4. **Token sent** with every API request
5. **Backend verifies** token and permissions
6. **Admin routes** check `isAdmin` flag
7. **Token expires** → Auto logout (1 day default)

## 🛣️ API Endpoints Summary

### Users
- `POST /api/v1/users/register` - Register user
- `POST /api/v1/users/login` - Login user
- `GET /api/v1/users` - Get all users (Admin)
- `GET /api/v1/users/:id` - Get user by ID
- `DELETE /api/v1/users/:id` - Delete user (Admin)

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products` - Create product (Admin)
- `PUT /api/v1/products/:id` - Update product (Admin)
- `DELETE /api/v1/products/:id` - Delete product (Admin)
- `GET /api/v1/products/get/count` - Get product count
- `GET /api/v1/products/get/featured/:count` - Get featured products

### Categories
- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:id` - Get category by ID
- `POST /api/v1/categories` - Create category (Admin)
- `PUT /api/v1/categories/:id` - Update category (Admin)
- `DELETE /api/v1/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/add-item` - Add item to cart
- `PUT /api/v1/cart/update-item/:id` - Update cart item
- `DELETE /api/v1/cart/remove-item/:id` - Remove cart item
- `DELETE /api/v1/cart/clear` - Clear cart

### Orders
- `GET /api/v1/orders` - Get all orders (Admin)
- `GET /api/v1/orders/:id` - Get order by ID
- `POST /api/v1/orders` - Create order
- `PUT /api/v1/orders/:id` - Update order (Admin)

## 🎨 UI Highlights

### Admin Dashboard
- Beautiful gradient header
- Real-time statistics cards
- Quick action buttons
- Icon picker (64+ emojis)
- Color picker with presets
- Live category preview
- Image upload with preview

### Shopping Experience
- Responsive product grid
- Category filter chips
- Real-time search
- Product cards with images
- Cart drawer (slide-in)
- Cart badge with item count
- Smooth animations

### User Experience
- Toast notifications
- Loading states
- Error handling
- Form validation
- Auto-redirect based on role
- Mobile-friendly

## 🔧 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | UI framework |
| Material-UI | 7.3.8 | Component library |
| React Router | 7.13.0 | Routing |
| Axios | 1.8.3 | HTTP client |
| React Toastify | 11.0.3 | Notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.21.2 | Web framework |
| Mongoose | 8.9.3 | MongoDB ODM |
| JWT | 9.0.2 | Authentication |
| Multer | 1.4.5 | File upload |
| Bcrypt | 2.4.3 | Password hashing |

### Database
- MongoDB Atlas (Cloud)
- Collections: users, products, categories, orders, carts

## 🚨 Important Notes

### Security
- ⚠️ Change JWT secret in production
- ⚠️ Never commit `.env` files
- ⚠️ Use HTTPS in production
- ⚠️ Configure CORS properly
- ⚠️ Validate all user inputs

### Development
- Frontend runs on port 3001
- Backend runs on port 3000
- MongoDB connection required
- Ensure both servers are running

## 📊 Database Models

### User
```javascript
{
  name, email, passwordHash, phone,
  isAdmin, street, apartment,
  zip, city, country
}
```

### Product
```javascript
{
  name, description, richDescription,
  image, brand, price, category,
  countInStock, rating, numReviews,
  isFeatured, dateCreated
}
```

### Category
```javascript
{
  name, icon, color
}
```

### Cart
```javascript
{
  user, items: [{
    product, quantity, price, total
  }],
  subtotal, tax, total
}
```

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filters
- [ ] Product recommendations
- [ ] Order tracking
- [ ] Invoice generation
- [ ] Sales analytics
- [ ] Inventory management
- [ ] Multi-image product gallery
- [ ] User profile editing
- [ ] Password reset
- [ ] Social login

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify `.env` file exists
- Ensure port 3000 is available
- Check Node.js version

### Frontend won't start
- Check `.env` file exists
- Ensure port 3001 is available
- Verify backend is running
- Clear node_modules and reinstall

### Authentication issues
- Clear localStorage
- Check JWT secret matches
- Verify token format
- Check token expiry

### Cart not updating
- Verify user is logged in
- Check backend cart routes
- Ensure MongoDB connection
- Check browser console for errors

## 📚 Documentation

- [Frontend README](./ecommerce-frontend/README.md)
- [Backend README](./nodejs-ecommerce-api/README.md)
- [Role-Based Auth Guide](./ecommerce-frontend/ROLE_BASED_AUTH.md)

## 🤝 Contributing

This is a learning project. Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make improvements
4. Submit a pull request

## 📝 License

MIT License - Feel free to use this project for learning or as a starter template

## 👏 Acknowledgments

- Material-UI team for amazing components
- React team for the framework
- MongoDB for the database
- Express.js for the backend framework
- The open-source community

## 📧 Support

For questions or issues:
- Check documentation
- Review code comments
- Test API with Postman
- Check browser console
- Verify environment variables

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack JavaScript development
- ✅ RESTful API design
- ✅ Authentication & authorization
- ✅ State management
- ✅ Database design
- ✅ File handling
- ✅ Component architecture
- ✅ Responsive design
- ✅ Error handling
- ✅ Security best practices

---

**🚀 Built with ❤️ for learning and demonstration purposes**

**Stack**: React.js • Node.js • Express • MongoDB • Material-UI • JWT
