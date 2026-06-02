export default function ComparisonPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">
          Cost Comparison
        </h1>
        <p className="text-gray-600">
          Detailed comparison across cloud providers
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-effect p-6 rounded-2xl border border-ice-200 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              ☁️
            </div>
            <h3 className="text-xl font-bold text-navy-dark">Azure</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Current Cost</div>
              <div className="text-2xl font-bold text-navy-dark">$28,450</div>
            </div>
            <div className="pt-3 border-t border-ice-200">
              <div className="text-sm text-gray-600">Services</div>
              <div className="text-lg font-semibold">24 instances</div>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-2xl border border-ice-200 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
              ☁️
            </div>
            <h3 className="text-xl font-bold text-navy-dark">GCP</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Current Cost</div>
              <div className="text-2xl font-bold text-navy-dark">$16,830</div>
            </div>
            <div className="pt-3 border-t border-ice-200">
              <div className="text-sm text-gray-600">Services</div>
              <div className="text-lg font-semibold">18 instances</div>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-2xl border border-savings-green/20 bg-savings-green/5 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-savings-green/20 rounded-xl flex items-center justify-center text-2xl">
              ☁️
            </div>
            <h3 className="text-xl font-bold text-navy-dark">AWS (Optimized)</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Projected Cost</div>
              <div className="text-2xl font-bold text-savings-green">$18,120</div>
            </div>
            <div className="pt-3 border-t border-savings-green/20">
              <div className="text-sm text-gray-600">Savings</div>
              <div className="text-lg font-semibold text-savings-green">60% ($27,160)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="glass-effect p-8 rounded-2xl border border-ice-200">
        <h2 className="text-2xl font-bold text-navy-dark mb-6">Service Category Breakdown</h2>
        
        <div className="space-y-6">
          {[
            { category: 'Compute', azure: 15200, gcp: 8900, aws: 9600, savings: 57 },
            { category: 'Storage', azure: 6800, gcp: 4200, aws: 4500, savings: 59 },
            { category: 'Database', azure: 4200, gcp: 2400, aws: 2800, savings: 52 },
            { category: 'Networking', azure: 2250, gcp: 1330, aws: 1220, savings: 66 },
          ].map((item, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-navy-dark text-lg">{item.category}</h3>
                <span className="px-4 py-1 bg-savings-green/20 text-savings-green rounded-full text-sm font-semibold">
                  {item.savings}% savings
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Azure</div>
                  <div className="font-bold text-navy-dark">${item.azure.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-sm text-gray-600">GCP</div>
                  <div className="font-bold text-navy-dark">${item.gcp.toLocaleString()}</div>
                </div>
                <div className="text-center p-3 bg-savings-green/10 rounded-lg">
                  <div className="text-sm text-gray-600">AWS</div>
                  <div className="font-bold text-savings-green">${item.aws.toLocaleString()}</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-savings-green rounded-full transition-all duration-1000"
                  style={{ width: `${100 - item.savings}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
