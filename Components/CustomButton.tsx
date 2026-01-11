import { JSX } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { lightTheme } from '../../../Model/Colors/lightTheme';
import { FontsVariant } from '../../../Model/Fonts/FontsVariants';

interface CustomButtonProps {
  onPress: () => void;
  buttonTitle: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isPrimaryBtn: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  loaderContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function CustomButton(props: CustomButtonProps) {
  const btnStyle = props.isPrimaryBtn
    ? defaultStyles.primaryBtn
    : defaultStyles.secondaryBtn;
  const disabledBtnStyle = props.isPrimaryBtn
    ? defaultStyles.disabledPrimaryBtn
    : defaultStyles.disabledSecondaryBtn;
  const btnTextStyle = props.isPrimaryBtn
    ? defaultStyles.primaryBtnText
    : defaultStyles.secondaryBtnText;
  const disabledBtnTextStyle = props.isPrimaryBtn
    ? defaultStyles.disabledPrimaryBtnText
    : defaultStyles.disabledSecondaryBtnText;

  const renderBtnTitle = (): JSX.Element => {
    if (props.isLoading) {
      return (
        <View
          style={[
            defaultStyles.loaderContainerStyle,
            props.loaderContainerStyle,
          ]}
        >
          <ActivityIndicator size={25} color="#FFFFFF" />
        </View>
      );
    } else {
      return (
        <Text
          style={[
            props.isDisabled ? disabledBtnTextStyle : btnTextStyle,
            props.textStyle,
          ]}
        >
          {props.buttonTitle}
        </Text>
      );
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          props.isDisabled ? disabledBtnStyle : btnStyle,
          props.buttonStyle,
        ]}
        disabled={props.isDisabled || props.isLoading || false}
        onPress={props.onPress}
      >
        {renderBtnTitle()}
      </TouchableOpacity>
    </>
  );
}

const defaultStyles = StyleSheet.create({
  loaderContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: lightTheme.buttonPrimaryText,
    textAlign: 'center',
    letterSpacing: 0.4,
    fontFamily: FontsVariant.OutfitMedium,
    fontSize: 16,
  },
  primaryBtn: {
    borderRadius: 10,
    backgroundColor: lightTheme.buttonPrimary,
    padding: 10,
  },
  secondaryBtn: {
    borderRadius: 10,
    backgroundColor: lightTheme.buttonSecondaryBg,
    borderWidth: 1,
    borderColor: lightTheme.buttonSecondaryText,
  },
  disabledPrimaryBtn: {
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  disabledSecondaryBtn: {
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  disabledPrimaryBtnText: {
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 0.4,
    fontFamily: FontsVariant.OutfitMedium,
    fontSize: 16,
  },
  secondaryBtnText: {
    color: '#EDDB12',
    textAlign: 'center',
    letterSpacing: 0.4,
    fontFamily: FontsVariant.OutfitMedium,
    fontSize: 16,
  },
  disabledSecondaryBtnText: {
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 0.4,
    fontFamily: FontsVariant.OutfitMedium,
    fontSize: 16,
  },
});

export default CustomButton;
