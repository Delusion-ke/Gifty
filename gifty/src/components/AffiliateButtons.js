import React from 'react';
import { View, Text, Pressable, Linking, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { buildAffiliateUrl, getProviderConfig } from '../data/affiliateConfig';
import { useTheme } from '../theme/useTheme';
import { radii, shadows, spacing } from '../theme/layout';
import { typography } from '../theme/typography';
import { palette } from '../theme/colors';

/**
 * Renders one "Kúpiť" button per affiliate link.
 * Pass wish.affiliateLinks array — renders a button for each provider.
 */
export default function AffiliateButtons({ affiliateLinks = [], wishTitle }) {
  const { colors } = useTheme();

  if (!affiliateLinks || affiliateLinks.length === 0) return null;

  const handlePress = async (affiliateLink) => {
    const url = buildAffiliateUrl(affiliateLink);
    if (!url) return;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Chyba', 'Odkaz sa nedá otvoriť.');
    }
  };

  return (
    <View style={styles.wrapper}>
      {affiliateLinks.map((link, i) => {
        const config = getProviderConfig(link.provider);
        if (!config) return null;

        return (
          <Pressable
            key={i}
            onPress={() => handlePress(link)}
            style={({ pressed }) => [
              styles.button,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
              pressed && { opacity: 0.82, transform: [{ scale: 0.99 }] },
            ]}
          >
            <View style={[styles.providerBadge, { backgroundColor: config.color + '18' }]}>
              <Ionicons name={config.icon} size={18} color={config.color} />
            </View>

            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text style={[typography.labelSmall, { color: colors.textTertiary }]}>
                KÚPIŤ NA
              </Text>
              <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>
                {config.name}
              </Text>
            </View>

            <View style={styles.ctaBadge}>
              <Text style={styles.ctaText}>
                {link.label ?? wishTitle ?? 'Pozrieť'}
              </Text>
              <Ionicons name="open-outline" size={14} color={palette.white} style={{ marginLeft: 4 }} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.md,
    ...shadows.soft,
  },
  providerBadge: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.purple,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  ctaText: {
    color: palette.white,
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    maxWidth: 90,
  },
});
