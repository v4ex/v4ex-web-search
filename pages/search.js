/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide search result page.


import React from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { withRouter } from 'next/router'

import v4exSearch from '../lib/v4ex-search'

import SearchBar from '../components/search-bar'
import Pagination from '../components/pagination'

import styles from '../styles/Results.module.css'


const externalLinkStyle = {
  color: 'blue',
  textDecoration: 'none'
}

export default withRouter(class Result extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: props.router.query.q,
      page: props.router.query.p,
      content: props.content
    }

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  async handlePageChange(newPage) {
    const response = await fetch(`/api/search?q=${this.state.query}&p=${newPage}`)
    const result = await response.json()

    this.setState({
      page: newPage,
      content: result.results
    })
  }

  render() {
    const content = this.state.content.map((item, index) => {
      return (
        <article key={index} className={styles.result}>
          <h3>
            <a href={item.link} style={externalLinkStyle}>{item.title}</a>
            <sub>{item.link}</sub>
          </h3>
          <p>{item.snippet}</p>
        </article>
      )
    })

    return(
      <div className={styles.container}>
        <Head>
          <title>Search Result for {this.state.query} | DO YOU LOVE US? | V4EX Search</title>
          <meta name="description" content={'Search results for' + this.state.query} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          <h1 className={styles.logo}>
            <Link href="/">
              <a><Image src="/logo.svg" alt="V4EX Logo" width={86} height={86} /></a>
            </Link>
          </h1>

          <SearchBar input={this.state.query} />
        </header>

        <main className={styles.main}>
          Search results for {this.state.query}:
          {content}
          <Pagination amount={this.props.pageAmount} onPageChange={this.handlePageChange} />
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
  const query = decodeURIComponent(context.query.q)
  const page = context.query.p ? parseInt(context.query.p) : 1

  const result = await v4exSearch(query, page)
  // console.log(result)

  return {
    props: {
      content: result.results,
      pageAmount: result.page.amount
    }
  }
}
