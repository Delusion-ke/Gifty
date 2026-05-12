import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import SurfaceCard from './SurfaceCard';
import { useTheme } from '../theme/useTheme';
import { typography } from '../theme/typography';
import { gradients, radii, spacing } from '../theme/layout';
import { palette } from '../theme/colors';

export default function SurpriseMeCard() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SurfaceCard onPress={() => {}} padding={spacing.md}>
      <View style={styles.row}>
        <LinearGradient
          colors={gradients.brandSoft}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconBox}
        >
          <Ionicons name="gift" size={28} color={palette.white} />
        </LinearGradient>
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>
            {t('home.surpriseMe')}
          </Text>
          <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginTop: 2 }]}>
            {t('home.surpriseMeDesc')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={palette.softLavender} />
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
