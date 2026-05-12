import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/useTheme';
import { typography } from '../theme/typography';
import { gradients, spacing } from '../theme/layout';
import { palette } from '../theme/colors';

export default function ScreenHeader({ title, action, onAction, actionIcon = 'add' }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.md,
      }}
    >
      <Text style={[typography.h1, { color: colors.textPrimary, flex: 1 }]}>{title}</Text>
      {action && (
        <Pressable onPress={onAction}>
          <LinearGradient
            colors={gradients.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={actionIcon} size={20} color={palette.white} />
          </LinearGradient>
        </Pressable>
      )}
    </View>
  );
}
