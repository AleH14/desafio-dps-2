import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './componentes/homeScreen';
import Formulario from './componentes/formulario';
import EditarCita from './componentes/editarCitas';
import { Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';  

const Stack = createStackNavigator();

export default function App() {
  const [citas, setCitas] = useState([]);
  const [orientation, setOrientation] = useState('portrait');
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  // Cargar citas desde AsyncStorage
  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        const citasParseadas = JSON.parse(citasStorage);

        if (Array.isArray(citasParseadas)) {
          setCitas(citasParseadas);
        } else {
          setCitas([]); // fallback si no es array
        }
      } catch (error) {
        console.log('Error al cargar citas:', error);
        setCitas([]); // fallback en caso de error
      }
    };
    cargarCitas();
  }, []);

  // Gestión global de orientación y dimensiones de pantalla
  useEffect(() => {
    const updateDimensions = (data) => {
      const { window } = data;
      const isLandscape = window.width > window.height;
      setOrientation(isLandscape ? 'landscape' : 'portrait');
      setScreenData(window);
    };
    
    // Establecer orientación inicial
    const initialData = Dimensions.get('window');
    updateDimensions({ window: initialData });
    
    const subscription = Dimensions.addEventListener('change', updateDimensions);
    return () => subscription?.remove();
  }, []);

  // Guardar citas en AsyncStorage
  const guardarCitasStorage = async (nuevasCitas) => {
    try {
      await AsyncStorage.setItem('citas', JSON.stringify(nuevasCitas));
    } catch (error) {
      console.log('Error al guardar citas:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
       <Stack.Screen
          name="Home"
          options={{
            title: 'Punto Motor', 
            headerStyle: {
              backgroundColor: '#808080', // Color de fondo gris
            },
            headerTintColor: '#000000', // Color del texto negro
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
              letterSpacing: 1,
              color: '#000000', // Asegurar que el título sea negro
            },
          }}
>

          {(props) => (
            <HomeScreen
              {...props}
              citas={citas}
              setCitas={setCitas}
              guardarCitasStorage={guardarCitasStorage}
              orientation={orientation}
              screenData={screenData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Formulario">
          {(props) => (
            <Formulario
              {...props}
              citas={citas}
              setCitas={setCitas}
              guardarCitasStorage={guardarCitasStorage}
              orientation={orientation}
              screenData={screenData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="EditarCita">
          {(props) => (
            <EditarCita
              {...props}
              citas={citas}
              setCitas={setCitas}
              guardarCitasStorage={guardarCitasStorage}
              orientation={orientation}
              screenData={screenData}
            />
          )}
        </Stack.Screen>

        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
