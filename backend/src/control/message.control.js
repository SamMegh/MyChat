import User from "../model/user.model";
import 
export const getusers = async (req, res) => {
     try {
        let loginuser= res.user._id;
           let users = await User.find({ _id: { $ne: loginuser } }).select('-password');
           res.status(200).json(users);
     } catch (error) {
        res.status(500).json({ message: 'Internal server error' + error });
        
     }
    }

