import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import { Icons } from '@utils/image-paths';
import { FontsVariant } from '@models/fonts/font-familes';
import { Colors } from '@models/colors/lightTheme';

interface option {
  key: string; // unique for each option (used for selection logic)
  value: string; // actual value sent to backend/state when selected
  label?: string; // translated text shown to user
}

type CustomCheckBoxProps = {
  options: option[];
  selected: string[];
  onChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  radioRowStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

function CustomCheckBoxGroup(props: CustomCheckBoxProps) {
  return (
    <View style={[defaultStyles.container, props.containerStyle]}>
      {props.options.map(option => {
        const isSelected = props.selected.includes(option.value);

        return (
          <TouchableOpacity
            key={option.key}
            style={[defaultStyles.radioRow, props.radioRowStyle]}
            onPress={() => props.onChange(option.value)}
          >
            <View
              style={[defaultStyles.iconContainer, props.iconContainerStyle]}
            >
              <Image
                source={
                  isSelected ? Icons.ActiveChecboxIcon : Icons.ChecboxIcon
                }
                style={defaultStyles.icon}
              />
            </View>
            <Text style={[defaultStyles.label, props.labelStyle]}>
              {option.label || option.key}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: { flexDirection: 'column' },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: { marginRight: 10 },
  icon: { width: 25, height: 25, resizeMode: 'contain' },
  label: {
    fontFamily: FontsVariant.Regular,
    fontSize: 16,
    color: Colors.Blue,
  },
});

export default CustomCheckBoxGroup;
