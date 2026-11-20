export const chapterTitles = {
  about: 'About',
  awards: 'Awards & competitions',
  leadership: 'Positions of responsibility',
  'social-impact': 'Social initiatives',
  'non-profit': 'Entrepreneurial & non-profit',
  'live-projects': 'Live projects',
  certifications: 'Certifications',
  extracurricular: 'Extracurricular activities',
}
export type ChapterId = keyof typeof chapterTitles
export const chapterIds = Object.keys(chapterTitles) as ChapterId[]
