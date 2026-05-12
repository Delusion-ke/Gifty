import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../src/components/ScreenHeader';
import SurfaceCard from '../../src/components/SurfaceCard';
import GradientAvatar from '../../src/components/GradientAvatar';

import { people } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/useTheme';
import { palette } from '../../src/theme/colors';
import { spacing } from '../../src/theme/layout';
import { typography } from '../../src/theme/typography';

export default function PeopleScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScreenHeader title={t('nav.people')} action onAction={() => {}} actionIcon="person-add" />
      <FlatList
        data={people}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xxl,
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.xs }} />}
        renderItem={({ item }) => {
          const dateLabel = item.birthday
            ? `${t('calendar.birthday')} • ${format(new Date(item.birthday), 'MMM d')}`
            : `${t('calendar.nameDay')} • ${format(new Date(item.nameDay), 'MMM d')}`;
          return (
            <SurfaceCard
              onPress={() => {}}
              padding={spacing.sm}
              style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
            >
              <View style={styles.row}>
                <GradientAvatar uri={item.avatarUrl} fallback={item.name} size={48} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>
                    {item.name}
                  </Text>
                  <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                    {dateLabel}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color={palette.softLavender} />
              </View>
            </SurfaceCard>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
