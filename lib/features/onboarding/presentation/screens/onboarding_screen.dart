import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../shared/widgets/premium_scaffold.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PremiumScaffold(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(mainAxisAlignment: MainAxisAlignment.end, children: [
          const GlassCard(child: Text('Gifty Premium UX with mock flows and scalable architecture.')),
          const SizedBox(height: 20),
          FilledButton(onPressed: () => context.go('/app'), child: const Text('Continue')),
          const SizedBox(height: 48),
        ]),
      ),
    );
  }
}
