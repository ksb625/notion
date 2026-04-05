import Head from 'next/head'
import { NotionAPI } from 'notion-client'
import { NotionRenderer } from 'react-notion-x'

export default function Home({ recordMap }) {
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
  const recordMap = await notion.getPage('2e7ac7e2940c804495f0dbd8ee2542b3')

  return {
    props: { recordMap },
    revalidate: 60
  }
}