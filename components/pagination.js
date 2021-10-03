/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Pagination React Component.


import React from 'react'

import Link from 'next/link'
import { withRouter } from 'next/router'

import styles from '../styles/Pagination.module.css'

class PaginationItem extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <span className={styles['pagination-item']}>
        {this.props.router && <Link href={this.props.router}><a onClick={this.props.onClick}>{this.props.label}</a></Link>}
        {!this.props.router && this.props.label}
      </span>
    )
  }
}

export default withRouter(class Pagination extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: this.props.amount ?? 10,
      current: parseInt(this.props.router.query.p) ?? 1
    }
    if (this.props.router.query.p) {
      this.state.current = parseInt(this.props.router.query.p)
    } else {
      this.state.current = 1
    }

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(event) {
    const url = new URL(event.target.href)
    
    this.setState({
      current: parseInt(url.searchParams.get('p'))
    })

    this.props.router.push(event.target.href)
  }
  
  render() {
    const paginationItems = () => {
      let amount = this.state.amount
      const items = []
      let page = 1

      // Pages
      while (amount > 0) {
        if (this.state.current === page) {
          items.push(<PaginationItem key={page} label={page} />)
        } else {
          items.push(<PaginationItem key={page} label={page} router={{
            pathname: this.props.router.pathname,
            query: {
              q: this.props.router.query.q,
              p: page
            }
          }} onClick={this.handlePageChange} />)
        }
        //
        amount--
        page++
      }

      // Previous
      if (this.state.current > 1) {
        items.unshift(<PaginationItem key="previous" className="previous" label="Previous" router={{
          pathname: this.props.router.pathname,
          query: {
            q: this.props.router.query.q,
            p: this.state.current - 1
          }
        }} onClick={this.handlePageChange} />)
      }

      // Next
      if (this.state.current < this.state.amount - 1) {
        items.push(<PaginationItem key="next" className="next" label="Next" router={{
          pathname: this.props.router.pathname,
          query: {
            q: this.props.router.query.q,
            p: this.state.current + 1
          }
        }} onClick={this.handlePageChange} />)
      }
      
      return items
    }
    
    return(
      <nav id="pagination" className={styles.pagination}>
        {paginationItems()}
      </nav>
    )
  }
})
