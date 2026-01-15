import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    let connection;
    
    try {
        // Create database connection with error handling
        try {
            connection = await mysql.createConnection({
                host: '62.72.31.209',
                user: 'cmsuser',
                password: 'V@savi@2001',
                database: 'svec_cms',
            });
        } catch (connError) {
            console.error("Database connection failed:", connError);
            return res.status(500).json({ 
                error: 'Database connection failed',
                details: connError.message 
            });
        }

        // Fetch from all achievement tables
        let awards = [], csp = [], gate = [], gre = [], icet = [], nptel = [], projects = [], publications = [], rollOfHonour = [], researchProjects = [], workshops = [];
        
        try {
            const result = await connection.execute(
                "SELECT *, 'awards' as category, 'ece_awards' as `table` FROM ece_awards ORDER BY batch DESC"
            );
            awards = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_awards:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'community-service' as category, 'ece_csp' as `table` FROM ece_csp ORDER BY academic_year DESC"
            );
            csp = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_csp:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'gate-gre' as category, 'ece_gate' as `table` FROM ece_gate ORDER BY batch DESC"
            );
            gate = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_gate:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'gate-gre' as category, 'ece_gre' as `table` FROM ece_gre ORDER BY batch DESC"
            );
            gre = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_gre:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'gate-gre' as category, 'ece_icet' as `table` FROM ece_icet ORDER BY batch DESC"
            );
            icet = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_icet:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'nptel-other-certifications' as category, 'ece_nptel' as `table` FROM ece_nptel ORDER BY academic_year DESC"
            );
            nptel = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_nptel:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'projects' as category, 'ece_projects' as `table` FROM ece_projects ORDER BY id DESC"
            );
            projects = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_projects:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'publications' as category, 'ece_publications' as `table` FROM ece_publications ORDER BY created_at DESC"
            );
            publications = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_publications:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'roll-of-honour' as category, 'ece_roll_of_honour' as `table` FROM ece_roll_of_honour ORDER BY batch DESC"
            );
            rollOfHonour = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_roll_of_honour:", e.message);
        }
        
        let rollOfHonourGallery = [];
        try {
            // Fetch honour category records from gallery
            const result = await connection.execute(
                "SELECT * FROM ece_hackathons_gallery WHERE category = 'honour' ORDER BY created_at DESC"
            );
            const honourRecords = result[0] || [];
            console.log('Honour category records found:', honourRecords.length);
            if (honourRecords.length > 0) {
                console.log('First honour record:', honourRecords[0]);
            }
            
            // Map records with custom category field
            rollOfHonourGallery = honourRecords.map((record) => ({
                ...record,
                category: 'roll-of-honour-gallery',
                table: 'ece_hackathons_gallery'
            }));
            console.log('Roll of Honour Gallery mapped count:', rollOfHonourGallery.length);
        } catch (e) {
            console.warn("Failed to fetch ece_hackathons_gallery (honour):", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'student-research-projects' as category, 'ece_research_projects' as `table`, CASE WHEN type = 'btech' THEN 'B.Tech' WHEN type = 'mtech' THEN 'M.Tech' ELSE type END as degree FROM ece_research_projects ORDER BY id DESC"
            );
            researchProjects = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_research_projects:", e.message);
        }
        
        try {
            const result = await connection.execute(
                "SELECT *, 'workshops-internships-seminars-webinars' as category, 'ece_workshops_internships' as `table` FROM ece_workshops_internships ORDER BY created_at DESC"
            );
            workshops = result[0];
        } catch (e) {
            console.warn("Failed to fetch ece_workshops_internships:", e.message);
        }
        
        // Combine all results
        const allAchievements = [
            ...awards,
            ...csp,
            ...gate,
            ...gre,
            ...icet,
            ...nptel,
            ...projects,
            ...publications,
            ...rollOfHonour,
            ...rollOfHonourGallery,
            ...researchProjects,
            ...workshops
        ];
        
        res.status(200).json(allAchievements);
    } catch (error) {
        console.error("Error fetching student achievements:", error);
        res.status(500).json({ error: error.message });
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (e) {
                console.warn("Error closing connection:", e);
            }
        }
    }
}
