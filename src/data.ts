export const SITE = {
  name: 'Sumit Yadav',
  email: 'sumity2025@email.iimcal.ac.in',
  phone: '+919728502596',
  phoneLabel: '+91 97285 02596',
  linkedin: 'https://www.linkedin.com/in/sumit-yadav1/',
  resume: './docs/My_Resume.pdf',
  productCv: './docs/Sumit_Yadav_Product.pdf',
}

export const STATS = [
  { n: 2300, suffix: '+', label: 'Dark stores impacted' },
  { n: 100, prefix: '₹', suffix: ' Cr+', label: 'D2C revenue a year' },
  { n: 15, suffix: '+', label: 'Pilots scaled pan-India' },
  { n: 99.14, suffix: '%ile', label: 'CAT', decimals: 2 },
]

export type Role = {
  id: string; company: string; title: string; period: string; months: string; points: string[]; key: string; keyLabel: string
}
export const ROLES: Role[] = [
  { id: 'blinkit', company: 'Blinkit · Zomato', key: '2,300+', keyLabel: 'dark stores', title: 'Generalist — Product, Strategy & Operations', period: 'May 2025 – Present', months: 'Current role', points: [
    'Led the rollout of digital floor plans and bin IDs across all 2,300+ Blinkit dark stores.',
    'Visited more than 50 stores to see how teams recorded stock locations, then wrote the product requirements and designed the mapping workflow.',
    'Built a tool and dashboard to prioritise inventory discrepancies. Inventory variance fell 43% across the network.',
    'Introduced four store heatmaps to diagnose picking and storage problems. Placement accuracy improved 22% and complaints fell 23%.',
    'Changed when items appeared on the pick list. Adherence to the planned route rose from 43% to 92%, time per item fell 10%, and throughput rose 7.5%.',
    'Led a team of 10+ across product, engineering and operations through more than 15 pilots across India.',
    'Used spatial analysis to redesign LT store layouts, improving space utilisation 1.5× and gross merchandise value per square foot by 18%.',
    'Separated batches so teams could pick the earliest expiry first for perishables and pharmaceuticals. Expiry complaints fell 76%.',
    'Automated the handoff from storage to shelf replenishment, bringing replenishment accuracy to 90%.',
  ]},
  { id: 'x-culture', company: 'X-Culture', key: 'Top 5%', keyLabel: 'peer-rated, of 6,500+', title: 'International Business Consultant', period: 'Aug – Dec 2024', months: '5 mo', points: [
    'Worked across countries and time zones to develop an expansion strategy covering the market, pricing and distribution.',
    'Scored in the top 10% on the Global Virtual Team Aptitude Test.',
    'Led market-entry planning for a consumer goods client. The team’s report ranked in the top 40% of more than 1,000 global teams.',
    'Ranked in the top 9.1% individually and earned a peer rating of 4.9/5, placing in the top 5%.',
  ]},
  { id: 'accenture', company: 'Accenture', key: '10%', keyLabel: 'potential budget saving', title: 'Strategy Analyst Intern', period: '2 Apr – 28 May 2024', months: '2 mo', points: [
    'Compared five international bids for underground mine drilling services across more than 50 criteria.',
    'Ran five or more vendor clarification meetings and reviewed more than 20 proposal documents to refine the scope.',
    'Built a bottom-up cost model for lateral mine development using 15+ cost drivers and identified a potential 10% budget saving.',
  ]},
  { id: 'shopdeck', company: 'Shopdeck', key: '₹100 Cr+', keyLabel: 'revenue a year', title: 'Assistant Manager — Growth', period: 'Sep 2022 – May 2023', months: '8 mo', points: [
    'Grew order volume from zero to 3 million a year across 80+ brands generating over ₹100 crore annually. I tracked where customers dropped out between an ad click and an order.',
    'Improved profitability by 118% for 42 brands in the portfolio.',
    'Shipped five or more merchant dashboard features, including bulk grouping, WhatsApp cart reminders and product coupons.',
    'Defined over 20 Superset dashboards, cutting consultant analysis time by 30% and eliminating 20 escalation meetings a week.',
    'Wrote the 100-point launch checklist and 25-step campaign SOP that 80 consultants used across more than 500 merchant launches.',
    'Raised client satisfaction by 50% to 9/10 and trained more than 50 consultants to use dashboards and run ad campaigns.',
    'Improved how consultants resolved queries. Follow-through on agreed actions reached 92%, ahead of 15 other managers.',
    'Ran pilot advertising campaigns for over 120 clients and earned the highest launch quality score of 9/10.',
    'Mapped the causes of returned shipments and swings in ad performance. Eighty consultants used the resulting diagnostic guide.',
  ]},
  { id: 'adani', company: 'Adani Enterprises', key: '₹235 Cr+', keyLabel: 'capex evaluated', title: 'Senior Engineer', period: 'Jan 2022 – Jul 2022', months: '6 mo', points: [
    'Coordinated procurement for a ₹180 crore materials-handling system and a ₹55 crore steam dryer. Evaluated proposals from more than 15 international suppliers.',
    'Reviewed more than 200 technical documents from China Nerin and TCE and compiled bid evaluations for over 10 international suppliers.',
    'Planned transport for over 1,000 employees at Mundra and cut fleet costs by 25%.',
  ]},
  { id: 'ups-lakshmi', company: 'UPS Lakshmi', key: '₹5 Cr', keyLabel: 'in a single month', title: 'Internal Sales Person — B2B Sales', period: 'Jul 2021 – Jan 2022', months: '7 mo', points: [
    'Managed more than nine industrial accounts, including Honeywell and Boeing, and delivered a record ₹5 crore in monthly revenue.',
    'Grew Honeywell sales by 60% to ₹80 lakh, with over 95% on-time delivery and zero quality rejections.',
    'Used a three-year demand forecast to procure over 50 critical items and independently handled more than 100 requests for quotation.',
    'Worked with three departments on five improvement projects and coordinated 5S on the shop floor.',
    'Used Six Sigma waste reduction tools to save 380+ labour hours and cut costs by 25% (₹80 lakh).',
    'Cut setup time 67%, from 12 hours to four, by refurbishing a machine, automating line processes and using SMED.',
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
  'CAT, 2022 · Scored in the 99.14th percentile among 200,000+ candidates, with 99.83 in Quantitative Ability. Converted 12 of 15 calls including IIMs and IIFT.',
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
  { label: 'Sumit Yadav — Résumé', href: SITE.resume },
  { label: 'CV — Product & Growth', href: './docs/Sumit_Yadav_Product.pdf' },
  { label: 'Shopdeck campaign handbook', href: './docs/Campaign_Handbook__2_.pdf' },
  { label: 'Shopdeck pre-live checklist deck', href: './docs/Pre-Live__PPT_Final__1_.pdf' },
]
export const LOGOS = [
  ['Blinkit','blinkit.svg'],['Accenture','accenture.svg'],['Adani','adani.svg'],['Honda','honda.svg'],['IIM Calcutta','iimc.svg'],
]
