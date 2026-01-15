#!/usr/bin/env node

/**
 * Seed script for RSAC items
 * Inserts sample UG and PG items (syllabus, regulations, academic-calendar) into rsac_items table
 * Run with: node seed-rsac-items.js
 */

const mysql = require('mysql2/promise');

async function seedRsacItems() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '62.72.31.209',
      user: process.env.DB_USER || 'svec_cms_user',
      password: process.env.DB_PASSWORD || 'V@savi@2001',
      database: process.env.DB_NAME || 'svec_cms',
    });

    console.log('✅ Connected to database');
    console.log('📝 Seeding RSAC items...\n');

    // Sample UG items
    const ugItems = [
      {
        date: '2024-07-26',
        degree: 'UG',
        type: 'academic-calendar',
        content: 'B.Tech II Year - III and IV Semesters Academic Calendar',
        link: 'https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechIIYear-IIIandIVsemestersAcademicCalendar.pdf',
      },
      {
        date: '2024-07-15',
        degree: 'UG',
        type: 'academic-calendar',
        content: 'III B.Tech Academic Calendar 2024-2025',
        link: 'https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechVamdVIsemestersAcademicCalendar.pdf',
      },
      {
        date: '2024-06-08',
        degree: 'UG',
        type: 'academic-calendar',
        content: 'IV B.Tech Academic Calendar 2024-2025',
        link: 'https://srivasaviengg.ac.in/uploads/ac_calender/ug/2023-24-A-7-8-AcademicCalendar-BTechIVYear.pdf',
      },
      {
        date: '2024-07-20',
        degree: 'UG',
        type: 'syllabus',
        content: 'B.Tech V23 Syllabus - All Programs',
        link: 'https://srivasaviengg.ac.in/uploads/autonomous_syllabus/ug/V23%20Regulations%20and%20Syllabus.pdf',
      },
      {
        date: '2024-07-10',
        degree: 'UG',
        type: 'regulations',
        content: 'B.Tech V23 Regulations',
        link: 'https://srivasaviengg.ac.in/uploads/regulations/ug/V23%20Regulation.pdf',
      },
    ];

    // Sample PG items
    const pgItems = [
      {
        date: '2024-08-05',
        degree: 'PG',
        type: 'academic-calendar',
        content: 'M.Tech 1st Year Academic Calendar',
        link: 'https://srivasaviengg.ac.in/uploads/ac_calender/pg/M.Tech1stYear-AcademicCalendar.pdf',
      },
      {
        date: '2024-07-28',
        degree: 'PG',
        type: 'academic-calendar',
        content: 'MBA Academic Calendar 2024-2025',
        link: 'https://srivasaviengg.ac.in/uploads/ac_calender/pg/MBA-AcademicCalendar-2024-2025.pdf',
      },
      {
        date: '2024-07-20',
        degree: 'PG',
        type: 'syllabus',
        content: 'M.Tech V21 Syllabus - All Specializations',
        link: 'https://srivasaviengg.ac.in/uploads/autonomous_syllabus/pg/M.Tech%20V21%20Syllabus.pdf',
      },
      {
        date: '2024-07-10',
        degree: 'PG',
        type: 'regulations',
        content: 'M.Tech V21 Regulations',
        link: 'https://srivasaviengg.ac.in/uploads/regulations/pg/M%20Tech%20V21%20Regulations.pdf',
      },
      {
        date: '2024-07-05',
        degree: 'PG',
        type: 'regulations',
        content: 'MBA V21 Regulations',
        link: 'https://srivasaviengg.ac.in/uploads/regulations/pg/MBA%20V21%20Regulations.pdf',
      },
    ];

    // Insert UG items
    console.log('📚 Inserting UG RSAC Items:');
    for (const item of ugItems) {
      try {
        const [result] = await connection.execute(
          `INSERT INTO rsac_items (date, degree, type, content, link) 
           VALUES (?, ?, ?, ?, ?)`,
          [item.date, item.degree, item.type, item.content, item.link]
        );
        console.log(`   ✅ [${item.type.toUpperCase()}] ${item.content}`);
      } catch (err) {
        if (!err.message.includes('Duplicate')) {
          console.log(`   ⚠️  ${item.content} - ${err.message}`);
        }
      }
    }

    // Insert PG items
    console.log('\n🎓 Inserting PG RSAC Items:');
    for (const item of pgItems) {
      try {
        const [result] = await connection.execute(
          `INSERT INTO rsac_items (date, degree, type, content, link) 
           VALUES (?, ?, ?, ?, ?)`,
          [item.date, item.degree, item.type, item.content, item.link]
        );
        console.log(`   ✅ [${item.type.toUpperCase()}] ${item.content}`);
      } catch (err) {
        if (!err.message.includes('Duplicate')) {
          console.log(`   ⚠️  ${item.content} - ${err.message}`);
        }
      }
    }

    // Verify the data
    console.log('\n📊 Verification:');
    const [ugCount] = await connection.execute(
      `SELECT COUNT(*) as count FROM rsac_items WHERE degree = 'UG' AND deleted_at IS NULL`
    );
    const [pgCount] = await connection.execute(
      `SELECT COUNT(*) as count FROM rsac_items WHERE degree = 'PG' AND deleted_at IS NULL`
    );

    console.log(`   UG Items: ${ugCount[0].count}`);
    console.log(`   PG Items: ${pgCount[0].count}`);

    // Display all items by type
    const [allItems] = await connection.execute(
      `SELECT degree, type, COUNT(*) as count FROM rsac_items WHERE deleted_at IS NULL GROUP BY degree, type ORDER BY degree, type`
    );

    console.log('\n📋 Items by Type:');
    allItems.forEach((item) => {
      console.log(`   [${item.degree}] ${item.type}: ${item.count} items`);
    });

    // Display recent items
    const [recentItems] = await connection.execute(
      `SELECT id, date, degree, type, content FROM rsac_items WHERE deleted_at IS NULL ORDER BY date DESC LIMIT 10`
    );

    console.log('\n📅 Recent RSAC Items:');
    recentItems.forEach((item) => {
      console.log(`   [${item.degree}] [${item.type}] ${item.content} (${item.date})`);
    });

    console.log('\n✅ RSAC items seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

// Run seeding
seedRsacItems();
