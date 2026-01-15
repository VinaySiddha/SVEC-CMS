/**
 * Faculty Research Modules - Module Selection Component
 * Allows faculty to enable/disable research modules
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ModuleType, MODULE_LABELS } from '@/types/facultyModules';

interface ModuleSelectionProps {
  facultyId: number;
  onSelectionChange?: (modules: ModuleType[]) => void;
  onSave?: (modules: ModuleType[]) => Promise<void>;
}

export const ResearchModuleSelection: React.FC<ModuleSelectionProps> = ({
  facultyId,
  onSelectionChange,
  onSave,
}) => {
  const [selectedModules, setSelectedModules] = useState<ModuleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const allModules: ModuleType[] = [
    ModuleType.RESEARCH_VERTICALS,
    ModuleType.RESEARCH_SUPERVISORS,
    ModuleType.JOURNAL_PUBLICATIONS,
    ModuleType.CONFERENCE_PUBLICATIONS,
    ModuleType.PATENTS,
    ModuleType.BOOK_PUBLICATIONS,
    ModuleType.CAREER_ADVANCEMENTS,
    ModuleType.INTERACTION_OUTSIDE_WORLD,
  ];

  // Load saved module selection
  useEffect(() => {
    const loadSelection = async () => {
      try {
        const response = await fetch(
          `/api/admin/eee/faculty-module-selection?faculty_id=${facultyId}`
        );
        const result = await response.json();
        if (result.success && result.data) {
          const modules = result.data.selected_modules || [];
          setSelectedModules(modules);
        }
      } catch (error) {
        console.error('Error loading module selection:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSelection();
  }, [facultyId]);

  const handleModuleToggle = (module: ModuleType) => {
    setSelectedModules((prev) => {
      const updated = prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module];
      
      if (onSelectionChange) {
        onSelectionChange(updated);
      }
      
      return updated;
    });
  };

  const handleSelectAll = () => {
    setSelectedModules(allModules);
    if (onSelectionChange) {
      onSelectionChange(allModules);
    }
  };

  const handleClearAll = () => {
    setSelectedModules([]);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    setSaving(true);
    setMessage('');
    
    try {
      await onSave(selectedModules);
      setMessage('Modules saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading modules...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Research Modules Selection</h2>
        <p className="text-gray-600 mt-1">
          Select the research modules you want to display in your faculty profile
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSelectAll}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Select All
        </button>
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Clear All
        </button>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allModules.map((module) => (
          <label
            key={module}
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
          >
            <input
              type="checkbox"
              checked={selectedModules.includes(module)}
              onChange={() => handleModuleToggle(module)}
              className="w-5 h-5 text-blue-600 rounded cursor-pointer"
            />
            <span className="ml-3 font-semibold text-gray-700">
              {MODULE_LABELS[module]}
            </span>
          </label>
        ))}
      </div>

      {/* Selected Count */}
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <p className="text-sm text-gray-600">
          <strong>{selectedModules.length}</strong> of <strong>{allModules.length}</strong> modules selected
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-3 rounded ${
          message.includes('Error') 
            ? 'bg-red-100 text-red-700' 
            : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Save Button */}
      {onSave && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition disabled:bg-gray-400"
        >
          {saving ? 'Saving...' : 'Save Module Selection'}
        </button>
      )}
    </div>
  );
};

export default ResearchModuleSelection;
