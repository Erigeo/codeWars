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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
    width: '20%',
    borderRadius: 10,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoCardsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 25
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
    fontWeight: 'bold',
    alignItems: 'flex-end', 
    marginTop: 9,
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
    fontSize: 20,
    textAlign: 'center', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCreateEvents: {
    backgroundColor: '#364753',
    width: '80%',
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
  // Ajuste o estilo viewEventButton para garantir que o conteúdo seja centralizado
  viewEventButton: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,  // Ajuste conforme necessário para manter o espaço vertical adequado
    paddingHorizontal: 10, // Ajuste conforme necessário para aumentar a largura do botão
    minHeight: 30, // Defina uma altura mínima suficiente para o gradiente
    overflow: 'hidden', // Evita que o conteúdo seja cortado
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
    marginTop: 20,
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
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
  title: {
    marginTop: 20,
    marginLeft: 10,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#364753',
    padding: 10,
    borderRadius: 15,
    margin: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  eventCard: {
    flexDirection: 'row',     // imagem + conteúdo em row
    backgroundColor: '#364753',
    borderRadius: 15,
    marginVertical: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ajuste a largura conforme necessário, '100%' para ocupar a largura total disponível
  },
  image: {
    width: '35%',
    height: 120,
    borderRadius: 15,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,           // margem entre a imagem e o restante
    justifyContent: 'center',
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#FF6347',
    color: '#FFFFFF',
    padding: 4,
    borderRadius: 5,
    marginRight: 5,
    fontSize: 11,
  },
  eventLocation: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventInfo: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  dateInfo: {
    fontSize: 14,
    color: '#4ECB71',
    marginLeft: 4,
  },
  locationInfo: {
    fontSize: 14,
    color: '#EC3657',
    marginLeft: 4,
  },
  peopleInfo: {
    fontSize: 14,
    color: '#9747FF',
    marginLeft: 4,
  },
  infoGroup: {
    flexDirection: 'row',   // Organizando ícone + texto em row
    alignItems: 'center',
    marginRight: 16,
  },
  tag1: {
    backgroundColor: '#A25FCA',
    color: '#FFFFFF',
  },
  tag2: {
    backgroundColor: '#5FCA77',
    color: '#FFFFFF',
  },
  tag3: {
    backgroundColor: '#3D69DA',
    color: '#FFFFFF',
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleLocation: {
    fontSize: 14,
    color: '#EC3657',
    marginLeft: 4,
  },
  eventDateContainer: {
    flexDirection: 'row-reverse', // Alinha os itens à direita
    alignItems: 'flex-end', // Centraliza os itens verticalmente
  },
});