export const siteConfig = {
  name: "yashng/portfolio",
  url: "https://portfolio-new-ruby-six.vercel.app/projects/new" /*url of the site after deployment*/,
  ogImage: "/og.png",
  description:
    "Portfolio website for yashng build with Next.js, contentlayer and shadcn/ui",
  links: {
    twitter: "https://twitter.com/yashng7",
    github: "https://github.com/yashng7/portfolio-new",
  },
};

export type SiteConfig = typeof siteConfig;
