import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { styles } from './style';

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ visible, onCancel, onDelete }: DeleteModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <Animated.View 
        style={styles.modalOverlay}
        entering={FadeIn.duration(200)}
      >
        <Animated.View 
          style={styles.modalContainer}
          entering={SlideInDown.springify().damping(15)}
        >
          <Text style={styles.modalText}>
            Are you sure you want to delete this item?
          </Text>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={onDelete}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}