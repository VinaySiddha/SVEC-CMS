import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  StudentAchievement, 
  studentAchievementSchema, 
  AchievementTypes,
  ProgramTypes,
  getRequiredFieldsByType
} from "@/utils/student-achievements-utils";
import { z } from "zod";

interface StudentAchievementFormProps {
  achievement?: StudentAchievement;
  isEdit?: boolean;
}

export default function StudentAchievementForm({ 
  achievement, 
  isEdit = false 
}: StudentAchievementFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<StudentAchievement>>({
    dept: "",
    type: AchievementTypes[0],
    title: "",
    name: "",
    roll_number: "",
    program: "na",
    cgpa: undefined,
    score: "",
    guide_name: "",
    batch: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofPreview, setProofPreview] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  // Get required fields based on selected type
  const requiredFields = getRequiredFieldsByType(formData.type as typeof AchievementTypes[number]);

  useEffect(() => {
    if (achievement) {
      setFormData({
        ...achievement,
      });

      if (achievement.proof_url) {
        setProofPreview(achievement.proof_url);
      }
    }
  }, [achievement]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === 'cgpa') {
      const numValue = value === "" ? undefined : parseFloat(value);
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // If type changes, adjust required fields
    if (name === 'type') {
      // Reset fields that might not be required for the new type
      setFormData(prev => ({
        ...prev,
        type: value as typeof AchievementTypes[number]
      }));
    }
  };

  const handleProofFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProofFile(file);
      
      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      setProofPreview(fileUrl);
    }
  };

  const validateForm = (): boolean => {
    try {
      // Create a modified schema based on the achievement type
      let schemaToUse = studentAchievementSchema;
      
      // Validate data against the schema
      schemaToUse.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach(error => {
          const field = error.path[0] as string;
          newErrors[field] = error.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData object for file uploads
      const formDataObj = new FormData();
      
      // Add form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataObj.append(key, value.toString());
        }
      });
      
      // Add proof file if present
      if (proofFile) {
        formDataObj.append("proof", proofFile);
      }
      
      // Determine API endpoint and HTTP method
      const url = isEdit && achievement?.id 
        ? `/api/student-achievements/${achievement.id}` 
        : "/api/student-achievements";
      const method = isEdit ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        body: formDataObj, // No Content-Type header needed for FormData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save student achievement");
      }
      
      // Redirect to student achievements list on success
      router.push("/admin/student-achievements");
    } catch (error: any) {
      console.error("Error saving student achievement:", error);
      setSubmitError(error.message || "Failed to save student achievement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {submitError && (
        <div className="bg-red-50 border border-red-400 text-red-700 p-3 rounded">
          {submitError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="dept" className="block text-sm font-medium text-gray-700">Department</label>
          <select
            id="dept"
            name="dept"
            value={formData.dept}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.dept ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            required
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics & Communication Engineering</option>
            <option value="EEE">Electrical & Electronics Engineering</option>
            <option value="MECH">Mechanical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
            <option value="AIML">AI & Machine Learning</option>
            <option value="DS">Data Science</option>
            <option value="MBA">MBA</option>
            <option value="BSH">Basic Sciences & Humanities</option>
          </select>
          {errors.dept && <p className="mt-1 text-sm text-red-600">{errors.dept}</p>}
        </div>
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Achievement Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            required
          >
            <option value="">Select Type</option>
            {AchievementTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Achievement Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`mt-1 block w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="roll_number" className="block text-sm font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            id="roll_number"
            name="roll_number"
            value={formData.roll_number}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.roll_number ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {errors.roll_number && <p className="mt-1 text-sm text-red-600">{errors.roll_number}</p>}
        </div>
      </div>
      
      {/* Conditionally show fields based on achievement type */}
      {requiredFields.program && (
        <div>
          <label htmlFor="program" className="block text-sm font-medium text-gray-700">Program</label>
          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.program ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            required={requiredFields.program}
          >
            <option value="na">Select Program</option>
            <option value="btech">B.Tech</option>
            <option value="mtech">M.Tech</option>
          </select>
          {errors.program && <p className="mt-1 text-sm text-red-600">{errors.program}</p>}
        </div>
      )}

      {requiredFields.guide_name && (
        <div>
          <label htmlFor="guide_name" className="block text-sm font-medium text-gray-700">Guide Name</label>
          <input
            type="text"
            id="guide_name"
            name="guide_name"
            value={formData.guide_name || ''}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.guide_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.guide_name && <p className="mt-1 text-sm text-red-600">{errors.guide_name}</p>}
        </div>
      )}

      {requiredFields.score && (
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">Score/Result</label>
          <input
            type="text"
            id="score"
            name="score"
            value={formData.score || ''}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.score ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.score && <p className="mt-1 text-sm text-red-600">{errors.score}</p>}
        </div>
      )}

      {requiredFields.batch && (
        <div>
          <label htmlFor="batch" className="block text-sm font-medium text-gray-700">Batch</label>
          <input
            type="text"
            id="batch"
            name="batch"
            value={formData.batch || ''}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.batch ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="e.g., 2022-2026"
          />
          {errors.batch && <p className="mt-1 text-sm text-red-600">{errors.batch}</p>}
        </div>
      )}

      {requiredFields.cgpa && (
        <div>
          <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">CGPA</label>
          <input
            type="number"
            id="cgpa"
            name="cgpa"
            step="0.01"
            min="0"
            max="10"
            value={formData.cgpa || ''}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.cgpa ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.cgpa && <p className="mt-1 text-sm text-red-600">{errors.cgpa}</p>}
        </div>
      )}
      
      <div>
        <label htmlFor="proofFile" className="block text-sm font-medium text-gray-700">
          Proof Document
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="proofFile"
            onChange={handleProofFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        {proofPreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Proof document uploaded</p>
            {proofPreview.startsWith("blob:") || proofPreview.startsWith("http") ? (
              <a 
                href={proofPreview} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Preview document
              </a>
            ) : (
              <span className="text-sm">File saved, will be updated on submit</span>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : isEdit ? "Update Achievement" : "Create Achievement"}
        </button>
      </div>
    </form>
  );
}
