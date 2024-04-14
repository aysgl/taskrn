import React from 'react';
import {SafeAreaView, StatusBar, Text, useColorScheme} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = 'bg-neutral-100 dark:bg-slate-900 w-full h-full';

  return (
    <SafeAreaView className={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle}
      />
      <Text className="bg-green-300 p-4 text-green-900 m-10 border border-solid border-green-900 rounded">
        Tailwind CSS in React Native (Nativewind)
      </Text>
    </SafeAreaView>
  );
}

export default App;
