import React, { useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider, DarkTheme as DarkThemePaper, DefaultTheme as DefaultThemePaper } from 'react-native-paper';
import { NavigationContainer, DarkTheme as DarkThemeNavigation, DefaultTheme as DefaultThemeNavigation } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';

export default function App() {
  const [theme, setTheme] = useState('dark');

  DefaultThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.accent = '#1ae1f2';

  DarkThemeNavigation.colors.background = '#192734';
  DarkThemeNavigation.colors.card = '#15212b';

  const toogleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const preference = useMemo( 
    () => ({
      toogleTheme,
      theme
    }),
    [theme]
  );
  return(
    <PreferencesContext.Provider value={preference}>
      <PaperProvider theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}></StatusBar>
        <NavigationContainer theme={theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation}>
          <Navigation></Navigation>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  )
}