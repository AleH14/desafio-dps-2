import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Cards from './components/Cards';
import DetailsScreen from './components/DetailsScreen';
import HelpButton from './components/HelpButton';

const Stack = createStackNavigator();

function MyStack(){
  return(
    <SafeAreaProvider>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 20,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Cards}
        options={{
          title: '🍽️ Platillos Tipicos',
          headerTitleAlign: 'center',
          headerRight: () => <HelpButton />,
        }}
      />
      <Stack.Screen 
        name="Detalles" 
        component={DetailsScreen}
        options={{
          title: '📋 Detalles del Platillo',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
    </SafeAreaProvider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
