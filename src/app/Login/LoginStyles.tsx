import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonPressed: {
    backgroundColor: '#125348', // Change to the color you want when the button is pressed
  },
  buttonText: {
    color: '#364753',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
  },
});
