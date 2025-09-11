import { randomUUID } from 'crypto';

// Mock database for admin approvals
let mockAdminApprovals: AdminApproval[] = [];

export interface AdminApproval {
  id: string;
  entity_type: string; // The module name
  entity_id: string;   // ID of the entity being approved
  dept: string;        // Department code
  action: 'approved' | 'rejected' | null;
  reason?: string;
  created_at: string;
  updated_at: string;
}

// Database operations for admin approvals
export const adminApprovalsDb = {
  async create(data: Omit<AdminApproval, 'id' | 'created_at' | 'updated_at'>): Promise<AdminApproval> {
    const now = new Date().toISOString();
    
    const approval: AdminApproval = {
      id: randomUUID(),
      ...data,
      created_at: now,
      updated_at: now,
    };
    
    mockAdminApprovals.push(approval);
    return approval;
  },
  
  async findByEntity(entityType: string, entityId: string): Promise<AdminApproval | null> {
    return mockAdminApprovals.find(
      a => a.entity_type === entityType && a.entity_id === entityId
    ) || null;
  },
  
  async findPendingByDept(dept: string): Promise<AdminApproval[]> {
    return mockAdminApprovals.filter(
      a => a.dept === dept && a.action === null
    );
  },
  
  async update(id: string, data: Partial<Omit<AdminApproval, 'id' | 'created_at' | 'updated_at'>>): Promise<AdminApproval | null> {
    const index = mockAdminApprovals.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    const approval = mockAdminApprovals[index];
    const updatedApproval = {
      ...approval,
      ...data,
      updated_at: new Date().toISOString(),
    };
    
    mockAdminApprovals[index] = updatedApproval;
    return updatedApproval;
  },
};
