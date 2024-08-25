import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookList from '../screens/BookList';
import FilterScreen from '../screens/FilterScreen';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="BookList" component={BookList} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          contentStyle: {backgroundColor: 'rgba(0,0,0,0.5)'},
        }}>
        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          // options={{title: 'Filter Books'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
