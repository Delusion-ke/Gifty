import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { typography } from '../theme/typography';
import { palette } from '../theme/colors';

export default function SectionHeader({ title, actionLabel, onAction }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
        paddingTop: 4,
      }}
    >
      <Text style={[typography.title, { color: colors.textPrimary, flex: 1 }]}>{title}</Text>
      {actionLabel && (
        <Pressable onPress={onAction}>
          <Text
            style={{
              color: palette.softLavender,
              fontWeight: '600',
              fontSize: 14,
              fontFamily: 'Inter_600SemiBold',
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
