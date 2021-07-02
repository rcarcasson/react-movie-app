import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { getNewsMoviesApi } from '../api/movies'
import CarouselVertical from '../components/CarouselVertical';

export default function Home(props) {
    const { navigation } = props;
    const [newMovies, setNewMovies] = useState(null);

    useEffect( async() => {
        const data = await getNewsMoviesApi();
        setNewMovies(data.results);
    }, []);

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas películas</Title>
                    <CarouselVertical data={newMovies} navigation={navigation}></CarouselVertical>
                </View>
            )}
            <View style={styles.genres}>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10
    },
    newsTitle: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    genres: {
        marginTop: 20,
        marginBottom: 50
    }
})