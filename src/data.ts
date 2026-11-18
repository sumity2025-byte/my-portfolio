export const SITE = {
  name: 'Sumit Yadav',
  email: 'sumity2025@email.iimcal.ac.in',
  linkedin: 'https://www.linkedin.com/in/sumit-yadav1/',
  resume: './docs/My_Resume.pdf',
  productCv: './docs/Sumit_Yadav_Product.pdf',
}

export const STATS = [
  { n: 2300, suffix: '+', label: 'Dark stores impacted' },
  { n: 100, prefix: '₹', suffix: ' Cr+', label: 'D2C revenue a year' },
  { n: 15, suffix: '+', label: 'Pilots scaled pan-India' },
  { n: 99.64, suffix: '%ile', label: 'CAT', decimals: 2 },
]

export type Role = {
  company: string; title: string; period: string; months: string; points: string[]; key: string; keyLabel: string
}
export const ROLES: Role[] = [
  { company: 'Blinkit · Zomato', key: '2,300+', keyLabel: 'dark stores', title: 'Generalist — Product, Strategy & Operations', period: 'May 2025 – Present', months: '14 mo', points: [
    'Owned product for 2,300+ dark stores; 100% layout digitization and a bin-ID framework adopted chain-wide.',
    'Field discovery across 50+ dark stores; wrote the PRD and designed the digitization flow.',
    'Built a prioritization engine and execution dashboard 0→1; cut inventory variance 43% across the network.',
    'Four diagnostic heatmaps on the spatial engine: placement accuracy +22%, complaints −23%.',
    'Piloted picklist suppression to enforce pick-path adherence: 43% → 92% pan-India, PPI −10%, throughput +7.5%.',
    'Led a 10+ member product, engineering and ops team through 15+ pilots pan-India.',
    'Redesigned LT store layouts with spatial analytics: space utilisation 1.5×, 18% GMV uplift per sq. ft.',
    'FEFO inventory logic with batch segregation for perishables and pharma: expiry complaints down 76%.',
    'Automated storage-to-replenishment flows; replenishment accuracy up to 90%.',
  ]},
  { company: 'Shopdeck', key: '₹100 Cr+', keyLabel: 'revenue a year', title: 'Assistant Manager — Growth', period: 'Sep 2022 – May 2023', months: '8 mo', points: [
    'Drove ₹100 Cr+/yr across 80+ clients; order volume 0 → 3M/yr via CTR, CPR and drop-off funnel work.',
    'Lifted profitability of 42 firms by 118% from a portfolio of 80+ D2C clients.',
    'Shipped 5+ merchant dashboard features (bulk grouping, WhatsApp cart-drop, product coupons).',
    'Scoped 20+ Superset dashboards; cut consultant analysis time 30%, escalation meetings by 20 a week.',
    'Wrote a 100-point pre-live checklist and 25-step campaign SOP used for 500+ go-lives by 80 consultants.',
    '9/10 CSAT and 92% action compliance, highest on the team.',
    'Built diagnostic frameworks for RTO and marketing fluctuations, deployed as an SOP across 80 consultants.',
  ]},
  { company: 'Adani Enterprises', key: '₹235 Cr+', keyLabel: 'capex evaluated', title: 'Senior Engineer', period: 'Jan 2022 – Jul 2022', months: '6 mo', points: [
    'SPOC for RMHS (₹180 Cr+) and Steam Dryer (₹55 Cr+); evaluated proposals from 15+ international suppliers.',
    'Reviewed 200+ technical documents; built a bid-evaluation framework across 10+ suppliers.',
    'Ran vehicle logistics for 1,000+ employees at Mundra; 25% cost reduction through fleet planning.',
  ]},
  { company: 'UPS Lakshmi', key: '₹5 Cr', keyLabel: 'in a single month', title: 'Graduate Engineer Trainee — B2B Sales', period: 'Jun 2021 – Jan 2022', months: '7 mo', points: [
    'SPOC for 9+ accounts incl. Honeywell and Boeing; highest-ever monthly revenue of ₹5 Cr.',
    'Honeywell sales +60% to ₹80 Lakhs with 95%+ on-time delivery and zero quality rejections.',
    'Demand-driven procurement for 50+ critical items on a 3-year forecast; handled 100+ RFQs alone.',
    'Setup time cut 67% (12 → 4 hrs) with SMED; 25% (₹80 lakh) cost reduction via six-sigma and lean.',
  ]},
  { company: 'Accenture', key: '10%', keyLabel: 'budget saved', title: 'Strategy Analyst Intern', period: 'May – Jun 2024', months: '2 mo', points: [
    'Assessed 5 international vendor proposals across 50+ metrics; built the bid-evaluation framework.',
    'Bottom-up should-cost model across 15+ cost drivers: 10% budget savings.',
  ]},
  { company: 'X-Culture', key: 'Top 5%', keyLabel: 'peer-rated, of 6,500+', title: 'International Business Consultant', period: 'Aug – Dec 2024', months: '5 mo', points: [
    'Led GTM and market entry for an international FMCG client; Top 40% of 1,000+ global teams.',
    'Top 9.1% individually and Top 5% on peer evaluations (4.9/5) among 6,500+ students.',
  ]},
]

export const PROJECTS: { tag: string; title: string; body: string; metrics: string[][]; featured?: boolean; tone: 'orange' | 'blue' | 'yellow' | 'ink' }[] = [
  { tone: 'orange', tag: 'Blinkit · 2025', title: 'Dark store digitization across 2,300+ locations',
    body: "End-to-end overhaul of Blinkit's dark store infrastructure: location intelligence, FEFO logic, spatial pick-path optimization and execution dashboards. A fragmented manual system became a digitized operating model.",
    metrics: [['100%','digitized'],['−43%','inventory variance'],['+18%','GMV per sq. ft.'],['1.5×','space utilisation'],['90%','replenishment accuracy']], featured: true },
  { tone: 'blue', tag: 'Shopdeck', title: 'D2C growth engine, 80+ brands', body: 'Inherited 80+ D2C accounts and built the growth system: funnel diagnosis, live dashboards and a standard go-live SOP. 0 → 3M orders a year.', metrics: [['₹100 Cr+','revenue / yr'],['+118%','profitability'],['20+','dashboards']] },
  { tone: 'ink', tag: 'Adani', title: '₹235 Cr+ capex evaluation', body: 'Single point of coordination across 15+ global suppliers and 200+ technical documents, turning a fragmented capex decision into a defensible recommendation.', metrics: [['₹235 Cr+','capex'],['15+','suppliers'],['−25%','logistics cost']] },
  { tone: 'yellow', tag: 'Accenture', title: 'Should-cost for strategic procurement', body: 'Five vendor bids, 50+ metrics. A bottom-up should-cost model replaced gut-feel negotiation with a defensible 10% saving.', metrics: [['10%','saved'],['5','vendors'],['50+','metrics']] },
  { tone: 'blue', tag: 'X-Culture', title: 'Global market entry strategy', body: 'Led a virtual global team through GTM and market entry for an FMCG client: benchmarking, segmentation and pricing.', metrics: [['Top 9.1%','of 6,500+'],['4.9/5','peer rating']] },
  { tone: 'orange', tag: 'UPS Lakshmi', title: 'Aerospace and industrial sales', body: 'Owned 9+ key accounts including Honeywell and Boeing while cutting costs 25% and setup time 67% with lean methods.', metrics: [['₹5 Cr','a month'],['+60%','Honeywell'],['−67%','setup time']] },
]

export const SKILLS = [
  { name: 'Strategy', tone: 'orange' as const, items: ['Issue trees', 'MECE', 'Market sizing', 'Should-cost', 'Benchmarking', 'Scenarios', 'Business cases'] },
  { name: 'Growth', tone: 'blue' as const, items: ['GTM', 'Unit economics', 'Pricing', 'Funnel diagnosis', 'P&L', 'Cohorts', 'LTV/CAC', 'Retention'] },
  { name: 'Operations', tone: 'yellow' as const, items: ['Pilot scaling', 'Cross-functional', 'Spatial analytics', 'Inventory', 'Process design', 'OKR/KPI'] },
]
export const TOOLS = ['Advanced Excel', 'SQL', 'Superset', 'Tableau', 'Asana', 'Figma', 'Google Analytics']
export const CERTS = [
  { title: 'Consulting & strategy', by: 'Alison (CPD) · Oxford Home Study' },
  { title: 'Product management', by: 'Product School · UXCam' },
  { title: 'Business strategy live project', by: 'Skilled Sapiens · MSME certified' },
  { title: 'Product management live project', by: 'Skilled Sapiens · MSME certified' },
]

export const EDU = [
  { school: 'IIM Calcutta', years: '2023–2025', degree: 'MBA', note: 'CGPA 6.44/9. CAT 99.64%ile (QA 99.83). Converted 12 of 15 IIM calls, incl. IIM-C, IIM-A and IIFT.' },
  { school: 'NIT Kurukshetra', years: '2017–2021', degree: 'B.Tech, Mechanical Engineering', note: 'CGPA 8.36/10, 10/10 in Sem 6. Academic Excellence Award. Secretary, Mechanical Society (₹4L+ budget, 4K+ footfall).' },
  { school: 'CBSE', years: '2014 / 2016', degree: 'X: 10/10 CGPA · XII: 87.2%', note: 'Ranked 1st among 1,000+ for 10 years. Head Boy, Student of the Year.' },
]
export const ACHIEVE = ['GATE AIR 2070 of 1.2L+ (ME)','Top 1.5%ile in NDA, twice; Indian Navy B.Tech Cadet Entry selectee','10+ certifications in strategy, consulting and PM at 93%+ average, two from Oxford']

export const DOCS = [
  { label: 'Resume — Strategy & Ops', href: './docs/My_Resume.pdf' },
  { label: 'CV — Product & Growth', href: './docs/Sumit_Yadav_Product.pdf' },
  { label: 'Shopdeck campaign handbook', href: './docs/Campaign_Handbook__2_.pdf' },
  { label: 'Shopdeck pre-live checklist deck', href: './docs/Pre-Live__PPT_Final__1_.pdf' },
]
export const LOGOS = [
  ['Blinkit','blinkit.svg'],['Accenture','accenture.svg'],['Adani','adani.svg'],['Honda','honda.svg'],['IIM Calcutta','iimc.svg'],
]
