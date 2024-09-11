import { Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  _id: mongoose.Types.ObjectId;
}
