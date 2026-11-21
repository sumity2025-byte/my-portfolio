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
  { n: 235, prefix: '₹', suffix: ' Cr+', label: 'Capital proposals evaluated' },
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

type CaseVisual =
  | { type: 'warehouse' }
  | { type: 'photo' | 'document'; src: string; alt: string }
  | { type: 'figures'; label: string; items: [string, string][] }

export type Project = {
  tag: string
  discipline: string
  title: string
  body: string
  metrics: [string, string][]
  tone: 'orange' | 'blue' | 'yellow' | 'ink'
  to: string
  visual: CaseVisual
}

export const PROJECTS: Project[] = [
  {
    tag: 'Blinkit', discipline: 'Product discovery', tone: 'orange', to: '/work#blinkit',
    title: 'Which pick list should Blinkit roll out?',
    body: 'After visiting 50+ stores, I piloted a change to the order of items on the pick list. Pickers followed the planned route more often and spent 10% less time per item.',
    metrics: [['43% → 92%', 'Pick-path adherence'], ['+7.5%', 'Throughput'], ['2,300+', 'Stores digitised'], ['−43%', 'Inventory variance']],
    visual: { type: 'warehouse' },
  },
  {
    tag: 'Shopdeck', discipline: 'Growth strategy', tone: 'blue', to: '/work#shopdeck',
    title: 'Finding where merchants lost margin',
    body: 'I traced returns and ad performance across 80+ brands, then gave consultants a decision tree to diagnose each merchant’s drop in profitability.',
    metrics: [['+118%', 'Profitability across 42 brands'], ['₹100 Cr+', 'Annual portfolio revenue'], ['3M', 'Orders per year']],
    visual: { type: 'photo', src: '/docs/WhatsApp_Image_2026-04-14_at_5_21_03_AM.jpeg', alt: 'Handwritten Shopdeck decision tree for diagnosing returns' },
  },
  {
    tag: 'Accenture', discipline: 'Commercial strategy', tone: 'yellow', to: '/work#accenture',
    title: 'What should mine drilling cost?',
    body: 'I compared five international bids and built a bottom-up model for underground drilling. Breaking down the price exposed the cost drivers the client could negotiate.',
    metrics: [['10%', 'Potential budget saving'], ['5', 'Vendor proposals'], ['50+', 'Bid criteria'], ['15+', 'Cost drivers']],
    visual: { type: 'figures', label: 'Building the should-cost model', items: [['5', 'International bids'], ['50+', 'Bid criteria'], ['15+', 'Cost drivers']] },
  },
  {
    tag: 'X-Culture', discipline: 'Market entry', tone: 'blue', to: '/work#x-culture',
    title: 'Taking a consumer brand into a new market',
    body: 'I led market-entry planning for a consumer goods client. Our global team benchmarked competitors, compared pricing and recommended how the product should change for the new market.',
    metrics: [['Top 40%', 'Team report among 1,000+ teams'], ['4.9/5', 'Individual peer rating'], ['5.2/7', 'Team report score']],
    visual: { type: 'document', src: '/work/evidence/x-culture-certificate.webp', alt: 'X-Culture international business consulting certificate for the client expansion project' },
  },
  {
    tag: 'Adani', discipline: 'Capital investment', tone: 'ink', to: '/work#adani',
    title: 'Comparing bids for two plant investments',
    body: 'I evaluated proposals from 15+ international suppliers. I consolidated more than 200 technical documents into a bid report so the team could compare suppliers on a common basis.',
    metrics: [['₹235 Cr+', 'Capital expenditure evaluated'], ['15+', 'International suppliers'], ['200+', 'Technical documents']],
    visual: { type: 'figures', label: 'Capital proposals reviewed', items: [['₹180 Cr+', 'Materials handling'], ['₹55 Cr+', 'Steam dryer']] },
  },
  {
    tag: 'UPS Lakshmi', discipline: 'B2B growth', tone: 'orange', to: '/work#ups-lakshmi',
    title: 'Growing an aerospace account',
    body: 'I managed industrial accounts including Honeywell and Boeing. Honeywell sales reached ₹80 lakh while on-time delivery exceeded 95% and the customer recorded zero rejections.',
    metrics: [['+60%', 'Honeywell sales growth'], ['₹5 Cr', 'Record monthly sales across accounts'], ['9+', 'Accounts managed']],
    visual: { type: 'figures', label: 'Honeywell account performance', items: [['₹80 lakh', 'Sales'], ['95%+', 'On-time delivery'], ['0', 'Rejections']] },
  },
  {
    tag: 'Techspardha', discipline: 'Team leadership', tone: 'yellow', to: '/leadership',
    title: 'Funding ten events on one festival budget',
    body: 'As Mechanical Society secretary, I coordinated five teams and prioritised spending across ten events. We cut expenses by 25% for a festival attended by more than 4,000 people.',
    metrics: [['−25%', 'Festival expenses'], ['100+', 'Society members'], ['4,000+', 'Attendees']],
    visual: { type: 'document', src: '/work/evidence/techspardha-budget.webp', alt: 'Techspardha budget showing event prizes and committee costs' },
  },
]

export const SKILLS = [
  { name: 'Strategy', tone: 'orange' as const, items: ['Issue trees', 'MECE', 'Market sizing', 'Should-cost', 'Benchmarking', 'Scenarios', 'Business cases'] },
  { name: 'Growth', tone: 'blue' as const, items: ['GTM', 'Unit economics', 'Pricing', 'Funnel diagnosis', 'P&L', 'Cohorts', 'LTV/CAC', 'Retention'] },
  { name: 'Product', tone: 'yellow' as const, items: ['Field research', 'Product requirements', 'Prototyping', 'Prioritisation', 'Pilot design', 'Product metrics', 'Rollout decisions'] },
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
