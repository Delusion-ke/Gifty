import 'dart:ui';
import 'package:flutter/material.dart';
import '../../core/design_system/app_tokens.dart';

class PremiumScaffold extends StatelessWidget {
  const PremiumScaffold({super.key, required this.child, this.title});
  final Widget child;
  final String? title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: title == null ? null : AppBar(title: Text(title!)),
      body: Stack(children: [
        const DecoratedBox(
          decoration: BoxDecoration(
            color: AppColors.deepNavy,
            gradient: RadialGradient(colors: [Color(0xAA7B61FF), AppColors.deepNavy], center: Alignment.topCenter, radius: 1.1),
          ),
          child: SizedBox.expand(),
        ),
        BackdropFilter(filter: ImageFilter.blur(sigmaX: 0, sigmaY: 0), child: child),
      ]),
    );
  }
}
