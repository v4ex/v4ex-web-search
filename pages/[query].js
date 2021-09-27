/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide search result page.


import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { withRouter } from 'next/router'

import v4exSearch from '../lib/v4ex-search'

import SearchBar from '../components/search-bar'
import styles from '../styles/Result.module.css'


const externalLinkStyle = {
  color: 'blue',
  textDecoration: 'none'
}

export default withRouter(class Result extends React.Component {
  constructor(props) {
    super(props)

    this.query = props.router.query.query
    this.content = props.content
  }


  render() {
    const content = this.content.map(item => {
      return (
        <article>
          <h3>
            <a href={item.link} style={externalLinkStyle}>{item.title}</a>
          </h3>
          <p>{item.snippet}</p>
        </article>
      )
    })

    return(
      <div className={styles.container}>
        <Head>
          <title>Search Result for {this.query} | DO YOU LOVE US? | V4EX Search</title>
          <meta name="description" content={'Search Result for' + this.query} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          <h1 className={styles.logo}>
            <Link href="/">
              <a><Image src="/logo.svg" alt="V4EX Logo" width={86} height={86} /></a>
            </Link>
          </h1>

          <SearchBar input={this.query} />
        </header>

        <main className={styles.main}>
          Search Result for {this.query}:
          {content}
        </main>

        <footer className={styles.footer}>
          <Link href="/">
            <a>
              <span className={styles.logo}>
                <Image src="/logo.svg" alt="V4EX Logo" width={44} height={44} />
              </span>
            </a>
          </Link>
        </footer>
      </div>
    )
  }
})

export async function getServerSideProps(context) {
  const content = await v4exSearch(context.params.query)

  return {
    props: {
      content
    }
  }
}
