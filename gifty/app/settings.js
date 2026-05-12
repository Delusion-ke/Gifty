import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import SurfaceCard from '../src/components/SurfaceCard';
import PremiumBanner from '../src/components/PremiumBanner';

import { useSettingsStore } from '../src/store/settingsStore';
import { useAuthStore } from '../src/store/authStore';
import { usePremiumStore } from '../src/store/premiumStore';
import { useTheme } from '../src/theme/useTheme';
import { palette } from '../src/theme/colors';
import { radii, spacing } from '../src/theme/layout';
import { typography } from '../src/theme/typography';

const LANGUAGES = [
  { code: null, label: '🌐 Auto' },
  { code: 'en', label: '🇬🇧 English' },
  { code: 'sk', label: '🇸🇰 Slovenčina' },
  { code: 'cs', label: '🇨🇿 Čeština' },
  { code: 'de', label: '🇩🇪 Deutsch' },
  { code: 'pl', label: '🇵🇱 Polski' },
  { code: 'hu', label: '🇭🇺 Magyar' },
];

const THEMES = [
  { mode: 'system', key: 'themeSystem' },
  { mode: 'light', key: 'themeLight' },
  { mode: 'dark', key: 'themeDark' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const signOut = useAuthStore((s) => s.signOut);
  const isPremium = usePremiumStore((s) => s.isPremium);
  const activatePremiumDev = usePremiumStore((s) => s.activatePremiumDev);

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
        </Pressable>
        <Text style={[typography.title, { color: colors.textPrimary, marginLeft: 8, flex: 1 }]}>
          {t('settings.title')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}>
        {/* Premium banner — skryje sa keď je user premium */}
        {!isPremium && (
          <View style={{ marginBottom: spacing.lg }}>
            <PremiumBanner onUpgrade={activatePremiumDev} />
          </View>
        )}
        <SurfaceCard padding={spacing.md}>
          <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>
            {t('settings.theme')}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: spacing.sm }}>
            {THEMES.map((th, i) => {
              const active = themeMode === th.mode;
              return (
                <Pressable
                  key={th.mode}
                  onPress={() => setThemeMode(th.mode)}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: active ? palette.purple : 'transparent',
                      borderColor: active ? palette.purple : colors.border,
                      marginRight: i < THEMES.length - 1 ? 8 : 0,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: active ? palette.white : colors.textPrimary,
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 13,
                    }}
                  >
                    {t(`settings.${th.key}`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </SurfaceCard>

        <View style={{ height: spacing.md }} />

        {/* Language */}
        <SurfaceCard padding={spacing.md}>
          <Text style={[typography.titleSmall, { color: colors.textPrimary }]}>
            {t('settings.language')}
          </Text>
          <View style={{ marginTop: spacing.xs }}>
            {LANGUAGES.map((l) => {
              const active = l.code === language;
              return (
                <Pressable
                  key={String(l.code)}
                  onPress={() => setLanguage(l.code)}
                  style={styles.langRow}
                >
                  <Text style={[typography.body, { color: colors.textPrimary, flex: 1 }]}>
                    {l.label}
                  </Text>
                  {active && <Ionicons name="checkmark-circle" size={22} color={palette.purple} />}
                </Pressable>
              );
            })}
          </View>
        </SurfaceCard>

        <View style={{ height: spacing.md }} />

        {/* Settings items */}
        <SurfaceCard padding={0}>
          <SettingsItem icon="person-circle-outline" label={t('settings.account')} />
          <Divider color={colors.border} />
          <SettingsItem icon="notifications-outline" label={t('settings.notifications')} />
          <Divider color={colors.border} />
          <SettingsItem icon="lock-closed-outline" label={t('settings.privacy')} />
          <Divider color={colors.border} />
          <SettingsItem icon="document-text-outline" label={t('settings.terms')} />
          <Divider color={colors.border} />
          <SettingsItem icon="information-circle-outline" label={t('settings.about')} />
        </SurfaceCard>

        <View style={{ height: spacing.lg }} />

        <Pressable onPress={handleSignOut}>
          <SurfaceCard padding={spacing.md}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="log-out-outline" size={22} color={palette.error} />
              <Text
                style={{
                  ...typography.titleSmall,
                  color: palette.error,
                  marginLeft: spacing.md,
                }}
              >
                {t('settings.signOut')}
              </Text>
            </View>
          </SurfaceCard>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsItem({ icon, label }) {
  const { colors } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          padding: spacing.md,
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Ionicons name={icon} size={22} color={palette.softLavender} />
      <Text
        style={{
          ...typography.body,
          color: colors.textPrimary,
          marginLeft: spacing.md,
          flex: 1,
        }}
      >
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

function Divider({ color }) {
  return <View style={{ height: 0.5, backgroundColor: color, marginLeft: 52 }} />;
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
