import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import React from 'react'
import MemoSearch from '../components/MemoSearch';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <MemoSearch />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}