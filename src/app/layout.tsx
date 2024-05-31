import "./globals.css";
import { Inter } from 'next/font/google'
import TopBar from "../components/navbar/TopBar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Metadata } from "next";
import StoreProvider from "../store/provider";
import { mainDomain, staticImages } from "../utils";
import { ReactNode } from "react";
import NavigationCondition from "../lib/client/NavigationCondition";
import { getTemplate } from "../lib/server-actions/templates/getTemplate";
import loginSession from "../lib/server-actions/auth/loginSession";
import { headers } from "next/headers"
import getListColletions from "../lib/server-actions/collections/getListCollections";
import { checkDomain } from "../lib/server-actions/domain/checkDomain";
import { TemplateDirT } from "../types/template";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const dynamic = 'force-dynamic'

type Props = {
  params: { detail: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  return {
    title: "Gangco",
    description: "Branded products are available at low prices and high quality. easy shopping and fast service only at Gangco.",
    icons: {
      icon: `${staticImages}/gangco.png`,
      shortcut: `${staticImages}/gangco.png`,
      apple: [
        { url: `${staticImages}/gangco.png` },
        { url: `${staticImages}/gangco.png`, sizes: '180x180', type: 'image/png' }
      ]
    },
    keywords: ['Gangco', 'Gangco Store', 'Online Store', 'Online Shop'],
    openGraph: {
      title: 'Gangco Store',
      images: 'https://d3ruxlty4tyz2w.cloudfront.net/thumbnail.png',
      description: 'Gangco shop, online shop with quality products and an easy and fast shopping process.',
      siteName: 'Gangco Store',
      type: 'website',
      locale: 'en-US'
    },
    authors: [
      { name: 'Gangco' }
    ],
    creator: 'Gangco',
    publisher: 'Gangco',
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  let newResultTemplate = {} as TemplateDirT & {
    hostname: string,
    isDomainAccess?: boolean | null
  }
  const headersList = headers();
  const hostname = headersList.get('x-forwarded-host')

  if (hostname?.includes(mainDomain)) {
    const domain = await checkDomain()
    if (domain?.result !== true) {
      newResultTemplate = {
        templateDir: 'failed',
        hostname,
        isDomainAccess: false
      }
    }
  }

  const user = await loginSession()
  const template = await getTemplate()
  const listCollections = await getListColletions()

  newResultTemplate = template

  const findFonts = (): string | undefined => {
    if (template.templateDir === 'default') {
      return undefined
    } else if (template.templateDir === 'theme1') {
      return inter.variable
    }
  }
  const font = findFonts()

  return (
    <html lang="en" className={font}>
      <head>
        <meta property="og:url" content={`https://${hostname}`} />
      </head>
      <body>
        <Toaster
          position="top-right"
          containerClassName="mt-[4rem] !z-[99999]"
          reverseOrder={false}
        />
        <StoreProvider
          templateDir={newResultTemplate.templateDir}
          hostname={newResultTemplate.hostname}
          isDomainAccess={newResultTemplate?.isDomainAccess}
          collections={listCollections}
        >
          <NavigationCondition>
            <TopBar templateDir={newResultTemplate.templateDir} />
            <Navbar
              templateDir={newResultTemplate.templateDir}
              user={user}
              collections={listCollections}
            />
          </NavigationCondition>
          {children}
          <NavigationCondition>
            <Footer
              templateDir={newResultTemplate.templateDir}
              collections={listCollections}
            />
          </NavigationCondition>
        </StoreProvider>
      </body>
    </html>
  );
}
