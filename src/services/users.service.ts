import { axios } from '../libs/axios';
import { User } from '../types/user.types';

export async function createUser(data: Partial<User>) {
  const response = await axios.post<User>('/users', data);
  return response.data;
}

export async function getUser(userId: string) {
  const response = await axios.get<User>(`/users/${userId}`);
  return response.data;
}
