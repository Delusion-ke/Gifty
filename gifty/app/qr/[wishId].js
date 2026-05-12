import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import GradientButton from '../../src/components/GradientButton';
import SurfaceCard from '../../src/components/SurfaceCard';
import GradientText from '../../src/components/GradientText';

import { getWish, getPerson } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/useTheme';
import { palette } from '../../src/theme/colors';
import { radii, spacing } from '../../src/theme/layout';
import { typography } from '../../src/theme/typography';

export default function QrContributionScreen() {
  const { wishId } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const wish = getWish(wishId);
  if (!wish) return null;
  const owner = getPerson(wish.ownerId);

  // SPD (Short Payment Descriptor) format
  const qrPayload = `SPD*1.0*ACC:SK0000000000000000000000*AM:25.00*CC:EUR*MSG:${wish.title}`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={[typography.title, { color: colors.textPrimary, marginLeft: 8, flex: 1 }]}>
          {t('qr.title')}
        </Text>
      </View>

      <View style={{ flex: 1, padding: spacing.lg, alignItems: 'center' }}>
        <View style={{ marginTop: spacing.lg }}>
          <GradientText fontSize={56} fontWeight="800">25 €</GradientText>
        </View>
        <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: 4 }]}>
          {t('qr.amountFor', { name: owner?.name || '' })} • {wish.title}
        </Text>

        <View style={{ height: spacing.xl }} />

        <SurfaceCard padding={spacing.lg} style={{ alignItems: 'center' }}>
          <View style={styles.qrBox}>
            <QRCode value={qrPayload} size={220} color={palette.deepNavy} backgroundColor={palette.white} />
          </View>
          <Text style={[typography.titleSmall, { color: colors.textPrimary, marginTop: spacing.md }]}>
            {t('qr.scanToPay')}
          </Text>
        </SurfaceCard>

        <View style={{ flex: 1 }} />

        <GradientButton label={t('qr.shareCode')} icon="share-outline" onPress={() => {}} />
      </View>
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
  qrBox: {
    backgroundColor: palette.white,
    padding: spacing.md,
    borderRadius: radii.lg,
  },
});
