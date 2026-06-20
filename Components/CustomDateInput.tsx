import { useEffect, useState } from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Icons } from '@utils/image-paths';
import { formatDate } from '@utils/helper';
import { FontsVariant } from '@models/fonts/font-familes';
import { Colors } from '@models/colors/lightTheme';

interface CustomDropdownProps {
  value: string | null;
  onDateSelect: (data: any) => void;
  containerStyle?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
  showError?: boolean;
  errorMessage?: string | null;
  errorContainer?: StyleProp<ViewStyle>;
}
function CustomDateInput(props: CustomDropdownProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    if (props.value) {
      setSelectedDate(props.value);
    }
  }, [props.value]);

  const handleConfirm = (date: Date) => {
    setSelectedDate(formatDate(date));
    setShowDatePicker(false);
    props.onDateSelect(date);
  };

  return (
    <>
      <TouchableOpacity
        style={[defaultStyles.container, props.containerStyle, props.isDisabled && defaultStyles.disabledContainer]}
        disabled={props.isDisabled}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={defaultStyles.dateInputText}>
          {selectedDate || 'YYYY-MM-DD'}
        </Text>
        <Image source={Icons.CalenderIcon} style={defaultStyles.icon} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setShowDatePicker(false)}
      />
      {props.showError && (
        <View style={[defaultStyles.errorContainer, props.errorContainer]}>
          <Text style={defaultStyles.errorText}>{props.errorMessage}</Text>
        </View>
      )}
    </>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  dateInputText: {
    fontFamily: FontsVariant.Light,
    fontSize: 16,
    color: Colors.Blue,
  },
  icon: { width: 20, height: 20, resizeMode: 'contain' },
  disabledContainer: { opacity: 0.6, elevation: 0 },
  errorContainer: { margin: 5 },
  errorText: {
    fontFamily: FontsVariant.Light,
    fontSize: 14,
    color: Colors.Red,
  },
});

export default CustomDateInput;
