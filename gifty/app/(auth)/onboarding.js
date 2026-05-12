import React, { useRef, useState } from 'react';
import { View, Text, Pressable, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useAuthStore } from '../../src/store/authStore';
import { useTheme } from '../../src/theme/useTheme';
import { typography } from '../../src/theme/typography';
import { gradients, radii, spacing } from '../../src/theme/layout';
import { palette } from '../../src/theme/colors';
import GiftyLogo from '../../src/components/GiftyLogo';
import GradientButton from '../../src/components/GradientButton';

const { width: SCREEN_W } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const pages = [
    { icon: 'calendar', title: t('onboard.title1'), desc: t('onboard.desc1') },
    { icon: 'gift', title: t('onboard.title2'), desc: t('onboard.desc2') },
    { icon: 'lock-closed', title: t('onboard.title3'), desc: t('onboard.desc3') },
  ];

  const onContinue = () => {
    if (index < pages.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      finish();
    }
  };

  const finish = () => {
    completeOnboarding();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Hero gradient backdrop */}
      <LinearGradient
        colors={isDark ? gradients.heroDark : gradients.heroLight}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      {/* Header */}
      <View style={styles.header}>
        <GiftyLogo size={32} />
        <Text style={[typography.title, { color: colors.textPrimary, marginLeft: 10, flex: 1 }]}>
          Gifty
        </Text>
        <Pressable onPress={finish}>
          <Text style={{ color: palette.softLavender, fontFamily: 'Inter_600SemiBold' }}>
            {t('common.skip')}
          </Text>
        </Pressable>
      </View>

      <FlatList
        ref={listRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
          setIndex(i);
        }}
        renderItem={({ item }) => (
          <View style={[styles.page, { width: SCREEN_W }]}>
            <LinearGradient
              colors={gradients.brand}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconBubble}
            >
              <Ionicons name={item.icon} size={80} color={palette.white} />
            </LinearGradient>
            <Text
              style={[
                typography.display,
                {
                  color: colors.textPrimary,
                  textAlign: 'center',
                  marginTop: spacing.xxl,
                  fontSize: 30,
                  lineHeight: 36,
                },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                typography.body,
                {
                  color: colors.textSecondary,
                  textAlign: 'center',
                  marginTop: spacing.md,
                  paddingHorizontal: spacing.md,
                },
              ]}
            >
              {item.desc}
            </Text>
          </View>
        )}
      />

      {/* Page indicators */}
      <View style={styles.indicators}>
        {pages.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: index === i ? 24 : 8,
                backgroundColor:
                  index === i ? palette.purple : palette.softLavender + '4D',
              },
            ]}
          />
        ))}
      </View>

      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
        <GradientButton
          label={index === pages.length - 1 ? t('common.getStarted') : t('common.continue')}
          onPress={onContinue}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  page: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.huge,
  },
  iconBubble: {
    width: 180,
    height: 180,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.purple,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 40,
    elevation: 12,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  dot: {
    height: 8,
    borderRadius: 99,
    marginHorizontal: 4,
  },
});
