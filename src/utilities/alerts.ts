import { Alert as NativeAlert, Platform } from 'react-native';

export default function Alert(title: string, message: string, handleClose: () => void = () => {}): void {
  if (Platform.OS === 'web') {
    alert(`${title}: ${message}`);
  } else {
    NativeAlert.alert(title, message, [{ text: 'OK', onPress: () => handleClose() }], { cancelable: false });
  }
}
