import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Text, Title } from 'react-native-paper';
import { BASE_PATH_IMG } from '../utils/constants';
import { getGenreMovieApi } from '../api/movies';
import { map, size } from 'lodash'

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselVertical(props) {
    const { data, navigation } = props;

    return (
        <Carousel 
            layout={'default'} 
            data={data} 
            renderItem={(item) => <RenderItem data={item} navigation={navigation}></RenderItem> }
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
            windowSize={1}
        >
        </Carousel>
    );
}

function RenderItem(props) {
    const {data, navigation} = props;
    const { title, poster_path, genre_ids, id } = data.item;
    const imageUrl = `${BASE_PATH_IMG}/w500${poster_path}`;
    const [genres, setGenres] = useState(null);


    useEffect( () => {
        getGenreMovieApi(genre_ids).then( (response) => {
            setGenres(response);
        });
    }, []);

    const onNavigation = () => {
        navigation.navigate('movie', {id});
    }

    return (
        <TouchableWithoutFeedback onPress={onNavigation}>
            <View style={styles.card}>
                <Image style={styles.image} source={{uri: imageUrl}}></Image>
                <Title style={styles.title}>{title}</Title>
                <View style={styles.genres}>
                    {genres && (
                        map(genres, (genre, index) => (
                            <Text key={index} style={styles.genre}>
                                {genre}
                                {index !== size(genres) -1 && ', '}
                            </Text>
                        ))
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    image: {
        width: '100%',
        height: 450,
        borderRadius: 30
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10
    },
    genres: {
        flexDirection: 'row',
        marginHorizontal: 10
    },
    genre: {
        fontSize: 12,
        color: '#8997a5'
    }
})