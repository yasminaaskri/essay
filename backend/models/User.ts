import mongoose, { Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: String,
  password: String,
});

const User = mongoose.model<UserInterface>('User', UserSchema);

export default User;
