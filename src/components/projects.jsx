import { motion as Motion } from 'framer-motion'
import { ArrowUpRight, Github, FolderGit2 } from 'lucide-react'
import { projects, developer } from '../data/site'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { TiltCard } from './ui/tilt-card'

export function Projects() {
  return (
    <section id="projects" className="section-wrap px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">{developer.subtitles.projects}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="group h-full"
              style={{ perspective: '1000px' }}
            >
              <TiltCard max={6} className="h-full">
              <Card className="relative flex h-full flex-col overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/80 hover:shadow-[0_0_40px_-15px_rgba(var(--primary),0.3)]">
                {/* Decorative background gradient */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-150" />
                
                <CardHeader className="relative pb-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex z-10 items-center justify-center rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/25 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <FolderGit2 size={24} />
                    </div>
                    <div className="flex items-center gap-4 z-10">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center justify-center text-muted-foreground transition-all hover:text-foreground hover:scale-110 bg-background/50 backdrop-blur-md p-2 rounded-full border border-border/50 shadow-sm"
                        aria-label="GitHub Repository"
                      >
                        <Github size={18} />
                      </a>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center justify-center text-muted-foreground transition-all hover:text-primary hover:scale-110 bg-background/50 backdrop-blur-md p-2 rounded-full border border-border/50 shadow-sm"
                        aria-label="Live Demo"
                      >
                        <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight mb-2 transition-colors">
                    <a href={project.demo || project.github} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 focus:outline-none flex items-center gap-2 group-hover:text-primary">
                      {project.name}
                    </a>
                  </CardTitle>
                  <CardDescription className="text-[0.95rem] leading-relaxed text-muted-foreground/90">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative mt-auto pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Badge 
                        key={item} 
                        variant="secondary" 
                        className="bg-secondary/50 font-mono text-xs font-medium text-secondary-foreground transition-colors group-hover:bg-secondary/80"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </TiltCard>
            </Motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#/work"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            See them running live in the showcase <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
