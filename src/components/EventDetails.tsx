import React from 'react';
import { View, Pressable, Text, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Events } from '../interfaces/User';

type NavbarProps = {
  selectedButton: number;
  handleButtonPress: (buttonId: number) => void;
  userRole: string;
  event: Events;
};

const EventDetails: React.FC<NavbarProps> = ({ selectedButton, handleButtonPress, userRole, event}) => {
  return (
    <View>
      <View style={styles.navbarcontainer}>
        <Pressable style={styles.navbarButtons} onPress={() => handleButtonPress(1)}>
          <Text style={[selectedButton === 1 && styles.selectedText]}>Detalhes</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => handleButtonPress(2)}>
          <Text style={[selectedButton === 2 && styles.selectedText]}>Torneio</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => handleButtonPress(3)}>
          <Text style={[selectedButton === 3 && styles.selectedText]}>Rodada</Text>
        </Pressable>
        <Pressable style={styles.navbarButtons} onPress={() => handleButtonPress(4)}>
          <Text style={[selectedButton === 4 && styles.selectedText]}>Grade</Text>
        </Pressable>
      </View>

      {selectedButton === 1 && (
        <View>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Detalhes</Text>
            {userRole === 'ROLE_MANAGER' && <Feather name="edit" size={20} color="gray" />}
          </View>
          <Text style={styles.TextDetails}>{event.description}</Text>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Cronograma</Text>
            {userRole === 'ROLE_MANAGER' && <Feather name="edit" size={20} color="gray" />}
          </View>
          <Text style={styles.TextDetails}>{event.description}</Text>
          <View style={styles.textdetailscontainer}>
            <Text style={styles.TextTitleDetalhes}>Premiação</Text>
            {userRole === 'ROLE_MANAGER' && <Feather name="edit" size={20} color="gray" />}
          </View>
          <Text style={styles.TextDetails}>{event.description}</Text>
        </View>
      )}

      {selectedButton === 2 && (
        <View>
          <View style={styles.textTitleContainer}>
            <Text style={styles.TextTitleTorneio}>Torneio</Text>
          </View>
        </View>
      )}

      {selectedButton === 3 && (
        <View>
          <Text style={styles.TextTitleDetalhes}>Rodada</Text>
        </View>
      )}

      {selectedButton === 4 && (
        <View>
          <Text style={styles.TextTitleDetalhes}>Grade</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
textTitleContainer: {
    alignItems: 'center'
  },

  TextTitleTorneio: {
    color: 'white',
    fontSize: 24,
    margin: 20,
  }
  ,
  textdetailscontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between'
  },
  TextDetails: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 30
  },
  TextTitleDetalhes: {
    color: 'white',
    fontSize: 24,
    margin: 20
  }
  ,
  selectedText: {
    color: 'white'
  },
  navbarButtons: {
    backgroundColor: '#3D5D75',
    borderRightColor: 'black',
    borderRightWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
    justifyContent: 'center'

  }
  ,
  navbarcontainer: {
    flexDirection: 'row',
    width: '100%',
    height: 35,

    justifyContent: 'space-between',
  }
});
export default EventDetails;
