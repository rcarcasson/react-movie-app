import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Navigation() {
    return(
        <Drawer.Navigator initialRouteName='app' drawerContent={(props) => <DrawerContent {...props}></DrawerContent>}>
            <Drawer.Screen name='app' component={StackNavigation}></Drawer.Screen>
        </Drawer.Navigator>
    );
}