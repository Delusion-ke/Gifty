import 'package:flutter/widgets.dart';

class AppLocalizations {
  AppLocalizations(this.locale);
  final Locale locale;

  static const supportedLocales = [
    Locale('en'),
    Locale('sk'),
    Locale('cs'),
    Locale('de'),
    Locale('pl'),
    Locale('hu'),
  ];

  static const _strings = <String, Map<String, String>>{
    'en': {'appName': 'Gifty', 'home': 'Home', 'calendar': 'Calendar', 'wishlist': 'Wishlist', 'groups': 'Groups', 'profile': 'Profile', 'notifications': 'Notifications', 'premium': 'Gifty Premium', 'tagline': 'Celebrate together.'},
    'sk': {'appName': 'Gifty', 'home': 'Domov', 'calendar': 'Kalendár', 'wishlist': 'Darčeky', 'groups': 'Skupiny', 'profile': 'Profil', 'notifications': 'Notifikácie', 'premium': 'Gifty Premium', 'tagline': 'Oslavujte spolu.'},
    'cs': {'appName': 'Gifty', 'home': 'Domů', 'calendar': 'Kalendář', 'wishlist': 'Dárky', 'groups': 'Skupiny', 'profile': 'Profil', 'notifications': 'Oznámení', 'premium': 'Gifty Premium', 'tagline': 'Oslavujte spolu.'},
    'de': {'appName': 'Gifty', 'home': 'Start', 'calendar': 'Kalender', 'wishlist': 'Wunschliste', 'groups': 'Gruppen', 'profile': 'Profil', 'notifications': 'Benachrichtigungen', 'premium': 'Gifty Premium', 'tagline': 'Gemeinsam feiern.'},
    'pl': {'appName': 'Gifty', 'home': 'Start', 'calendar': 'Kalendarz', 'wishlist': 'Lista życzeń', 'groups': 'Grupy', 'profile': 'Profil', 'notifications': 'Powiadomienia', 'premium': 'Gifty Premium', 'tagline': 'Świętujcie razem.'},
    'hu': {'appName': 'Gifty', 'home': 'Kezdőlap', 'calendar': 'Naptár', 'wishlist': 'Kívánságlista', 'groups': 'Csoportok', 'profile': 'Profil', 'notifications': 'Értesítések', 'premium': 'Gifty Premium', 'tagline': 'Ünnepeljetek együtt.'},
  };

  String t(String key) => _strings[locale.languageCode]?[key] ?? _strings['en']![key] ?? key;

  static AppLocalizations of(BuildContext context) => Localizations.of<AppLocalizations>(context, AppLocalizations)!;
}

class AppLocalizationsDelegate extends LocalizationsDelegate<AppLocalizations> {
  const AppLocalizationsDelegate();
  @override
  bool isSupported(Locale locale) => AppLocalizations.supportedLocales.map((l) => l.languageCode).contains(locale.languageCode);
  @override
  Future<AppLocalizations> load(Locale locale) async => AppLocalizations(locale);
  @override
  bool shouldReload(covariant LocalizationsDelegate<AppLocalizations> old) => false;
}
