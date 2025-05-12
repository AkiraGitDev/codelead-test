import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, FadeOut, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles } from './styles';
import DeleteModal from '@/components/delete-modal';
import EditModal from '@/components/edit-modal';
import { usePosts, useCreatePost, useUpdatePost, useDeletePost } from '@/hooks/usePosts';
import { Post } from '@/services/api';

export default function MainScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [postToEdit, setPostToEdit] = useState<number | null>(null);
  const [username, setUsername] = useState<string>('');
  
  // Obter parâmetros da rota
  const params = useLocalSearchParams();

  // Hooks do React Query
  const { data: posts = [], isLoading, error, refetch } = usePosts();
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();

  // Carregar o nome de usuário dos parâmetros da rota
  useEffect(() => {
    if (params.username) {
      setUsername(params.username as string);
    } else {
      // Se não houver nome de usuário, redirecionar para a tela de login
      router.replace('/sign-up');
    }
  }, [params]);

  const handleInputChange = () => {
    setIsButtonDisabled(title.trim() === '' || content.trim() === '');
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    handleInputChange();
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    handleInputChange();
  };

  // Criar um post
  const handleCreatePost = async () => {
    if (!username) {
      Alert.alert('Erro', 'Nome de usuário não encontrado. Faça login novamente.');
      router.replace('/sign-up');
      return;
    }
    
    createPostMutation.mutate({
      username,
      title,
      content
    }, {
      onSuccess: () => {
        // Limpar campos
        setTitle('');
        setContent('');
        setIsButtonDisabled(true);
      },
      onError: (error) => {
        console.error('Erro ao criar post:', error);
        Alert.alert('Erro', 'Não foi possível criar o post. Tente novamente mais tarde.');
      }
    });
  };

  const openDeleteModal = (postId: number) => {
    setPostToDelete(postId);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setPostToDelete(null);
  };

  // Excluir um post
  const handleDeletePost = async () => {
    if (postToDelete !== null) {
      deletePostMutation.mutate(postToDelete, {
        onSuccess: () => {
          closeDeleteModal();
        },
        onError: (error) => {
          console.error('Erro ao excluir post:', error);
          Alert.alert('Erro', 'Não foi possível excluir o post. Tente novamente mais tarde.');
        }
      });
    }
  };

  const openEditModal = (postId: number) => {
    setPostToEdit(postId);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setPostToEdit(null);
  };

  // Editar um post
  const handleEditPost = async (newTitle: string, newContent: string) => {
    if (postToEdit !== null) {
      updatePostMutation.mutate({
        id: postToEdit,
        post: {
          title: newTitle,
          content: newContent
        }
      }, {
        onSuccess: () => {
          closeEditModal();
        },
        onError: (error) => {
          console.error('Erro ao editar post:', error);
          Alert.alert('Erro', 'Não foi possível editar o post. Tente novamente mais tarde.');
        }
      });
    }
  };

  // Formatar data relativa
  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    
    // Verificar se a data é válida
    if (isNaN(postDate.getTime())) {
      return '';
    }
    
    // Calcular a diferença em segundos
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    
    if (diffInSeconds < 0) {
      return 'agora mesmo';
    }
    
    // Menos de um minuto
    if (diffInSeconds < 60) {
      return `${diffInSeconds} segundo${diffInSeconds !== 1 ? 's' : ''} atrás`;
    }
    
    // Menos de uma hora
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''} atrás`;
    }
    
    // Menos de um dia
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hora${diffInHours !== 1 ? 's' : ''} atrás`;
    }
    
    // Menos de uma semana
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} dia${diffInDays !== 1 ? 's' : ''} atrás`;
    }
    
    // Menos de um mês
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} semana${diffInWeeks !== 1 ? 's' : ''} atrás`;
    }
    
    // Menos de um ano
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} mês${diffInMonths !== 1 ? 'es' : ''} atrás`;
    }
    
    // Mais de um ano
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} ano${diffInYears !== 1 ? 's' : ''} atrás`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CodeLeap Network</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Create Post Form */}
        <Animated.View 
          style={styles.createPostCard}
          entering={FadeInUp.springify()}
        >
          <Text style={styles.createPostTitle}>What's on your mind?</Text>
          
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
            placeholder="Hello world"
            placeholderTextColor="#777777"
          />
          
          <Text style={styles.inputLabel}>Content</Text>
          <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={handleContentChange}
            placeholder="Content here"
            placeholderTextColor="#777777"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <View style={styles.createButtonContainer}>
            <TouchableOpacity
              style={[
                styles.createButton,
                isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled
              ]}
              disabled={isButtonDisabled || createPostMutation.isPending}
              onPress={handleCreatePost}
            >
              <Text style={styles.buttonText}>
                {createPostMutation.isPending ? 'Criando...' : 'Create'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Loading State */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando posts...</Text>
          </View>
        )}
        
        {/* Error State */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Erro ao carregar posts. Tente novamente.</Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Posts List */}
        {posts.map((post: Post, index: number) => (
          <Animated.View 
            key={post.id} 
            style={styles.postCard}
            entering={FadeInDown.delay(index * 100).springify()}
            exiting={FadeOut}
          >
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{post.title}</Text>
              
              {post.username === username && (
                <View style={styles.postActions}>
                  <TouchableOpacity 
                    style={styles.actionButtonAlt}
                    onPress={() => post.id && openDeleteModal(Number(post.id))}
                  >
                    <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButtonAlt}
                    onPress={() => post.id && openEditModal(Number(post.id))}
                  >
                    <Ionicons name="create-outline" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            <View style={styles.postContent}>
              <View style={styles.postInfo}>
                <Text style={styles.postUsername}>@{post.username}</Text>
                <Text style={styles.postTime}>
                  {post.created_datetime ? formatRelativeTime(post.created_datetime) : ''}
                </Text>
              </View>
              
              <Text style={styles.postText}>{post.content}</Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Modal de Confirmação de Exclusão */}
      <DeleteModal
        visible={deleteModalVisible}
        onCancel={closeDeleteModal}
        onDelete={handleDeletePost}
      />

      {/* Modal de Edição */}
      <EditModal
        visible={editModalVisible}
        onCancel={closeEditModal}
        onSave={handleEditPost}
        initialTitle={postToEdit !== null ? posts.find(post => post.id === postToEdit)?.title || '' : ''}
        initialContent={postToEdit !== null ? posts.find(post => post.id === postToEdit)?.content || '' : ''}
      />
    </SafeAreaView>
  );
}