import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import GiftyLogo from '../../src/components/GiftyLogo';
import GradientText from '../../src/components/GradientText';
import HeaderIconButton from '../../src/components/HeaderIconButton';
import SectionHeader from '../../src/components/SectionHeader';
import UpcomingCelebrationCard from '../../src/components/UpcomingCelebrationCard';
import WishlistCard from '../../src/components/WishlistCard';
import SurpriseMeCard from '../../src/components/SurpriseMeCard';

import { upcomingCelebrations, wishes } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/useTheme';
import { spacing } from '../../src/theme/layout';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const upcoming = upcomingCelebrations().slice(0, 1);
  const othersWishes = wishes.filter((w) => w.ownerId !== 'u_me');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <GiftyLogo size={28} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <GradientText fontSize={24} fontWeight="800" letterSpacing={-0.5}>
              Gifty
            </GradientText>
          </View>
          <HeaderIconButton icon="search" onPress={() => {}} />
          <HeaderIconButton icon="notifications-outline" onPress={() => {}} />
          <HeaderIconButton icon="add" onPress={() => {}} />
        </View>

        <View style={{ paddingHorizontal: spacing.lg }}>
          <SectionHeader title={t('home.upcoming')} />
          {upcoming[0] && <UpcomingCelebrationCard celebration={upcoming[0]} />}
        </View>

        <View style={{ height: spacing.xl }} />

        <View style={{ paddingHorizontal: spacing.lg }}>
          <SectionHeader
            title={t('home.myWishlist')}
            actionLabel={t('common.viewAll')}
            onAction={() => {}}
          />
          {othersWishes.map((w) => (
            <View key={w.id} style={{ marginBottom: spacing.sm }}>
              <WishlistCard wish={w} />
            </View>
          ))}
        </View>

        <View style={{ paddingHorizontal: spacing.lg, marginTop: spacing.sm }}>
          <SurpriseMeCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
