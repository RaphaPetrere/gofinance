import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './src/global/styles/theme';
import { Dashboard } from './src/screens/Dashboard';

export default function App() {
  return (
    <ThemeProvider theme={theme}> 
      {/* Passando para tudo o que estiver no provider o tema especifico */}
      <Dashboard />
    </ThemeProvider>
  );
}