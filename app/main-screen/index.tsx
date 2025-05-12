import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import DeleteModal from '@/components/delete-modal';
import EditModal from '@/components/edit-modal';
import { getPosts, createPost, updatePost, deletePost, getCurrentUser, getRelativeTime } from '@/services/users-posts';

export default function MainScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [postToEdit, setPostToEdit] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Para carregar os posts:
  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    
    loadPosts();
  }, []);

  // Para carregar o usuário atual
  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    
    loadCurrentUser();
  }, []);

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

  // Para criar um post:
  const handleCreatePost = async () => {
    try {
      await createPost(title, content);
      // Recarregar posts
      const updatedPosts = await getPosts();
      setPosts(updatedPosts);
      setTitle('');
      setContent('');
      setIsButtonDisabled(true);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      // Mostrar mensagem de erro
    }
  };

  const openDeleteModal = (postId: string) => {
    setPostToDelete(postId);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setPostToDelete(null);
  };

  // Para excluir um post:
  const handleDeletePost = async () => {
    if (postToDelete !== null) {
      try {
        await deletePost(postToDelete);
        // Recarregar posts
        const updatedPosts = await getPosts();
        setPosts(updatedPosts);
        closeDeleteModal();
      } catch (error) {
        console.error('Erro ao excluir post:', error);
        // Mostrar mensagem de erro
      }
    }
  };

  const openEditModal = (postId: string) => {
    setPostToEdit(postId);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setPostToEdit(null);
  };

  // Para editar um post:
  const handleEditPost = async (newTitle: string, newContent: string) => {
    if (postToEdit !== null) {
      try {
        await updatePost(postToEdit, newTitle, newContent);
        // Recarregar posts
        const updatedPosts = await getPosts();
        setPosts(updatedPosts);
        closeEditModal();
      } catch (error) {
        console.error('Erro ao editar post:', error);
        // Mostrar mensagem de erro
      }
    }
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
        <View style={styles.createPostCard}>
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
              disabled={isButtonDisabled}
              onPress={handleCreatePost}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Posts List */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Text style={styles.postTitle}>{post.title}</Text>
              
              {currentUser && post.username === currentUser.username && (
                <View style={styles.postActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => openDeleteModal(post.id)}
                  >
                    <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => openEditModal(post.id)}
                  >
                    <Ionicons name="create-outline" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            
            <View style={styles.postContent}>
              <View style={styles.postInfo}>
                <Text style={styles.postUsername}>{post.username}</Text>
                <Text style={styles.postTime}>{getRelativeTime(post.createdAt)}</Text>
              </View>
              
              <Text style={styles.postText}>{post.content}</Text>
            </View>
          </View>
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