import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'react-id-generator';

const Formulario = ({ citas, setCitas, guardarCitasStorage, navigation, orientation, screenData }) => {
  const insets = useSafeAreaInsets();
  
  const [nombre, setNombre] = useState('');
  const [modelo, setModelo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [fechaCompleta, setFechaCompleta] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const confirmarFecha = (date) => {
    setFechaCompleta(date);
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const confirmarHora = (time) => {
    if (time.getHours() < 7 || time.getHours() > 18) {
      Alert.alert('Hora inválida', 'Selecciona una hora entre 7:00 AM y 6:00 PM');
      hideTimePicker();
      return;
    }

    setFechaCompleta((prev) => {
      const nuevaFecha = new Date(prev);
      nuevaFecha.setHours(time.getHours(), time.getMinutes());
      return nuevaFecha;
    });

    const opciones = { hour: '2-digit', minute: '2-digit', hour12: true };
    const horaFormateada = time
      .toLocaleTimeString('es-ES', opciones)
      .replace('a. m.', 'AM')
      .replace('p. m.', 'PM');

    setHora(horaFormateada);
    hideTimePicker();
  };

  // Función para validar y filtrar solo letras y espacios
  const manejarCambioNombre = (texto) => {
    // Expresión regular que permite solo letras (incluyendo acentos) y espacios
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/;
    
    if (soloLetras.test(texto)) {
      setNombre(texto);
    }
  };

  const crearNuevaCita = () => {
    if (!nombre || !modelo || !fecha || !hora || !descripcion) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    if (nombre.trim().length < 3) {
      return Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres');
    }
    
    // Validar que el nombre solo contenga letras y espacios
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!soloLetras.test(nombre.trim())) {
      return Alert.alert('Error', 'El nombre solo puede contener letras y espacios');
    }
    
    if (!fechaCompleta || fechaCompleta <= new Date()) {
      return Alert.alert('Error', 'La fecha y hora deben ser posteriores al momento actual');
    }

    const existe = citas.some(
      (cita) =>
        cita.modelo.toLowerCase() === modelo.toLowerCase() &&
        new Date(cita.fecha + ' ' + cita.hora).getTime() === fechaCompleta.getTime()
    );
    if (existe) return Alert.alert('Error', 'Ya existe una cita con esa fecha y modelo');

    const nuevaCita = {
      id: shortid(),
      nombre,
      modelo,
      descripcion,
      fecha,
      hora,
    };

    const nuevasCitas = [...citas, nuevaCita];
    setCitas(nuevasCitas);
    guardarCitasStorage(nuevasCitas);
    navigation.navigate('Home');
  };

  // Obtener información de orientación
  const isLandscape = orientation === 'landscape';
  const screenWidth = screenData ? screenData.width : Dimensions.get('window').width;
  
  // Calcular estilos dinámicos basados en orientación
  const dynamicStyles = {
    formulario: {
      paddingHorizontal: isLandscape ? screenWidth * 0.15 : 20,
    },
    contenedorCampos: {
      maxWidth: isLandscape ? 600 : '100%',
      alignSelf: 'center',
      width: '100%',
    },
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          style={[styles.formulario, dynamicStyles.formulario]} 
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ 
            paddingBottom: Math.max(insets.bottom + 30, 50) 
          }}
        >
          <View style={[styles.contenedorCampos, dynamicStyles.contenedorCampos]}>
            <Text style={styles.titulo}>Nueva Cita</Text>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              onChangeText={manejarCambioNombre}
              value={nombre}
              placeholder="Solo letras y espacios"
              keyboardType="default"
            />

        <Text style={styles.label}>Modelo:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setModelo}
          value={modelo}
          placeholder="Modelo del vehículo"
        />

        <Text style={styles.label}>Fecha:</Text>
        <TouchableOpacity style={styles.botonDate} onPress={showDatePicker}>
          <Text style={styles.textoBoton}>Seleccionar Fecha</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={confirmarFecha}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <Text style={styles.valor}>{fecha}</Text>

        <Text style={styles.label}>Hora:</Text>
        <TouchableOpacity style={styles.botonDate} onPress={showTimePicker}>
          <Text style={styles.textoBoton}>Seleccionar Hora</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={confirmarHora}
          onCancel={hideTimePicker}
        />
        <Text style={styles.valor}>{hora}</Text>

        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          multiline
          style={[styles.input, { height: 80 }]}
          onChangeText={setDescripcion}
          value={descripcion}
          placeholder="Descripción del servicio"
        />

            <TouchableOpacity style={styles.botonAccion} onPress={crearNuevaCita}>
              <Text style={styles.textoBoton}>Registrar nueva cita</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  formulario: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contenedorCampos: {
    paddingVertical: 20,
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
    color: '#333',
    marginBottom: 6,
    marginTop: 20,
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
  valor: {
    marginTop: 8,
    fontSize: 15,
    color: '#666',
    fontStyle: 'italic',
  },
  botonDate: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  botonAccion: {
    backgroundColor: '#198D70',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
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

export default Formulario;