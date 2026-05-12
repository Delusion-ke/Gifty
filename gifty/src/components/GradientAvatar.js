import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../theme/layout';
import { useTheme } from '../theme/useTheme';
import { palette } from '../theme/colors';

export default function GradientAvatar({ uri, fallback, size = 48, ring = false }) {
  const { colors } = useTheme();

  const inner = (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        backgroundColor: colors.surfaceElevated,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
      ) : (
        <Text style={{ color: palette.white, fontWeight: '700', fontSize: size * 0.4 }}>
          {(fallback || '?').slice(0, 1).toUpperCase()}
        </Text>
      )}
    </View>
  );

  if (!ring) return inner;

  return (
    <LinearGradient
      colors={gradients.brand}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: size + 6,
        height: size + 6,
        borderRadius: (size + 6) / 2,
        padding: 2.5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size + 2,
          height: size + 2,
          borderRadius: (size + 2) / 2,
          backgroundColor: colors.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {inner}
      </View>
    </LinearGradient>
  );
}
