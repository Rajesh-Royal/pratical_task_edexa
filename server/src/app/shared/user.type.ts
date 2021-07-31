import { Document } from 'mongoose';

export interface UserProfileType extends Document {
  _id?: string;
  name: string,
  profilePic: string,
  address: string,
  age: number
}
