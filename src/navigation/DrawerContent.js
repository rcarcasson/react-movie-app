import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer, Switch, TouchableRipple, Text } from 'react-native-paper';
import userPreferences from '../hooks/userPreferences';

export default function DrawerContent(props) {
    const { navigation } = props;
    const [active, setActive] = useState('home');
    const { theme, toogleTheme } = userPreferences();

    const onChangeScreen = (screen) => {
        setActive(screen);
        navigation.navigate(screen);
    };

    return(
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item label='Inicio' active={active === 'home'} onPress={ () => onChangeScreen('home')}></Drawer.Item>
                <Drawer.Item label='Películas Populares' active={active === 'popular'} onPress={ () => onChangeScreen('popular')}></Drawer.Item>
                <Drawer.Item label='Nuevas Películas' active={active === 'news'} onPress={ () => onChangeScreen('news')}></Drawer.Item>
            </Drawer.Section>
            <Drawer.Section title='Opciones'>
                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text>Tema oscuro</Text>
                        <Switch value={theme === 'dark' ? true : false} onValueChange={toogleTheme}></Switch>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preferences: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})