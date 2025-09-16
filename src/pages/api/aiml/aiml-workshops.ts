import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dept } = req.query
  if (!dept || typeof dept !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid dept parameter' })
  }

  // ✅ 1. Connect to DB
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  })

  // ✅ 2. Fetch rows
  const [rows] = await connection.execute(
    `SELECT category, description, report_url
       FROM workshops
      WHERE dept = ?`,
    [dept]
  )
  await connection.end()

  // ✅ 3. Group by category
  const grouped: Record<string, { text: string; url: string }[]> = {}
  ;(rows as any[]).forEach(row => {
    const cat = row.category
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push({
      text: row.description,
      url: row.report_url,
    })
  })

  // ✅ 4. Convert to array
  const output = Object.entries(grouped).map(([title, items]) => ({
    title,
    items,
  }))

  return res.status(200).json(output)
}
