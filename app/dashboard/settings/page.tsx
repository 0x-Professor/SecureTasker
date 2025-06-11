"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Shield, Bell, Palette, Database, Save, AlertTriangle, CheckCircle, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    // Profile settings
    fullName: "John Doe",
    email: "john.doe@company.com",
    bio: "Security-focused developer passionate about building secure applications.",
    timezone: "UTC-5",
    language: "en",

    // Security settings
    twoFactorEnabled: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginNotifications: true,

    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    securityAlerts: true,
    taskReminders: true,
    weeklyReports: true,

    // Appearance settings
    theme: "dark",
    compactMode: false,
    animationsEnabled: true,
    sidebarCollapsed: false,

    // Privacy settings
    profileVisibility: "private",
    activityTracking: true,
    dataRetention: "1year",
  })

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 1000)
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "privacy", label: "Privacy", icon: Database },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white font-orbitron">SETTINGS</h1>
          <p className="text-slate-400">Manage your account preferences and security settings</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {saved && (
        <Alert className="border-green-500/30 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200">Settings saved successfully!</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
          <CardContent className="p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-slate-400">
                    Update your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-slate-300">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={settings.fullName}
                        onChange={(e) => setSettings({ ...settings, fullName: e.target.value })}
                        className="bg-slate-800/50 border-slate-600/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="bg-slate-800/50 border-slate-600/50 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-slate-300">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={settings.bio}
                      onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                      className="bg-slate-800/50 border-slate-600/50 text-white"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-slate-300">
                        Timezone
                      </Label>
                      <Select
                        value={settings.timezone}
                        onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">UTC</SelectItem>
                          <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-slate-300">
                        Language
                      </Label>
                      <Select
                        value={settings.language}
                        onValueChange={(value) => setSettings({ ...settings, language: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="space-y-6">
                <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Password & Authentication</CardTitle>
                    <CardDescription className="text-slate-400">
                      Manage your password and two-factor authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-slate-300">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            className="bg-slate-800/50 border-slate-600/50 text-white pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-slate-400"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-slate-300">
                          New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            className="bg-slate-800/50 border-slate-600/50 text-white pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-slate-400"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <div>
                        <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                        <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        checked={settings.twoFactorEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, twoFactorEnabled: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Security Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout" className="text-slate-300">
                          Session Timeout (minutes)
                        </Label>
                        <Select
                          value={settings.sessionTimeout}
                          onValueChange={(value) => setSettings({ ...settings, sessionTimeout: value })}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passwordExpiry" className="text-slate-300">
                          Password Expiry (days)
                        </Label>
                        <Select
                          value={settings.passwordExpiry}
                          onValueChange={(value) => setSettings({ ...settings, passwordExpiry: value })}
                        >
                          <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Notification Preferences</CardTitle>
                  <CardDescription className="text-slate-400">
                    Choose how you want to be notified about important events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      key: "emailNotifications",
                      label: "Email Notifications",
                      description: "Receive notifications via email",
                    },
                    {
                      key: "pushNotifications",
                      label: "Push Notifications",
                      description: "Receive browser push notifications",
                    },
                    {
                      key: "securityAlerts",
                      label: "Security Alerts",
                      description: "Get notified about security events",
                    },
                    {
                      key: "taskReminders",
                      label: "Task Reminders",
                      description: "Reminders for upcoming task deadlines",
                    },
                    {
                      key: "weeklyReports",
                      label: "Weekly Reports",
                      description: "Receive weekly productivity reports",
                    },
                  ].map((notification) => (
                    <div
                      key={notification.key}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30"
                    >
                      <div>
                        <h4 className="font-medium text-white">{notification.label}</h4>
                        <p className="text-sm text-slate-400">{notification.description}</p>
                      </div>
                      <Switch
                        checked={settings[notification.key as keyof typeof settings] as boolean}
                        onCheckedChange={(checked) => setSettings({ ...settings, [notification.key]: checked })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "appearance" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Appearance Settings</CardTitle>
                  <CardDescription className="text-slate-400">
                    Customize the look and feel of your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-slate-300">
                      Theme
                    </Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) => setSettings({ ...settings, theme: value })}
                    >
                      <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {[
                    {
                      key: "compactMode",
                      label: "Compact Mode",
                      description: "Use a more compact layout to fit more content",
                    },
                    {
                      key: "animationsEnabled",
                      label: "Animations",
                      description: "Enable smooth animations and transitions",
                    },
                    {
                      key: "sidebarCollapsed",
                      label: "Collapsed Sidebar",
                      description: "Start with the sidebar collapsed by default",
                    },
                  ].map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30"
                    >
                      <div>
                        <h4 className="font-medium text-white">{setting.label}</h4>
                        <p className="text-sm text-slate-400">{setting.description}</p>
                      </div>
                      <Switch
                        checked={settings[setting.key as keyof typeof settings] as boolean}
                        onCheckedChange={(checked) => setSettings({ ...settings, [setting.key]: checked })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "privacy" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Privacy Settings</CardTitle>
                  <CardDescription className="text-slate-400">
                    Control your privacy and data retention preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="profileVisibility" className="text-slate-300">
                        Profile Visibility
                      </Label>
                      <Select
                        value={settings.profileVisibility}
                        onValueChange={(value) => setSettings({ ...settings, profileVisibility: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="team">Team Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dataRetention" className="text-slate-300">
                        Data Retention
                      </Label>
                      <Select
                        value={settings.dataRetention}
                        onValueChange={(value) => setSettings({ ...settings, dataRetention: value })}
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="3months">3 months</SelectItem>
                          <SelectItem value="6months">6 months</SelectItem>
                          <SelectItem value="1year">1 year</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/30">
                    <div>
                      <h4 className="font-medium text-white">Activity Tracking</h4>
                      <p className="text-sm text-slate-400">Allow system to track your activity for analytics</p>
                    </div>
                    <Switch
                      checked={settings.activityTracking}
                      onCheckedChange={(checked) => setSettings({ ...settings, activityTracking: checked })}
                    />
                  </div>

                  <Alert className="border-yellow-500/30 bg-yellow-500/10">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <AlertDescription className="text-yellow-200">
                      <strong>Data Privacy:</strong> Your data is encrypted and never shared with third parties. You can
                      request data deletion at any time.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
