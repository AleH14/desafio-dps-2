import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'react-id-generator';

const Formulario = ({ citas, setCitas, guardarCitasStorage, navigation }) => {
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

  const crearNuevaCita = () => {
    if (!nombre || !modelo || !fecha || !hora || !descripcion) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    if (nombre.trim().length < 3) {
      return Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres');
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

  return (
    <ScrollView style={styles.formulario} keyboardShouldPersistTaps="handled">
      <View style={styles.contenedorCampos}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
          placeholder="Nombre del cliente"
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
  );
};

const styles = StyleSheet.create({
  formulario: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  contenedorCampos: {
    flex: 1,
    paddingVertical: 20,
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
  },
  botonAccion: {
    backgroundColor: '#198D70',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
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

export default Formulario;