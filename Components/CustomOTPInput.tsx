import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { wp } from '@utils/helper';
import { Colors } from '@models/colors/lightTheme';
import { FontsVariant } from '@models/fonts/font-familes';

interface CustomOTPInputProps {
  otpLength: number;
  onOTPFilled: (otp: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputRowStyle?: StyleProp<ViewStyle>;
}

function CustomOTPInput(props: CustomOTPInputProps) {
  const [otp, setOtp] = useState(Array(props.otpLength).fill(''));
  const inputRefs = useMemo(
    () =>
      Array.from({ length: props.otpLength }, () =>
        React.createRef<TextInput>(),
      ),
    [props.otpLength],
  );

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < props.otpLength - 1) {
      inputRefs[index + 1].current?.focus();
    }

    // Call on every change, regardless of index
    props.onOTPFilled(newOtp.join(''));
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  return (
    <View style={[defaultStyles.container, props.containerStyle]}>
      <View style={[defaultStyles.inputRow, props.inputRowStyle]}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={defaultStyles.input}
            value={digit}
            onChangeText={text =>
              handleChange(text.replace(/[^0-9]/g, ''), index)
            }
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            autoFocus={index === 0}
            selectionColor={Colors.Blue}
          />
        ))}
      </View>
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: { alignItems: 'center' },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    borderWidth: wp(0.5),
    borderColor: Colors.InputBorder,
    backgroundColor: Colors.White,
    elevation: 5,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    padding: 15,
    width: 60,
    fontFamily: FontsVariant.Medium,
    fontSize: 20,
    color: Colors.Blue,
    textAlign: 'center',
    borderRadius: 15,
  },
});

export default CustomOTPInput;
