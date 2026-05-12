import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'app_tokens.dart';

class AppTheme {
  static ThemeData dark() {
    final base = FlexThemeData.dark(
      colors: const FlexSchemeColor(primary: AppColors.purple, secondary: AppColors.pink),
      scaffoldBackground: AppColors.deepNavy,
      useMaterial3: true,
      visualDensity: VisualDensity.adaptivePlatformDensity,
    );
    return base.copyWith(
      textTheme: GoogleFonts.interTextTheme(base.textTheme),
      cardTheme: const CardThemeData(
        color: Color(0x22161E36),
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.all(AppRadii.lg)),
      ),
    );
  }
}
