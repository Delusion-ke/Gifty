import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { format, isToday } from 'date-fns';

import SurfaceCard from '../src/components/SurfaceCard';

import { notifications } from '../src/data/mockData';
import { useTheme } from '../src/theme/useTheme';
import { palette } from '../src/theme/colors';
import { gradients, radii, spacing } from '../src/theme/layout';
import { typography } from '../src/theme/typography';

const KIND_ICON = {
  contribution: 'cash-outline',
  reservation: 'bookmark-outline',
  upcoming: 'calendar-outline',
  missing: 'alert-circle-outline',
};

export default function NotificationsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();

  // Group notifications by today vs older
  const todayItems = notifications.filter((n) => isToday(new Date(n.createdAt)));
  const olderItems = notifications.filter((n) => !isToday(new Date(n.createdAt)));

  const sections = [];
  if (todayItems.length) sections.push({ title: t('notifications.today'), data: todayItems });
  if (olderItems.length) sections.push({ title: t('notifications.older'), data: olderItems });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={[typography.title, { color: colors.textPrimary, marginLeft: 8, flex: 1 }]}>
          {t('notifications.title')}
        </Text>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(s) => s.title}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xxl,
        }}
        renderItem={({ item: section }) => (
          <View style={{ marginBottom: spacing.lg }}>
            <Text
              style={{
                ...typography.labelSmall,
                color: palette.softLavender,
                letterSpacing: 1.2,
                marginVertical: spacing.sm,
              }}
            >
              {section.title.toUpperCase()}
            </Text>
            {section.data.map((n) => (
              <View key={n.id} style={{ marginBottom: spacing.xs }}>
                <SurfaceCard
                  padding={spacing.sm}
                  style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LinearGradient
                      colors={gradients.brandSoft}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.iconBox}
                    >
                      <Ionicons
                        name={KIND_ICON[n.kind] || 'notifications-outline'}
                        size={20}
                        color={palette.white}
                      />
                    </LinearGradient>
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                      <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>
                        {n.title}
                      </Text>
                      <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                        {n.subtitle}
                      </Text>
                    </View>
                    <Text style={[typography.bodySmall, { color: colors.textTertiary }]}>
                      {format(new Date(n.createdAt), 'HH:mm')}
                    </Text>
                  </View>
                </SurfaceCard>
              </View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
