import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../src/components/ScreenHeader';
import SurfaceCard from '../../src/components/SurfaceCard';

import { groups } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/useTheme';
import { palette } from '../../src/theme/colors';
import { gradients, radii, spacing } from '../../src/theme/layout';
import { typography } from '../../src/theme/typography';

export default function GroupsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScreenHeader title={t('groups.title')} action onAction={() => {}} actionIcon="add" />
      <FlatList
        data={groups}
        keyExtractor={(g) => g.id}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xxl,
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <SurfaceCard
            onPress={() => router.push(`/group/${item.id}`)}
            padding={spacing.md}
          >
            <View style={styles.row}>
              <LinearGradient
                colors={gradients.brandSoft}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emoji}
              >
                <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
              </LinearGradient>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>
                  {item.name}
                </Text>
                <Text style={[typography.bodySmall, { color: colors.textSecondary }]}>
                  {t('groups.members', { count: item.memberIds.length })}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={palette.softLavender} />
            </View>
          </SurfaceCard>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  emoji: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
