import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = (req, res) => {
 try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
    if(password.length < 6) {
        return res.status(400).json({message: 'Password must be atleast 6 characters long'});
    }
    const user = User.findOne({email});
    if(user) {
        return res.status(400).json({message: 'User already exists'});
    }
    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });
    if(newUser) {

    }
 } catch (error) {
    res.status(500).json({message: 'Internal server error' + error});
 }
};

export const login = (req, res) => {
    res.send('login route');
};  

export const logout = (req, res) => {    
    res.send('logout route');
};