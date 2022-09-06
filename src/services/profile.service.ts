import { axios } from '../libs/axios';
import { Profile } from '../types/profile.types';

interface ProfileUpdateParams {
  id: string;
  data: Partial<Profile>;
}

export async function getUserProfiles(userId: string) {
  const response = await axios.get<Profile[]>('/profiles', {
    params: { userId },
  });
  return response.data;
}

export async function getProfile(id: string) {
  const response = await axios.get<Profile>(`/profiles/${id}`);
  return response.data;
}

export async function getProfileByUsername(profileUsername: string) {
  const response = await axios.get<Profile>('/profiles/user', {
    params: { profileUsername },
  });
  return response.data;
}

export async function addProfile(data: Partial<Profile>) {
  const response = await axios.post<Profile>('/profiles', data);
  return response.data;
}

export async function updateProfile({ id, data }: ProfileUpdateParams) {
  const response = await axios.patch<Profile>(`/profiles/${id}`, data);
  return response.data;
}

export async function deleteProfile(id: string) {
  return await axios.delete<Profile>(`/profiles/${id}`);
}
