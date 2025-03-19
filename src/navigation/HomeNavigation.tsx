import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from './HomeNavigation.types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const {Screen, Navigator} = createNativeStackNavigator<HomeStackParamList>();

/**
 * HomeNavigation component
 *
 * This component sets up the navigation stack for the application.
 * It defines the available screens and their navigation options.
 *
 * @returns A JSX element representing the navigation stack.
 */
const HomeNavigation = () => {
  return (
    <Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Screen name="HomeScreen" component={HomeScreen} />
    </Navigator>
  );
};

export default HomeNavigation;
