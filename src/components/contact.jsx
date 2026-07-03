import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { developer } from '../data/site'
import { Github, Instagram, Linkedin, Twitter, Youtube, Mail, Copy, Check } from 'lucide-react'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developer.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socials = [
    { name: 'GitHub', href: developer.socials.github, icon: Github },
    { name: 'LinkedIn', href: developer.socials.linkedin, icon: Linkedin },
    { name: 'Twitter', href: developer.socials.twitter, icon: Twitter },
    { name: 'Instagram', href: developer.socials.instagram, icon: Instagram },
    { name: 'Email', href: `mailto:${developer.email}`, icon: Mail },
  ]

  return (
    <section id="contact" className="section-wrap px-4 py-20 pb-28 sm:px-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-card/60 p-8 py-12 backdrop-blur-xl md:p-12 md:py-16 shadow-2xl shadow-primary/5"
        >
          {/* Subtle noise/gradient background */}
          <div className="pointer-events-none absolute inset-0 bg-neutral-950/[0.02] dark:bg-white/[0.02]" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-flex rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground shadow-sm">
              Contact
            </span>
            
            <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Get in Touch
            </h2>
            
            <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg leading-relaxed">
              {developer.contactText.split(developer.contactLinkText)[0]}
              <a href={developer.socials.twitter} target="_blank" rel="noreferrer" className="text-primary hover:opacity-80 underline decoration-primary/40 underline-offset-4 transition-colors focus:outline-none font-medium relative z-10">
                {developer.contactLinkText}
              </a>
              {developer.contactText.split(developer.contactLinkText)[1]}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center z-10 relative">
              <button
                onClick={handleCopyEmail}
                className="group flex h-12 w-48 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 font-medium text-foreground transition-all hover:bg-foreground hover:text-background hover:shadow-lg active:scale-95"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="transition-transform group-hover:scale-110" />}
                {copied ? 'Email Copied!' : 'Copy Email'}
              </button>
              <a
                href={`mailto:${developer.email}`}
                className="group flex h-12 w-48 items-center justify-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg active:scale-95 border border-primary/50"
              >
                <Mail size={18} className="transition-transform group-hover:scale-110" />
                Write Email
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 relative z-10">
              {socials.map((social) => {
                if (social.name === 'Email') return null; // Skip email icon since we have big buttons
                return (
                  <a
                    key={social.name}
                    href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-foreground hover:bg-foreground hover:text-background hover:shadow-lg"
                >
                  <social.icon size={20} strokeWidth={2} className="transition-transform group-hover:scale-110" />
                </a>
                )
              })}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}
