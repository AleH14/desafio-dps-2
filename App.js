import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './componentes/homeScreen';
import Formulario from './componentes/formulario';
import EditarCita from './componentes/editarCitas';


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
        <Stack.Screen name="Home">
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
