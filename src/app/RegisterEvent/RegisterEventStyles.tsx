import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 5,
    padding: 15
  },
  button: {

    backgroundColor: '#1e90ff',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,

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
    container: {  backgroundColor: '#364753', flex: 1},
    textItem: {
      color: 'white'
    }
    ,
    dropdown: {
      height: 50,
      margin: 10,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 15,
    },
    placeholderStyle: {
      fontSize: 16,
      color: 'white',
      marginLeft: 10
    },
    selectedTextStyle: {
      fontSize: 14,
      color: 'white'
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: 'white',
      borderRadius: 15
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
    
      
    },
    containerSearch: {
      backgroundColor: '#364753',
      borderBottomEndRadius: 15,
      borderBottomLeftRadius: 15,
      color: 'white'
    },
    selectedItem: {
      backgroundColor: 'red'
    },
    titleContainer:{
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10
    },
    textInput: {
      color: 'white',
    },
    inputContainer: {
      gap: 5,
      marginHorizontal: 10
      
    },
    inputsContainer:{
      marginHorizontal: 10,
      marginBottom: 10,
      
    },

})
