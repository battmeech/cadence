import dotenv from 'dotenv';
import { Cadence } from './models/client';

// Initialise dotenv config - if you're doing config that way
dotenv.config();

export const client = new Cadence(process.env.TOKEN);
