import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves para armazenamento
const USERS_STORAGE_KEY = '@codelead:users';
const POSTS_STORAGE_KEY = '@codelead:posts';

// Interfaces
export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
}

// Funções para gerenciar usuários
export const saveUser = async (username: string): Promise<User> => {
  try {
    // Buscar usuários existentes
    const users = await getUsers();
    
    // Verificar se o usuário já existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return existingUser;
    }
    
    // Criar novo usuário
    const newUser: User = {
      id: Date.now().toString(),
      username,
      createdAt: new Date().toISOString(),
    };
    
    // Adicionar à lista e salvar
    const updatedUsers = [...users, newUser];
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    return newUser;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const currentUserJson = await AsyncStorage.getItem('@codelead:currentUser');
    return currentUserJson ? JSON.parse(currentUserJson) : null;
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    return null;
  }
};

export const setCurrentUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem('@codelead:currentUser', JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao definir usuário atual:', error);
    throw error;
  }
};

// Funções para gerenciar posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const postsJson = await AsyncStorage.getItem(POSTS_STORAGE_KEY);
    const posts = postsJson ? JSON.parse(postsJson) : [];
    
    // Ordenar posts do mais recente para o mais antigo
    return posts.sort((a: Post, b: Post) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
};

export const createPost = async (title: string, content: string): Promise<Post> => {
  try {
    // Buscar usuário atual
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('Nenhum usuário logado');
    }
    
    // Buscar posts existentes
    const posts = await getPosts();
    
    // Criar novo post
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      username: currentUser.username,
      createdAt: new Date().toISOString(),
    };
    
    // Adicionar à lista e salvar
    const updatedPosts = [newPost, ...posts];
    await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
    
    return newPost;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
};

export const updatePost = async (postId: string, title: string, content: string): Promise<Post> => {
  try {
    // Buscar posts existentes
    const posts = await getPosts();
    
    // Encontrar o post a ser atualizado
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      throw new Error('Post não encontrado');
    }
    
    // Verificar se o usuário atual é o autor do post
    const currentUser = await getCurrentUser();
    if (!currentUser || posts[postIndex].username !== currentUser.username) {
      throw new Error('Você não tem permissão para editar este post');
    }
    
    // Atualizar o post
    const updatedPost = {
      ...posts[postIndex],
      title,
      content,
    };
    
    posts[postIndex] = updatedPost;
    
    // Salvar a lista atualizada
    await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    
    return updatedPost;
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    // Buscar posts existentes
    const posts = await getPosts();
    
    // Encontrar o post a ser excluído
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      throw new Error('Post não encontrado');
    }
    
    // Verificar se o usuário atual é o autor do post
    const currentUser = await getCurrentUser();
    if (!currentUser || posts[postIndex].username !== currentUser.username) {
      throw new Error('Você não tem permissão para excluir este post');
    }
    
    // Remover o post da lista
    posts.splice(postIndex, 1);
    
    // Salvar a lista atualizada
    await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    throw error;
  }
};

// Função para formatar o tempo relativo (ex: "há 5 minutos")
export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} segundos atrás`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutos atrás`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} horas atrás`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} dias atrás`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} meses atrás`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} anos atrás`;
};

// Função para limpar todos os dados (útil para testes)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      USERS_STORAGE_KEY,
      POSTS_STORAGE_KEY,
      '@codelead:currentUser'
    ]);
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw error;
  }
};