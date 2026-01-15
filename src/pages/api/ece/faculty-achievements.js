import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req, res) {
  try {
    const achievementRows = await executeQuery('SELECT id,category,title,file_url,year FROM ece_faculty_achievements ORDER BY created_at DESC');
    const awardRows = await executeQuery('SELECT id,title,year FROM ece_faculty_awards ORDER BY year DESC');
    const promRows = await executeQuery('SELECT id,faculty_name,promotion,publication,academic_year FROM ece_faculty_promotions_incentives ORDER BY academic_year DESC');
    const bookRows = await executeQuery('SELECT id,faculty_name,publication_title,journal_conference, year FROM ece_faculty_publications ORDER BY year DESC');
    
    let membershipRows = [];
    try {
      membershipRows = await executeQuery('SELECT id,membership,faculty_name,year FROM ece_faculty_memberships ORDER BY year DESC');
    } catch (memError) {
      console.warn("Warning: ece_faculty_memberships table not found or error querying:", memError.message);
      membershipRows = [];
    }
    
    // Transform award rows to match the expected format
    const transformedAwards = Array.isArray(awardRows) ? awardRows.map((award) => ({
      id: award.id,
      category: 'Awards',
      title: award.title,
      awarding_body: award.awarding_body,
      year: award.year,
      faculty_name: award.faculty_name
    })) : [];
    
    // Transform promotions/incentives rows to match the expected format
    const transformedPromotions = Array.isArray(promRows) ? promRows.map((prom) => ({
      id: prom.id,
      category: 'Promotions/Incentives',
      year: prom.academic_year,
      faculty_name: prom.faculty_name,
      title: prom.promotion,
      file_url: prom.publication
    })) : [];
    
    // Transform membership rows to match the expected format
    const transformedMemberships = Array.isArray(membershipRows) ? membershipRows.map((mem) => ({
      id: mem.id,
      category: 'Memberships',
      title: mem.membership,
      faculty_name: mem.faculty_name,
      year: mem.year
    })) : [];

    // Transform book publications rows to match the expected format
   // Transform book publications rows to match the expected format
// Transform book publications rows to match the expected format
const transformedBooks = Array.isArray(bookRows) ? bookRows.map((book) => ({
  id: book.id,
  category: 'Book Publications',
  title: book.publication_title || book.title,
  publication_title: book.publication_title,
  faculty_name: book.faculty_name,
  journal_conference: book.journal_conference,
  publisher: book.publisher,
  file_url: book.url,
  year: book.year
})) : [];
    
    // Combine all datasets
    const allData = [
      ...(Array.isArray(achievementRows) ? achievementRows : []),
      ...transformedAwards,
      ...transformedPromotions,
      ...transformedMemberships,
      ...transformedBooks
    ];
    
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching faculty achievements data:", error);
    // Return empty array on error instead of 500
    res.status(200).json([]);
  }
}
