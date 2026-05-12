/**
 * Gifty Affiliate Configuration
 * ─────────────────────────────
 * Heureka SK:  https://www.heureka.sk/publishers/
 * Alza SK:     https://www.alza.sk/affiliate
 *
 * Vyplň svoje IDs sem — nič iné netreba meniť.
 */

export const AFFILIATE_CONFIG = {
  heureka: {
    // Registruj sa na heureka.sk/publishers a sem vlož Publisher ID
    publisherId: 'TVOJE_HEUREKA_ID',
    trackingParam: 'affilid',
    baseUrl: 'https://www.heureka.sk',
    name: 'Heureka.sk',
    icon: 'pricetag-outline',
    color: '#FF6600',
  },
  alza: {
    // Registruj sa na alza.sk/affiliate a sem vlož Affiliate ID
    affiliateId: 'TVOJE_ALZA_ID',
    trackingParam: 'afil',
    baseUrl: 'https://www.alza.sk',
    name: 'Alza.sk',
    icon: 'cart-outline',
    color: '#0078D4',
  },
};

/**
 * Typy affiliate linkov na wish objekte:
 *
 * wish.affiliateLinks = [
 *   {
 *     provider: 'heureka',           // 'heureka' | 'alza'
 *     productUrl: 'https://...',     // čistý link na produkt (bez tracking params)
 *     label: 'PlayStation 5',        // voliteľný label (inak sa použije wish.title)
 *   },
 *   {
 *     provider: 'alza',
 *     productUrl: 'https://...',
 *   }
 * ]
 */

/**
 * Vygeneruje tracking URL pre daný affiliate link.
 * Automaticky pridá publisher/affiliate ID podľa providera.
 */
export function buildAffiliateUrl(affiliateLink) {
  const { provider, productUrl } = affiliateLink;

  if (!productUrl) return null;

  try {
    const url = new URL(productUrl);

    if (provider === 'heureka') {
      const id = AFFILIATE_CONFIG.heureka.publisherId;
      if (!id || id === 'TVOJE_HEUREKA_ID') return productUrl; // fallback bez trackingu
      url.searchParams.set(AFFILIATE_CONFIG.heureka.trackingParam, id);
      return url.toString();
    }

    if (provider === 'alza') {
      const id = AFFILIATE_CONFIG.alza.affiliateId;
      if (!id || id === 'TVOJE_ALZA_ID') return productUrl;
      url.searchParams.set(AFFILIATE_CONFIG.alza.trackingParam, id);
      return url.toString();
    }

    return productUrl;
  } catch {
    return productUrl;
  }
}

/**
 * Vráti config (name, icon, color) pre daný provider.
 */
export function getProviderConfig(provider) {
  return AFFILIATE_CONFIG[provider] ?? null;
}
