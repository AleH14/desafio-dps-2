import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditarCita = ({ route, navigation, citas, setCitas, guardarCitasStorage }) => {
  const { cita } = route.params;

  const [nombre, setNombre] = useState(cita.nombre);
  const [modelo, setModelo] = useState(cita.modelo);
  const [descripcion, setDescripcion] = useState(cita.descripcion);
  const [fecha, setFecha] = useState(cita.fecha);
  const [hora, setHora] = useState(cita.hora);

  const actualizarCita = () => {
    if (!nombre || !modelo || !fecha || !hora || !descripcion) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }

    const citaActualizada = {
      ...cita,
      nombre,
      modelo,
      descripcion,
      fecha,
      hora,
    };

    const nuevasCitas = citas.map((c) => (c.id === cita.id ? citaActualizada : c));
    setCitas(nuevasCitas);
    guardarCitasStorage(nuevasCitas);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.formulario}>
          <Text style={styles.titulo}>Editar Cita</Text>

          <Text style={styles.label}>Nombre:</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

          <Text style={styles.label}>Modelo:</Text>
          <TextInput style={styles.input} value={modelo} onChangeText={setModelo} />

          <Text style={styles.label}>Fecha:</Text>
          <TextInput style={styles.input} value={fecha} onChangeText={setFecha} />

          <Text style={styles.label}>Hora:</Text>
          <TextInput style={styles.input} value={hora} onChangeText={setHora} />

          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <View style={{ marginTop: 20 }}>
           <TouchableOpacity style={styles.button} onPress={actualizarCita}>
            <Text style={styles.textoBoton}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formulario: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    color: '#444',
    marginTop: 20,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#198D70',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditarCita;