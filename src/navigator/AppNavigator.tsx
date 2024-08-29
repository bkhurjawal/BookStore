import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookList from '../screens/BookList';
import FilterScreen from '../screens/FilterScreen';
import BookDetail from '../screens/BookDetail';
import {navigationConstants} from '../utils/constants';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen
          name={navigationConstants.BookList}
          component={BookList}
        />
        <Stack.Screen
          name={navigationConstants.BookDetail}
          component={BookDetail}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          contentStyle: {backgroundColor: 'rgba(0,0,0,0.5)'},
        }}>
        <Stack.Screen
          name={navigationConstants.Filter}
          component={FilterScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
