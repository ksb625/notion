import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { NotionAPI } from 'notion-client'
import { NotionRenderer } from 'react-notion-x'

const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then(m => m.Code)
)

const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then(m => m.Collection)
)

const Equation = dynamic(
  () => import('react-notion-x/build/third-party/equation').then(m => m.Equation)
)

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  { ssr: false }
)

const ROOT_PAGE_ID = '2e7ac7e2940c804495f0dbd8ee2542b3'
const notion = new NotionAPI()

export default function Page({ recordMap }) {
  return (
    <>
      <Head>
        <title>Notion Embed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <NotionRenderer
          recordMap={recordMap}
          fullPage
          darkMode={false}
          nextLink={Link}
          components={{
            Code,
            Collection,
            Equation,
            Modal
          }}
          mapPageUrl={pageId => `/${pageId}`}
        />
      </main>
    </>
  )
}

export async function getStaticProps({ params }) {
  const pageId = params?.pageId?.[0] || ROOT_PAGE_ID
  const recordMap = await notion.getPage(pageId)

  return {
    props: { recordMap },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}