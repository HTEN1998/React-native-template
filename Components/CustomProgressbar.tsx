import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  Animated,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontsVariant } from '@models/fonts/font-familes';
import { Colors, GradientCoordinates } from '@models/colors/lightTheme';

interface CustomProgressbarProps {
  value: number;
  showLabel?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  barContainerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
}

function CustomProgressbar(props: CustomProgressbarProps) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: props.value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animation, props.value]);

  const widthInterpolated = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[defaultStyles.container, props.containerStyle]}>
      <View style={[defaultStyles.barContainer, props.barContainerStyle]}>
        <Animated.View
          style={[defaultStyles.gradientWrapper, { width: widthInterpolated }]}
        >
          <LinearGradient
            start={GradientCoordinates.progressBarStart}
            end={GradientCoordinates.progressBarEnd}
            colors={Colors.ProgressBar}
            style={[StyleSheet.absoluteFill, defaultStyles.progress]}
          />
        </Animated.View>
      </View>
      {props.showLabel && (
        <Text
          style={[defaultStyles.percentText, props.labelTextStyle]}
        >{`${Math.round(props.value)}%`}</Text>
      )}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.ProgressBarBackground,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientWrapper: {
    height: '100%',
    borderRadius: 10,
  },
  progress: { borderRadius: 10 },
  percentText: {
    fontSize: 14,
    fontFamily: FontsVariant.SemiBold,
    color: Colors.LightBlue,
    marginLeft: 5,
  },
});

export default CustomProgressbar;
