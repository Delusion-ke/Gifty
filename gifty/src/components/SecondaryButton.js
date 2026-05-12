import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/useTheme';
import { radii, spacing } from '../theme/layout';
import { typography } from '../theme/typography';

export default function SecondaryButton({ label, onPress, icon, fullWidth = true }) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: colors.surfaceElevated,
          borderRadius: radii.lg,
          height: 54,
          paddingHorizontal: spacing.lg,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: colors.border,
        },
        fullWidth && { alignSelf: 'stretch' },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.row}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={colors.textPrimary}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
