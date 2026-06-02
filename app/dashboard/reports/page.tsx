export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: 'Azure Migration Analysis',
      date: '2024-03-01',
      savings: '$27,160',
      status: 'completed',
    },
    {
      id: 2,
      name: 'GCP Cost Optimization',
      date: '2024-02-28',
      savings: '$18,450',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Multi-Cloud Analysis',
      date: '2024-02-25',
      savings: '$35,200',
      status: 'completed',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">
          Reports
        </h1>
        <p className="text-gray-600">
          View and download your cost analysis reports
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-6">
        {reports.map((report, index) => (
          <div
            key={report.id}
            className="glass-effect p-6 rounded-2xl border border-ice-200 hover-glow animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-ice-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-dark mb-1">
                    {report.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Generated on {new Date(report.date).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <span className="text-savings-green font-semibold">
                      Potential Savings: {report.savings}/month
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-ice-gradient text-white rounded-xl font-semibold hover-glow">
                  Download
                </button>
                <button className="px-6 py-3 bg-white border border-ice-200 text-ice-600 rounded-xl font-semibold hover:bg-ice-50 transition-all">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no reports) */}
      {reports.length === 0 && (
        <div className="glass-effect p-12 rounded-2xl border border-ice-200 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-2xl font-bold text-navy-dark mb-2">
            No Reports Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Upload your first cost data file to generate a report
          </p>
          <a
            href="/dashboard/upload"
            className="inline-block px-8 py-4 bg-ice-gradient text-white rounded-full font-semibold hover-glow"
          >
            Upload File
          </a>
        </div>
      )}
    </div>
  );
}
