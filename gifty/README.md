# Gifty 🎁

**Celebrate together.** — premium aplikácia na narodeniny, meniny, wishlist a spoločné darčekové zbierky.

Postavené v **React Native (Expo SDK 51) + JavaScript + Expo Router + Zustand**.

---

## ✨ Čo apka obsahuje

- 🌗 **Téma:** systémová / svetlá / tmavá (auto detekcia + ručná zmena)
- 🌍 **Jazyky:** EN, SK, CS, DE, PL, HU (predvolená angličtina, auto detekcia systému)
- 🔐 **Auth flow:** onboarding (3 kroky) → login (Apple / Google / Email — mock) → app
- 📅 **Kalendár** s označením narodenín a menín
- 👥 **Ľudia** — uložení priatelia a rodina
- 🎁 **Wishlist** — vlastné aj cudzie priania, progress bar príspevkov
- 💳 **QR príspevok** — SPD QR kód pre platbu na darček
- 👨‍👩‍👧 **Skupiny** — Rodina, Kamaráti, Kolegovia
- 🔔 **Notifikácie**
- 👤 **Profil** s tabs (Wishlist / Contribute / Surprise me)
- ⚙️ **Nastavenia** — téma, jazyk, účet, odhlásenie

Mock dáta sú v `src/data/mockData.js`. Backend (napr. Supabase) sa pripojí neskôr.

---

## 🚀 Rýchly štart vo VS Code

### 1. Nainštaluj Node.js (ak ešte nemáš)

Potrebuješ Node 18+: https://nodejs.org/

Over si verziu:
```bash
node -v
npm -v
```

### 2. Nainštaluj závislosti

V termináli vo VS Code (View → Terminal), v koreňovom priečinku projektu:

```bash
npm install
```

### 3. Spusti aplikáciu

```bash
npx expo start
```

Otvorí sa Expo Dev Server. Máš 3 možnosti, ako si appku pozrieť:

#### A) Najjednoduchšie — telefón (odporúčam na prvý test)
1. Stiahni si **Expo Go** z App Store / Google Play
2. Naskenuj QR kód, ktorý sa zobrazil v termináli
3. Appka sa otvorí v Expo Go

#### B) iOS simulátor (iba macOS)
- V termináli stlač `i` → otvorí sa simulátor

#### C) Android emulátor
- Potrebuješ nainštalovaný Android Studio s emulátorom
- V termináli stlač `a`

---

## 📦 Build pre App Store a Google Play (cez EAS)

Expo má vlastný cloud build service **EAS** — buildy bežia v cloude, nepotrebuješ Mac na iOS build.

### 1. Vytvor si Expo účet
https://expo.dev/signup

### 2. Nainštaluj EAS CLI
```bash
npm install -g eas-cli
eas login
```

### 3. Nakonfiguruj projekt
```bash
eas build:configure
```

(Súbor `eas.json` je už pripravený — vytvorí len `expo` slug na tvojom účte.)

### 4. Build pre Android
```bash
npm run build:android
```
Po skončení dostaneš link na `.aab` súbor — ten nahráš do Google Play Console.

### 5. Build pre iOS
```bash
npm run build:ios
```
Potrebuješ Apple Developer účet ($99/rok). EAS sa postará o certifikáty.

### 6. Submit do storov
```bash
npm run submit:android
npm run submit:ios
```

Detailne: https://docs.expo.dev/build/introduction/

---

## 🔄 OTA Updates (rýchle aktualizácie bez review)

Najväčšia výhoda Expo — po vydaní môžeš pushovať JS zmeny okamžite, bez čakania na schvaľovanie storov:

```bash
eas update --branch production --message "Fix bug XYZ"
```

Užívatelia dostanú update pri ďalšom spustení appky.

---

## 📂 Push do GitHubu z VS Code

### Prvý raz — vytvor repo

1. Choď na https://github.com/new → vytvor prázdny repo s názvom `gifty`
2. Vo VS Code otvor terminál a v koreňovom priečinku:

```bash
git init
git add .
git commit -m "Initial commit: Gifty React Native scaffold"
git branch -M main
git remote add origin https://github.com/TVOJ_USERNAME/gifty.git
git push -u origin main
```

### Ďalšie zmeny

Buď cez VS Code Source Control panel (⌃⇧G), alebo:
```bash
git add .
git commit -m "popis zmeny"
git push
```

---

## 🗂️ Štruktúra projektu

```
gifty/
├── app/                          # Expo Router – file-based routing
│   ├── _layout.js                # Root layout (fonty, téma, navigation)
│   ├── index.js                  # Entry redirect
│   ├── (auth)/                   # Auth flow
│   │   ├── onboarding.js
│   │   └── login.js
│   ├── (tabs)/                   # Bottom navigation
│   │   ├── _layout.js
│   │   ├── calendar.js
│   │   ├── people.js
│   │   ├── home.js               # Centrálny tab "Gifts"
│   │   ├── groups.js
│   │   └── profile.js
│   ├── gift/[id].js              # Detail darčeka
│   ├── qr/[wishId].js            # QR pre platbu
│   ├── group/[id].js             # Detail skupiny
│   ├── notifications.js
│   └── settings.js
├── src/
│   ├── theme/                    # Farby, typografia, spacing, hook
│   ├── components/               # Reusable komponenty
│   ├── store/                    # Zustand stores
│   ├── data/                     # Mock dáta
│   └── i18n/                     # 6 jazykov
├── assets/images/                # Ikony, splash
├── app.json                      # Expo config
├── eas.json                      # EAS build config
└── package.json
```

---

## 🎨 Design system

Centrálne v `src/theme/`:
- **`colors.js`** — paleta + tmavá/svetlá schéma
- **`layout.js`** — spacing, radii, tiene, gradienty
- **`typography.js`** — Inter font scale
- **`useTheme.js`** — hook ktorý vracia farby podľa aktuálneho módu

**Nikdy nehardcoduj farbu ani spacing priamo v komponente** — vždy cez tento systém. Tak meníš dizajn na jednom mieste.

---

## 🔌 Pridanie reálneho backendu (neskôr)

Najjednoduchšia cesta = Supabase:
```bash
npx expo install @supabase/supabase-js
```
Potom v `src/data/` vytvor `supabaseClient.js` a postupne nahrádzaj funkcie z `mockData.js` reálnymi queries.

---

## 📝 Licencia

Súkromný projekt. © 2026
