import 'package:flutter/material.dart';

class AppColors {
  static const deepNavy = Color(0xFF0B1020);
  static const purple = Color(0xFF7B61FF);
  static const pink = Color(0xFFFF5EC7);
  static const lavender = Color(0xFFB388FF);
  static const softWhite = Color(0xFFF5F7FB);
}

class AppGradients {
  static const premium = LinearGradient(
    colors: [AppColors.purple, AppColors.pink],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class AppSpacing {
  static const xs = 4.0, sm = 8.0, md = 16.0, lg = 24.0, xl = 32.0;
}

class AppRadii {
  static const md = Radius.circular(16);
  static const lg = Radius.circular(24);
}
