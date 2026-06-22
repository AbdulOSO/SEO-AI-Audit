export interface KeywordDensity {
  word: string;
  count: number;
  density: number;
}

export interface OnPageSEO {
  title: string;
  metaTitle: string;
  metaDescription: string;
  urlStructure: string;
  h1s: string[];
  h2s: string[];
  h3s: string[];
  keywordDensity: KeywordDensity[];
  internalLinks: number;
  externalLinks: number;
  imageAltTextCount: number;
  imageAltMissingCount: number;
  canonicalTag: string;
  schemaMarkupPresent: boolean;
  robotsMeta: string;
}

export interface TechnicalSEO {
  sitemapPresent: boolean;
  robotsTxtPresent: boolean;
  redirectChainCount: number;
  crawlabilityStatus: string;
  indexabilityStatus: string;
  javascriptRenderingScore: number;
  duplicateContentIssues: string[];
}

export interface CoreWebVitals {
  lcp: string;
  cls: string;
  inp: string;
  fcp: string;
  ttfb: string;
}

export interface PageSpeedAnalysis {
  loadTime: number;
  pageSize: number;
  requestsCount: number;
  coreWebVitals: CoreWebVitals;
  suggestions: string[];
}

export interface MobileFriendliness {
  isResponsive: boolean;
  mobileSpeedScore: number;
  touchTargetsStatus: string;
  fontSizeStatus: string;
  uxStatus: string;
  recommendations: string[];
}

export interface ContentQuality {
  count: number;
  readabilityScore: number;
  grammarStatus: string;
  keywordCoverage: string[];
  nlpEntities: string[];
  suggestions: string[];
}

export interface SEORecommendation {
  issue: string;
  priority: "critical" | "high" | "medium" | "low";
  impact: string;
  difficulty: "easy" | "medium" | "hard";
  trafficGain: string;
  fix: string;
}

export interface CompetitorAnalysis {
  name: string;
  score: number;
  domainAuthority: number;
  backlinks: number;
  traffic: string;
  keywordGap: string[];
}

export interface AnchorDistribution {
  anchor: string;
  percentage: number;
}

export interface BacklinkAnalysis {
  total: number;
  referringDomains: number;
  authorityScore: number;
  toxicLinksCount: number;
  followLinksCount: number;
  unfollowLinksCount: number;
  anchorDistribution: AnchorDistribution[];
}

export interface SecurityAudit {
  sslCertified: boolean;
  httpsRedirectCorrect: boolean;
  securityHeadersScore: number;
  mixedContentFound: boolean;
}

export interface AccessibilityAudit {
  wcagStatus: string;
  contrastRatioCorrect: boolean;
  missingAltTags: number;
  keyboardNavigable: boolean;
  errorsList: string[];
}

export interface UXAnalysis {
  navigationScore: number;
  conversionOpportunity: string;
  bounceRiskRate: string;
  mobileUXScore: number;
  improvements: string[];
}

export interface Editorial {
  summary: string;
  targetGainText: string;
}

export interface AuditScores {
  overall: number;
  health: number;
  visibility: number;
  performance: number;
  mobile: number;
  content: number;
  technical: number;
  security: number;
  accessibility: number;
  ux: number;
}

export interface SEOAuditReport {
  url: string;
  timestamp: string;
  scores: AuditScores;
  onPage: OnPageSEO;
  technical: TechnicalSEO;
  speed: PageSpeedAnalysis;
  mobile: MobileFriendliness;
  content: ContentQuality;
  recommendations: SEORecommendation[];
  competitors: CompetitorAnalysis[];
  backlinks: BacklinkAnalysis;
  security: SecurityAudit;
  accessibility: AccessibilityAudit;
  ux: UXAnalysis;
  editorial: Editorial;
  targetCountry?: string;
  targetCity?: string;
}

export interface QuickCheckResult {
  url: string;
  score: number;
  issuesCount: number;
  timestamp: string;
  targetCountry?: string;
  targetCity?: string;
}
