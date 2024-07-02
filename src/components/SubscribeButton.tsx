import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface SubscribeButtonProps {
  userRole: string;
  isUserSubscribed: boolean;
  isLoading: boolean;
  eventHasStarted: boolean;
  handleInscricao: () => void;
  startEventX: () => void;
}

// Definindo o componente SubscribeButton
const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  userRole,
  isUserSubscribed,
  isLoading,
  eventHasStarted,
  handleInscricao,
  startEventX
}) => {
  return (
    <Pressable
      style={[styles.buttonSeeEvent, isUserSubscribed && styles.disabledButton]}
      onPress={() => {
        if (userRole === 'ROLE_MANAGER' && !eventHasStarted) {
            startEventX();
          } 
         else if (userRole === 'ROLE_PLAYER' && !isUserSubscribed) {
          handleInscricao(); // Inscrever-se
        }
      }}
      disabled={isLoading} // Desabilita o botão enquanto estiver carregando
    >
      <Text style={styles.buttonMyEventText1}>
        {isLoading ? 'Carregando...' : 
          userRole === 'ROLE_MANAGER' ? (eventHasStarted ? 'Iniciado' : 'Iniciar Evento') : 
          (isUserSubscribed ? 'Inscrito' : 'Inscrever-se')}
      </Text>
    </Pressable>
  );
};



// Estilos
const styles = StyleSheet.create({
  buttonSeeEvent: {
    flex: 1,
    backgroundColor: '#364753',
    width: '80%',
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'green',
    borderWidth: 2
  },


  buttonMyEventText1: {
    color: '#FFFFFF',
    fontSize: 20
  },

  disabledButton: {
    opacity: 0.6,
  },
});

export default SubscribeButton;
