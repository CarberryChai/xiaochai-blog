import type { Site, SocialObjects } from './types'

export const SITE: Site = {
  website: 'https://xiaochai-blog.pages.dev/', // replace this with your deployed domain
  author: 'Changlin',
  desc: 'A minimal, responsive and SEO-friendly Astro blog theme.',
  title: 'XiaoChai',
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
}

export const LOCALE = {
  lang: 'en', // html lang code. Set this empty and default will be "en"
  langTag: ['en-EN'], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
}

export const SOCIALS: SocialObjects = [
  {
    name: 'Github',
    href: 'https://github.com/CarberryChai',
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/CarberryChai',
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
]
