import { SITE } from '../data'

const tracks = [
  {
    title: 'Strategy & consulting', source: '/docs/Consulting-Certifications.pdf',
    courses: [
      ['Diploma in Project Management', 'Alison', 'project-management-diploma', 1],
      ['Certificate in Business Management', 'Oxford Home Study Centre', 'business-management', 2],
      ['Introduction to Strategic Management', 'Alison', 'strategic-management', 3],
      ['Strategic Planning (Short Course)', 'Oxford Home Study Centre', 'strategic-planning', 4],
      ['Basics of Business Consulting', 'Alison', 'business-consulting', 5],
    ],
  },
  {
    title: 'Product management', source: '/docs/Product-Certifications.pdf',
    courses: [
      ['Mobile App Product Management', 'UXCam Academy', 'mobile-product', 2],
      ['Understanding Product Management', 'Alison', 'understanding-product', 3],
      ['Product Management Basics', 'Pendo & Mind the Product', 'pendo-basics', 4],
      ['Product Discovery Micro-Certification', 'Product School', 'product-discovery', 5],
      ['Product Management', 'Great Learning Academy', 'product-great-learning', 6],
      ['Product Management 101: Who is a Product Manager?', 'Simplilearn SkillUp', 'product-simplilearn', 6],
      ['Diploma in Product Management', 'Alison', 'product-diploma', 7],
    ],
  },
] as const

export default function CertificationArchive() {
  return <section className="credential-archive wrap" id="certifications" aria-labelledby="credential-heading">
    <h2 className="display-sm" id="credential-heading">Certifications</h2>
    {tracks.map(track => <section key={track.title} className="credential-track">
      <header><h3>{track.title}</h3><a href={track.source} target="_blank" rel="noreferrer">Full verification PDF ↗</a></header>
      <ul>{track.courses.map(([title,issuer,file,page]) => <li key={file}>
        <a href={track.source + '#page=' + page} target="_blank" rel="noreferrer">
          <img src={'/work/evidence/' + file + '.webp'} alt="" loading="lazy" width="110" height="78" />
          <span><small>{issuer}</small><b>{title}</b></span><i aria-hidden="true">↗</i>
        </a>
      </li>)}</ul>
    </section>)}
    <div className="credential-cvs"><h3>My CVs</h3>
      <a className="btn btn-ghost" href={SITE.resume} target="_blank" rel="noreferrer">Strategy CV (PDF) ↗</a>
      <a className="btn btn-ghost" href={SITE.productCv} target="_blank" rel="noreferrer">Product &amp; growth CV (PDF) ↗</a>
    </div>
  </section>
}
