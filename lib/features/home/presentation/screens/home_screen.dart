import 'package:flutter/material.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../shared/widgets/premium_scaffold.dart';
import '../../../../l10n/l10n.dart';

class HomeScreen extends StatelessWidget { const HomeScreen({super.key}); @override Widget build(BuildContext context){final l=AppLocalizations.of(context); return PremiumScaffold(title: l.t('home'),child: ListView(padding: const EdgeInsets.all(16),children: const [GlassCard(child: Text('Upcoming birthdays and contributions')),SizedBox(height: 12),GlassCard(child: Text('Wishlist preview with progress bars'))]));}}
