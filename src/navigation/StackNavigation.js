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
    const buttonLeft = () => {
        return(
            <IconButton icon='menu' onPress={ () => navigation.openDrawer()}></IconButton>
        )
    }
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} options={{title: 'TheMovieApp', headerLeft: () => buttonLeft()}}></Stack.Screen>
            <Stack.Screen name='movie' component={Movie} options={{title: 'Movie', headerLeft: () => buttonLeft()}}></Stack.Screen>
            <Stack.Screen name='news' component={News} options={{title: 'Nuevas películas', headerLeft: () => buttonLeft()}}></Stack.Screen>
            <Stack.Screen name='popular' component={Popular} options={{title: 'Películas populares', headerLeft: () => buttonLeft()}}></Stack.Screen>
            <Stack.Screen name='search' component={Search} options={{title: 'Search', headerLeft: () => buttonLeft()}}></Stack.Screen>
        </Stack.Navigator>
    );
}