import { axios } from '../libs/axios';
import { Link } from '../types/link.types';

interface LinkUpdateParams {
  id: string;
  data: Partial<Link>;
}

export async function getProfileLinks(profileId: string) {
  const response = await axios.get<Link[]>('/links', {
    params: { profileId },
  });
  return response.data;
}

export async function getLink(id: string) {
  const response = await axios.get<Link>(`/links/${id}`);
  return response.data;
}

export async function getLinksByUsername(profileUsername: string) {
  const response = await axios.get<Link[]>('/links/user', {
    params: { profileUsername },
  });
  return response.data;
}

export async function addLink(data: Partial<Link>) {
  const response = await axios.post<Link>('/links', data);
  return response.data;
}

export async function updateLink({ id, data }: LinkUpdateParams) {
  const response = await axios.patch<Link>(`/links/${id}`, data);
  return response.data;
}

export async function deleteLink(id: string) {
  return await axios.delete<Link>(`/links/${id}`);
}
