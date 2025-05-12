import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { styles } from './style';

interface EditModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (title: string, content: string) => void;
  initialTitle: string;
  initialContent: string;
}

export default function EditModal({ 
  visible, 
  onCancel, 
  onSave, 
  initialTitle, 
  initialContent 
}: EditModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (visible) {
      setTitle(initialTitle);
      setContent(initialContent);
      setIsButtonDisabled(false);
    }
  }, [visible, initialTitle, initialContent]);

  const handleTitleChange = (text: string) => {
    setTitle(text);
    handleInputChange(text, content);
  };

  const handleContentChange = (text: string) => {
    setContent(text);
    handleInputChange(title, text);
  };

  const handleInputChange = (titleText: string, contentText: string) => {
    setIsButtonDisabled(titleText.trim() === '' || contentText.trim() === '');
  };

  const handleSave = () => {
    onSave(title, content);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Edit item
          </Text>
          
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleTitleChange}
            placeholder="Title here"
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
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.modalButton, 
                isButtonDisabled ? styles.saveButtonDisabled : styles.saveButton
              ]}
              disabled={isButtonDisabled}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}