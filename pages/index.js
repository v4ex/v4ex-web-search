/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Home React Component.


import React from 'react'

import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

import SearchBox from '../components/search-box'


export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.container}>
        <Head>
          <title>DO YOU LOVE US? | V4EX Search</title>
          <meta name="description" content="World Wide Web Search Engine" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <div className={styles.logo}>
            <Image src="/logo.svg" alt="V4EX Logo" width={86} height={86} />
          </div>

          <h1 id="title" className={styles.title}>
            V4EX
          </h1>

          <SearchBox />
        </main>
  
      </div>
    )
  }
}
