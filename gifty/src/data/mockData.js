// Mock data – swap with real backend (Supabase) later.
const now = new Date();
const addDays = (d) => {
  const x = new Date(now);
  x.setDate(x.getDate() + d);
  return x;
};

export const currentUser = {
  id: 'u_me',
  name: 'You',
  avatarUrl:
    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400',
  birthday: new Date(1995, 5, 14).toISOString(),
  countryCode: 'SK',
};

export const people = [
  {
    id: 'u_marek',
    name: 'Marek',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    birthday: addDays(3).toISOString(),
    age: 28,
    kind: 'birthday',
  },
  {
    id: 'u_alex',
    name: 'Alex',
    avatarUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400',
    birthday: addDays(1).toISOString(),
    age: 29,
    kind: 'birthday',
  },
  {
    id: 'u_zuzka',
    name: 'Zuzka',
    avatarUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    nameDay: addDays(4).toISOString(),
    kind: 'nameDay',
  },
  {
    id: 'u_otec',
    name: 'Otec',
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    birthday: addDays(5).toISOString(),
    age: 55,
    kind: 'birthday',
  },
  {
    id: 'u_eva',
    name: 'Eva',
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    birthday: addDays(12).toISOString(),
    age: 26,
    kind: 'birthday',
  },
];

export const wishes = [
  {
    id: 'w1',
    ownerId: 'u_marek',
    title: 'PlayStation 5',
    targetAmount: 499,
    contributedAmount: 224.55,
    contributors: 7,
    imageUrl:
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600',
    affiliateLinks: [
      {
        provider: 'alza',
        productUrl: 'https://www.alza.sk/sony-playstation-5-d6806958.htm',
        label: 'Kúpiť',
      },
      {
        provider: 'heureka',
        productUrl: 'https://www.heureka.sk/?h[fraze]=playstation+5',
        label: 'Porovnať ceny',
      },
    ],
  },
  {
    id: 'w2',
    ownerId: 'u_marek',
    title: 'Apple Watch Series 9',
    targetAmount: 429,
    contributedAmount: 266,
    contributors: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600',
    affiliateLinks: [
      {
        provider: 'alza',
        productUrl: 'https://www.alza.sk/apple-watch-series-9-d7979224.htm',
        label: 'Kúpiť',
      },
      {
        provider: 'heureka',
        productUrl: 'https://www.heureka.sk/?h[fraze]=apple+watch+series+9',
        label: 'Porovnať ceny',
      },
    ],
  },
  {
    id: 'w3',
    ownerId: 'u_alex',
    title: 'Beats Studio Pro',
    targetAmount: 279,
    contributedAmount: 60,
    contributors: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
    affiliateLinks: [
      {
        provider: 'alza',
        productUrl: 'https://www.alza.sk/beats-studio-pro-d7545455.htm',
        label: 'Kúpiť',
      },
      {
        provider: 'heureka',
        productUrl: 'https://www.heureka.sk/?h[fraze]=beats+studio+pro',
        label: 'Porovnať ceny',
      },
    ],
  },
  {
    id: 'w4',
    ownerId: 'u_zuzka',
    title: 'Wellness víkend',
    targetAmount: 200,
    contributedAmount: 200,
    contributors: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600',
    // Wellness nemá affiliate link — žiadne tlačidlo sa nezobrazí
    affiliateLinks: [],
  },
  {
    id: 'w5',
    ownerId: 'u_me',
    title: 'Poukážka Alza',
    targetAmount: 100,
    contributedAmount: 40,
    contributors: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600',
    affiliateLinks: [
      {
        provider: 'alza',
        productUrl: 'https://www.alza.sk/darčekový-poukaz',
        label: 'Kúpiť poukaz',
      },
    ],
  },
];

export const groups = [
  {
    id: 'g1',
    name: 'Rodina',
    type: 'family',
    emoji: '🏡',
    memberIds: ['u_me', 'u_otec', 'u_zuzka', 'u_marek', 'u_alex', 'u_eva'],
  },
  {
    id: 'g2',
    name: 'Kamaráti',
    type: 'friends',
    emoji: '🎉',
    memberIds: ['u_me', 'u_alex', 'u_marek'],
  },
  {
    id: 'g3',
    name: 'Kolegovia',
    type: 'coworkers',
    emoji: '💼',
    memberIds: ['u_me', 'u_eva'],
  },
];

export const notifications = [
  {
    id: 'n1',
    kind: 'contribution',
    title: 'Janka prispela 25 €',
    subtitle: 'na tvoj darček (PS5)',
    createdAt: now.toISOString(),
  },
  {
    id: 'n2',
    kind: 'contribution',
    title: 'Ocko prispel 50 €',
    subtitle: 'na tvoj darček (PS5)',
    createdAt: addDays(-1).toISOString(),
  },
  {
    id: 'n3',
    kind: 'upcoming',
    title: 'Zuzka má o 3 dni meniny',
    subtitle: 'Nezabudni jej priať',
    createdAt: addDays(-2).toISOString(),
  },
  {
    id: 'n4',
    kind: 'upcoming',
    title: 'Marek má o 5 dní narodeniny',
    subtitle: 'Pozri jeho wishlist',
    createdAt: addDays(-3).toISOString(),
  },
  {
    id: 'n5',
    kind: 'missing',
    title: 'Na darček PS5 chýba už len 261 €',
    subtitle: 'Zdieľaj s priateľmi',
    createdAt: addDays(-3).toISOString(),
  },
];

// Helper: days until next occurrence of a date (ignoring year)
export function daysUntil(isoDate) {
  if (!isoDate) return null;
  const d = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (target < today) target.setFullYear(target.getFullYear() + 1);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

// Helper: list of upcoming celebrations sorted by days
export function upcomingCelebrations() {
  return people
    .map((p) => {
      const date = p.kind === 'birthday' ? p.birthday : p.nameDay;
      return {
        userId: p.id,
        date,
        kind: p.kind,
        daysUntil: daysUntil(date),
        age: p.age,
      };
    })
    .filter((c) => c.daysUntil !== null)
    .sort((a, b) => a.daysUntil - b.daysUntil);
}

export function getPerson(id) {
  if (id === 'u_me') return currentUser;
  return people.find((p) => p.id === id);
}

export function getWish(id) {
  return wishes.find((w) => w.id === id);
}

export function getGroup(id) {
  return groups.find((g) => g.id === id);
}
