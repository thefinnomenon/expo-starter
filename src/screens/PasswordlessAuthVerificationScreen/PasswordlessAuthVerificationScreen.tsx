import React, { useState, useRef, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator, Platform } from 'react-native';
import Alert from '@/utilities/alerts';
import { passwordlessMobileLoginVerify, resendConfirmationCode } from '@/services/authentication';

const CODE_LENGTH = 6;

type RootStackParamList = {
  PasswordlessAuthVerification: { mobile: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'PasswordlessAuthVerification'>;

const PasswordlessAuthVerificationScreen = ({ route, navigation }: Props): JSX.Element => {
  const { mobile } = route.params;
  const [code, setCode] = useState('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);

  const showAlert = (err: string) => Alert('Verification Error', err);

  const handleResend = async () => {
    if (resendTimeout !== 0) return;
    setResendTimeout(60);

    try {
      await resendConfirmationCode(mobile);
    } catch (e: any) {
      showAlert(e.message);
    }
  };

  const handleChangeNumber = () => navigation.goBack();

  const handleChangeText = (value: string) => {
    setCode(value);
    if (value.length === CODE_LENGTH) verifyCode(value);
  };

  /* Set resend timeout and handle inital focus */
  useEffect(() => {
    const timer = setTimeout(() => {
      setResendTimeout(resendTimeout === 0 ? resendTimeout : resendTimeout - 1);
    }, 1000);
    focusInputField();
    return () => clearTimeout(timer);
  });

  const reset = () => {
    setCode('');
    setIsVerifying(false);
    focusInputField();
  };

  const codeDigitsArray = new Array(CODE_LENGTH).fill(0);

  const ref = useRef<TextInput>(null);

  const focusInputField = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const verifyCode = async (value: string) => {
    setIsVerifying(true);
    try {
      await passwordlessMobileLoginVerify(mobile, value);
    } catch (error: any) {
      showAlert(error);
      reset();
    }
  };

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = ' ';
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    return (
      <View key={idx} style={containerIsFocused && isFocused ? style.inputContainerFocused : style.inputContainer}>
        <Text style={style.inputText}>{digit}</Text>
      </View>
    );
  };

  return isVerifying ? (
    <View style={style.container}>
      <ActivityIndicator size="large" color="#363836" />
    </View>
  ) : (
    <View style={style.container}>
      <Pressable style={style.inputsContainer} onPress={focusInputField}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={value => handleChangeText(value)}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={style.hiddenCodeInput}
      />
      <View style={style.buttonsContainer}>
        <Text style={style.resendText}>
          Need a new code?{' '}
          <Text style={style.clickableText} onPress={() => handleResend()}>
            Press to resend{`${resendTimeout === 0 ? '' : ` in ${resendTimeout}`}`}
          </Text>
        </Text>
        <Text style={style.clickableText} onPress={() => handleChangeNumber()}>
          Press to change number
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    width: '80%',
    maxWidth: 600,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderColor: '#cccccc',
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
  },
  inputContainerFocused: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    padding: 12,
  },
  inputText: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
  },
  hiddenCodeInput: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },
  buttonsContainer: {
    width: '80%',
    maxWidth: 600,
  },
  resendText: {
    paddingTop: 8,
    paddingBottom: 4,
    alignSelf: 'flex-end',
    fontSize: 15,
    color: 'black',
    textAlign: 'right',
  },
  clickableText: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    color: '#0f5181',
    fontSize: 15,
  },
});

export default PasswordlessAuthVerificationScreen;
