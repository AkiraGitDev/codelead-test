import { StyleSheet } from 'react-native';
import { COLORS } from '../../src/constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDDD',
  },
  header: {
    backgroundColor: COLORS.blue,
    padding: 16,
    paddingTop: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  createPostCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createPostTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
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
  contentInput: {
    height: 74,
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    width: '100%',
  },
  createButtonContainer: {
    alignItems: 'flex-end',
  },
  createButton: {
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
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    backgroundColor: COLORS.blue,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  postActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
  postContent: {
    padding: 24,
  },
  postInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  postUsername: {
    fontWeight: 'bold',
  },
  postTime: {
    color: '#777777',
  },
  postText: {
    lineHeight: 21,
  },
});

export default styles;