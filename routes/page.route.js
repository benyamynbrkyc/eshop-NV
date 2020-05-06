const express = require('express');
const pageRoutes = new express.Router();
const path = require('path');

pageRoutes.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

pageRoutes.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/about.html'));
});

pageRoutes.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/products.html'));
});

module.exports = pageRoutes;
