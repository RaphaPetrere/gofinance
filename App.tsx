import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';

import { Routes } from './src/routes';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/hooks/auth';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  const { loadingUser } = useAuth();

  if(!fontsLoaded || loadingUser)
  {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}> 
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Passando para tudo o que estiver no provider o tema especifico */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}