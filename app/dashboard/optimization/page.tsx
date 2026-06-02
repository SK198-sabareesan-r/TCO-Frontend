export default function OptimizationPage() {
  const recommendations = [
    {
      title: 'Switch to 3-Year Savings Plans',
      impact: 'High',
      savings: '$12,400/month',
      description: 'Commit to 3-year reserved instances for maximum savings on stable workloads.',
      icon: '💎',
    },
    {
      title: 'Use Spot Instances for Dev/Test',
      impact: 'Medium',
      savings: '$4,200/month',
      description: 'Migrate development and testing environments to spot instances.',
      icon: '⚡',
    },
    {
      title: 'Right-size Overprovisioned Instances',
      impact: 'High',
      savings: '$6,800/month',
      description: '12 instances are running at <30% utilization and can be downsized.',
      icon: '📉',
    },
    {
      title: 'Implement Auto-Scaling',
      impact: 'Medium',
      savings: '$3,760/month',
      description: 'Enable auto-scaling to reduce costs during off-peak hours.',
      icon: '📊',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">
          Optimization Insights
        </h1>
        <p className="text-gray-600">
          AI-powered recommendations to maximize your cloud savings
        </p>
      </div>

      {/* Summary Card */}
      <div className="glass-effect p-8 rounded-2xl border border-savings-green/20 bg-savings-green/5 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-navy-dark mb-2">
              Total Optimization Potential
            </h2>
            <p className="text-gray-600">
              Implementing all recommendations could save:
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-savings-green mb-1">
              $27,160
            </div>
            <div className="text-lg text-gray-600">per month</div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="glass-effect p-6 rounded-2xl border border-ice-200 hover-glow animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-ice-100 rounded-2xl flex items-center justify-center text-3xl">
                  {rec.icon}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-bold text-navy-dark">
                    {rec.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        rec.impact === 'High'
                          ? 'bg-alert-red/20 text-alert-red'
                          : 'bg-warning-orange/20 text-warning-orange'
                      }`}
                    >
                      {rec.impact} Impact
                    </span>
                    <span className="text-2xl font-bold text-savings-green">
                      {rec.savings}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{rec.description}</p>
                
                <button className="px-6 py-2 bg-ice-gradient text-white rounded-lg font-semibold hover-glow text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="mt-8 glass-effect p-6 rounded-2xl border border-ice-200 animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="text-xl font-bold text-navy-dark mb-2">
              AI Insight
            </h3>
            <p className="text-gray-600">
              Based on your usage patterns, we detected that 7 services were normalized by our LLM 
              (e.g., 7 GiB → 8 GiB) for AWS compatibility. This ensures accurate pricing comparisons 
              while maintaining performance requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
