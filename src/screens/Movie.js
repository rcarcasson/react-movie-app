import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Text, Title, IconButton } from 'react-native-paper';
import { getMovieByIdApi } from '../api/movies';
import { BASE_PATH_IMG } from '../utils/constants';
import ModalVideo from '../components/ModalVideo';

export default function Movie(props) {
    const { route } = props;
    const { id } = route.params;
    const [movie, setMovie] = useState({});
    const [showVideo, setShowVideo] = useState(false);

    useEffect( async () => {
        const data = await getMovieByIdApi(id);
        setMovie(data);
    }, []);
    return(
        <>
            <ScrollView>
                <MovieImage posterPath={movie.poster_path}></MovieImage>
                <MovieTrailer setShowVideo={setShowVideo}></MovieTrailer>
            </ScrollView>
            <ModalVideo show={showVideo} setShow={setShowVideo}></ModalVideo>
        </>

    )
}

function MovieImage(props) {
    const { posterPath } = props;

    return (
        <View style={styles.viewPoster}>
            <Image style={styles.poster} source={{ uri: `${BASE_PATH_IMG}/w500${posterPath}`}}></Image>
        </View>
    )
}

function MovieTrailer(props) {
    const { setShowVideo } = props;

    return(
        <View style={styles.viewPlay}>
            <IconButton
                icon='play'
                color='#000'
                size={30}
                style={styles.play}
                onPress={ () => setShowVideo(true)}
            >
            </IconButton>
        </View>
    )
}

const styles = StyleSheet.create({
    viewPoster: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    poster: {
        width: '100%',
        height: 500,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    viewPlay: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    play: {
        backgroundColor: '#FFF',
        marginTop: -40,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 100
    }
})