'use client';

const steps = [
  {
    number: 1,
    title: 'Upload Azure/GCP Excel',
    description: 'Upload your current cloud provider cost and configuration data',
  },
  {
    number: 2,
    title: 'AI + SQL Mapping Engine',
    description: 'Our intelligent engine maps services to AWS equivalents',
  },
  {
    number: 3,
    title: 'Real-Time AWS Pricing API',
    description: 'Fetch current AWS pricing across multiple purchase options',
  },
  {
    number: 4,
    title: 'Download 5-Sheet Cost Report',
    description: 'Get comprehensive analysis with optimization recommendations',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-ice-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-dark mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to optimize your cloud costs
          </p>
        </div>
        
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:flex justify-between items-start relative">
          <div className="absolute top-16 left-0 right-0 h-1 bg-ice-200"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-ice-gradient flex items-center justify-center text-white text-4xl font-bold mb-6 hover-glow relative z-10 shadow-ice-soft">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-navy-dark mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile/Tablet: Vertical Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-ice-gradient flex items-center justify-center text-white text-2xl font-bold hover-glow flex-shrink-0 shadow-ice-soft">
                {step.number}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-navy-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
