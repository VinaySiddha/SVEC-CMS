'use client';

import { useState, useEffect } from 'react';

export default function TestPasswordReset() {
  type Status = 'idle' | 'requesting' | 'created' | 'confirming' | 'confirmed' | 
                'approving' | 'approved' | 'rejecting' | 'rejected' | 'error';
                
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [resetId, setResetId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState('NewSecurePassword123');
  const [status, setStatus] = useState<Status>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Check if users exist
    checkUsers();
  }, []);

  const addLog = (message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const checkUsers = async () => {
    try {
      setLoading(true);
      addLog('Checking for existing users...');
      
      const response = await fetch('/api/setup?action=check');
      const data = await response.json();
      
      if (data.usersExist) {
        addLog(`Found ${data.userCount} user(s)`);
        setUsers(data.users);
        if (data.users.length > 0) {
          setSelectedUser(data.users[0].username);
        }
      } else {
        addLog('No users found. Creating admin user...');
        await createAdminUser();
      }
      
      setLoading(false);
    } catch (error) {
      setError('Failed to check users');
      setLoading(false);
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const createAdminUser = async () => {
    try {
      addLog('Creating admin user...');
      
      const response = await fetch('/api/setup?action=create-admin');
      const data = await response.json();
      
      if (data.message) {
        addLog(data.message);
        await checkUsers(); // Refresh users
      }
    } catch (error) {
      setError('Failed to create admin user');
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const createDeptUser = async () => {
    try {
      addLog('Creating department user...');
      
      const response = await fetch('/api/setup?action=create-dept&dept=cse');
      const data = await response.json();
      
      if (data.message) {
        addLog(data.message);
        await checkUsers(); // Refresh users
      }
    } catch (error) {
      setError('Failed to create department user');
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testPasswordReset = async () => {
    if (!selectedUser) {
      addLog('No user selected');
      return;
    }

    try {
      setStatus('requesting');
      addLog(`Initiating password reset for ${selectedUser}...`);
      
      const response = await fetch(`/api/test-db?action=test-password-reset&username=${selectedUser}`);
      const data = await response.json();
      
      if (data.success) {
        setResetToken(data.token);
        setResetId(data.resetId);
        addLog(`Password reset initiated: ID ${data.resetId}, Token: ${data.token}`);
        setStatus('created');
      } else {
        addLog(`Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('error');
    }
  };

  const confirmReset = async () => {
    if (!resetToken) {
      addLog('No reset token available');
      return;
    }

    try {
      setStatus('confirming');
      addLog('Confirming password reset...');
      
      const response = await fetch('/api/auth/reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        addLog(`Reset confirmed: ${data.message}`);
        setStatus('confirmed');
      } else {
        addLog(`Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('error');
    }
  };

  const approveReset = async () => {
    if (!resetId) {
      addLog('No reset ID available');
      return;
    }

    try {
      setStatus('approving');
      addLog(`Approving password reset ID ${resetId}...`);
      
      const response = await fetch(`/api/admin/password_resets/${resetId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        addLog(`Reset approved: ${data.message}`);
        setStatus('approved');
      } else {
        addLog(`Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('error');
    }
  };

  const rejectReset = async () => {
    if (!resetId) {
      addLog('No reset ID available');
      return;
    }

    try {
      setStatus('rejecting');
      addLog(`Rejecting password reset ID ${resetId}...`);
      
      const response = await fetch(`/api/admin/password_resets/${resetId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Test rejection' })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        addLog(`Reset rejected: ${data.message}`);
        setStatus('rejected');
      } else {
        addLog(`Error: ${data.error}`);
        setStatus('error');
      }
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('error');
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Password Reset Flow Testing</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Management</h2>
        <div className="flex gap-4">
          <button 
            onClick={checkUsers} 
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Refresh Users
          </button>
          <button 
            onClick={createAdminUser} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Admin User
          </button>
          <button 
            onClick={createDeptUser} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Dept User
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Password Reset Flow</h2>
        
        {users.length > 0 ? (
          <div className="mb-4">
            <label className="block mb-2">Select User:</label>
            <select 
              value={selectedUser || ''} 
              onChange={(e) => setSelectedUser(e.target.value)} 
              className="p-2 border rounded mb-2 w-full"
            >
              {users.map(user => (
                <option key={user.id} value={user.username}>
                  {user.username} ({user.email}) - {user.role}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mb-4 text-yellow-600">No users available. Create users first.</div>
        )}
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={testPasswordReset} 
            disabled={!selectedUser || status === 'requesting'}
            className={`px-4 py-2 ${!selectedUser || status === 'requesting' ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
          >
            1. Request Password Reset
          </button>
          
          {resetToken && (
            <div className="p-4 bg-gray-100 rounded">
              <div className="mb-2">
                <strong>Reset Token:</strong> {resetToken}
              </div>
              <div className="mb-2">
                <strong>Reset ID:</strong> {resetId}
              </div>
              <div className="mb-4">
                <label className="block mb-2">New Password:</label>
                <input 
                  type="text" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>
              <button 
                onClick={confirmReset}
                disabled={status === 'confirming' || status === 'confirmed'}
                className={`px-4 py-2 ${status === 'confirming' || status === 'confirmed' ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded`}
              >
                2. Confirm Reset with New Password
              </button>
            </div>
          )}
          
          {status === 'confirmed' && (
            <div className="p-4 bg-gray-100 rounded">
              <div className="mb-2">
                <strong>Status:</strong> Pending Admin Approval
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={approveReset}
                  disabled={['approving', 'approved'].includes(status)}
                  className={`px-4 py-2 ${['approving', 'approved'].includes(status) ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded`}
                >
                  3a. Approve Reset
                </button>
                <button 
                  onClick={rejectReset}
                  disabled={['rejecting', 'rejected'].includes(status)}
                  className={`px-4 py-2 ${['rejecting', 'rejected'].includes(status) ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white rounded`}
                >
                  3b. Reject Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Logs</h2>
        <div className="bg-black text-green-400 p-4 rounded h-64 overflow-y-auto font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-gray-500">No logs yet</div>
          ) : (
            logs.map((log, i) => <div key={i}>{log}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
