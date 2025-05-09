import { StyleSheet } from 'react-native';
import { COLORS } from '@/src/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 500,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
  },
  input: {
    height: 32,
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEnabled: {
    backgroundColor: COLORS.blue,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default styles;