import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUser } from "../interfaces/IUser";
import mongoose from "mongoose";

class AutherService{
    async register(name: string, email: string, password: string): Promise<string>{
        const existingUser = await User.findOne({email}) as IUser;
        if(existingUser) throw new Error('User already exists');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({name, email, password: hashedPassword});
        await user.save();

        const token = this.generateToken(user._id);
        return token;
    }

    async login(email: string, password: string): Promise<string> {
        const user = await User.findOne({email}) as IUser;
        if(!user) throw new Error('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) throw new Error('Invalid credentials');

        const token = this.generateToken(user._id);
        return token;

    }

    private generateToken(userId: mongoose.Types.ObjectId): string {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      }
}

export default new AutherService();