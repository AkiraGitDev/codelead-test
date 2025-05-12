import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost, updatePost, deletePost, queryKeys } from '@/services/api';

// Hook para buscar todos os posts
export const usePosts = () => {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: fetchPosts,
  });
};

// Hook para criar um novo post
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidar a consulta de posts para recarregar os dados
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
};

// Hook para atualizar um post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      // Invalidar a consulta de posts para recarregar os dados
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      if (data.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.post(Number(data.id)) });
      }
    },
  });
};

// Hook para excluir um post
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deletePost(Number(id)),
    onSuccess: () => {
      // Invalidar a consulta de posts para recarregar os dados
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
};