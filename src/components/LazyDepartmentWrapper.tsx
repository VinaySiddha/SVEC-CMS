import React, { Suspense, lazy, memo } from 'react';

// Loading fallback component
const DepartmentLoadingFallback = memo(() => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#B22222] mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Department</h2>
      <p className="text-gray-500">Please wait while we load the department content...</p>
    </div>
  </div>
));

// Lazy loaded department components
const LazyAIMLDepartment = lazy(() => import('../pages/departments/OptimizedAIML'));
const LazyCivilDepartment = lazy(() => import('../pages/departments/Civil'));
const LazyMBADepartment = lazy(() => import('../pages/departments/MBA'));
const LazyECEDepartment = lazy(() => import('../pages/departments/ECE'));
const LazyEEEDepartment = lazy(() => import('../pages/departments/EEE'));
const LazyMechanicalDepartment = lazy(() => import('../pages/departments/Mechanical'));
const LazyCSEAIDepartment = lazy(() => import('../pages/departments/CSEAI'));
const LazyECTDepartment = lazy(() => import('../pages/departments/ECT'));
const LazyDSDepartment = lazy(() => import('../pages/departments/ds'));
const LazyBSHDepartment = lazy(() => import('../pages/departments/BSH'));

// Optimized department wrapper with code splitting
interface LazyDepartmentWrapperProps {
  department: string;
  className?: string;
}

const LazyDepartmentWrapper: React.FC<LazyDepartmentWrapperProps> = memo(({ 
  department, 
  className = '' 
}) => {
  const getDepartmentComponent = () => {
    switch (department.toLowerCase()) {
      case 'aiml':
        return <LazyAIMLDepartment />;
      case 'civil':
        return <LazyCivilDepartment />;
      case 'mba':
        return <LazyMBADepartment />;
      case 'ece':
        return <LazyECEDepartment />;
      case 'eee':
        return <LazyEEEDepartment />;
      case 'mechanical':
      case 'mech':
        return <LazyMechanicalDepartment />;
      case 'cst':
      case 'cseai':
        return <LazyCSEAIDepartment />;
      case 'ect':
        return <LazyECTDepartment />;
      case 'ds':
        return <LazyDSDepartment />;
      case 'bsh':
        return <LazyBSHDepartment />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Department Not Found</h2>
              <p className="text-gray-500">The requested department "{department}" could not be found.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={className}>
      <Suspense fallback={<DepartmentLoadingFallback />}>
        {getDepartmentComponent()}
      </Suspense>
    </div>
  );
});

LazyDepartmentWrapper.displayName = 'LazyDepartmentWrapper';

export default LazyDepartmentWrapper;

// Export individual lazy components for direct use
export {
  LazyAIMLDepartment,
  LazyCivilDepartment,
  LazyMBADepartment,
  LazyECEDepartment,
  LazyEEEDepartment,
  LazyMechanicalDepartment,
  LazyCSEAIDepartment,
  LazyECTDepartment,
  LazyDSDepartment,
  LazyBSHDepartment,
  DepartmentLoadingFallback
};