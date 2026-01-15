const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function checkAIMLData() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to database\n');

    // Check faculty data
    const [facultyRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_faculty");
    console.log(`📊 aiml_faculty records: ${facultyRows[0].count}`);

    // Check staff data
    const [staffRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_staff");
    console.log(`📊 aiml_staff records: ${staffRows[0].count}`);

    // Check handbooks data
    const [handbooksRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_handbooks");
    console.log(`📊 aiml_handbooks records: ${handbooksRows[0].count}`);

    // Check workshops data
    const [workshopsRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_workshops");
    console.log(`📊 aiml_workshops records: ${workshopsRows[0].count}`);

    // Check hackathons data
    const [hackathonsRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_hackathons");
    console.log(`📊 aiml_hackathons records: ${hackathonsRows[0].count}`);

    // Check placements data
    const [placementsRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_placements");
    console.log(`📊 aiml_placements records: ${placementsRows[0].count}`);

    // Check technical faculty
    const [technicalFacultyRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_technical_faculty");
    console.log(`📊 aiml_technical_faculty records: ${technicalFacultyRows[0].count}`);

    // Check BOS members
    const [bosMembersRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_bos_members");
    console.log(`📊 aiml_bos_members records: ${bosMembersRows[0].count}`);

    // Check hackathons gallery
    const [galleriesRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_hackathons_gallery");
    console.log(`📊 aiml_hackathons_gallery records: ${galleriesRows[0].count}`);

    // Check extra curricular
    const [extraRows] = await connection.query("SELECT COUNT(*) as count FROM aiml_extra_curricular");
    console.log(`📊 aiml_extra_curricular records: ${extraRows[0].count}`);

    console.log('\n✅ Data check complete');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

checkAIMLData();
