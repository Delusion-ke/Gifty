import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { gradients, radii, shadows, spacing } from '../theme/layout';
import { palette } from '../theme/colors';
import { typography } from '../theme/typography';

export default function GradientButton({
  label,
  onPress,
  icon,
  loading = false,
  disabled = false,
  fullWidth = true,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.outer,
        fullWidth && { alignSelf: 'stretch' },
        pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] },
        disabled && { opacity: 0.5 },
      ]}
    >
      <LinearGradient
        colors={gradients.brand}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color={palette.white} />
        ) : (
          <View style={styles.row}>
            {icon && (
              <Ionicons name={icon} size={20} color={palette.white} style={{ marginRight: 8 }} />
            )}
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    borderRadius: radii.lg,
    ...shadows.glowPurple,
  },
  gradient: {
    borderRadius: radii.lg,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  label: {
    ...typography.titleSmall,
    color: palette.white,
    letterSpacing: 0.2,
  },
});
