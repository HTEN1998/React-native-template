import { JSX, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  defaultValue: string;
  placeholderText: string;
  onChangeInput: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  showLeftIcon?: boolean;
  leftIcon?: JSX.Element;
  leftContainerStyle?: StyleProp<ViewStyle>;
  showRightIcon?: boolean;
  rightIcon?: JSX.Element;
  rightContainerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  showErrorMessage?: boolean;
  errorMessage?: string | null;
  errorMsgContainerStyle?: StyleProp<ViewStyle>;
  errorMsgTextStyle?: StyleProp<TextStyle>;
  onPressRightIcon?: () => void;
}
function CustomTextInput(props: CustomTextInputProps) {
  const inputRef = useRef(null);

  return (
    <>
      <View style={[defaultStyles.container, props.containerStyle]}>
        {props.showLeftIcon ? (
          <View
            style={[defaultStyles.leftIconContainer, props.leftContainerStyle]}
          >
            {props.leftIcon}
          </View>
        ) : null}
        <View style={[defaultStyles.inputContainer, props.inputContainerStyle]}>
          <TextInput
            ref={inputRef}
            onChangeText={props.onChangeInput}
            value={props.defaultValue}
            placeholder={props.placeholderText}
            style={[defaultStyles.inputStyle, props.inputStyle]}
            placeholderTextColor={colors.placeholdertext}
            {...props}
          />
        </View>
        {props.showRightIcon ? (
          <TouchableOpacity
            style={[
              defaultStyles.rightIconContainer,
              props.rightContainerStyle,
            ]}
            disabled={!props.onPressRightIcon}
            onPress={props.onPressRightIcon}
          >
            {props.rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
      {props.showErrorMessage ? (
        <View
          style={[defaultStyles.errorContainer, props.errorMsgContainerStyle]}
        >
          <Text style={[defaultStyles.errorText, props.errorMsgTextStyle]}>
            {props.errorMessage}
          </Text>
        </View>
      ) : null}
    </>
  );
}

const defaultStyles = StyleSheet.create({
  container: { flexDirection: 'row' },
  leftIconContainer: { flex: 1 },
  inputContainer: { width: '100%' },
  inputStyle: { width: '100%' },
  rightIconContainer: { flex: 1 },
  errorContainer: { marginTop: 5 },
  errorText: {
    fontSize: 14,
    // color: Colors.Red,
  },
});

export default CustomTextInput;
