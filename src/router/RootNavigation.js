/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTask from '../screens/AddTask';
import RegisterScreen from '../screens/RegisterScreen';
import {SCREEN} from '../utils/routes';
import DetailTask from '../screens/DetailTask';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name={SCREEN.HOME} component={HomeScreen} />
      <Stack.Screen name={SCREEN.ADD_TASK} component={AddTask} />
      <Stack.Screen name={SCREEN.DETAIL_TASK} component={DetailTask} />
      <Stack.Screen name={SCREEN.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
}
