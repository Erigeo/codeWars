import { View, Text, Pressable, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useUserData } from '../../../contexts/AuthContext';
import Api from '../../../services/Api';  // Usando a configuração do Api personalizada
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            console.error('Error fetching player events:', error);
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
            filteredEvents = filteredEvents.filter(event =>
                event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }
    // TODO remove or implement
       /* if (selectedTags.length > 0) {
            filteredEvents = filteredEvents.filter(event => 
                selectedTags.every(tag => event.tags.includes(tag))
            );
        }*/
        return filteredEvents;
    };

    const renderEventCard = ({ item }) => (
        <Pressable style={styles.eventCard} onPress={() => handlePress(item.id)}>
            <Image style={styles.image} source={{ uri: item.imagePath }} />
            <View style={styles.cardContent}>
                <Text style={styles.eventTitle}>{item.name}</Text>
                <View style={styles.tagsContainer}>
                    {item.tags && item.tags.slice(0, 2).map((tag, index) => (
                        <Text key={index} style={styles.tag}>{tag}</Text>
                    ))}
                </View>
            </View>
        </Pressable>
    );

 return (
    <View style={{ flex: 1, backgroundColor: '#2D3841' }}>
        <Text style={styles.title}>Meus Eventos</Text>
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
                numColumns={2}
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
    tagFilterContainer: {
        marginLeft: 10,
        marginBottom: 10,
    },
    tagButton: {
        backgroundColor: '#364753',
        padding: 10,
        borderRadius: 15,
        marginRight: 10,
    },
    selectedTag: {
        backgroundColor: '#FF6347',
    },
    tagButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
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
    findEventsButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    eventCard: {
        flex: 1,
        backgroundColor: '#364753',
        borderRadius: 15,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 15,
    },
    cardContent: {
        marginTop: 10,
        alignItems: 'center',
    },
    eventTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tagsContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    tag: {
        backgroundColor: '#FF6347',
        color: '#FFFFFF',
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
        fontSize: 12,
    },
});
