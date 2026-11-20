import { ArrowUpRight, Mail, MessageSquare, Phone, UserRound } from 'lucide-react'
import { SITE } from '../data'
import { BlockReveal } from '../fx/Text'
import './contact.css'

const channels = [
  { label: 'Email me', detail: SITE.email, href: 'mailto:' + SITE.email, icon: Mail },
  { label: 'Message me', detail: 'SMS · ' + SITE.phoneLabel, href: 'sms:' + SITE.phone, icon: MessageSquare },
  { label: 'Call me', detail: SITE.phoneLabel, href: 'tel:' + SITE.phone, icon: Phone },
  { label: 'Connect on LinkedIn', detail: 'linkedin.com/in/sumit-yadav1', href: SITE.linkedin, icon: UserRound, external: true },
]

export default function Contact() {
  return <section className="contact-layout wrap" aria-labelledby="contact-title">
    <header>
      <p className="eyebrow">Sumit Yadav</p>
      <BlockReveal onScroll={false}><h1 className="display" id="contact-title">Get in <br />touch<span className="o">.</span></h1></BlockReveal>
      <p className="contact-note">If you’re hiring for a product, growth or operations role, I’d love to hear what your team is working on.</p>
      <a className="btn btn-ghost" href={SITE.resume} target="_blank" rel="noreferrer">Read my résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
    </header>
    <ul className="contact-channels">{channels.map(({label,detail,href,icon: Icon,external}) =>
      <li key={label}><a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        <span className="channel-icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
        <div><h2>{label}</h2><p>{detail}</p></div>
        <ArrowUpRight className="channel-arrow" size={21} aria-hidden="true" />
      </a></li>
    )}</ul>
  </section>
}
