import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import DeleteModal from '@/components/delete-modal';
import EditModal from '@/components/edit-modal';

export default function MainScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [postToEdit, setPostToEdit] = useState<number | null>(null);

  // Dados de exemplo para os posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Post at CodeLeap Network!',
      username: '@Victor',
      content: 'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.\n\nDuis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.',
      timeAgo: '25 minutes ago',
      isOwner: true,
    },
    {
      id: 2,
      title: 'My Second Post at CodeLeap Network!',
      username: '@Vini',
      content: 'Curabitur suscipit suscipit tellus. Phasellus consectetuer vestibulum elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas egestas arcu quis ligula mattis placerat. Duis vel nibh at velit scelerisque suscipit.\n\nDuis lobortis massa imperdiet quam. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Fusce a quam. Nullam vel sem. Nullam cursus lacinia erat.',
      timeAgo: '45 minutes ago',
      isOwner: false,
    },
  ]);

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

  const handleCreatePost = () => {
    console.log('Post criado:', { title, content });
    // Aqui você implementaria a lógica para criar o post
    setTitle('');
    setContent('');
    setIsButtonDisabled(true);
  };

  const openDeleteModal = (postId: number) => {
    setPostToDelete(postId);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
    setPostToDelete(null);
  };

  const handleDeletePost = () => {
    if (postToDelete !== null) {
      // Filtra os posts para remover o post com o ID correspondente
      const updatedPosts = posts.filter(post => post.id !== postToDelete);
      setPosts(updatedPosts);
      console.log('Post deletado:', postToDelete);
      closeDeleteModal();
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

  const handleEditPost = (newTitle: string, newContent: string) => {
    if (postToEdit !== null) {
      // Atualiza o post com o ID correspondente
      const updatedPosts = posts.map(post => {
        if (post.id === postToEdit) {
          return {
            ...post,
            title: newTitle,
            content: newContent,
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      console.log('Post editado:', postToEdit, { newTitle, newContent });
      closeEditModal();
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
              
              {post.isOwner && (
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
                <Text style={styles.postTime}>{post.timeAgo}</Text>
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