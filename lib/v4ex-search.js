/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide an API to fetch search result from V4EX Search.


module.exports = async (query, page) => {

  const url = process.env.V4EX_API_SEARCH_V1 + '/' + encodeURIComponent(query)
  const urlMore = url + '?more=1'
  const response = await fetch(urlMore)
  const rawResults = await response.json()

  const start = (page - 1) * 10

  return {
    results: rawResults.slice(start, start + 10),
    page: {
      amount: Math.ceil(rawResults.length / 10),
      current: page
    }
  }
}
