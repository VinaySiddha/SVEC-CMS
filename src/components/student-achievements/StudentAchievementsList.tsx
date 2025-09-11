import { useCallback, useEffect, useState } from "react";
import { 
  StudentAchievement, 
  AchievementTypes, 
  ProgramTypes,
  getRequiredFieldsByType 
} from "@/utils/student-achievements-utils";
import Link from "next/link";

interface StudentAchievementsListProps {
  departmentFilter?: string;
  limit?: number;
  showAddButton?: boolean;
}

export default function StudentAchievementsList({ 
  departmentFilter, 
  limit, 
  showAddButton = false 
}: StudentAchievementsListProps) {
  const [achievements, setAchievements] = useState<StudentAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [programFilter, setProgramFilter] = useState<string>("");

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (departmentFilter) {
        params.append('dept', departmentFilter);
      }
      if (typeFilter) {
        params.append('type', typeFilter);
      }
      if (programFilter && programFilter !== 'all') {
        params.append('program', programFilter);
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      
      const queryString = params.toString();
      const url = `/api/student-achievements${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch student achievements');
      
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching student achievements:', error);
    } finally {
      setLoading(false);
    }
  }, [departmentFilter, typeFilter, programFilter, limit]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };

  const handleProgramFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProgramFilter(e.target.value);
  };

  // Helper to render appropriate fields based on achievement type
  const renderDetails = (achievement: StudentAchievement) => {
    const requiredFields = getRequiredFieldsByType(achievement.type);
    
    return (
      <>
        {requiredFields.program && achievement.program && achievement.program !== 'na' && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Program:</span> {achievement.program === 'btech' ? 'B.Tech' : achievement.program === 'mtech' ? 'M.Tech' : achievement.program}
          </div>
        )}
        
        {requiredFields.guide_name && achievement.guide_name && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Guide:</span> {achievement.guide_name}
          </div>
        )}
        
        {requiredFields.score && achievement.score && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Score/Result:</span> {achievement.score}
          </div>
        )}
        
        {requiredFields.batch && achievement.batch && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Batch:</span> {achievement.batch}
          </div>
        )}
        
        {requiredFields.cgpa && achievement.cgpa && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">CGPA:</span> {achievement.cgpa}
          </div>
        )}
      </>
    );
  };

  if (loading) {
    return <div className="py-10 text-center">Loading student achievements...</div>;
  }

  return (
    <div className="py-6">
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700">
            Filter by Type
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={handleTypeFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All Types</option>
            {AchievementTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="program-filter" className="block text-sm font-medium text-gray-700">
            Filter by Program
          </label>
          <select
            id="program-filter"
            value={programFilter}
            onChange={handleProgramFilterChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Programs</option>
            <option value="btech">B.Tech</option>
            <option value="mtech">M.Tech</option>
          </select>
        </div>
      </div>
      
      {showAddButton && (
        <div className="mb-6 flex justify-end">
          <Link 
            href="/admin/student-achievements/add" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Student Achievement
          </Link>
        </div>
      )}

      {achievements.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500 mb-4">No student achievements found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="inline-block px-2 py-1 mb-2 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                  {achievement.type}
                </div>
                <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Student:</span> {achievement.name} ({achievement.roll_number})
                </p>
                {renderDetails(achievement)}
              </div>
              {achievement.proof_url && (
                <div className="px-4 pb-4">
                  <a 
                    href={achievement.proof_url}
                    className="text-sm text-blue-600 hover:underline inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Achievement Proof
                  </a>
                </div>
              )}
              {showAddButton && (
                <div className="px-4 pb-4 flex justify-end">
                  <Link 
                    href={`/admin/student-achievements/edit/${achievement.id}`}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
