import React, { useState, useEffect } from 'react';

interface ResearchCenterProps {
    department?: string;
}

export const ResearchCenter: React.FC<ResearchCenterProps> = ({ department = 'eee' }) => {
    // State for all 8 research tables
    const [researchVerticles, setResearchVerticles] = useState<any[]>([]);
    const [researchSupervisors, setResearchSupervisors] = useState<any[]>([]);
    const [journalPublications, setJournalPublications] = useState<any[]>([]);
    const [conferencePublications, setConferencePublications] = useState<any[]>([]);
    const [patents, setPatents] = useState<any[]>([]);
    const [bookPublications, setBookPublications] = useState<any[]>([]);
    const [careerAdvancements, setCareerAdvancements] = useState<any[]>([]);
    const [interactionOutsideWorld, setInteractionOutsideWorld] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all research data on component mount
    useEffect(() => {
        const fetchResearchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch all research tables from the public API
                const response = await fetch(`/api/public/departments/${department}/research-center`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }

                const result = await response.json();

                if (result.success && result.data) {
                    setResearchVerticles(result.data.researchVerticles || []);
                    setResearchSupervisors(result.data.researchSupervisors || []);
                    setJournalPublications(result.data.journalPublications || []);
                    setConferencePublications(result.data.conferencePublications || []);
                    setPatents(result.data.patents || []);
                    setBookPublications(result.data.bookPublications || []);
                    setCareerAdvancements(result.data.careerAdvancements || []);
                    setInteractionOutsideWorld(result.data.interactionOutsideWorld || []);

                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                setError('Failed to load research data');
            } finally {
                setLoading(false);
            }
        };

        fetchResearchData();
    }, [department]);

    // Group verticles by category
    const groupedVerticles = researchVerticles.reduce((acc: any, item: any) => {
        const category = item.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    // Sort career advancements by joining date
    const sortedCareerAdvancements = [...careerAdvancements].sort((a, b) => {
        const dateA = new Date(a.joining_date || 0).getTime();
        const dateB = new Date(b.joining_date || 0).getTime();
        return dateB - dateA; // Most recent first
    });

    // Group conference publications by academic year
    const groupedConferencePublications = conferencePublications.reduce((acc: any, pub: any) => {
        // Extract academic year from year field (e.g., "2024-25" or just "2024")
        const academicYear = pub.year || 'Unknown';
        if (!acc[academicYear]) acc[academicYear] = [];
        acc[academicYear].push(pub);
        return acc;
    }, {});

    // Sort academic years in descending order
    const sortedAcademicYears = Object.keys(groupedConferencePublications).sort((a, b) => {
        // Extract first year for comparison
        const yearA = parseInt(a.split('-')[0]) || 0;
        const yearB = parseInt(b.split('-')[0]) || 0;
        return yearB - yearA;
    });

    if (loading) {
        return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Research Center</h2>
                <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#B22222]"></div>
                    <p className="mt-4 text-gray-600">Loading research data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Research Center</h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-center">{error}</p>
                    <p className="text-sm text-gray-600 text-center mt-2">Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold text-[#B22222] mb-6 text-center">Research Center</h2>

            <div className="space-y-6">
                {/* Research Verticles */}
                <details open className="cst-dropdown">
                    <summary>Research Verticles</summary>
                    <div className="cst-dropdown-content">
                        {Object.keys(groupedVerticles).length > 0 ? (
                            <div className="space-y-4">
                                {Object.entries(groupedVerticles).map(([category, members]: [string, any]) => (
                                    <div key={category}>
                                        <h3 className="text-lg font-bold text-[#B22222] mb-2">{category}</h3>
                                        <ol className="list-decimal list-inside space-y-1 pl-2">
                                            {members
                                                .sort((a: any, b: any) => (a.order_number || 999) - (b.order_number || 999))
                                                .map((member: any, idx: number) => (
                                                    <li key={member.id || idx}>{member.faculty_name}</li>
                                                ))}
                                        </ol>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No research verticles data available.</p>
                        )}
                    </div>
                </details>

                {/* Research Supervisor */}
                <details className="cst-dropdown">
                    <summary>Research Supervisor</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {researchSupervisors.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Name of the Supervisors Body</th>
                                        <th className="px-4 py-2 border">Name of the Scholar</th>
                                        <th className="px-4 py-2 border">Status</th>
                                        <th className="px-4 py-2 border">Proof</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {researchSupervisors.map((supervisor: any, index: number) => (
                                        <tr key={supervisor.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border">{supervisor.name || '-'}</td>
                                            <td className="px-4 py-2 border">{supervisor.scholar_name || '-'}</td>
                                            <td className="px-4 py-2 border text-center">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${supervisor.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    supervisor.status === 'On Going' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {supervisor.status || '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 border text-center">
                                                {supervisor.file_url ? (
                                                    <a
                                                        href={supervisor.file_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#B22222] hover:underline font-semibold"
                                                    >
                                                        View
                                                    </a>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No research supervisor data available.</p>
                        )}
                    </div>
                </details>

                {/* Journal Publications */}
                <details className="cst-dropdown">
                    <summary>Journal Publications</summary>
                    <div className="cst-dropdown-content">
                        {journalPublications.length > 0 ? (
                            <ul className="list-disc pl-6 my-2 space-y-2">
                                {journalPublications.map((publication: any, index: number) => (
                                    <li key={publication.id || index}>
                                        Journal Publications Details {publication.year}
                                        {publication.file_url && (
                                            <>
                                                {' - '}
                                                <a
                                                    href={publication.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#B22222] hover:underline"
                                                >
                                                    View
                                                </a>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No journal publications data available.</p>
                        )}
                    </div>
                </details>

                {/* Conference Publications */}
                <details className="cst-dropdown">
                    <summary>Conference Publications</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {conferencePublications.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Name of the Faculty</th>
                                        <th className="px-4 py-2 border">Title of the Paper</th>
                                        <th className="px-4 py-2 border">Title of the proceedings of the conference</th>
                                        <th className="px-4 py-2 border">ISBN/ISSN number of the proceeding</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedAcademicYears.map((year) => (
                                        <React.Fragment key={year}>
                                            {/* Academic Year Header Row */}
                                            <tr className="bg-gray-800 text-white">
                                                <td colSpan={5} className="px-4 py-3 border text-center font-semibold">
                                                    Academic Year {year}
                                                </td>
                                            </tr>
                                            {/* Publications for this year */}
                                            {groupedConferencePublications[year].map((publication: any, index: number) => (
                                                <tr key={publication.id || index} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                                                    <td className="px-4 py-2 border">{publication.faculty_name || '-'}</td>
                                                    <td className="px-4 py-2 border">{publication.paper_title || '-'}</td>
                                                    <td className="px-4 py-2 border">{publication.proceedings_title || '-'}</td>
                                                    <td className="px-4 py-2 border text-center">{publication.isbn_issn || '-'}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No conference publications data available.</p>
                        )}
                    </div>
                </details>

                {/* Patents */}
                <details className="cst-dropdown">
                    <summary>Patents</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {patents.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Patent Title</th>
                                        <th className="px-4 py-2 border">Name of the Inventor(s)</th>
                                        <th className="px-4 py-2 border">Patent No.</th>
                                        <th className="px-4 py-2 border">Date of Publication</th>
                                        <th className="px-4 py-2 border">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patents.map((patent: any, index: number) => (
                                        <tr key={patent.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border">{patent.patent_title || '-'}</td>
                                            <td className="px-4 py-2 border">{patent.inventors || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{patent.patent_number || '-'}</td>
                                            <td className="px-4 py-2 border text-center">
                                                {patent.publication_date ? new Date(patent.publication_date).toLocaleDateString('en-GB') : '-'}
                                            </td>
                                            <td className="px-4 py-2 border text-center">{patent.status || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No patents data available.</p>
                        )}
                    </div>
                </details>

                {/* Book Publications */}
                <details className="cst-dropdown">
                    <summary>Book Publications</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {bookPublications.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Name of the Faculty</th>
                                        <th className="px-4 py-2 border">Title of the book published</th>
                                        <th className="px-4 py-2 border">Year</th>
                                        <th className="px-4 py-2 border">ISBN/ISSN</th>
                                        <th className="px-4 py-2 border">Publisher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookPublications.map((book: any, index: number) => (
                                        <tr key={book.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border">{book.faculty_name || '-'}</td>
                                            <td className="px-4 py-2 border">{book.book_title || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{book.year || '-'}</td>
                                            <td className="px-4 py-2 border text-center">{book.isbn || '-'}</td>
                                            <td className="px-4 py-2 border">{book.publisher || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No book publications data available.</p>
                        )}
                    </div>
                </details>

                {/* Career Advancements */}
                <details className="cst-dropdown">
                    <summary>Career Advancements</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {sortedCareerAdvancements.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Name of the Faculty</th>
                                        <th className="px-4 py-2 border">Enrolled Institute</th>
                                        <th className="px-4 py-2 border">Date of joining</th>
                                        <th className="px-4 py-2 border">Pursuing Degree</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedCareerAdvancements.map((career: any, index: number) => (
                                        <tr key={career.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border">{career.faculty_name || '-'}</td>
                                            <td className="px-4 py-2 border">{career.enrolled_institute || '-'}</td>
                                            <td className="px-4 py-2 border text-center">
                                                {career.joining_date ? new Date(career.joining_date).toLocaleDateString('en-GB') : '-'}
                                            </td>
                                            <td className="px-4 py-2 border">{career.pursuing_degree || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No career advancements data available.</p>
                        )}
                    </div>
                </details>

                {/* Interaction with outside the world */}
                <details className="cst-dropdown">
                    <summary>Interaction with outside the world</summary>
                    <div className="cst-dropdown-content overflow-x-auto">
                        {interactionOutsideWorld.length > 0 ? (
                            <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border">S.No.</th>
                                        <th className="px-4 py-2 border">Name of the Faculty</th>
                                        <th className="px-4 py-2 border">Details of the Journals</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {interactionOutsideWorld.map((interaction: any, index: number) => (
                                        <tr key={interaction.id || index} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border text-center">{index + 1}</td>
                                            <td className="px-4 py-2 border">{interaction.faculty_name || '-'}</td>
                                            <td className="px-4 py-2 border">{interaction.journal_details || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600 text-sm mt-2">No interaction data available.</p>
                        )}
                    </div>
                </details>
            </div>
        </div>
    );
};
