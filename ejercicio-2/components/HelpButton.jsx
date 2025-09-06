import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import DeveloperModal from './DeveloperModal';

const HelpButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const onPressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '15deg'],
  });

  const animatedStyle = {
    transform: [
      { scale: scaleAnim },
      { rotate: rotateInterpolate },
    ],
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1}
        style={styles.helpButtonContainer}
      >
        <Animated.View style={[styles.helpButton, animatedStyle]}>
          <Text style={styles.helpButtonText}>ℹ️</Text>
        </Animated.View>
      </TouchableOpacity>
      
      <DeveloperModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  helpButtonContainer: {
    marginRight: 15,
    padding: 4,
  },
  helpButton: {
    padding: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  helpButtonText: {
    fontSize: 20,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default HelpButton;
