import { Dimensions, StyleSheet } from 'react-native'
const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  myevents1: {
    borderRadius: 15,
    backgroundColor: '#364753',
    width: '80%',
    height: 150,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  myeventsContainer: {
    flex: 1,
    width: '95%',
    marginTop: 10,
  },
  myevents: {
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: '#364753',
    width: 400,
    height: 150,
    marginBottom: 10,

  },
  buttonSearchEvents: {
    backgroundColor: 'green',
    width: '80%',
    margin: 20,
    alignItems: 'center',
    borderRadius: 15
  },
  titleMyEvents: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 123
  },
  myEventsDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10
  },
  buttonMyEventText: {
    color: '#FFFFFF',
    fontSize: 20
  },
  imageContainer: {
    padding: 70,
  },
  titleContainer: {
    flex: 1,
    marginRight: 20,
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  titleEventName: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  infoCardsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: -25
  },
  cardPlayersNumber: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: 5,
    height: 30,
    gap: 5
  },
  titlePlayersNumber: {
    color: '#9747FF',
    fontWeight: 'bold'
  },
  cardEventDate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 5,
    height: 30,
    gap: 5
  },
  titleEventDate: {
    color: '#4ECB71',
    fontWeight: 'bold'
  },
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
  buttonCreateEvents: {

    backgroundColor: '#364753',
    width: '70%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: '#3D5D75',
    borderWidth: 2,
  },
  buttonCreateContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  noEventsContainer: {
    borderRadius: 15,
    backgroundColor: '#364753',
    width: '80%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEventsText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 25,
  },
  findEventsButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  findEventsButtonText: {
    color: '#FFF',
    fontSize: 16,
  },



  playerEventCard: {
    backgroundColor: '#364753',
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 10,
    width: 200, // Ajuste a largura conforme necessário
    alignItems: 'center',
  },
  playerEventImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  playerEventName: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },
  playerEventDate: {
    color: '#CCCCCC',
    fontSize: 16,
    marginTop: 5,
  },


  titleUpcomingEvents: {
    color: '#FFFFFF',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  upcomingEventCard: {
    backgroundColor: '#364753',
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 10,
    width: 400, // Ajuste a largura conforme necessário
    flexDirection: 'row', // Para ajustar os detalhes do evento ao lado da imagem
  },
  upcomingEventImage: {
    width: 120, // Ajuste a largura da imagem conforme necessário
    height: 100, // Altura da imagem
    borderRadius: 10,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  upcomingEventName: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 10,
  },
  upcomingEventDate: {
    color: '#CCCCCC',
    fontSize: 16,
    marginTop: 5,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  carouselImage: {
    width: '100%',
    height: 200, // ou ajuste conforme necessário
    resizeMode: 'cover', // ou 'contain' dependendo do comportamento desejado
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  overlayIndicatorContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 1, // Garante que os indicadores fiquem sobrepostos às imagens
  },
});