/**
 * Utility functions for triggering auto-refresh across department view pages
 * When admin makes changes (add/delete), these functions notify all open department pages
 */

export const triggerDepartmentRefresh = (department?: string, module?: string) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    // Trigger storage event to notify other tabs
    const timestamp = Date.now();
    const refreshData = {
      timestamp,
      department: department || 'all',
      module: module || 'all',
      action: 'data_updated'
    };

    // Use localStorage to trigger cross-tab communication
    localStorage.setItem('admin_data_updated', JSON.stringify(refreshData));
    
    // Remove the item immediately to ensure storage event fires next time
    setTimeout(() => {
      localStorage.removeItem('admin_data_updated');
    }, 100);
  } catch (error) {
  }
};

export const triggerGlobalRefresh = () => {
  triggerDepartmentRefresh();
};

export const triggerModuleRefresh = (department: string, module: string) => {
  triggerDepartmentRefresh(department, module);
};

// Department-specific refresh triggers
export const triggerCSEAIRefresh = (module?: string) => {
  triggerDepartmentRefresh('cseai', module);
};

export const triggerCSERefresh = (module?: string) => {
  triggerDepartmentRefresh('cse', module);
};

export const triggerAIMLRefresh = (module?: string) => {
  triggerDepartmentRefresh('aiml', module);
};

export const triggerCSTRefresh = (module?: string) => {

};

export const triggerECERefresh = (module?: string) => {
  triggerDepartmentRefresh('ece', module);
};

export const triggerEEERefresh = (module?: string) => {
  triggerDepartmentRefresh('eee', module);
};

export const triggerMECHRefresh = (module?: string) => {
  triggerDepartmentRefresh('mech', module);
};

export const triggerCIVILRefresh = (module?: string) => {
  triggerDepartmentRefresh('civil', module);
};

export const triggerMBARefresh = (module?: string) => {
  triggerDepartmentRefresh('mba', module);
};

export const triggerBSHRefresh = (module?: string) => {
  triggerDepartmentRefresh('bsh', module);
};

export const triggerCSEDSRefresh = (module?: string) => {
  triggerDepartmentRefresh('cseds', module);
};

export const triggerECTRefresh = (module?: string) => {
  triggerDepartmentRefresh('ect', module);
};