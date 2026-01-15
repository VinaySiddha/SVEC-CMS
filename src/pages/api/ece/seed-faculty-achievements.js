import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Only allow GET requests with seed query parameter
  if (req.method !== 'GET' || req.query.seed !== 'true') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    // Clear existing data
    await connection.execute('DELETE FROM ece_faculty_achievements');

    // Insert sample data
    const sampleData = [
      ['journal_publication', 2024, 'Advanced Signal Processing Techniques', 'https://example.com', 'Published in IEEE Signal Processing Letters'],
      ['journal_publication', 2023, 'Wireless Communication Methods', 'https://example.com', 'Published in Journal of Electronics'],
      ['conference_publication', 2024, 'Recent Trends in VLSI Design', 'https://example.com', 'Presented at IEEE ICCES 2024'],
      ['conference_publication', 2023, 'Embedded Systems in IoT', 'https://example.com', 'Presented at ACCE 2023'],
      ['book_publication', 2023, 'Digital Signal Processing Fundamentals', 'https://example.com', 'Springer Publication'],
      ['certification', 2024, 'AWS Solutions Architect Certification', 'https://example.com', 'Cloud Computing Certification'],
      ['certification', 2023, 'Cisco CCNA Networking', 'https://example.com', 'Network Certification'],
      ['patent', 2023, 'Novel IoT Device Architecture', 'https://example.com', 'Patent Application Filed'],
      ['award', 2024, 'Best Faculty Research Award', 'https://example.com', 'College Award for Excellence'],
      ['award', 2023, 'Outstanding Teaching Excellence', 'https://example.com', 'University Recognition'],
      ['membership', 2024, 'IEEE Senior Member', 'https://example.com', 'Professional Membership'],
      ['membership', 2023, 'ISTE Fellow', 'https://example.com', 'Educational Society Member'],
      ['outreach', 2024, 'Community Technology Workshop', 'https://example.com', 'Faculty Outreach Activity'],
      ['outreach', 2023, 'School STEM Awareness Program', 'https://example.com', 'Educational Outreach'],
      ['promotion_incentive', 2024, 'Promoted to Associate Professor', 'https://example.com', 'Career Advancement'],
      ['promotion_incentive', 2023, 'Special Incentive for Research', 'https://example.com', 'Performance Incentive'],
      ['gallery', 2024, '/uploads/ece/gallery1.jpg', 'https://example.com', 'Faculty Workshop Gallery'],
      ['gallery', 2023, '/uploads/ece/gallery2.jpg', 'https://example.com', 'Lab Facility Gallery'],
    ];

    for (const [type, year, title, url, details] of sampleData) {
      await connection.execute(
        'INSERT INTO ece_faculty_achievements (type, year, title, url, details) VALUES (?, ?, ?, ?, ?)',
        [type, year, title, url, details]
      );
    }

    res.status(200).json({ success: true, message: 'Sample data seeded successfully', count: sampleData.length });
  } catch (error) {
    console.error('Error seeding faculty achievements:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
