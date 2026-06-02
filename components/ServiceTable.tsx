'use client';

import { useState } from 'react';

interface Service {
  id: number;
  name: string;
  provider: string;
  awsMatch: string;
  onDemand: number;
  optimized: number;
  savings: number;
  method: string;
  expanded?: boolean;
}

export default function ServiceTable() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'Standard_D4s_v3',
      provider: 'Azure',
      awsMatch: 't3.xlarge',
      onDemand: 1200,
      optimized: 480,
      savings: 60,
      method: 'KPI',
    },
    {
      id: 2,
      name: 'n1-standard-4',
      provider: 'GCP',
      awsMatch: 'm5.xlarge',
      onDemand: 1400,
      optimized: 560,
      savings: 60,
      method: 'SQL',
    },
    {
      id: 3,
      name: 'Standard_E8s_v4',
      provider: 'Azure',
      awsMatch: 'r5.2xlarge',
      onDemand: 2800,
      optimized: 1120,
      savings: 60,
      method: 'LLM',
    },
    {
      id: 4,
      name: 'n2-highmem-8',
      provider: 'GCP',
      awsMatch: 'r6i.2xlarge',
      onDemand: 3200,
      optimized: 1280,
      savings: 60,
      method: 'KPI',
    },
  ]);

  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="glass-effect rounded-2xl border border-ice-200 overflow-hidden">
      <div className="p-6 border-b border-ice-200">
        <h2 className="text-2xl font-bold text-navy-dark">Service Breakdown</h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-ice-50 sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-navy-dark">Service Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-navy-dark">Provider</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-navy-dark">AWS Match</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-navy-dark">OnDemand</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-navy-dark">Optimized</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-navy-dark">Savings</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-navy-dark">Method</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <>
                <tr
                  key={service.id}
                  className={`border-b border-ice-100 hover:bg-ice-50 transition-colors cursor-pointer ${
                    index % 2 === 0 ? 'bg-white' : 'bg-ice-50/30'
                  }`}
                  onClick={() => toggleRow(service.id)}
                >
                  <td className="px-6 py-4 font-medium text-navy-dark">{service.name}</td>
                  <td className="px-6 py-4 text-gray-600">{service.provider}</td>
                  <td className="px-6 py-4 text-ice-600 font-semibold">{service.awsMatch}</td>
                  <td className="px-6 py-4 text-right text-gray-700">${service.onDemand}</td>
                  <td className="px-6 py-4 text-right font-semibold text-savings-green">${service.optimized}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-3 py-1 bg-savings-green/20 text-savings-green rounded-full text-sm font-semibold">
                      {service.savings}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      service.method === 'KPI' ? 'bg-ice-100 text-ice-600' :
                      service.method === 'SQL' ? 'bg-blue-100 text-blue-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {service.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xl">{expandedRow === service.id ? '▲' : '▼'}</span>
                  </td>
                </tr>
                {expandedRow === service.id && (
                  <tr className="bg-ice-100/50">
                    <td colSpan={8} className="px-6 py-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-xl">
                          <h4 className="font-semibold text-navy-dark mb-2">6 CSP Plans</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div>1-Year No Upfront: $520</div>
                            <div>1-Year Partial: $490</div>
                            <div>3-Year All Upfront: $480</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl">
                          <h4 className="font-semibold text-navy-dark mb-2">Spot Pricing</h4>
                          <div className="text-sm text-gray-600">
                            <div>Average: $360/month</div>
                            <div className="text-warning-orange">70% savings</div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl">
                          <h4 className="font-semibold text-navy-dark mb-2">Mapping Notes</h4>
                          <div className="text-sm text-gray-600">
                            Matched based on 4 vCPU, 16 GiB RAM
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-4 rounded-xl border border-ice-200 hover-glow cursor-pointer"
            onClick={() => toggleRow(service.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-semibold text-navy-dark">{service.name}</div>
                <div className="text-sm text-gray-600">{service.provider}</div>
              </div>
              <span className="px-3 py-1 bg-savings-green/20 text-savings-green rounded-full text-sm font-semibold">
                {service.savings}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">AWS Match:</span>
                <div className="font-semibold text-ice-600">{service.awsMatch}</div>
              </div>
              <div>
                <span className="text-gray-600">Optimized:</span>
                <div className="font-semibold text-savings-green">${service.optimized}</div>
              </div>
            </div>
            {expandedRow === service.id && (
              <div className="mt-4 pt-4 border-t border-ice-200 space-y-2 text-sm">
                <div className="font-semibold">Details</div>
                <div className="text-gray-600">OnDemand: ${service.onDemand}</div>
                <div className="text-gray-600">Method: {service.method}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
