const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');

// Get cart for current user
router.get('/', async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        let cart = await Cart.findOne({ user: req.user.userId })
            .populate({
                path: 'items.product',
                select: 'name price image description',
            })
            .populate('user', 'name email');

        if (!cart) {
            cart = new Cart({
                user: req.user.userId,
                items: [],
                totalPrice: 0,
                totalItems: 0,
            });
            await cart.save();
        }

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add item to cart
router.post('/add-item', async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
        }

        // Validate product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check stock
        if (product.countInStock < quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient stock' });
        }

        let cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            cart = new Cart({
                user: req.user.userId,
                items: [],
                totalPrice: 0,
                totalItems: 0,
            });
        }

        // Check if product already in cart
        const existingItem = cart.items.find((item) => item.product.toString() === productId);

        if (existingItem) {
            // Check if stock is available for new quantity
            const availableStock = product.countInStock - (existingItem.quantity - quantity);
            if (availableStock < 0) {
                return res.status(400).json({ success: false, message: 'Insufficient stock for this quantity' });
            }
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: product.price,
            });
        }

        // Calculate totals
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cart.updatedAt = Date.now();

        await cart.save();
        await cart.populate({
            path: 'items.product',
            select: 'name price image description',
        });

        res.status(200).json({ success: true, data: cart, message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update item quantity
router.put('/update-item/:productId', async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid quantity' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (product.countInStock < quantity) {
            return res.status(400).json({ success: false, message: 'Insufficient stock' });
        }

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const cartItem = cart.items.find((item) => item.product.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Product not in cart' });
        }

        cartItem.quantity = quantity;

        // Calculate totals
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cart.updatedAt = Date.now();

        await cart.save();
        await cart.populate({
            path: 'items.product',
            select: 'name price image description',
        });

        res.status(200).json({ success: true, data: cart, message: 'Cart updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Remove item from cart
router.delete('/remove-item/:productId', async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = cart.items.filter((item) => item.product.toString() !== productId);

        // Calculate totals
        cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cart.updatedAt = Date.now();

        await cart.save();
        await cart.populate({
            path: 'items.product',
            select: 'name price image description',
        });

        res.status(200).json({ success: true, data: cart, message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Clear cart
router.delete('/clear', async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        let cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = [];
        cart.totalItems = 0;
        cart.totalPrice = 0;
        cart.updatedAt = Date.now();

        await cart.save();

        res.status(200).json({ success: true, data: cart, message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
