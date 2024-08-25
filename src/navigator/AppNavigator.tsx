import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import TestScreen from '../screens/TestScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
    </Stack.Navigator>
  );
}
