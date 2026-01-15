'use client';

import React, { useState, useRef } from 'react';

interface FileUploadProps {
  id: string;
  label: string;
  accept?: string;
  maxSizeMB?: number;
  onChange: (file: File | null) => void;
  error?: string;
  value?: File | string | null;
  className?: string;
  helpText?: string;
  required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept = 'image/jpeg,image/png,image/webp',
  maxSizeMB = 2,
  onChange,
  error,
  value,
  className = '',
  helpText,
  required = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(typeof value === 'string' ? value : null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const validateFile = (file: File) => {
    // Check file type
    if (!accept.split(',').some(type => file.type === type)) {
      return `File must be ${accept.split(',').join(' or ')}`;
    }
    
    // Check file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size must be less than ${maxSizeMB}MB`;
    }
    
    return null;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalError(null);
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validationError = validateFile(file);
      
      if (validationError) {
        setLocalError(validationError);
        onChange(null);
        return;
      }
      
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      onChange(file);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setLocalError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validationError = validateFile(file);
      
      if (validationError) {
        setLocalError(validationError);
        return;
      }
      
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      onChange(file);
    }
  };
  
  const handleClick = () => {
    inputRef.current?.click();
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onChange(null);
  };
  
  const displayError = error || localError;
  
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        } ${displayError ? 'border-red-300' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input 
          id={id}
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
        
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-40 mx-auto object-contain"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-3">
            <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600">Drag & drop your file here or click to select</p>
            <p className="text-xs text-gray-500 mt-1">
              {accept.split(',').map(type => type.split('/')[1]).join(' or ')} files up to {maxSizeMB}MB
            </p>
          </div>
        )}
      </div>
      
      {displayError && (
        <p className="mt-1 text-sm text-red-600">{displayError}</p>
      )}
      
      {helpText && !displayError && (
        <p className="mt-1 text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default FileUpload;
