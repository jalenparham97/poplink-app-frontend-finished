import axiosInstance from 'axios';
import { config } from '../config';

export const axios = axiosInstance.create({
  baseURL: config.apiURL,
});
