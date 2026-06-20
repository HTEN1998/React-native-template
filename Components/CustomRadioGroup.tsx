import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FontsVariant } from '@models/fonts/font-familes';
import { Colors } from '@models/colors/lightTheme';

interface option {
  key: string; // unique for each option (used for selection logic)
  value: string; // actual value sent to backend/state when selected
  label?: string; // translated text shown to user
}

type RadioProps = {
  options: option[];
  selected: string | null;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  radioRowStyle?: StyleProp<ViewStyle>;
  outerCircleStyle?: StyleProp<ViewStyle>;
  innerCircleStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

function CustomRadioGroup(props: RadioProps) {
  return (
    <View style={[defaultStyles.container, props.containerStyle, props.isDisabled && defaultStyles.disabledContainer]}>
      {props.options.map(option => (
        <TouchableOpacity
          key={option.key}
          style={[defaultStyles.radioRow, props.radioRowStyle]}
          disabled={props.isDisabled}
          onPress={() => props.onChange(option.value)}
        >
          <View style={[defaultStyles.outerCircle, props.outerCircleStyle]}>
            {props.selected === option.value && (
              <View
                style={[defaultStyles.innerCircle, props.innerCircleStyle]}
              />
            )}
          </View>
          <Text style={[defaultStyles.label, props.labelStyle]}>
            {option.label || option.key}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: { flexDirection: 'column' },
  disabledContainer: { opacity: 0.6 },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: Colors.Voilet,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: Colors.Voilet,
  },
  label: {
    fontFamily: FontsVariant.Regular,
    fontSize: 16,
    color: Colors.Blue,
  },
});

export default CustomRadioGroup;
