import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  function teste(){
    <Link></Link>
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title1}>CARD</Text>
        <Text style={styles.title2}>WARS</Text>
      </View>

      <View>
        <Pressable style={styles.buttonLogin} onPress={teste}>
            <Text >Login</Text>
        </Pressable>
      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#364753',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTitle: {
   width: "60%",
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 150  
  },
    title1:{
      fontSize: 46,
      color: "#fff",
      marginRight: 50,
      marginBottom: -15
    },
    title2:{
      fontSize: 46,
      color: "#fff",
      marginLeft: 50
    },
    buttonLogin: {
      backgroundColor: "#fff",
      width: "80%",
      paddingHorizontal: 120,
      paddingVertical: 15,
      borderRadius: 10
    },
    titleButtonLogin: {
      fontSize: 30,
      fontWeight: "bold"

    }

});
