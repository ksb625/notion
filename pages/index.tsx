import Head from 'next/head'
import { NotionAPI } from 'notion-client'
import { NotionRenderer } from 'react-notion-x'
import 'react-notion-x/src/styles.css'
import '../styles/globals.css'

type HomeProps = {
  recordMap: any
}

export default function Home({ recordMap }: HomeProps) {
  return (
    <>
      <Head>
        <title>Notion Embed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page">
        <NotionRenderer recordMap={recordMap} fullPage={true} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const notion = new NotionAPI()

  const recordMap = await notion.getPage(
    '2e8ac7e2940c80ac8e8bdbb26b841366'
  )

  return {
    props: { recordMap },
    revalidate: 60
  }
}