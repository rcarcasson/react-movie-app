import React from 'react';
import { IconButton } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
    const { navigation } = props;
    const buttonLeft = (screen) => {
        switch(screen) {
            case 'search':
            case 'movie':
                return(
                    <IconButton icon='arrow-left' onPress={ () => navigation.goBack()}></IconButton>
                )
            default:
                return(
                    <IconButton icon='menu' onPress={ () => navigation.openDrawer()}></IconButton>
                );

        }
    }

    const buttonRight = () => {
        return(
            <IconButton icon='magnify' onPress={ () => navigation.navigate('search')}></IconButton>
        )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} options={{title: 'TheMovieApp', headerLeft: () => buttonLeft('home'), headerRight: () => buttonRight()}}></Stack.Screen>
            <Stack.Screen name='movie' component={Movie} options={{headerTransparent:true, title: 'Movie', headerLeft: () => buttonLeft('movie'), headerRight: () => buttonRight()}}></Stack.Screen>
            <Stack.Screen name='news' component={News} options={{title: 'Nuevas películas', headerLeft: () => buttonLeft('news'), headerRight: () => buttonRight()}}></Stack.Screen>
            <Stack.Screen name='popular' component={Popular} options={{title: 'Películas populares', headerLeft: () => buttonLeft('popular'), headerRight: () => buttonRight()}}></Stack.Screen>
            <Stack.Screen name='search' component={Search} options={{title: 'Search', headerLeft: () => buttonLeft('search')}}></Stack.Screen>
        </Stack.Navigator>
    );
}