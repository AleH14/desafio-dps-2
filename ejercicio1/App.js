import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './componentes/homeScreen';
import Formulario from './componentes/formulario';
import EditarCita from './componentes/editarCitas';
import { Dimensions } from 'react-native';  

const Stack = createStackNavigator();

export default function App() {
  const [citas, setCitas] = useState([]);

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



const [orientation, setOrientation] = useState('portrait');

useEffect(() => {
  const onChange = ({ window }) => {
    const isLandscape = window.width > window.height;
    setOrientation(isLandscape ? 'landscape' : 'portrait');
  };
  const subscription = Dimensions.addEventListener('change', onChange);
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
       <Stack.Screen
          name="Home"
          options={{
            title: 'Punto Motor', 
            headerStyle: {
              backgroundColor: '#198D70', // Color de fondo del encabezado
            },
            headerTintColor: '#fff', // Color del texto y los íconos
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
              letterSpacing: 1,
            },
          }}
>

          {(props) => (
            <HomeScreen
              {...props}
              citas={citas}
              setCitas={setCitas}
              guardarCitasStorage={guardarCitasStorage}
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
          />
        )}
      </Stack.Screen>

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
