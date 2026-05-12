import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '../../src/store/authStore';
import { useTheme } from '../../src/theme/useTheme';
import { typography } from '../../src/theme/typography';
import { gradients, spacing } from '../../src/theme/layout';
import { palette } from '../../src/theme/colors';
import GiftyLogo from '../../src/components/GiftyLogo';
import GradientButton from '../../src/components/GradientButton';
import SecondaryButton from '../../src/components/SecondaryButton';
import GradientText from '../../src/components/GradientText';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const signIn = useAuthStore((s) => s.signIn);

  const handleSignIn = () => {
    signIn();
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <LinearGradient
        colors={isDark ? gradients.heroDark : gradients.heroLight}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      <View style={{ flex: 1, paddingHorizontal: spacing.xl }}>
        <View style={{ alignItems: 'center', marginTop: spacing.huge }}>
          <GiftyLogo size={96} />
          <View style={{ marginTop: spacing.lg }}>
            <GradientText fontSize={44} fontWeight="800">Gifty</GradientText>
          </View>
          <Text style={[typography.body, { color: isDark ? palette.softLavender : palette.purple, marginTop: spacing.xs }]}>
            {t('tagline')}
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <GradientButton label={t('auth.apple')} icon="logo-apple" onPress={handleSignIn} />
        <View style={{ height: spacing.sm }} />
        <SecondaryButton label={t('auth.google')} icon="logo-google" onPress={handleSignIn} />
        <View style={{ height: spacing.sm }} />
        <SecondaryButton label={t('auth.email')} icon="mail-outline" onPress={handleSignIn} />

        <Text
          style={[
            typography.bodySmall,
            {
              color: colors.textTertiary,
              textAlign: 'center',
              marginTop: spacing.xl,
              marginBottom: spacing.lg,
            },
          ]}
        >
          {t('auth.terms')}
        </Text>
      </View>
    </SafeAreaView>
  );
}
