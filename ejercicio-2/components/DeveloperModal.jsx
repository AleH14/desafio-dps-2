import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Modal, Dimensions } from 'react-native';

const DeveloperModal = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          { iterations: -1 }
        ),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -Dimensions.get('window').height,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <TouchableOpacity 
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
        
        <Animated.View style={[
          styles.container,
          {
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}>
          {/* Header con animación */}
          <View style={styles.header}>
            <Animated.Text style={[
              styles.headerIcon,
              { transform: [{ rotate: rotateInterpolate }] }
            ]}>
              👨‍💻
            </Animated.Text>
            <Text style={styles.headerTitle}>Desarrolladores</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.infoSection}>
              <Text style={styles.appName}>🍽️ Platillos Típicos</Text>
              <Text style={styles.version}>v1.0.0</Text>
            </View>

            <View style={styles.developersSection}>
              <Text style={styles.sectionTitle}>👥 Equipo de Desarrollo</Text>
              <View style={styles.developerCard}>
                <Text style={styles.developerName}>👤 Alejandro Hernández</Text>
                <Text style={styles.developerRole}>Frontend Developer</Text>
              </View>
              <View style={styles.developerCard}>
                <Text style={styles.developerName}>👤 Wendy Aguilar</Text>
                <Text style={styles.developerRole}>DevOps ☠️</Text>
              </View>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>🎯 Descripción</Text>
              <Text style={styles.description}>
                Una aplicación moderna para explorar la rica gastronomía del mundo, 
                con diseño responsive y experiencia de usuario optimizada.
              </Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>¡Gracias por usar nuestra app! 🇸🇻</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>✨ ¡Genial!</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  developersSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  developerCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  developerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  developerRole: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    color: '#5d6d7e',
    lineHeight: 22,
    textAlign: 'justify',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  footerText: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '600',
  },
  actionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default DeveloperModal;
