import { DOCS, SITE, STATS } from '../data'
import FeaturedCases from '../components/FeaturedCases'
import AboutStory from '../components/AboutStory'
import { PAGES } from '../components/Chrome'
import WorkFilm from '../components/WorkFilm'
import { MarqueeMenu, WeightHover } from '../fx/Hover'
import { MaskCursor } from '../fx/MaskCursor'
import { TLink } from '../fx/PageTransition'
import { Bands } from '../fx/Scroll'
import { BlockReveal, CharRise } from '../fx/Text'
import { REDUCED } from '../lib/gsap'
import './home.css'

export default function Home({ ready, replayIntro }: { ready: boolean; replayIntro: () => void }) {
  return <>
    <section className="profile-hero wrap" aria-labelledby="home-title">
      <div className="profile-intro">
        <TLink className="alma-mater" to="/education"><img src="/logos/iim-calcutta.png" width="204" height="52" alt="Indian Institute of Management Calcutta" /><span>IIM Calcutta MBA<br />Class of 2025</span></TLink>
        {ready ? <WeightHover><h1 className="hero-title profile-name" id="home-title" aria-label="Sumit Yadav">
          <CharRise onScroll={false}><span className="ht-line">Sumit</span></CharRise>
          <CharRise onScroll={false} delay={.14}><span className="ht-line">Yadav<span className="o">.</span></span></CharRise>
        </h1></WeightHover> : <h1 className="hero-title profile-name" id="home-title">Sumit<br />Yadav<span className="o">.</span></h1>}
        <p className="profile-role">Strategy, growth &amp; product</p>
        <p className="profile-lede">What should a mine pay for drilling? Where are online merchants losing margin? I worked through those questions at Accenture and Shopdeck. Today I run product pilots at Blinkit to decide what to roll out across 2,300+ stores.</p>
        <div className="cta"><TLink to="/work" className="btn">Explore my work ↗</TLink><a href={SITE.resume} className="btn btn-ghost" target="_blank" rel="noreferrer">Strategy CV ↗</a></div>
        {!REDUCED && <button className="replay-hello" type="button" onClick={replayIntro}>Replay Hello ↻</button>}
      </div>
      <FeaturedCases ready={ready} />
    </section>
    <section className="stats wrap" aria-label="Career in numbers">{STATS.map(s => <div className="stat" key={s.label}><b>{s.prefix}{s.n.toLocaleString('en-IN')}{s.suffix}</b><span>{s.label}</span></div>)}</section>
    <section className="home-stories wrap" aria-labelledby="home-stories-title">
      <h2 className="display-sm" id="home-stories-title">From my working files<span className="o">.</span></h2>
      <div className="story-grid">
        <TLink to="/work#shopdeck"><img src="/docs/WhatsApp_Image_2026-04-14_at_5_21_04_AM.jpeg" alt="The Shopdeck team’s handwritten marketing diagnostic" loading="lazy" /><small>Shopdeck · Growth</small><h3>How 80 consultants took 500+ clients live ↗</h3></TLink>
        <TLink to="/awards"><img src="/work/evidence/competition-team.webp" alt="Our engineering team with its competition vehicle at NIT Kurukshetra" loading="lazy" /><small>NIT Kurukshetra · Engineering</small><h3>The quadricycle we built for Junkyard War ↗</h3></TLink>
        <TLink to="/leadership"><img src="/work/evidence/festival-cad.webp" alt="The CAD lab and the Mechanical Society’s competition brief" loading="lazy" /><small>Techspardha · Leadership</small><h3>Behind a festival for 4,000 people ↗</h3></TLink>
      </div>
    </section>
    <MaskCursor
      front={<>Before I changed a pick list at Blinkit, I visited <em>more than 50 stores</em> to see how people used it.</>}
      hidden={<>Following the new route, pickers spent 10% less time per item.</>}
    />
    <Bands a={['Strategy','Growth','Product','Consulting']} b={['NIT Kurukshetra','Shiksha','IIM Calcutta','Blinkit']} />
    <AboutStory />
    <section className="working-files wrap" aria-labelledby="working-files-title">
      <header><div><p className="eyebrow">Working documents</p><h2 id="working-files-title">Inside the work<span className="o">.</span></h2></div><a className="btn btn-ghost" href={SITE.productCv} target="_blank" rel="noreferrer">Product &amp; Growth CV ↗</a></header>
      <WorkFilm ready={ready} />
      <div className="bio-links">{[
        ['Returns decision tree', '/docs/WhatsApp_Image_2026-04-14_at_5_21_03_AM.jpeg'],
        ['Marketing whiteboard', '/docs/WhatsApp_Image_2026-04-14_at_5_21_04_AM.jpeg'],
        ['Campaign handbook', DOCS[2].href + '#page=3'], ['Pre-live checklist', DOCS[3].href + '#page=14'],
      ].map(([title, href]) => <a key={title} href={href} target="_blank" rel="noreferrer">{title} ↗</a>)}</div>
    </section>
    <section className="explore" aria-labelledby="explore-title">
      <div className="wrap"><BlockReveal><h2 id="explore-title" className="display-sm">Pick a route.</h2></BlockReveal></div>
      <MarqueeMenu items={PAGES.map((page, index) => ({ ...page, index: String(index + 1).padStart(2, '0') }))} />
    </section>
  </>
}
