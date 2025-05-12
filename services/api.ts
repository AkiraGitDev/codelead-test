import axios from 'axios';

const API_URL = 'https://dev.codeleap.co.uk/careers/';

// Interfaces
export interface Post {
  id?: number;
  username: string;
  created_datetime?: string;
  title: string;
  content: string;
}

// Cliente Axios
const apiClient = axios.create({
  baseURL: API_URL,
});

// Funções de API
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get('');
  return response.data.results;
};

export const createPost = async (post: Omit<Post, 'id' | 'created_datetime'>): Promise<Post> => {
  const response = await apiClient.post('', post);
  return response.data;
};

export const updatePost = async ({ id, post }: { id: number, post: Pick<Post, 'title' | 'content'> }): Promise<Post> => {
  const response = await apiClient.patch(`${id}/`, post);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`${id}/`);
};

// Chaves de consulta para React Query
export const queryKeys = {
  posts: ['posts'] as const,
  post: (id: number) => ['post', id] as const,
};