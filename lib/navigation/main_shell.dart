import 'package:flutter/material.dart';
import '../l10n/l10n.dart';
import '../features/home/presentation/screens/home_screen.dart';
import '../features/calendar/presentation/screens/calendar_screen.dart';
import '../features/wishlist/presentation/screens/wishlist_screen.dart';
import '../features/groups/presentation/screens/groups_screen.dart';
import '../features/profile/presentation/screens/profile_screen.dart';

class MainShell extends StatefulWidget {
  const MainShell({super.key});
  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int index = 0;
  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final screens = const [HomeScreen(), CalendarScreen(), WishlistScreen(), GroupsScreen(), ProfileScreen()];
    return Scaffold(
      body: AnimatedSwitcher(duration: const Duration(milliseconds: 300), child: screens[index]),
      bottomNavigationBar: NavigationBar(
        selectedIndex: index,
        onDestinationSelected: (value) => setState(() => index = value),
        destinations: [
          NavigationDestination(icon: const Icon(Icons.home_rounded), label: l10n.t('home')),
          NavigationDestination(icon: const Icon(Icons.calendar_month_rounded), label: l10n.t('calendar')),
          NavigationDestination(icon: const Icon(Icons.card_giftcard_rounded), label: l10n.t('wishlist')),
          NavigationDestination(icon: const Icon(Icons.groups_rounded), label: l10n.t('groups')),
          NavigationDestination(icon: const Icon(Icons.person_rounded), label: l10n.t('profile')),
        ],
      ),
    );
  }
}
