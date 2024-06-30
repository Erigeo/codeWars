import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

// Definindo o componente SubscribeButton
const SubscribeButton = ({ userRole, isUserSubscribed, isLoading, handleInscricao }) => {
  return (
    <Pressable
      style={[styles.buttonSeeEvent, isUserSubscribed && styles.disabledButton]}
      onPress={() => {
        if (userRole === 'ROLE_MANAGER') {
          // Lógica para gerentes
          console.log('Lógica para gerentes');
        } else if (!isUserSubscribed) {
          // Lógica para usuários normais (ROLE_PLAYER) apenas se não estiver inscrito
          handleInscricao();
        }
      }}
      disabled={isLoading} // Desabilita o botão enquanto estiver carregando
    >
      <Text style={styles.buttonMyEventText1}>
        {isLoading ? 'Carregando...' : userRole === 'ROLE_MANAGER' ? 'Iniciar Evento' : isUserSubscribed ? 'Inscrito' : 'Inscrever-se'}
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
