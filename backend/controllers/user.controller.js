import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

dotenv.config();

const userController = {
    register: async (req, res) => {
        const { email, password } = req.body;
        try {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                email,
                password: hashedPassword
            });
            await newUser.save();
            return res.status(201).json({
                message: 'User registered successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error registering user',
                error
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: 'Incorrect password'
                })
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
            )

            return res.status(200).json({
                message: 'User logged in successfully',
                token
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error logging in user',
                error
            });
        }

    },
    logout: (req, res) => {
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    }
}

export default userController;