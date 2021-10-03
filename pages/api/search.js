/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide on site API for search.


export default async function handler(req, res) {
  const query = decodeURIComponent(req.query.q)
  const page = parseInt(req.query.p)

  const url = process.env.V4EX_API_SEARCH_V1 + '/' + encodeURIComponent(query)
  const urlMore = url + '?more=1'
  const response = await fetch(urlMore)
  const rawResults = await response.json()

  const start = (page - 1) * 10

  res.status(200).json({
    results: rawResults.slice(start, start + 10),
    page: {
      amount: Math.ceil(rawResults.length / 10),
      current: page
    }
  })
}
