import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Workshop, workshopSchema } from "@/utils/workshops-utils";
import { z } from "zod";

interface WorkshopFormProps {
  workshop?: Workshop;
  isEdit?: boolean;
}

export default function WorkshopForm({ workshop, isEdit = false }: WorkshopFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Workshop>>({
    dept: "",
    title: "",
    date_from: "",
    date_to: "",
    description: "",
    report_url: "",
    gallery: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportPreview, setReportPreview] = useState<string>("");
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string>("");

  useEffect(() => {
    if (workshop) {
      const dateFrom = workshop.date_from ? new Date(workshop.date_from) : new Date();
      const dateTo = workshop.date_to ? new Date(workshop.date_to) : new Date();
      
      setFormData({
        ...workshop,
        date_from: dateFrom.toISOString().split("T")[0],
        date_to: dateTo.toISOString().split("T")[0],
      });

      if (workshop.report_url) {
        setReportPreview(workshop.report_url);
      }

      if (workshop.gallery && workshop.gallery.length > 0) {
        setGalleryPreviews(workshop.gallery);
      }
    }
  }, [workshop]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleReportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReportFile(file);
      
      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      setReportPreview(fileUrl);
    }
  };

  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...filesArray]);
      
      // Create preview URLs
      const fileUrls = filesArray.map(file => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...fileUrls]);
    }
  };

  const removeGalleryPreview = (index: number) => {
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    
    // If we're editing and have existing gallery items from the server
    if (isEdit && formData.gallery && formData.gallery.length > index) {
      setFormData(prev => ({
        ...prev,
        gallery: prev.gallery?.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = (): boolean => {
    try {
      // Skip validation of report_url and gallery since they're optional
      const { report_url, gallery, ...requiredData } = formData;
      
      // Create a partial schema for required fields only
      const partialSchema = workshopSchema.pick({ 
        dept: true, title: true, date_from: true, date_to: true, description: true 
      });
      
      partialSchema.parse(requiredData);
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
        if (key !== "gallery") { // Handle gallery separately
          formDataObj.append(key, value as string);
        }
      });
      
      // Add report file if present
      if (reportFile) {
        formDataObj.append("report", reportFile);
      }
      
      // Add gallery files if present
      galleryFiles.forEach((file) => {
        formDataObj.append("gallery", file);
      });
      
      // If editing and has existing gallery URLs
      if (isEdit && formData.gallery && formData.gallery.length > 0) {
        // Include existing gallery URLs that weren't removed
        formDataObj.append("existingGallery", JSON.stringify(formData.gallery));
      }
      
      // Determine API endpoint and HTTP method
      const url = isEdit && workshop?.id 
        ? `/api/workshops/${workshop.id}` 
        : "/api/workshops";
      const method = isEdit ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        body: formDataObj, // No Content-Type header needed for FormData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save workshop");
      }
      
      // Redirect to workshops list on success
      router.push("/admin/workshops");
    } catch (error: any) {
      console.error("Error saving workshop:", error);
      setSubmitError(error.message || "Failed to save workshop");
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
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
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date_from" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="date_from"
            name="date_from"
            value={formData.date_from}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.date_from ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {errors.date_from && <p className="mt-1 text-sm text-red-600">{errors.date_from}</p>}
        </div>
        
        <div>
          <label htmlFor="date_to" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="date_to"
            name="date_to"
            value={formData.date_to}
            onChange={handleInputChange}
            className={`mt-1 block w-full p-2 border ${errors.date_to ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            required
          />
          {errors.date_to && <p className="mt-1 text-sm text-red-600">{errors.date_to}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={6}
          className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          required
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      
      <div>
        <label htmlFor="reportFile" className="block text-sm font-medium text-gray-700">
          Report (PDF)
        </label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            id="reportFile"
            onChange={handleReportFileChange}
            accept=".pdf"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        {reportPreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Report file uploaded</p>
            {reportPreview.startsWith("blob:") || reportPreview.startsWith("http") ? (
              <a 
                href={reportPreview} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Preview report
              </a>
            ) : (
              <span className="text-sm">File saved, will be updated on submit</span>
            )}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="galleryFiles" className="block text-sm font-medium text-gray-700">
          Gallery Images
        </label>
        <div className="mt-1">
          <input
            type="file"
            id="galleryFiles"
            onChange={handleGalleryFilesChange}
            accept="image/*"
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        
        {galleryPreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleryPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Gallery preview ${index + 1}`}
                  className="h-24 w-24 object-cover rounded border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryPreview(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
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
          ) : isEdit ? "Update Workshop" : "Create Workshop"}
        </button>
      </div>
    </form>
  );
}
