import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { radii, shadows, spacing } from '../theme/layout';

export default function SurfaceCard({
  children,
  onPress,
  padding = spacing.md,
  elevated = false,
  style,
}) {
  const { colors, isDark } = useTheme();
  const bg = elevated ? colors.surfaceElevated : colors.surface;

  const content = (
    <View
      style={[
        {
          backgroundColor: bg,
          borderRadius: radii.lg,
          padding,
          borderWidth: 1,
          borderColor: colors.border,
        },
        !isDark && shadows.soft,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!onPress) return content;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.92 }}>
      {content}
    </Pressable>
  );
}
