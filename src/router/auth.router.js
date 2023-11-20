const express = require('express');
const {registerUser,handleLogin} = require('../controllers/auth.controller')
const auth_router =  express.Router();

auth_router.post('/register',registerUser);
auth_router.post('/login',handleLogin);

module.exports = auth_router;