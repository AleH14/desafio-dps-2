import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ citas, navigation, setCitas, orientation, screenData, guardarCitasStorage }) => {
  // Usar safe area insets
  const insets = useSafeAreaInsets();
  
  // Usar la información de orientación y pantalla desde App.js
  const isLandscape = orientation === 'landscape';
  const numColumns = isLandscape ? 2 : 1;
  
  // Calcular el ancho disponible para las columnas
  const screenWidth = screenData ? screenData.width : Dimensions.get('window').width;
  const padding = 20;
  const columnWidth = isLandscape 
    ? (screenWidth - padding * 3) / 2  // Espacio para 2 columnas más padding
    : screenWidth - padding * 2;       // Una columna con padding lateral


  const eliminarCitaPorId = (id) => {
    Alert.alert(
      'Eliminar cita',
      '¿Estás segura de que deseas eliminar esta cita?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const nuevasCitas = citas.filter(cita => cita.id !== id);
            setCitas(nuevasCitas);
            guardarCitasStorage(nuevasCitas);
          },
        },
      ]
    );
  };

  // Validación de campos obligatorios
  const citasValidas = Array.isArray(citas)
    ? citas.filter(
        cita =>
          cita &&
          cita.id &&
          cita.nombre?.trim() &&
          cita.modelo?.trim() &&
          cita.fecha?.trim() &&
          cita.hora?.trim()
      )
    : [];

  // Eliminación de duplicados por ID
  const citasSinDuplicados = citasValidas.filter(
    (cita, index, self) =>
      index === self.findIndex((c) => c.id === cita.id)
  );

  return (
    <SafeAreaView style={styles.contenedor} edges={['top', 'left', 'right']}>
      <View style={styles.listado}>
        <Text style={styles.titulo}>Citas Registradas</Text>

        {citasSinDuplicados.length === 0 ? (
          <Text style={styles.sinCitas}>No hay citas registradas</Text>
        ) : (
          <FlatList
            data={citasSinDuplicados}
            keyExtractor={(item) => item.id}
            key={`${numColumns}-${orientation}`}
            numColumns={numColumns}
            columnWrapperStyle={numColumns > 1 ? styles.filaHorizontal : null}
            contentContainerStyle={{ 
              paddingBottom: Math.max(insets.bottom + 120, 150)
            }}
            extraData={orientation}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.cita,
                  {
                    width: isLandscape ? '48%' : '100%',
                    marginBottom: isLandscape ? 10 : 15,
                  }
                ]}
              >
                <Text style={styles.label}>Cliente: {item.nombre}</Text>
                <Text style={styles.texto}>Modelo: {item.modelo}</Text>
                <Text style={styles.texto}>Fecha: {item.fecha}</Text>
                <Text style={styles.texto}>Hora: {item.hora}</Text>

                <View style={styles.acciones}>
                  <TouchableOpacity
                    style={styles.botonIconoEliminar}
                    onPress={() => eliminarCitaPorId(item.id)}
                  >
                    <Icon name="trash-can-outline" size={22} color="#fff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botonIconoEditar}
                    onPress={() => navigation.navigate('EditarCita', { cita: item })}
                  >
                    <Icon name="pencil-outline" size={22} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Botón flotante */}
      <TouchableOpacity
        style={[
          styles.botonFlotante,
          { bottom: Math.max(insets.bottom + 20, 30) }
        ]}
        onPress={() => navigation.navigate('Formulario')}
      >
        <Text style={styles.textoBoton}>Registrar nueva cita</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  listado: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  sinCitas: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  filaHorizontal: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  cita: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
    fontSize: 16,
  },
  texto: {
    marginBottom: 3,
    color: '#555',
    fontSize: 14,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  botonIconoEliminar: {
    backgroundColor: '#e6716dff',
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  botonIconoEditar: {
    backgroundColor: '#3990ddff',
    padding: 8,
    borderRadius: 20,
  },
  botonFlotante: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#5cb85c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;