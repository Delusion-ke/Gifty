import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import SurfaceCard from './SurfaceCard';
import GradientProgressBar from './GradientProgressBar';
import { useTheme } from '../theme/useTheme';
import { typography } from '../theme/typography';
import { palette } from '../theme/colors';
import { radii, spacing } from '../theme/layout';

export default function WishlistCard({ wish }) {
  const router = useRouter();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const progress = wish.contributedAmount / wish.targetAmount;

  return (
    <SurfaceCard
      onPress={() => router.push(`/gift/${wish.id}`)}
      padding={spacing.sm}
    >
      <View style={styles.row}>
        <View style={[styles.imageWrap, { backgroundColor: colors.surfaceElevated }]}>
          {wish.imageUrl ? (
            <Image
              source={{ uri: wish.imageUrl }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          ) : null}
        </View>
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text style={[typography.titleSmall, { color: colors.textPrimary }]} numberOfLines={1}>
            {wish.title}
          </Text>
          <Text
            style={{
              ...typography.bodyMedium,
              color: palette.softLavender,
              fontWeight: '600',
              marginTop: 2,
            }}
          >
            €{wish.targetAmount.toFixed(0)}
          </Text>
          <Text style={[typography.bodySmall, { color: colors.textSecondary, marginTop: 4 }]}>
            {t('home.contributedBy', { count: wish.contributors })}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <View style={{ flex: 1 }}>
              <GradientProgressBar value={progress} />
            </View>
            <Text
              style={{
                marginLeft: spacing.xs,
                fontSize: 12,
                fontWeight: '700',
                color: colors.textPrimary,
                fontFamily: 'Inter_700Bold',
              }}
            >
              {Math.round(progress * 100)}%
            </Text>
          </View>
        </View>
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  imageWrap: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
});
