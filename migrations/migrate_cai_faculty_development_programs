const mysql = require('mysql2/promise');

const mbaFdpData = [
    {
        dept: "mba",
        type: "attended",
        year: "2022-23",
        title: "FDPs attended during the Academic Year 2022-23",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202022-23.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2021-22",
        title: "FDPs attended during the Academic Year 2021-22",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202021-22.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2020-21",
        title: "FDPs attended during the Academic Year 2020-21",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202020-21.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2019-20",
        title: "FDPs attended during the Academic Year 2019-20",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202019-20.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2018-19",
        title: "FDPs attended during the Academic Year 2018-19",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202018-19.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2017-18",
        title: "FDPs attended during the Academic Year 2017-18",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202017-18.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2016-17",
        title: "FDPs attended during the Academic Year 2016-17",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202016-17.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2015-16",
        title: "FDPs attended during the Academic Year 2015-16",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202015-16.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2014-15",
        title: "FDPs attended during the Academic Year 2014-15",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202014-15.pdf"
    },
    {
        dept: "mba",
        type: "attended",
        year: "2013-14",
        title: "FDPs attended during the Academic Year 2013-14",
        file_url: "https://srivasaviengg.ac.in/uploads/mba/FDP%202013-14.pdf"
    }
];

async function insertMBAFDPs() {
    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    try {
        console.log('Connected to database');

        for (const fdp of mbaFdpData) {
            try {
                await connection.execute(`
          INSERT INTO faculty_development_programs 
          (dept, type, year, title, file_url, created_at) 
          VALUES (?, ?, ?, ?, ?, NOW())
        `, [
                    fdp.dept,
                    fdp.type,
                    fdp.year,
                    fdp.title,
                    fdp.file_url
                ]);
                console.log(`Inserted MBA FDP: ${fdp.year}`);
            } catch (e) {
                console.log(`Error inserting MBA FDP ${fdp.year}:`, e.message);
            }
        }

        console.log("✅ MBA FDP data inserted successfully!");
    } catch (error) {
        console.error("❌ Error inserting MBA FDPs:", error);
    } finally {
        await connection.end();
    }
}

insertMBAFDPs();
