import React, { useState, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';
import YouTube from 'react-native-youtube';
import { getVideoMovieApi } from '../api/movies';
import { WebView } from 'react-native-webview';

export default function ModalVideo(props) {
    const { show, setShow, idMovie } = props;
    const [video, setVideo] = useState(null);

    useEffect( async () =>{
        const data = await getVideoMovieApi(idMovie);
        let idVideo = null;
        data.results.forEach((video) => {
            if (video.site === 'YouTube' && !idVideo) {
                idVideo = video.key
            }
        });
        setVideo(idVideo);
    });

    return(
        <Modal visible={show} contentContainerStyle={styles.modal}>
            { Platform.OS === 'ios' ? (
                <YouTube videoId={video} style={styles.video}></YouTube>
            ) : (
                <WebView style={{ width: 500}} source={{uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0`}}></WebView>
            )}
            <IconButton 
                icon='close'
                onPress={ () => setShow(false)}
                style={styles.close}></IconButton>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#000',
        height: '120%',
        alignItems: 'center'
    },
    close: {
        backgroundColor: '#1ea1f2',
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
        bottom: 100
    },
    video: {
        alignSelf: 'stretch',
        height: 300
    }
})