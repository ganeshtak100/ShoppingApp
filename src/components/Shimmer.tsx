import React, {useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ShimmerProps {
  width: number | string;
  height: number;
  style?: any;
}

const Shimmer: React.FC<ShimmerProps> = ({width, height, style}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={[
        {width, height, backgroundColor: '#E0E0E0', overflow: 'hidden'},
        style,
      ]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{translateX}],
          },
        ]}>
        <LinearGradient
          colors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 1}}
        />
      </Animated.View>
    </View>
  );
};

export default Shimmer;
