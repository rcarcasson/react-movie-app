import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { map } from 'lodash';
import { getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi } from '../api/movies'
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';

export default function Home(props) {
    const { navigation } = props;
    const [newMovies, setNewMovies] = useState(null);
    const [genreList, setGenreList] = useState(null);
    const [genreSelected, setGenreSelected] = useState(28);
    const [genreMovies, setGenreMovies] = useState(null);
    
    useEffect( async() => {
        const data = await getGenreMoviesApi(genreSelected);
        setGenreMovies(data.results);
    }, [genreSelected]);

    useEffect( async() => {
        const data = await getNewsMoviesApi();
        setNewMovies(data.results);
    }, []);

    useEffect( async() => {
        const data = await getAllGenresApi();
        setGenreList(data.genres);
    }, []);

    const onChangeGenre = (newGenreId) => {
        setGenreSelected(newGenreId);
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies && (
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>Nuevas películas</Title>
                    <CarouselVertical data={newMovies} navigation={navigation}></CarouselVertical>
                </View>
            )}
            <View style={styles.genres}>
                <Title style={styles.genresTitle}>Películas por genero</Title>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
                    {map(genreList, (genre) => (
                        <Text 
                            key={genre.id} 
                            style={[
                                styles.genre, 
                                {color: genre.id !== genreSelected ? '#8697a5' : '#fff'}]}
                                onPress={ () => onChangeGenre(genre.id)}>{genre.name}</Text>
                    ))}
                </ScrollView>
                { genreMovies && (
                    <CarouselMulti data={genreMovies} navigation={navigation}></CarouselMulti>
                )}
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
    },
    genresTitle: {
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    genreList: {
        marginTop: 5,
        marginBottom: 15,
        padding: 10,
        paddingHorizontal: 20
    },
    genre: {
        marginRight: 20,
        fontSize: 16
    }
})