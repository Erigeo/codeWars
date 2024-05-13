import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#364753',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
  },
});
