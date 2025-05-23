import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 14,
  },
  modalButton: {
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#999999',
  },
  cancelButtonText: {
    color: '#000000',
    fontWeight: '700',
  },
  deleteButton: {
    backgroundColor: COLORS.red,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default styles;