import { View, Text, Pressable, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useUserData } from '../../../contexts/AuthContext';
import Api from '../../../services/Api';  // Usando a configuração do Api personalizada
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default function Eventos() {
    const { dataUser, collectData } = useUserData(); 
    const [events, setEvents] = useState([]);   
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        collectData();
    }, []);

    useEffect(() => {
        if (dataUser && dataUser.role === "ROLE_PLAYER") {
            fetchEvents();
        }
    }, [dataUser]); 

    // TODO stop doing this
    const fetchEvents = async () => {  
        try {
            const token = await AsyncStorage.getItem('token');  
            console.log(token)
            const response = await Api.get(`api/events/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handlePress = (id: string) => {
        router.push({
          pathname: '/EventoX',
          params: { id },
        });
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // TODO remove or implement
    /*const toggleTag = (tag: string) => {
        setSelectedTags(prevTags => 
            prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
        );
    };*/

    const filterEvents = () => {
        let filteredEvents = events;
        if (searchQuery) {
            filteredEvents = filteredEvents.filter(event => {
                const name = event.name?.toLowerCase() ?? '';
                const tags = event.tags?.map(tag => tag.toLowerCase()) ?? [];
                return name.includes(searchQuery.toLowerCase()) || 
                       tags.some(tag => tag.includes(searchQuery.toLowerCase()));
            });
        }
    // TODO remove or implement
       /* if (selectedTags.length > 0) {
            filteredEvents = filteredEvents.filter(event => 
                selectedTags.every(tag => event.tags.includes(tag))
            );
        }*/
        return filteredEvents;
    };

    // TODO temp treatment of event data ; fix
    const renderEventCard = ({ item }) => (
        <Pressable style={styles.eventCard} onPress={() => handlePress(item.id)}>
        <Image style={styles.image} source={{ uri: item.imagePath }} />
        <View style={styles.cardContent}>
            <Text style={styles.eventTitle}>{item.name}</Text>

            <View style={styles.infoRow}>
                {/* Localização e Data em uma linha */}
                <View style={styles.infoGroup}>
                    <Ionicons name="location" size={20} color="#EC3657" />
                    <Text style={styles.locationInfo}>{item.location == (undefined || null) ? 'A definir' : item.location}</Text>
                </View>
                <View style={styles.infoGroup}>
                    <Fontisto name="date" size={20} color="#4ECB71" />
                    <Text style={styles.dateInfo}>{item.date == (undefined || null) ? 'A definir' : item.date}</Text>
                </View>
            </View>

            <View style={styles.infoRow}>
                {/* Número de Participantes e Tags em outra linha */}
                <View style={styles.infoGroup}>
                    <Ionicons name="people" size={20} color="#9747FF" />
                    <Text style={styles.peopleInfo}>{item.playerIds.length} / {item.numberOfParticipants}</Text>
                </View>
                <View style={styles.tagsContainer}>
                    {item.tags && item.tags.slice(0, 3).map((tag, index) => (
                        <Text key={index} style={[styles.tag, styles[`tag${index + 1}`]]}>{tag}</Text>
                    ))}
                </View>
            </View>
        </View>
    </Pressable>
    );

 return (
    <View style={{ flex: 1, backgroundColor: '#2D3841' }}>
        <Text style={styles.title}>Todos os Eventos</Text>
        <TextInput
            style={styles.searchInput}
            placeholder="Buscar evento"
            placeholderTextColor="#A9A9A9"
            value={searchQuery}
            onChangeText={handleSearch}
        />
        {/** TODO REMOVE OR IMPLEMENT */}
        {/**<ScrollView horizontal style={styles.tagFilterContainer}>
            /** Substitua as tags abaixo com as tags reais que você tem
            {['Tag1', 'Tag2', 'Tag3'].map((tag, index) => (
                <Pressable
                    key={index}
                    style={[
                        styles.tagButton,
                        selectedTags.includes(tag) && styles.selectedTag
                    ]}
                    onPress={() => toggleTag(tag)}
                >
                    <Text style={styles.tagButtonText}>{tag}</Text>
                </Pressable>
            ))}
        </ScrollView>*/}
        {dataUser && dataUser.role === "ROLE_PLAYER" && filterEvents().length === 0 ? (
            <View style={[styles.noEventsContainer, { justifyContent: 'center', alignItems: 'center'  }]}>
                <Text style={[styles.noEventsText, { textAlign: 'center' }]}>
                    Nenhum evento foi encontrado com os parâmetros definidos!
                </Text>
            </View>
        ) : (
            <FlatList
                data={filterEvents()}
                renderItem={renderEventCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContent}
                showsVerticalScrollIndicator={false}
            />
        )}
    </View>
);

}

const styles = StyleSheet.create({
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
    noEventsContainer: {
        borderRadius: 15,
        backgroundColor: '#364753',
        width: '100%',
        height: 150,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noEventsText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
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
        width: '100%',           
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
});
