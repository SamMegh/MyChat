import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

export const signup = async(req, res) => {
    const { name, email, password } = req.body;
 try {
    if(!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }
    if(password.length < 6) {
        return res.status(400).json({message: 'Password must be atleast 6 characters long'});
    }
    const user = await User.findOne({email});
    if(user) {
        return res.status(400).json({message: 'email already exists '});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    if(newUser) {
   generateToken(newUser._id,res);
     await newUser.save();
    res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    });
    }
    else {
        res.status(400).json({message: 'Invalid user data'});
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