import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import SurfaceCard from './SurfaceCard';
import GradientAvatar from './GradientAvatar';
import { useTheme } from '../theme/useTheme';
import { typography } from '../theme/typography';
import { palette } from '../theme/colors';
import { spacing } from '../theme/layout';
import { getPerson } from '../data/mockData';

export default function UpcomingCelebrationCard({ celebration }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const person = getPerson(celebration.userId);
  if (!person) return null;

  const daysLabel = (() => {
    if (celebration.daysUntil === 0) return t('common.today');
    if (celebration.daysUntil === 1) return t('common.tomorrow');
    return t('common.inDays', { count: celebration.daysUntil });
  })();

  return (
    <SurfaceCard padding={spacing.md}>
      <View style={styles.row}>
        <GradientAvatar uri={person.avatarUrl} fallback={person.name} size={56} ring />
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text
            style={{
              ...typography.labelSmall,
              color: palette.softLavender,
              letterSpacing: 1.2,
            }}
          >
            {t('home.upcoming').toUpperCase()}
          </Text>
          <Text style={[typography.title, { color: colors.textPrimary, marginTop: 2 }]}>
            {person.name}
          </Text>
          <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: 2 }]}>
            {daysLabel}
          </Text>
          <Text
            style={{
              ...typography.bodySmall,
              color: palette.softLavender,
              fontWeight: '600',
              marginTop: 2,
            }}
          >
            {format(new Date(celebration.date), 'MMM d')}
          </Text>
        </View>
        <Ionicons name="gift-outline" size={48} color={palette.softLavender} />
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
