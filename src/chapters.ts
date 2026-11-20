export const chapterTitles = {
  awards: 'Awards & competitions',
  leadership: 'Positions of responsibility',
  'social-impact': 'Social initiatives',
  'live-projects': 'Live projects',
  certifications: 'Certifications',
  extracurricular: 'Extracurricular activities',
}
export type ChapterId = keyof typeof chapterTitles
export const chapterIds = Object.keys(chapterTitles) as ChapterId[]

export const pageTitles: Record<string, string> = {
  '/': 'Home', '/#about': 'About', '/work': 'Work experience', '/projects': 'Projects',
  '/proof': 'Proof', '/skills': 'Skills', '/education': 'Education', '/contact': 'Contact',
  ...Object.fromEntries(chapterIds.map(id => ['/' + id, chapterTitles[id]])),
}
