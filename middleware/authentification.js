const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler( async(req, res, next) => {
    // Inicijuojamas kintamasis.
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // (bearer token)
            // split() metodas
            token = req.headers.authorization.split(' ')[1];
            // patvirtina token'ą
            const decoded = jwt.verify(token, process.env.JWT);
            // gauna user'į pagal tokeną naudojant ID
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error("Not authorized.")
        }
    }
    if (!token) {
        res.status(400);
        throw new Error("Not authorized. No token.")
    }
});

module.exports = { protect };