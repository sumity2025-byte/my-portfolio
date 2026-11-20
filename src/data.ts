export const SITE = {
  name: 'Sumit Yadav',
  email: 'sumity2025@email.iimcal.ac.in',
  phone: '+919728502596',
  phoneLabel: '+91 97285 02596',
  linkedin: 'https://www.linkedin.com/in/sumit-yadav1/',
  resume: '/docs/Strategy-CV.pdf',
  productCv: './docs/Sumit_Yadav_Product.pdf',
}

export const STATS = [
  { n: 2300, suffix: '+', label: 'Dark stores impacted' },
  { n: 100, prefix: '₹', suffix: ' Cr+', label: 'D2C revenue a year' },
  { n: 15, suffix: '+', label: 'Pilots run in stores' },
  { n: 39, suffix: '', label: 'Months in full-time roles' },
]

export type Role = {
  id: string; company: string; title: string; period: string; months: string; points: string[]; key: string; keyLabel: string
}
export const ROLES: Role[] = [
  { id: 'blinkit', company: 'Blinkit', key: '2,300+', keyLabel: 'dark stores', title: 'Generalist | Strategy, Growth & Operations', period: 'May 2025 – Present', months: 'Current role', points: [
    "Led Ops & Product Strategy to digitize 100% of 2,300+ stores via co-designed mapping logic for optimized picking & putaway.",
    "Led field discovery across 50+ stores to diagnose workflow gaps; built mobile/HSD validation gates, cutting errors by >70%.",
    "Reduced inventory variance by 43% across 2,300+ stores by building audit-prioritization logic and an execution dashboard.",
    "Improved SKU placement accuracy by 22% and cut complaints by 23% via 4 diagnostic heatmaps flagging pick-location gaps.",
    "Raised LT-store space utilisation to 1.5x and GMV per sq. ft. by 18% using spatial analytics to redesign racks, shelves and bins.",
    "Cut expiry-related complaints by 76% by designing FEFO batch segregation to address expiry losses flagged as a key P&L drain.",
    "Improved pick-path adherence 43%→92% via pilot-led pick sequencing pan-India; cut PPI by 10% and lifted throughput 7.5%.",
    "Raised replenishment accuracy to 90% by integrating digitized bin capacities with replenishment logic, removing manual inputs.",
    "Led a 10+ member cross-functional team in 15+ pilots; benchmarked KPIs to select and scale winning solutions pan-India.",
  ]},
  { id: 'x-culture', company: 'X-Culture International Consulting Program', key: 'Top 5%', keyLabel: 'peer-rated, of 6,500+', title: 'International Business Consultant', period: 'Aug – Dec 2024', months: '5 mo', points: [
    "Led GTM and market entry for an intl. FMCG client; covered competitive benchmarking, pricing, and product adaptation plan.",
    "Ranked Top 5% on peer evaluations (4.9/5) among 6,500+ global students; rated 5.0/5 on effort, IP, and technical skills.",
    "Ranked Top 9.1% individually among 6,500+ students; consulting report scored 5.2/7, Top 40% of 1,000+ global teams.",
  ]},
  { id: 'accenture', company: 'Accenture Strategy and Consulting', key: '10%', keyLabel: 'potential budget saving', title: 'Strategy Analyst Intern', period: 'May – Jun 2024', months: '2 mo', points: [
    "Scrutinized 5 intl. vendor proposals, leveraging 50+ metrics to curate a structured bid evaluation report for the client.",
    "Designed a should-cost model; identified actionable cost levers across 15+ cost drivers for 10% budget optimization.",
  ]},
  { id: 'shopdeck', company: 'Shopdeck', key: '₹100 Cr+', keyLabel: 'revenue a year', title: 'Assistant Manager – Growth', period: 'Sep 2022 – May 2023', months: '8 mo', points: [
    "Drove INR 100 Cr+/annum for 80+ clients; grew orders 0→3M/year via CTR, CPR, and drop-off funnel optimization.",
    "Boosted profitability of 42 firms (118% inc.) from a portfolio of 80+ D2C clients through persistent growth troubleshooting.",
    "Authored 100-point pre-live checklist and 25-step campaign SOP; standardized go-live for 500+ clients and 80 consultants.",
    "Achieved 92% action compliance – highest in the team – by institutionalizing structured query resolution across 80+ clients.",
    "Scoped 20+ Superset dashboards; cut consultant analysis time by 30% and reduced client escalation meetings by 20/week.",
  ]},
  { id: 'adani', company: 'Adani Enterprises Ltd.', key: '₹235 Cr+', keyLabel: 'capex evaluated', title: 'Senior Engineer', period: 'Jan 2022 – Jul 2022', months: '6 mo', points: [
    "Acted as SPOC for RMHS (INR 180 Cr+) & Steam Dryer (INR 55 Cr+); evaluated proposals from 15+ intl. suppliers.",
    "Synthesized 200+ technical documents from China Nerin & TCE; delivered a bid evaluation report covering 10+ intl. suppliers.",
    "Managed vehicle logistics for 1,000+ employees at Mundra; delivered 25% logistics cost reduction by strategic fleet planning.",
  ]},
  { id: 'ups-lakshmi', company: 'UPS Lakshmi', key: '₹5 Cr', keyLabel: 'in a single month', title: 'Graduate Engineer Trainee – B2B Sales', period: 'Jun 2021 – Jan 2022', months: '7 mo', points: [
    "Served as SPOC for 9+ accounts incl. Honeywell and Boeing; generated highest-ever monthly revenue of INR 5 Cr/mn.",
    "Drove 60% increase in Honeywell sales to INR 80 Lakhs, upholding 95%+ on-time delivery and zero rejections across all orders.",
    "Coordinated procurement for 50+ critical items by analysing a 3-year demand forecast; independently handled 100+ RFQs.",
    "Cut setup time by 67% (12 hrs to 4 hrs) by automating machine & line processes using SMED Lean; saved 200+ man-hours.",
    "Delivered 25% (INR 80 lakh) cost reduction; saved 380+ man-hours by applying six-sigma and lean waste reduction tools.",
  ]},
  { id: 'honda', company: 'Honda Motorcycles India', key: '42 → 0', keyLabel: 'minutes of line stoppage', title: 'Summer Trainee — Process Improvement', period: 'Jan – Jun 2020', months: '6 mo', points: [
    'Investigated mission-case leaks, brought leakage to 0%, and reduced the staffing needed for defect repair by two people per cycle.',
    'Root-cause analysis eliminated line defects related to the leak. Operator fatigue was reported at 0%.',
    'Brought line stoppage from 42 minutes to zero and cut overtime 63%, from 2.4 labour hours to 0.9.',
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
  { school: 'IIM Calcutta', years: '2023–2025', degree: 'MBA, General Management', note: 'PGP · 6.44/9 CGPA.' },
  { school: 'NIT Kurukshetra', years: '2017–2021', degree: 'B.Tech, Mechanical Engineering', note: '8.36/10 CGPA. Scored 9+ in three of eight semesters, including 10/10 in semester six.' },
  { school: 'CBSE Class XII', years: '2016', degree: 'Senior Secondary', note: '87.2%.' },
  { school: 'CBSE Class X', years: '2014', degree: 'Secondary', note: '10/10 CGPA.' },
]
export const ACHIEVE = [
  'School, 2005–2014 · Ranked first among 100+ students for ten years, received the Academic Excellence Award and a ₹10,000 award.',
  'School, 2014 · First among 500+ in the school quiz and second among 1,000+ in the science exhibition, earning ₹5,000 in each.',
  'NIT Kurukshetra, 2017–2018 · First among 20+ national teams in the Junkyard War quadricycle design competition (₹10,000). First among 8+ teams for an energy-conversion contraption (₹10,000), and second among 50+ for a complex-loop roller-coaster prototype (₹6,000).',
  'NDA, 2016–2017 · Placed in the top 1.5% twice and received a call letter for the Indian Navy’s 10+2 B.Tech Cadet Entry.',
  'GATE, 2021 · Ranked AIR 2,070 among 120,000+ in Mechanical Engineering (top 2%) and AIR 2,184 among 22,000+ in Engineering Sciences. Qualified for NTPC’s Engineering Executive Trainee selection.',
  'CAT, 2022 · Scored in the 99.64th percentile among 200,000+ candidates, with 99.83 in Quantitative Ability. Converted 12 of 15 calls including IIMs and IIFT.',
]

export const LIVE_PROJECTS = [
  'Integrated AI and gamification into learning platforms and increased engagement by 35%.',
  'Worked across teams to refine the product and increased customer satisfaction by 30%.',
  'Improved platform scalability and accessibility, increasing diversity in enrolments by 25%.',
  'Reworked pricing and delivery models, increasing stakeholder satisfaction by 25% and revenue by 20%.',
  'Launched a tailored mentorship programme that lifted student engagement by 25% and participation by 40%.',
  'Introduced performance measures that improved career readiness by 35% and stakeholder satisfaction by 20%.',
]

export const DOCS = [
  { label: 'Strategy CV', href: SITE.resume },
  { label: 'CV — Product & Growth', href: './docs/Sumit_Yadav_Product.pdf' },
  { label: 'Shopdeck campaign handbook', href: './docs/Campaign_Handbook__2_.pdf' },
  { label: 'Shopdeck pre-live checklist deck', href: './docs/Pre-Live__PPT_Final__1_.pdf' },
]
export const LOGOS = [
  ['Blinkit','blinkit.svg'],['Accenture','accenture.svg'],['Adani','adani.svg'],['Honda','honda.svg'],['IIM Calcutta','iimc.svg'],
]
