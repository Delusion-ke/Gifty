import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import SurfaceCard from '../../src/components/SurfaceCard';
import SectionHeader from '../../src/components/SectionHeader';
import GradientProgressBar from '../../src/components/GradientProgressBar';

import { getGroup, getPerson, wishes, notifications } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/useTheme';
import { palette } from '../../src/theme/colors';
import { gradients, radii, spacing } from '../../src/theme/layout';
import { typography } from '../../src/theme/typography';

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const group = getGroup(id);
  if (!group) return null;

  const groupGifts = wishes.filter((w) => group.memberIds.includes(w.ownerId));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={[typography.title, { color: colors.textPrimary, marginLeft: 8, flex: 1 }]}>
          {group.name}
        </Text>
        <Ionicons name="ellipsis-horizontal" size={22} color={colors.textPrimary} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
        {/* Hero card */}
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={{ fontSize: 36 }}>{group.emoji}</Text>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={{ ...typography.h2, color: palette.white, fontSize: 22 }}>
              {group.name}
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 2 }}>
              {t('groups.members', { count: group.memberIds.length })}
            </Text>
          </View>
          <Ionicons name="people-circle" size={32} color={palette.white} />
        </LinearGradient>

        <View style={{ height: spacing.lg }} />

        <SectionHeader title={t('groups.gifts')} />
        {groupGifts.map((w) => {
          const owner = getPerson(w.ownerId);
          const progress = w.contributedAmount / w.targetAmount;
          return (
            <View key={w.id} style={{ marginBottom: spacing.xs }}>
              <SurfaceCard padding={spacing.sm}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[typography.titleSmall, { color: colors.textPrimary, flex: 1 }]} numberOfLines={1}>
                    {owner?.name} – {w.title}
                  </Text>
                  <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                    €{w.contributedAmount.toFixed(0)} / €{w.targetAmount.toFixed(0)}
                  </Text>
                </View>
                <View style={{ marginTop: 8 }}>
                  <GradientProgressBar value={progress} />
                </View>
              </SurfaceCard>
            </View>
          );
        })}

        <View style={{ height: spacing.lg }} />

        <SectionHeader title={t('groups.activity')} />
        {notifications.slice(0, 3).map((n) => (
          <View key={n.id} style={{ marginBottom: spacing.xs }}>
            <SurfaceCard
              padding={spacing.sm}
              style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="flash" size={20} color={palette.softLavender} />
                <Text
                  style={[
                    typography.bodyMedium,
                    { color: colors.textPrimary, marginLeft: spacing.md, flex: 1 },
                  ]}
                >
                  {n.title}
                </Text>
              </View>
            </SurfaceCard>
          </View>
        ))}
      </ScrollView>
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
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radii.lg,
  },
});
