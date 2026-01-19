import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users } from '../models/userModel.js';

export const register = (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
};
