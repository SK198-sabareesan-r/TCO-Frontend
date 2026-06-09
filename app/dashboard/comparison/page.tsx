'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LastJob {
  jobId: string;
  provider: string;
  completedAt: string;
}

export default function ComparisonPage() {
  const [lastJob, setLastJob] = useState<LastJob | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tco_last_job');
      if (raw) setLastJob(JSON.parse(raw));
    } catch {}
  }, []);

  if (!lastJob) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">Cost Comparison</h1>
          <p className="text-gray-600">Detailed comparison across cloud providers</p>
        </div>
        <div className="glass-effect p-12 rounded-2xl border border-ice-200 text-center animate-fade-in">
          <div className="text-6xl mb-4">💰</div>
          <h3 className="text-2xl font-bold text-navy-dark mb-2">No Analysis Available</h3>
          <p className="text-gray-600 mb-6">
            Run a migration analysis first to see cost comparisons here.
            <br />The full breakdown is included in the downloaded Excel report (Cost Comparison sheet).
          </p>
          <Link
            href="/dashboard/upload"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover-glow"
          >
            Upload File to Analyse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">Cost Comparison</h1>
        <p className="text-gray-600">
          Last analysis: <span className="font-semibold">{lastJob.provider} → AWS</span> &nbsp;·&nbsp; {new Date(lastJob.completedAt).toLocaleString()}
        </p>
      </div>

      {/* Download CTA */}
      <div className="glass-effect p-6 rounded-2xl border border-blue-100 bg-blue-50/60 mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <p className="font-semibold text-navy-dark">Full cost comparison is in your downloaded report</p>
              <p className="text-sm text-gray-600 mt-1">
                The Excel report includes a dedicated <strong>Cost Comparison</strong> sheet with a side-by-side
                breakdown: Current Provider vs AWS On-Demand vs AWS Optimized, per service.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/reports"
            className="shrink-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover-glow flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Report
          </Link>
        </div>
      </div>

      {/* What the report contains */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
        {[
          { sheet: 'Sheet 1', title: 'Summary', desc: 'Best AWS match + optimized cost per service', icon: '📋' },
          { sheet: 'Sheet 2', title: 'All Matches', desc: 'Every AWS candidate with full pricing breakdown', icon: '🔍' },
          { sheet: 'Sheet 3', title: 'CSP Options', desc: 'All 6 Savings Plans + Spot pricing per instance', icon: '💎' },
          { sheet: 'Sheet 4', title: 'Cost Comparison', desc: 'Current vs On-Demand vs Optimized, with savings %', icon: '💰' },
        ].map((item, i) => (
          <div key={i} className="glass-effect p-5 rounded-2xl border border-ice-200" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="text-3xl mb-3">{item.icon}</div>
            <div className="text-xs font-semibold text-blue-500 uppercase mb-1">{item.sheet}</div>
            <div className="font-bold text-navy-dark mb-1">{item.title}</div>
            <div className="text-sm text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* What the scoring means */}
      <div className="glass-effect p-6 rounded-2xl border border-ice-200 animate-fade-in">
        <h2 className="text-lg font-bold text-navy-dark mb-4">How AWS instances are ranked</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Cost', weight: '40%', desc: 'Lower effective monthly cost scores higher', color: 'bg-green-100 text-green-700' },
            { label: 'Generation', weight: '30%', desc: 'Current-generation instances preferred', color: 'bg-blue-100 text-blue-700' },
            { label: 'Instance Family', weight: '30%', desc: 'Widely available families (t3, m5, m6i, c6i…)', color: 'bg-indigo-100 text-indigo-700' },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.color}`}>{item.weight}</span>
                <span className="font-semibold text-navy-dark">{item.label}</span>
              </div>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Savings plan options: On-Demand · 1yr No Upfront · 1yr Partial · 1yr All Upfront · 3yr No Upfront · 3yr Partial · 3yr All Upfront · Spot (EC2)
        </p>
      </div>
    </div>
  );
}
