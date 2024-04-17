import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/router/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import './global.css';

function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
