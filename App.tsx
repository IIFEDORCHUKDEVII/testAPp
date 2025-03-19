/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

 
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from './src/navigation/HomeNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/root/config.store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            <HomeNavigation />
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
