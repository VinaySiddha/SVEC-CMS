#!/usr/bin/env node

/**
 * Seed script for academic calendars
 * Inserts sample UG and PG academic calendars into the database
 * Run with: node seed-academic-calendars.js
 */

const mysql = require('mysql2/promise');

async function seedAcademicCalendars() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || '62.72.31.209',
      user: process.env.DB_USER || 'svec_cms_user',
      password: process.env.DB_PASSWORD || 'V@savi@2001',
      database: process.env.DB_NAME || 'svec_cms',
    });

    console.log('✅ Connected to database');
    console.log('📝 Seeding academic calendars...\n');

    // Sample UG calendars
    const ugCalendars = [
      {
        date: '2024-07-26',
        type: 'UG',
        title: 'B.Tech II Year - III and IV Semesters Academic Calendar',
        description: 'Academic calendar for B.Tech II Year (III and IV semesters) for academic year 2024-2025',
        document_url: 'https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechIIYear-IIIandIVsemestersAcademicCalendar.pdf',
      },
      {
        date: '2024-07-15',
        type: 'UG',
        title: 'III B.Tech Academic Calendar 2024-2025',
        description: 'Academic calendar for B.Tech III Year (V and VI semesters)',
        document_url: 'https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechVamdVIsemestersAcademicCalendar.pdf',
      },
      {
        date: '2024-06-08',
        type: 'UG',
        title: 'IV B.Tech Academic Calendar 2024-2025',
        description: 'Academic calendar for B.Tech IV Year (VII and VIII semesters)',
        document_url: 'https://srivasaviengg.ac.in/uploads/ac_calender/ug/2023-24-A-7-8-AcademicCalendar-BTechIVYear.pdf',
      },
      {
        date: '2024-06-01',
        type: 'UG',
        title: 'I B.Tech Academic Calendar 2024-2025',
        description: 'Academic calendar for B.Tech I Year (I and II semesters)',
        document_url: 'https://srivasaviengg.ac.in/uploads/ac_calender/ug/B.TechIYear-AcademicCalendar.pdf',
      },
    ];

    // Sample PG calendars
    const pgCalendars = [
      {
        date: '2024-08-05',
        type: 'PG',
        title: 'M.Tech 1st Year Academic Calendar',
        description: 'Academic calendar for M.Tech 1st Year students',
        document_url: 'https://srivasaviengg.ac.in/uploads/ac_calender/pg/M.Tech1stYear-AcademicCalendar.pdf',
      },
      {
        date: '2024-07-28',
        type: 'PG',
        title: 'MBA Academic Calendar 2024-2025',
        description: 'Academic calendar for MBA program',
        document_url: 'https://srivasaviengg.ac.in/uploads/ac_calender/pg/MBA-AcademicCalendar-2024-2025.pdf',
      },
      {
        date: '2024-07-20',
        type: 'PG',
        title: 'M.Tech 2nd Year Academic Calendar',
        description: 'Academic calendar for M.Tech 2nd Year students',
        document_url: 'https://srivasaviengg.ac.in/uploads/ac_calender/pg/M.Tech2ndYear-AcademicCalendar.pdf',
      },
    ];

    // Insert UG calendars
    console.log('📚 Inserting UG Academic Calendars:');
    for (const calendar of ugCalendars) {
      try {
        const [result] = await connection.execute(
          `INSERT INTO academic_calendars (date, type, title, description, document_url) 
           VALUES (?, ?, ?, ?, ?)`,
          [calendar.date, calendar.type, calendar.title, calendar.description, calendar.document_url]
        );
        console.log(`   ✅ ${calendar.title}`);
      } catch (err) {
        if (!err.message.includes('Duplicate')) {
          console.log(`   ⚠️  ${calendar.title} - ${err.message}`);
        }
      }
    }

    // Insert PG calendars
    console.log('\n📚 Inserting PG Academic Calendars:');
    for (const calendar of pgCalendars) {
      try {
        const [result] = await connection.execute(
          `INSERT INTO academic_calendars (date, type, title, description, document_url) 
           VALUES (?, ?, ?, ?, ?)`,
          [calendar.date, calendar.type, calendar.title, calendar.description, calendar.document_url]
        );
        console.log(`   ✅ ${calendar.title}`);
      } catch (err) {
        if (!err.message.includes('Duplicate')) {
          console.log(`   ⚠️  ${calendar.title} - ${err.message}`);
        }
      }
    }

    // Verify the data
    console.log('\n📊 Verification:');
    const [ugCount] = await connection.execute(
      `SELECT COUNT(*) as count FROM academic_calendars WHERE type = 'UG' AND deleted_at IS NULL`
    );
    const [pgCount] = await connection.execute(
      `SELECT COUNT(*) as count FROM academic_calendars WHERE type = 'PG' AND deleted_at IS NULL`
    );

    console.log(`   UG Calendars: ${ugCount[0].count}`);
    console.log(`   PG Calendars: ${pgCount[0].count}`);

    // Display all calendars
    const [allCalendars] = await connection.execute(
      `SELECT id, date, type, title FROM academic_calendars WHERE deleted_at IS NULL ORDER BY date DESC LIMIT 10`
    );

    console.log('\n📋 Recent Academic Calendars:');
    allCalendars.forEach((cal) => {
      console.log(`   [${cal.type}] ${cal.title} (${cal.date})`);
    });

    console.log('\n✅ Academic calendars seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

// Run seeding
seedAcademicCalendars();
