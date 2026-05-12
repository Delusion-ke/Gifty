import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import GradientButton from '../../src/components/GradientButton';
import SecondaryButton from '../../src/components/SecondaryButton';
import GradientProgressBar from '../../src/components/GradientProgressBar';
import AffiliateButtons from '../../src/components/AffiliateButtons';

import { getWish } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/useTheme';
import { palette } from '../../src/theme/colors';
import { radii, spacing } from '../../src/theme/layout';
import { typography } from '../../src/theme/typography';

export default function GiftDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const wish = getWish(id);
  if (!wish) return null;

  const progress = wish.contributedAmount / wish.targetAmount;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={[typography.title, { color: colors.textPrimary, marginLeft: 8, flex: 1 }]}>
          {wish.title}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
        {wish.imageUrl && (
          <View style={styles.imageWrap}>
            <Image
              source={{ uri: wish.imageUrl }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>
        )}

        <Text style={[typography.h2, { color: colors.textPrimary, marginTop: spacing.lg }]}>
          {wish.title}
        </Text>
        <Text style={[typography.title, { color: palette.softLavender, marginTop: 4 }]}>
          €{wish.contributedAmount.toFixed(2)} / €{wish.targetAmount.toFixed(0)}
        </Text>

        <View style={{ marginTop: spacing.sm }}>
          <GradientProgressBar value={progress} height={10} />
        </View>
        <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          {t('home.contributedBy', { count: wish.contributors })}
        </Text>

        <View style={{ height: spacing.xl }} />

        {/* Affiliate "Kúpiť" tlačidlá */}
        {wish.affiliateLinks?.length > 0 && (
          <View style={{ marginBottom: spacing.lg }}>
            <Text
              style={[
                typography.labelSmall,
                {
                  color: colors.textTertiary,
                  letterSpacing: 1.2,
                  marginBottom: spacing.sm,
                },
              ]}
            >
              KDE KÚPIŤ
            </Text>
            <AffiliateButtons
              affiliateLinks={wish.affiliateLinks}
              wishTitle={wish.title}
            />
          </View>
        )}

        {/* Separator */}
        {wish.affiliateLinks?.length > 0 && (
          <View
            style={{
              height: 1,
              backgroundColor: colors.border,
              marginBottom: spacing.lg,
            }}
          />
        )}

        <GradientButton
          label={t('qr.title')}
          icon="qr-code"
          onPress={() => router.push(`/qr/${wish.id}`)}
        />
        <View style={{ height: spacing.sm }} />
        <SecondaryButton label={t('common.share')} icon="share-outline" onPress={() => {}} />
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
  imageWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
});
