import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Dimensions, Platform } from 'react-native';
import Animated, { FadeIn, SlideInUp, FadeOut, SlideOutDown } from 'react-native-reanimated';
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
  
  // Adicione no início do componente
  const { width } = Dimensions.get('window');
  const modalWidth = Math.min(width * 0.9, 400);

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
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
      statusBarTranslucent={true}
    >
      <Animated.View 
        style={[
          styles.modalOverlay,
          { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        ]}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
      >
        <Animated.View 
          style={[
            styles.modalContainer,
            { width: modalWidth },
            Platform.OS === 'ios' ? { 
              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            } : {
              borderRadius: 8,
              elevation: 5,
            }
          ]}
          entering={SlideInUp.springify().damping(12)}
          exiting={SlideOutDown.duration(200)}
        >
          <Text style={styles.modalTitle}>
            Edit item
          </Text>
          
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={[styles.input, { borderWidth: 1, borderColor: '#ddd', borderRadius: 4 }]}
            value={title}
            onChangeText={handleTitleChange}
            placeholder="Title here"
            placeholderTextColor="#777777"
          />
          
          <Text style={styles.inputLabel}>Content</Text>
          <TextInput
            style={[
              styles.contentInput, 
              { 
                borderWidth: 1, 
                borderColor: '#ddd', 
                borderRadius: 4,
                minHeight: 100
              }
            ]}
            value={content}
            onChangeText={handleContentChange}
            placeholder="Content here"
            placeholderTextColor="#777777"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <View style={[
            styles.modalButtons,
            { marginTop: 20, justifyContent: 'space-between' }
          ]}>
            <TouchableOpacity
              style={[
                styles.modalButton, 
                styles.cancelButton,
                { borderRadius: 8, paddingVertical: 12 }
              ]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.modalButton, 
                isButtonDisabled ? styles.saveButtonDisabled : styles.saveButton,
                { borderRadius: 8, paddingVertical: 12 }
              ]}
              disabled={isButtonDisabled}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}