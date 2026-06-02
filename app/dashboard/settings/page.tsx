export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Configure your preferences and account settings
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* AWS Configuration */}
        <div className="glass-effect p-6 rounded-2xl border border-ice-200 animate-fade-in">
          <h2 className="text-xl font-bold text-navy-dark mb-4">AWS Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default AWS Region
              </label>
              <select className="w-full px-4 py-3 border border-ice-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ice-400">
                <option>us-east-1 (N. Virginia)</option>
                <option>us-west-2 (Oregon)</option>
                <option>eu-west-1 (Ireland)</option>
                <option>ap-southeast-1 (Singapore)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing API Key
              </label>
              <input
                type="password"
                placeholder="Enter your AWS API key"
                className="w-full px-4 py-3 border border-ice-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ice-400"
              />
            </div>
          </div>
        </div>

        {/* Optimization Preferences */}
        <div className="glass-effect p-6 rounded-2xl border border-ice-200 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h2 className="text-xl font-bold text-navy-dark mb-4">Optimization Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-navy-dark">Include Spot Pricing</div>
                <div className="text-sm text-gray-600">Show spot instance pricing in reports</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ice-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ice-400"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-navy-dark">AI Normalization</div>
                <div className="text-sm text-gray-600">Use LLM for service matching fallback</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ice-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ice-400"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-navy-dark">Auto-generate Reports</div>
                <div className="text-sm text-gray-600">Automatically create reports after upload</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ice-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ice-400"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="glass-effect p-6 rounded-2xl border border-ice-200 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-bold text-navy-dark mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-navy-dark">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive report completion emails</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ice-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ice-400"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-ice-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ice-400"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <button className="px-8 py-3 bg-white border border-ice-200 text-gray-700 rounded-xl font-semibold hover:bg-ice-50 transition-all">
            Cancel
          </button>
          <button className="px-8 py-3 bg-ice-gradient text-white rounded-xl font-semibold hover-glow">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
