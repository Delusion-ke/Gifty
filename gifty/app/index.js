import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/store/authStore';

export default function Index() {
  const onboardingDone = useAuthStore((s) => s.onboardingDone);
  const signedIn = useAuthStore((s) => s.signedIn);

  if (!onboardingDone) return <Redirect href="/(auth)/onboarding" />;
  if (!signedIn) return <Redirect href="/(auth)/login" />;
  return <Redirect href="/(tabs)/home" />;
}
