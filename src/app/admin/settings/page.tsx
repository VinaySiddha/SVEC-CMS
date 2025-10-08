'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Database, 
  Mail, 
  Shield, 
  Bell,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Database Settings
    dbHost: 'localhost',
    dbName: 'svec_cms',
    dbUser: 'root',
    dbPassword: '',
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    emailFrom: 'noreply@svec.edu.in',
    
    // Security Settings
    jwtSecret: '',
    sessionTimeout: '24',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    
    // Notification Settings
    emailNotifications: true,
    adminAlerts: true,
    userRegistrationAlert: true,
    errorReporting: true,
    
    // System Settings
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    autoBackup: true,
    backupInterval: '24'
  });

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('database');

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      console.log('Settings saved:', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      dbHost: 'localhost',
      dbName: 'svec_cms',
      dbUser: 'root',
      dbPassword: '',
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUser: '',
      smtpPassword: '',
      emailFrom: 'noreply@svec.edu.in',
      jwtSecret: '',
      sessionTimeout: '24',
      maxLoginAttempts: '5',
      passwordMinLength: '8',
      emailNotifications: true,
      adminAlerts: true,
      userRegistrationAlert: true,
      errorReporting: true,
      maintenanceMode: false,
      debugMode: false,
      cacheEnabled: true,
      autoBackup: true,
      backupInterval: '24'
    });
  };

  const tabs = [
    { id: 'database', label: 'Database', icon: Database },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure system settings and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Warning Banner */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-yellow-800">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">
              <strong>Warning:</strong> Changing these settings may affect system functionality. 
              Make sure to backup your system before making changes.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Database Settings */}
          {activeTab === 'database' && (
            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
                <CardDescription>
                  Configure database connection settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dbHost">Database Host</Label>
                    <Input
                      id="dbHost"
                      value={settings.dbHost}
                      onChange={(e) => handleInputChange('dbHost', e.target.value)}
                      placeholder="localhost"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dbName">Database Name</Label>
                    <Input
                      id="dbName"
                      value={settings.dbName}
                      onChange={(e) => handleInputChange('dbName', e.target.value)}
                      placeholder="svec_cms"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dbUser">Database User</Label>
                    <Input
                      id="dbUser"
                      value={settings.dbUser}
                      onChange={(e) => handleInputChange('dbUser', e.target.value)}
                      placeholder="root"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dbPassword">Database Password</Label>
                    <Input
                      id="dbPassword"
                      type="password"
                      value={settings.dbPassword}
                      onChange={(e) => handleInputChange('dbPassword', e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>
                  Configure SMTP settings for email notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={settings.smtpPort}
                      onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpUser">SMTP Username</Label>
                    <Input
                      id="smtpUser"
                      value={settings.smtpUser}
                      onChange={(e) => handleInputChange('smtpUser', e.target.value)}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emailFrom">From Email Address</Label>
                  <Input
                    id="emailFrom"
                    value={settings.emailFrom}
                    onChange={(e) => handleInputChange('emailFrom', e.target.value)}
                    placeholder="noreply@svec.edu.in"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Security Configuration</CardTitle>
                <CardDescription>
                  Configure authentication and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jwtSecret">JWT Secret</Label>
                  <Input
                    id="jwtSecret"
                    type="password"
                    value={settings.jwtSecret}
                    onChange={(e) => handleInputChange('jwtSecret', e.target.value)}
                    placeholder="Enter a strong secret key"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
                      placeholder="24"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
                      placeholder="5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) => handleInputChange('passwordMinLength', e.target.value)}
                    placeholder="8"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure email and system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send email notifications for important events</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="adminAlerts">Admin Alerts</Label>
                    <p className="text-sm text-gray-500">Send alerts to administrators</p>
                  </div>
                  <Switch
                    id="adminAlerts"
                    checked={settings.adminAlerts}
                    onCheckedChange={(checked) => handleInputChange('adminAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="userRegistrationAlert">User Registration Alerts</Label>
                    <p className="text-sm text-gray-500">Notify when new users register</p>
                  </div>
                  <Switch
                    id="userRegistrationAlert"
                    checked={settings.userRegistrationAlert}
                    onCheckedChange={(checked) => handleInputChange('userRegistrationAlert', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="errorReporting">Error Reporting</Label>
                    <p className="text-sm text-gray-500">Send error reports to administrators</p>
                  </div>
                  <Switch
                    id="errorReporting"
                    checked={settings.errorReporting}
                    onCheckedChange={(checked) => handleInputChange('errorReporting', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Put the system in maintenance mode</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="debugMode">Debug Mode</Label>
                    <p className="text-sm text-gray-500">Enable debug logging and error details</p>
                  </div>
                  <Switch
                    id="debugMode"
                    checked={settings.debugMode}
                    onCheckedChange={(checked) => handleInputChange('debugMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cacheEnabled">Cache Enabled</Label>
                    <p className="text-sm text-gray-500">Enable system caching for better performance</p>
                  </div>
                  <Switch
                    id="cacheEnabled"
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => handleInputChange('cacheEnabled', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoBackup">Automatic Backup</Label>
                    <p className="text-sm text-gray-500">Enable automatic database backups</p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => handleInputChange('autoBackup', checked)}
                  />
                </div>
                {settings.autoBackup && (
                  <div>
                    <Label htmlFor="backupInterval">Backup Interval (hours)</Label>
                    <Input
                      id="backupInterval"
                      type="number"
                      value={settings.backupInterval}
                      onChange={(e) => handleInputChange('backupInterval', e.target.value)}
                      placeholder="24"
                      className="max-w-xs"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}