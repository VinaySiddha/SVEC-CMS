import React, { useState, useEffect } from 'react';

interface StudentAchievementsProps {
    department?: string;
}

export const StudentAchievements: React.FC<StudentAchievementsProps> = ({ department = 'eee' }) => {
    // State for all 14 student achievement tables (3 General + 11 others)
    const [studentPdfList, setStudentPdfList] = useState<any[]>([]);
    const [placementSummary, setPlacementSummary] = useState<any[]>([]);
    const [internshipsSummary, setInternshipsSummary] = useState<any[]>([]);
    const [rollOfHonour, setRollOfHonour] = useState<any[]>([]);
    const [placement, setPlacement] = useState<any[]>([]);
    const [higherStudies, setHigherStudies] = useState<any[]>([]);
    const [competitiveExaminations, setCompetitiveExaminations] = useState<any[]>([]);
    const [courseCertifications, setCourseCertifications] = useState<any[]>([]);
    const [internship, setInternship] = useState<any[]>([]);
    const [workshopsSoc, setWorkshopsSoc] = useState<any[]>([]);
    const [crt, setCrt] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [csp, setCsp] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudentAchievementsData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/public/departments/${department}/student-achievements`);
                if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

                const result = await response.json();
                if (result.success && result.data) {
                    setStudentPdfList(result.data.studentPdfList || []);
                    setPlacementSummary(result.data.placementSummary || []);
                    setInternshipsSummary(result.data.internshipsSummary || []);
                    setRollOfHonour(result.data.rollOfHonour || []);
                    setPlacement(result.data.placement || []);
                    setHigherStudies(result.data.higherStudies || []);
                    setCompetitiveExaminations(result.data.competitiveExaminations || []);
                    setCourseCertifications(result.data.courseCertifications || []);
                    setInternship(result.data.internship || []);
                    setWorkshopsSoc(result.data.workshopsSoc || []);
                    setCrt(result.data.crt || []);
                    setProjects(result.data.projects || []);
                    setCsp(result.data.csp || []);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                setError('Failed to load student achievements data');
                console.error('Student achievements fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentAchievementsData();
    }, [department]);

    // Sorting and grouping functions
    const sortByYear = (arr: any[], yearField = 'academic_year') => {
        return [...arr].sort((a, b) => {
            const yearA = parseInt(a[yearField]?.split('-')[0] || '0');
            const yearB = parseInt(b[yearField]?.split('-')[0] || '0');
            return yearB - yearA;
        });
    };

    const groupByYear = (arr: any[], yearField = 'academic_year') => {
        return arr.reduce((acc: any, item: any) => {
            const year = item[yearField] || 'Unknown';
            if (!acc[year]) acc[year] = [];
            acc[year].push(item);
            return acc;
        }, {});
    };

    const sortYearsDesc = (years: string[]) => {
        return years.sort((a, b) => {
            const yearA = parseInt(a.split('-')[0]) || 0;
            const yearB = parseInt(b.split('-')[0]) || 0;
            return yearB - yearA;
        });
    };

    // Apply sorting
    const sortedPlacementSummary = sortByYear(placementSummary);
    const sortedInternshipsSummary = sortByYear(internshipsSummary);
    const sortedPlacement = sortByYear(placement);
    const sortedHigherStudies = sortByYear(higherStudies);
    const sortedCompetitiveExams = sortByYear(competitiveExaminations, 'year');
    const sortedCourseCerts = sortByYear(courseCertifications);
    const sortedInternship = sortByYear(internship);
    const sortedProjects = sortByYear(projects);
    const sortedCsp = sortByYear(csp);

    // Group workshops and CRT by year
    const groupedWorkshops = groupByYear(workshopsSoc);
    const groupedCrt = groupByYear(crt);
    const sortedWorkshopYears = sortYearsDesc(Object.keys(groupedWorkshops));
    const sortedCrtYears = sortYearsDesc(Object.keys(groupedCrt));

    if (loading) {
        return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222]"></div>
                    <p className="mt-4 text-gray-600">Loading student achievements data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-center">{error}</p>
                    <p className="text-sm text-gray-600 text-center mt-2">Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Student Achievements</h2>

            <div className="space-y-6">
                {/* Student Achievements - Combined first dropdown */}
                <details open className="cst-dropdown">
                    <summary>Student Achievements</summary>
                    <div className="cst-dropdown-content">
                        {/* Student List PDF */}
                        {studentPdfList.length > 0 && (
                            <ul className="list-disc pl-6 my-2 space-y-2">
                                {studentPdfList.map((pdf: any, index: number) => (
                                    <li key={pdf.id || index}>
                                        {pdf.pdf_title}
                                        {pdf.file_url && (
                                            <>
                                                {' - '}
                                                <a href={pdf.file_url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">View</a>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Placement Summary Table */}
                        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Placement, Higher Studies and Entrepreneurship</h3>
                        {sortedPlacementSummary.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border text-sm text-center mb-6 table-auto">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-2 py-1">Academic Year</th>
                                            <th className="border px-2 py-1">Total No.of Final Year Students</th>
                                            <th className="border px-2 py-1">No.of students placed in companies or Government Sector</th>
                                            <th className="border px-2 py-1">No.of students admitted to higher studies</th>
                                            <th className="border px-2 py-1">No.of students turned entrepreneur</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedPlacementSummary.map((row: any, index: number) => (
                                            <tr key={row.id || index} className="hover:bg-gray-50">
                                                <td className="border px-2 py-1">{row.academic_year || '-'}</td>
                                                <td className="border px-2 py-1">{row.total_final_year_students || '-'}</td>
                                                <td className="border px-2 py-1">{row.students_placed || '-'}</td>
                                                <td className="border px-2 py-1">{row.students_higher_studies || '-'}</td>
                                                <td className="border px-2 py-1">{row.students_entrepreneur || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No placement summary data available.</p>
                        )}

                        {/* Internships/Certificates Summary Table */}
                        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Internships/Certificates/Workshop</h3>
                        {sortedInternshipsSummary.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full border text-sm text-center mb-6 table-auto">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border px-2 py-1" rowSpan={2}>Academic Year</th>
                                            <th className="border px-2 py-1" colSpan={3}>Certificates</th>
                                            <th className="border px-2 py-1" colSpan={3}>Internships</th>
                                            <th className="border px-2 py-1" rowSpan={2}>Workshops</th>
                                            <th className="border px-2 py-1" rowSpan={2}>Co-Curricular Activities</th>
                                        </tr>
                                        <tr>
                                            <th className="border px-2 py-1">NPTEL</th>
                                            <th className="border px-2 py-1">Coursera</th>
                                            <th className="border px-2 py-1">Others</th>
                                            <th className="border px-2 py-1">Internshala</th>
                                            <th className="border px-2 py-1">APSSDC</th>
                                            <th className="border px-2 py-1">Others</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedInternshipsSummary.map((row: any, index: number) => (
                                            <tr key={row.id || index} className="hover:bg-gray-50">
                                                <td className="border px-2 py-1">{row.academic_year || '-'}</td>
                                                <td className="border px-2 py-1">{row.certificates_nptel || '-'}</td>
                                                <td className="border px-2 py-1">{row.certificates_coursera || '-'}</td>
                                                <td className="border px-2 py-1">{row.certificates_others || '-'}</td>
                                                <td className="border px-2 py-1">{row.internships_internshala || '-'}</td>
                                                <td className="border px-2 py-1">{row.internships_apssdc || '-'}</td>
                                                <td className="border px-2 py-1">{row.internships_others || '-'}</td>
                                                <td className="border px-2 py-1">{row.workshops || '-'}</td>
                                                <td className="border px-2 py-1">{row.cocurricular_activities || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No internships summary data available.</p>
                        )}
                    </div>
                </details>

                {/* Roll Of Honour */}
                <details className="cst-dropdown">
                    <summary>Roll Of Honour</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {rollOfHonour.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Batch</th>
                                        <th className="px-4 py-2 border">Regd No.</th>
                                        <th className="px-4 py-2 border">Name of Student</th>
                                        <th className="px-4 py-2 border">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rollOfHonour.map((student: any, index: number) => (
                                        <tr key={student.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border">{student.batch || '-'}</td>
                                            <td className="px-4 py-2 border">{student.regd_no || '-'}</td>
                                            <td className="px-4 py-2 border">{student.student_name || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{student.percentage || '-'}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No roll of honour data available.</p>
                        )}
                    </div>
                </details>

                {/* Placement */}
                <details className="cst-dropdown">
                    <summary>Placement</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {sortedPlacement.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">Academic Year</th>
                                        <th className="px-4 py-2 border">Total No.of Final Year Students</th>
                                        <th className="px-4 py-2 border">No.of students placed</th>
                                        <th className="px-4 py-2 border">No.of students in higher studies</th>
                                        <th className="px-4 py-2 border">No.of students entrepreneur</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedPlacement.map((row: any, index: number) => (
                                        <tr key={row.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{row.academic_year || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.total_final_year_students || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.students_placed || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.students_higher_studies || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.students_entrepreneur || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No placement data available.</p>
                        )}
                    </div>
                </details>

                {/* Higher Studies */}
                <details className="cst-dropdown">
                    <summary>Higher Studies</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {sortedHigherStudies.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">Academic Year</th>
                                        <th className="px-4 py-2 border">Total Final Year Students</th>
                                        <th className="px-4 py-2 border">Students admitted to higher studies</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedHigherStudies.map((row: any, index: number) => (
                                        <tr key={row.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{row.academic_year || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.total_final_year_students || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.students_higher_studies || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No higher studies data available.</p>
                        )}
                    </div>
                </details>

                {/* Competitive Examinations */}
                <details className="cst-dropdown">
                    <summary>Competitive Examinations</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {sortedCompetitiveExams.length > 0 ? (
                            <table className="w-full text-sm text-center text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-2 py-2 border">Year</th>
                                        <th className="px-2 py-2 border">NET</th>
                                        <th className="px-2 py-2 border">SLET</th>
                                        <th className="px-2 py-2 border">GMAT</th>
                                        <th className="px-2 py-2 border">CAT</th>
                                        <th className="px-2 py-2 border">GRE</th>
                                        <th className="px-2 py-2 border">JAM</th>
                                        <th className="px-2 py-2 border">IELTS</th>
                                        <th className="px-2 py-2 border">TOEFL</th>
                                        <th className="px-2 py-2 border">Civil Services</th>
                                        <th className="px-2 py-2 border">State Govt Exams</th>
                                        <th className="px-2 py-2 border">Other Exams</th>
                                        <th className="px-2 py-2 border">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCompetitiveExams.map((row: any, index: number) => (
                                        <tr key={row.id || index} className="hover:bg-gray-50">
                                            <td className="px-2 py-2 border font-semibold">{row.year || '-'}</td>
                                            <td className="px-2 py-2 border">{row.net || '-'}</td>
                                            <td className="px-2 py-2 border">{row.slet || '-'}</td>
                                            <td className="px-2 py-2 border">{row.gmat || '-'}</td>
                                            <td className="px-2 py-2 border">{row.cat || '-'}</td>
                                            <td className="px-2 py-2 border">{row.gre || '-'}</td>
                                            <td className="px-2 py-2 border">{row.jam || '-'}</td>
                                            <td className="px-2 py-2 border">{row.ielts || '-'}</td>
                                            <td className="px-2 py-2 border">{row.toefl || '-'}</td>
                                            <td className="px-2 py-2 border">{row.civil_services || '-'}</td>
                                            <td className="px-2 py-2 border">{row.state_govt_exams || '-'}</td>
                                            <td className="px-2 py-2 border">{row.other_exams || '-'}</td>
                                            <td className="px-2 py-2 border font-semibold">{row.total || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No competitive examinations data available.</p>
                        )}
                    </div>
                </details>

                {/* Course Certifications */}
                <details className="cst-dropdown">
                    <summary>Course Certifications</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {sortedCourseCerts.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">Academic Year</th>
                                        <th className="px-4 py-2 border text-center">NPTEL</th>
                                        <th className="px-4 py-2 border text-center">Coursera</th>
                                        <th className="px-4 py-2 border text-center">Others</th>
                                        <th className="px-4 py-2 border text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCourseCerts.map((row: any, index: number) => (
                                        <tr key={row.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{row.academic_year || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.nptel || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.coursera || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.others || '-'}</td>
                                            <td className="px-4 py-2 border text-center font-semibold">{row.total || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No course certifications data available.</p>
                        )}
                    </div>
                </details>

                {/* Internship */}
                <details className="cst-dropdown">
                    <summary>Internship</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {sortedInternship.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">Academic Year</th>
                                        <th className="px-4 py-2 border text-center">Internshala</th>
                                        <th className="px-4 py-2 border text-center">APSSDC</th>
                                        <th className="px-4 py-2 border text-center">Others</th>
                                        <th className="px-4 py-2 border text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedInternship.map((row: any, index: number) => (
                                        <tr key={row.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{row.academic_year || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.internshala || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.apssdc || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{row.others || '-'}</td>
                                            <td className="px-4 py-2 border text-center font-semibold">{row.total || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No internship data available.</p>
                        )}
                    </div>
                </details>

                {/* Workshops/SOC */}
                <details className="cst-dropdown">
                    <summary>Workshops/SOC</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {sortedWorkshopYears.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Workshops/SOC attended/conducted</th>
                                        <th className="px-4 py-2 border">In association/college attended</th>
                                        <th className="px-4 py-2 border">Start Date</th>
                                        <th className="px-4 py-2 border">End Date</th>
                                        <th className="px-4 py-2 border">No of students</th>
                                        <th className="px-4 py-2 border">Duration</th>
                                        <th className="px-4 py-2 border">Year/Sem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedWorkshopYears.map((year) => (
                                        <React.Fragment key={year}>
                                            <tr className="bg-gray-800 text-white">
                                                <td colSpan={8} className="px-4 py-3 border text-center font-semibold">
                                                    Academic Year {year}
                                                </td>
                                            </tr>
                                            {groupedWorkshops[year].map((workshop: any, index: number) => (
                                                <tr key={workshop.id || index} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                                                    <td className="px-4 py-2 border">{workshop.workshop_name || '-'}</td>
                                                    <td className="px-4 py-2 border">{workshop.association_college || '-'}</td>
                                                    <td className="px-4 py-2 border text-center">
                                                        {workshop.start_date ? new Date(workshop.start_date).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center">
                                                        {workshop.end_date ? new Date(workshop.end_date).toLocaleDateString() : '-'}
                                                    </td>
                                                    <td className="px-4 py-2 border text-center">{workshop.no_of_students || '-'}</td>
                                                    <td className="px-4 py-2 border text-center">{workshop.duration || '-'}</td>
                                                    <td className="px-4 py-2 border text-center">{workshop.year_sem || '-'}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No workshops data available.</p>
                        )}
                    </div>
                </details>

                {/* CRT */}
                <details className="cst-dropdown">
                    <summary>CRT</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {sortedCrtYears.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Name of the Training Activity</th>
                                        <th className="px-4 py-2 border">No of students attended</th>
                                        <th className="px-4 py-2 border">Duration</th>
                                        <th className="px-4 py-2 border">Resource Person</th>
                                        <th className="px-4 py-2 border">Target Audience</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCrtYears.map((year) => (
                                        <React.Fragment key={year}>
                                            <tr className="bg-gray-800 text-white">
                                                <td colSpan={6} className="px-4 py-3 border text-center font-semibold">
                                                    Academic Year {year}
                                                </td>
                                            </tr>
                                            {groupedCrt[year].map((training: any, index: number) => (
                                                <tr key={training.id || index} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                                                    <td className="px-4 py-2 border">{training.training_activity || '-'}</td>
                                                    <td className="px-4 py-2 border text-center">{training.no_of_students || '-'}</td>
                                                    <td className="px-4 py-2 border">{training.duration || '-'}</td>
                                                    <td className="px-4 py-2 border">{training.resource_person || '-'}</td>
                                                    <td className="px-4 py-2 border">{training.target_audience || '-'}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No CRT data available.</p>
                        )}
                    </div>
                </details>

                {/* Projects */}
                <details className="cst-dropdown">
                    <summary>Projects</summary>
                    <div className="cst-dropdown-content">
                        {sortedProjects.length > 0 ? (
                            <ul className="list-disc pl-6 my-2 space-y-2">
                                {sortedProjects.map((project: any, index: number) => (
                                    <li key={project.id || index}>
                                        Projects during the A.Y {project.academic_year}
                                        {project.file_url && (
                                            <>
                                                {' - '}
                                                <a href={project.file_url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">
                                                    View Here
                                                </a>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No projects data available.</p>
                        )}
                    </div>
                </details>

                {/* CSP */}
                <details className="cst-dropdown">
                    <summary>CSP</summary>
                    <div className="cst-dropdown-content">
                        {sortedCsp.length > 0 ? (
                            <ul className="list-disc pl-6 my-2 space-y-2">
                                {sortedCsp.map((cspItem: any, index: number) => (
                                    <li key={cspItem.id || index}>
                                        List of CSP Projects done by {cspItem.academic_year} Batch Students
                                        {cspItem.file_url && (
                                            <>
                                                {' - '}
                                                <a href={cspItem.file_url} target="_blank" rel="noopener noreferrer" className="text-[#B22222] hover:underline">
                                                    View Here
                                                </a>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No CSP data available.</p>
                        )}
                    </div>
                </details>
            </div>
        </div>
    );
};
