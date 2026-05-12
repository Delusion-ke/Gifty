import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../shared/widgets/premium_scaffold.dart';
import '../../../../l10n/l10n.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 1300), () => mounted ? context.go('/onboarding') : null);
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    return PremiumScaffold(
      child: Center(child: Text('${l10n.t('appName')}\n${l10n.t('tagline')}', textAlign: TextAlign.center, style: Theme.of(context).textTheme.headlineMedium)),
    );
  }
}
