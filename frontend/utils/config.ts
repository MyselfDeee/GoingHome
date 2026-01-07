import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Determine backend host based on platform
let BACKEND_HOST = process.env.EXPO_PUBLIC_BACKEND_HOST || 'localhost';

// For native apps (Android/iOS), override with appropriate host
if (Platform.OS !== 'web') {
  // Use 10.0.2.2 for Android emulator, or the machine IP for physical device
  if (Platform.OS === 'android') {
    // Check if running on emulator or device
    const isEmulator = !Constants.isDevice;
    BACKEND_HOST = isEmulator 
      ? process.env.EXPO_PUBLIC_ANDROID_EMULATOR_HOST || '10.0.2.2'
      : process.env.EXPO_PUBLIC_DEVICE_HOST || '192.168.20.75';
  } else if (Platform.OS === 'ios') {
    BACKEND_HOST = process.env.EXPO_PUBLIC_IOS_HOST || '192.168.20.75';
  }
}

const BACKEND_PORT = process.env.EXPO_PUBLIC_BACKEND_PORT || '4000';
export const BACKEND_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}`;

export default {
  BACKEND_URL,
  BACKEND_PORT,
  BACKEND_HOST,
};
