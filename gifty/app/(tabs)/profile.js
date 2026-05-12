import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import GradientAvatar from '../../src/components/GradientAvatar';
import SectionHeader from '../../src/components/SectionHeader';
import WishlistCard from '../../src/components/WishlistCard';

import { getPerson, wishes } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/useTheme';
import { palette } from '../../src/theme/colors';
import { gradients, radii, spacing } from '../../src/theme/layout';
import { typography } from '../../src/theme/typography';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useTheme();
  const [tab, setTab] = useState(0);

  // Show Marek as featured profile per mockup
  const person = getPerson('u_marek');
  const myWishes = wishes.filter((w) => w.ownerId === 'u_marek');

  const tabs = [t('profile.wishlist'), t('profile.contribute'), t('profile.surpriseMe')];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={[typography.h1, { color: colors.textPrimary, flex: 1 }]}>
            {t('profile.title')}
          </Text>
          <Pressable onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color={palette.softLavender} />
          </Pressable>
        </View>

        {/* Profile hero */}
        <View style={{ alignItems: 'center', paddingTop: spacing.md, paddingBottom: spacing.md }}>
          <GradientAvatar uri={person.avatarUrl} fallback={person.name} size={112} ring />
          <Text
            style={{
              ...typography.h1,
              color: colors.textPrimary,
              marginTop: spacing.md,
              fontSize: 28,
            }}
          >
            {person.name}
          </Text>
          {person.age && (
            <Text style={[typography.bodyMedium, { color: palette.softLavender, marginTop: 2 }]}>
              {t('common.yearsOld', { count: person.age })}
            </Text>
          )}
        </View>

        {/* Tab pills */}
        <View style={styles.tabs}>
          {tabs.map((label, i) => {
            const active = i === tab;
            const pill = (
              <View style={[styles.pillBase, active && styles.pillActiveShadow]}>
                <Text
                  style={[
                    typography.label,
                    { color: active ? palette.white : palette.softLavender },
                  ]}
                >
                  {label}
                </Text>
              </View>
            );
            return (
              <Pressable
                key={i}
                onPress={() => setTab(i)}
                style={{ flex: 1, marginRight: i === tabs.length - 1 ? 0 : 8 }}
              >
                {active ? (
                  <LinearGradient
                    colors={gradients.brand}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.pillBase, styles.pillActiveShadow]}
                  >
                    <Text style={[typography.label, { color: palette.white }]}>{label}</Text>
                  </LinearGradient>
                ) : (
                  <View
                    style={[
                      styles.pillBase,
                      {
                        backgroundColor: colors.surface,
                        borderWidth: 1,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text style={[typography.label, { color: palette.softLavender }]}>
                      {label}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        <View style={{ height: spacing.lg }} />

        <View style={{ paddingHorizontal: spacing.lg }}>
          <SectionHeader title={t('profile.myWishes')} />
          {myWishes.map((w) => (
            <View key={w.id} style={{ marginBottom: spacing.sm }}>
              <WishlistCard wish={w} />
            </View>
          ))}
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
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
  },
  pillBase: {
    paddingVertical: 10,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActiveShadow: {
    shadowColor: palette.purple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
});
