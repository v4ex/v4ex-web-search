/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide an API to fetch search result from V4EX Search.


const fetch = require('node-fetch')

module.exports = async (query) => {
  const url = process.env.V4EX_API_SEARCH_V1 + '/' + encodeURIComponent(query)
  const response = await fetch(url)

  return await response.json()
}
