import React, { useState, useEffect } from 'react';
import { Search, Filter, Mail, GraduationCap, Award, BookOpen, User, ChevronRight, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  profile_url?: string;
  profileUrl?: string;
  email?: string;
  specialization?: string;
  date_of_joining?: string;
}

// Designation priority mapping for sorting
const getDesignationPriority = (designation: string): number => {
  const designationLower = designation.toLowerCase().trim();

  // Professor & Head (highest priority) - check for both "professor & head" and "head & professor"
  if ((designationLower.includes('professor') && designationLower.includes('head')) || 
      (designationLower.includes('professor') && designationLower.includes('hod'))) return 1;
  
  // Professor (including Professor & Dean, etc.)
  if (designationLower === 'professor' || designationLower.startsWith('professor &')) return 2;
  
  // Associate Professor (Assoc.Professor, Associate Professor, etc.)
  if (designationLower.includes('assoc') && designationLower.includes('professor')) return 3;
  
  // Sr. Assistant Professor (Sr. Asst. Professor, Sr Assistant Professor, Sr. Assist Professor, etc.)
  if (designationLower.includes('sr') && (designationLower.includes('asst') || designationLower.includes('assist') || designationLower.includes('assistant'))) return 4;
  
  // Assistant Professor (Assistant Professor, Asst.Professor, Assist Professor, etc.)
  if ((designationLower.includes('asst') || designationLower.includes('assist') || designationLower.includes('assistant')) && designationLower.includes('professor')) return 5;
  
  // Lecturer
  if (designationLower.includes('lecturer')) return 6;

  return 999; // Unknown designations go to end
};

// Sort faculty by designation priority (ascending) then by ID (ascending)
const sortFacultyByDesignationAndID = (facultyList: FacultyMember[]): FacultyMember[] => {
  console.log('[sortFacultyByDesignationAndID] Input:', facultyList.length, 'members');
  try {
    const sorted = [...facultyList].sort((a, b) => {
      const priorityA = getDesignationPriority(a.designation);
      const priorityB = getDesignationPriority(b.designation);

      // First sort by designation priority
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If same designation, sort by ID (database order)
      return a.id - b.id;
    });
    console.log('[sortFacultyByDesignationAndID] Output:', sorted.length, 'members');
    return sorted;
  } catch (err) {
    console.error('[sortFacultyByDesignationAndID] Error:', err);
    return facultyList;
  }
};

const FacultyPage = () => {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [searchQuery, setSearchQuery] = useState('');
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const branches = [
    { id: 'AIML', name: 'Artificial Intelligence & Machine Learning' },
    { id: 'BSH', name: 'Basic Sciences & Humanities' },
    { id: 'CIVIL', name: 'Civil Engineering' },
    { id: 'CSE', name: 'Computer Science & Engineering' },
    { id: 'CAI', name: 'CSE(Artificial Intelligence)' },
    { id: 'CST', name: 'Computer Science & Technology' },
    { id: 'DS', name: 'Data Science' },
    { id: 'ECE', name: 'Electronics & Communication Engineering' },
    { id: 'ECT', name: 'Electronics & Communication Technology' },
    { id: 'EEE', name: 'Electrical & Electronics Engineering' },
    { id: 'MBA', name: 'Master of Business Administration' },
    { id: 'MECH', name: 'Mechanical Engineering' }
  ];

  useEffect(() => {
    console.log('[useEffect START] selectedBranch:', selectedBranch);
    const fetchFaculty = async () => {
      console.log('[useEffect] Fetching faculty for branch:', selectedBranch);
      setLoading(true);
      setError(null);
      try {
        // Fetch faculty data from API
        const url = `/api/faculty?branchName=${selectedBranch}`;
        console.log('[fetchFaculty] URL:', url);
        console.log('[fetchFaculty] About to fetch...');
        const response = await fetch(url);
        console.log('[fetchFaculty] Fetch completed');
        
        console.log('[fetchFaculty] Response status:', response.status);
        console.log('[fetchFaculty] Response ok:', response.ok);
        
        if (!response.ok) {
          // If response is not ok, set empty array instead of throwing error
          console.warn(`[fetchFaculty] No faculty data available for ${selectedBranch}`);
          setFaculty([]);
          setError(null); // Don't show error for empty data
        } else {
          const data = await response.json();
          console.log('[fetchFaculty] Raw data received:', data);
          console.log('[fetchFaculty] Data type:', typeof data);
          console.log('[fetchFaculty] Is array:', Array.isArray(data));
          console.log('[fetchFaculty] Data length:', Array.isArray(data) ? data.length : 'N/A');
          
          if (!Array.isArray(data)) {
            console.error('[fetchFaculty] Data is not an array:', data);
            setFaculty([]);
          } else if (data.length === 0) {
            console.warn('[fetchFaculty] Empty faculty data received');
            setFaculty([]);
          } else {
            // Apply sorting by designation and ID
            try {
              const sortedFaculty = sortFacultyByDesignationAndID(data);
              console.log('[fetchFaculty] Sorted faculty:', sortedFaculty.length, 'members');
              setFaculty(sortedFaculty);
            } catch (sortErr) {
              console.error('[fetchFaculty] Error sorting faculty:', sortErr);
              setFaculty(data); // Fallback to unsorted data
            }
          }
          setError(null);
        }
      } catch (err: any) {
        console.error('[fetchFaculty] Caught error:', err);
        console.error('[fetchFaculty] Error message:', err.message);
        setFaculty([]);
        setError(null); // Don't show error to user, just show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [selectedBranch]);

  const filteredFaculty = faculty.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pt-24">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Faculty Directory</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto animate-fade-in">
            Meet our distinguished faculty members who are dedicated to academic excellence and research innovation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 -mt-12 relative z-20 border border-gray-100 max-w-5xl mx-auto animate-fade-in">
          <div className="flex flex-col md:flex-row gap-6 items-end justify-between">
            
            {/* Branch Selector */}
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Select Department</label>
              <div className="relative group">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-base rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary block p-4 pr-8 transition-all duration-200 hover:border-primary/50 cursor-pointer"
                >
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 group-hover:text-primary transition-colors">
                  <ChevronRight className="h-5 w-5 rotate-90" />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Search Faculty</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full p-4 pl-12 text-base text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 hover:border-primary/50"
                  placeholder="Search by name or designation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-red-100">
            <div className="text-red-500 text-xl mb-2 font-semibold">Unable to load faculty data</div>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No faculty members found</h3>
            <p className="text-gray-500 max-w-md mx-auto">Total faculty loaded: {faculty.length}, Filtered: {filteredFaculty.length}, Search query: "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in pb-12">
            {filteredFaculty.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group hover:-translate-y-1">
                <div className="p-6 flex-grow relative">
                  {/* Decorative background element */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-primary/10"></div>
                  
                  <div className="flex items-start gap-5 relative z-10">
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2" title={member.name}>
                        {member.name}
                      </h3>
                      <p className="text-primary font-semibold text-sm mb-2">{member.designation}</p>
                      <div className="flex items-center text-gray-500 text-xs gap-1.5 bg-gray-50 py-1 px-2 rounded-md inline-flex max-w-full">
                        <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate font-medium" title={member.qualification}>{member.qualification}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                    {member.email && (
                      <div className="flex items-center gap-3 text-sm text-gray-600 group/link">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-primary/10 transition-colors">
                          <Mail className="w-4 h-4 text-gray-400 group-hover/link:text-primary transition-colors" />
                        </div>
                        <a href={`mailto:${member.email}`} className="hover:text-primary truncate transition-colors font-medium">
                          {member.email}
                        </a>
                      </div>
                    )}
                    {member.specialization && (
                      <div className="flex items-start gap-3 text-sm text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="line-clamp-2 leading-relaxed py-1">{member.specialization}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center group-hover:bg-primary/5 transition-colors">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {selectedBranch}
                  </span>
                  {member.profile_url || member.profileUrl ? (
                    <a 
                      href={member.profile_url || member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm font-bold flex items-center gap-1 transition-all group-hover:translate-x-1"
                    >
                      View Profile <ChevronRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm font-bold flex items-center gap-1 cursor-not-allowed">
                      View Profile <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default FacultyPage;
