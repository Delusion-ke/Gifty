import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import ScreenHeader from '../../src/components/ScreenHeader';
import SurfaceCard from '../../src/components/SurfaceCard';
import SectionHeader from '../../src/components/SectionHeader';
import GradientAvatar from '../../src/components/GradientAvatar';

import { upcomingCelebrations, getPerson } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/useTheme';
import { palette } from '../../src/theme/colors';
import { spacing, radii } from '../../src/theme/layout';
import { typography } from '../../src/theme/typography';

export default function CalendarScreen() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const [selected, setSelected] = useState(null);

  const celebrations = useMemo(() => upcomingCelebrations(), []);

  // Build marked dates for upcoming celebrations
  const markedDates = useMemo(() => {
    const m = {};
    celebrations.forEach((c) => {
      const d = format(new Date(c.date), 'yyyy-MM-dd');
      m[d] = { marked: true, dotColor: palette.pinkAccent };
    });
    if (selected) {
      m[selected] = {
        ...(m[selected] || {}),
        selected: true,
        selectedColor: palette.purple,
      };
    }
    return m;
  }, [celebrations, selected]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <ScreenHeader title={t('calendar.title')} action onAction={() => {}} actionIcon="add" />

        <View style={{ paddingHorizontal: spacing.lg }}>
          <SurfaceCard padding={spacing.sm}>
            <Calendar
              onDayPress={(d) => setSelected(d.dateString)}
              markedDates={markedDates}
              theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                textSectionTitleColor: colors.textSecondary,
                dayTextColor: colors.textPrimary,
                monthTextColor: colors.textPrimary,
                todayTextColor: palette.purple,
                arrowColor: palette.softLavender,
                selectedDayBackgroundColor: palette.purple,
                selectedDayTextColor: palette.white,
                textDayFontFamily: 'Inter_500Medium',
                textMonthFontFamily: 'Inter_700Bold',
                textDayHeaderFontFamily: 'Inter_600SemiBold',
                textMonthFontSize: 16,
                textDayHeaderFontSize: 12,
              }}
            />
          </SurfaceCard>
        </View>

        <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
          <SectionHeader title={t('calendar.upcomingCelebrations')} />
          {celebrations.slice(0, 8).map((c) => {
            const person = getPerson(c.userId);
            if (!person) return null;
            return (
              <View key={`${c.userId}-${c.date}`} style={{ marginBottom: spacing.xs }}>
                <SurfaceCard
                  padding={spacing.sm}
                  style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
                >
                  <View style={styles.row}>
                    <GradientAvatar uri={person.avatarUrl} fallback={person.name} size={44} />
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>
                          {person.name}
                        </Text>
                        {c.age && (
                          <Text
                            style={[
                              typography.bodySmall,
                              { color: colors.textSecondary, marginLeft: 6 },
                            ]}
                          >
                            ({c.age + 1})
                          </Text>
                        )}
                      </View>
                      <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                        {(c.kind === 'birthday' ? t('calendar.birthday') : t('calendar.nameDay')) +
                          ' • ' +
                          format(new Date(c.date), 'MMM d')}
                      </Text>
                    </View>
                    <Ionicons
                      name={c.kind === 'birthday' ? 'gift-outline' : 'flower-outline'}
                      size={22}
                      color={palette.softLavender}
                    />
                  </View>
                </SurfaceCard>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
