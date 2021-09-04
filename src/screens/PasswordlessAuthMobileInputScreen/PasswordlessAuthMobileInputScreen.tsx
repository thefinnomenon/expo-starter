import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhoneInput from 'react-native-phone-number-input';
import Alert from '@/utilities/alerts';

type RootStackParamList = {
  PasswordlessAuthMobileInput: undefined;
  PasswordlessAuthVerification: { mobile: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordlessAuthMobileInput'> & typeof defaultProps;

const defaultProps = Object.freeze({});
const initialState = Object.freeze({
  value: '',
  formattedValue: '',
});

export default function PasswordlessAuthMobileInputScreen({ navigation }: Props): JSX.Element {
  const phoneInput = useRef<PhoneInput>(null);
  const [formattedValue, setFormattedValue] = useState(initialState.formattedValue);

  const showErrorAlert = (error: string) => Alert('Error', error);

  const handleLogin = async () => {
    if (phoneInput.current?.isValidNumber(formattedValue)) {
      try {
        // TODO: add login call
        navigation.navigate('PasswordlessAuthVerification', { mobile: formattedValue });
      } catch (err: any) {
        showErrorAlert(err.message);
      }
    } else {
      showErrorAlert('Invalid phone number');
    }
  };

  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phoneInput}
        defaultCode="US"
        layout="first"
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        withShadow
        autoFocus
      />
      <View style={styles.spacer} />
      <Pressable style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonTitle}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    height: 24,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

PasswordlessAuthMobileInputScreen.defaultProps = defaultProps;
