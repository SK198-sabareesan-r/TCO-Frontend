'use client';

const features = [
  {
    title: 'Real-Time AWS Pricing',
    description: 'Get instant AWS pricing data with OnDemand, Savings Plans, and Spot pricing calculations.',
    icon: '💰',
  },
  {
    title: 'SQL + AI Smart Mapping',
    description: 'Intelligent service mapping using SQL logic with AI fallback for complex scenarios.',
    icon: '🧠',
  },
  {
    title: '6 Savings Plan Optimization',
    description: 'Compare 6 different CSP plans to find the optimal cost-saving strategy.',
    icon: '📊',
  },
  {
    title: 'Spot Pricing Analysis',
    description: 'Analyze spot instance pricing for maximum cost efficiency on compatible workloads.',
    icon: '⚡',
  },
  {
    title: 'Multi-Sheet Excel Reports',
    description: 'Generate comprehensive 5-sheet reports with detailed cost breakdowns and insights.',
    icon: '📑',
  },
  {
    title: 'KPI-Driven Matching Engine',
    description: 'Match services based on CPU, RAM, storage, and performance KPIs for accurate comparisons.',
    icon: '🎯',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-dark mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for intelligent cloud cost optimization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect p-8 rounded-3xl border border-ice-200 hover-glow cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-navy-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
