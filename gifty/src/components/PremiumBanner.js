import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import GradientButton from './GradientButton';
import { gradients, radii, spacing } from '../theme/layout';
import { palette } from '../theme/colors';
import { typography } from '../theme/typography';

const FEATURES = [
  { icon: 'people-circle-outline', key: 'unlimitedGroups' },
  { icon: 'sparkles-outline', key: 'aiSuggestions' },
  { icon: 'lock-closed-outline', key: 'hiddenWishlist' },
  { icon: 'bar-chart-outline', key: 'analytics' },
];

export default function PremiumBanner({ onUpgrade, compact = false }) {
  const { t } = useTranslation();

  if (compact) {
    return (
      <LinearGradient
        colors={gradients.brand}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.compact}
      >
        <Ionicons name="star" size={18} color={palette.white} />
        <Text style={[typography.label, { color: palette.white, flex: 1, marginLeft: spacing.sm }]}>
          {t('premium.tagline')}
        </Text>
        <GradientButton
          label={t('premium.cta')}
          onPress={onUpgrade}
          fullWidth={false}
        />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={gradients.brand}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* Star badge */}
      <View style={styles.badge}>
        <Ionicons name="star" size={14} color={palette.purple} />
        <Text style={styles.badgeText}>PREMIUM</Text>
      </View>

      <Text style={[typography.h2, { color: palette.white, marginTop: spacing.sm }]}>
        {t('premium.title')}
      </Text>
      <Text style={[typography.bodyMedium, { color: 'rgba(255,255,255,0.85)', marginTop: 4 }]}>
        {t('premium.tagline')}
      </Text>

      {/* Feature list */}
      <View style={{ marginTop: spacing.md }}>
        {FEATURES.map((f) => (
          <View key={f.key} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name={f.icon} size={16} color={palette.purple} />
            </View>
            <Text style={[typography.bodyMedium, { color: palette.white, flex: 1 }]}>
              {t(`premium.feature_${f.key}`)}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: spacing.lg }}>
        <View style={styles.ctaButton}>
          <Ionicons name="star-outline" size={18} color={palette.purple} />
          <Text style={[typography.titleSmall, { color: palette.purple, marginLeft: spacing.xs }]}>
            {t('premium.cta')}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    padding: spacing.lg,
  },
  compact: {
    borderRadius: radii.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: palette.purple,
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    marginLeft: 4,
    letterSpacing: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.white,
    borderRadius: radii.lg,
    height: 54,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
});
