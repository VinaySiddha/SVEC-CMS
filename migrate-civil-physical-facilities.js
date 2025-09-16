const mysql = require('mysql2/promise');
require('dotenv').config();

// Civil Physical Facilities Data (from Civil.tsx)
const facilities = [
	// Class Timetables
	{
		department: 'civil',
		category: 'Class Timetable',
		name: 'Master Timetable_A.Y for Sem-VIII 2022-23',
		description: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20VIII%20SEM(V18)%20TIMETABLE%20%20W.E.F%20-%2026.12.2022.pdf'
	},
	{
		department: 'civil',
		category: 'Class Timetable',
		name: 'Master Timetable_A.Y for Sem-VI 2022-23',
		description: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20VI%20SEM(V20)%20TIMETABLE%20%20W.E.F%20-%2027.02.2023.pdf'
	},
	{
		department: 'civil',
		category: 'Class Timetable',
		name: 'Master Timetable_A.Y for Sem-II 2021-22',
		description: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/B.Tech%20IV%20SEM(V20)%20TIMETABLE%20%20W.E.F%2027.02.2023.pdf'
	},
	// Class Rooms
	{
		department: 'civil',
		category: 'Class Room',
		name: 'Class Rooms with ICT Enabled Facilities',
		description: 'https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/CE_Classrooms.pdf'
	},
	// Class Laboratories
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Strength of Materials Lab',
		description: '/images/departments/ce/civil_adslab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'CAD & GIS Lab',
		description: '/images/departments/ce/civil_cadlab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Concrete Technology Lab',
		description: '/images/departments/ce/civil_ctlab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Engineering Geology Lab',
		description: '/images/departments/ce/civil_gtlab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Surveying Lab',
		description: '/images/departments/ce/civil_sllab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Fluid Mechanics & Hydraulic Machinery Lab',
		description: '/images/departments/ce/civil_fmlab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Waste Water Engineering Lab',
		description: '/images/departments/ce/civil_waterlab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Advanced Structural Engineering Lab',
		description: '/images/departments/ce/civil_adslab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Geotechnical Engineering Lab',
		description: '/images/departments/ce/civil_geolab.jpg'
	},
	{
		department: 'civil',
		category: 'Laboratory',
		name: 'Transportation Engineering Lab',
		description: '/images/departments/ce/civil_telab.jpg'
	}
];

async function migrateCivilPhysicalFacilities() {
	let connection;
	try {
		connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms',
            port: 3306
		});
		console.log('Connected to MySQL database');

		// Clear existing Civil physical facilities data
		await connection.execute('DELETE FROM civil_physical_facilities WHERE department = ?', ['civil']);
		console.log('Cleared existing Civil physical facilities data');

			// Insert new facilities
			for (const facility of facilities) {
				await connection.execute(
					'INSERT INTO civil_physical_facilities (department, category, name, description) VALUES (?, ?, ?, ?)',
					[facility.department, facility.category, facility.name, facility.description]
				);
				console.log(`Inserted: ${facility.category} - ${facility.name}`);
			}

		// Get count
		const [result] = await connection.execute('SELECT COUNT(*) as count FROM civil_physical_facilities WHERE department = ?', ['civil']);
		console.log(`Total Civil physical facilities migrated: ${result[0].count}`);
		console.log('Migration completed successfully!');
	} catch (error) {
		console.error('Migration failed:', error);
	} finally {
		if (connection) {
			await connection.end();
			console.log('Database connection closed');
		}
	}
}

migrateCivilPhysicalFacilities();
