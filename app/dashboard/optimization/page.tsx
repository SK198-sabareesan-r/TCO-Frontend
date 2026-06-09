'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LastJob {
  jobId: string;
  provider: string;
  completedAt: string;
}

const TIPS = [
  {
    icon: '💎',
    title: '3-Year Savings Plans',
    impact: 'High',
    desc: 'Committing to 3-year reserved capacity can save up to 60% vs On-Demand for stable workloads.',
  },
  {
    icon: '⚡',
    title: 'Spot Instances for Dev/Test',
    impact: 'Medium',
    desc: 'Dev and test environments are ideal for EC2 Spot Instances — typically 70–90% cheaper, available in your report\'s CSP Options sheet.',
  },
  {
    icon: '📉',
    title: 'Right-size to Current Generation',
    impact: 'High',
    desc: 'The AI scoring prefers current-generation families (m6i, c6i, r6i) which offer better price-performance than older m4/c4/r4.',
  },
  {
    icon: '🌏',
    title: 'Review Regional Availability',
    impact: 'Medium',
    desc: 'Some instance families are not available in all regions (e.g. Mumbai ap-south-1). The pipeline automatically picks available alternatives.',
  },
  {
    icon: '💰',
    title: '1-Year No-Upfront as a Start',
    impact: 'Medium',
    desc: 'If you\'re unsure about a 3-year commitment, 1-year no-upfront Savings Plans typically save 30–35% with zero cash outlay.',
  },
  {
    icon: '🤖',
    title: 'LLM Spec Normalization',
    impact: 'Low',
    desc: 'When unusual specs are detected (e.g. 7 GiB, 14 GiB), the AI rounds up to the next standard AWS size to ensure an accurate match.',
  },
];

export default function OptimizationPage() {
  const [lastJob, setLastJob] = useState<LastJob | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tco_last_job');
      if (raw) setLastJob(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">Optimization Insights</h1>
        <p className="text-gray-600">
          Strategies to maximize your AWS savings based on this platform's analysis approach
        </p>
      </div>

      {/* Last job banner */}
      {lastJob ? (
        <div className="glass-effect p-5 rounded-2xl border border-green-200 bg-green-50/50 mb-8 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold text-navy-dark">
                Last analysis: {lastJob.provider} → AWS
              </p>
              <p className="text-sm text-gray-600">
                {new Date(lastJob.completedAt).toLocaleString()} · Open the downloaded report for full per-service breakdown
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/reports"
            className="shrink-0 px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover-glow"
          >
            Download Report
          </Link>
        </div>
      ) : (
        <div className="glass-effect p-5 rounded-2xl border border-blue-100 bg-blue-50/50 mb-8 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-navy-dark font-medium">
              Upload your cloud cost file to get a real optimization report with per-service savings.
            </p>
          </div>
          <Link
            href="/dashboard/upload"
            className="shrink-0 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-sm hover-glow"
          >
            Upload File
          </Link>
        </div>
      )}

      {/* Tips */}
      <div className="space-y-5">
        {TIPS.map((tip, i) => (
          <div
            key={i}
            className="glass-effect p-6 rounded-2xl border border-ice-200 hover-glow animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-ice-100 rounded-2xl flex items-center justify-center text-3xl">
                  {tip.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-navy-dark">{tip.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tip.impact === 'High'
                        ? 'bg-red-100 text-red-600'
                        : tip.impact === 'Medium'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {tip.impact} Impact
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{tip.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scoring note */}
      <div className="mt-8 glass-effect p-6 rounded-2xl border border-ice-200 animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="text-lg font-bold text-navy-dark mb-1">How the AI picks the best instance</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Each candidate AWS instance is scored on three weighted criteria:{' '}
              <strong>Cost (40%)</strong> — lower effective monthly cost,{' '}
              <strong>Generation (30%)</strong> — current-generation preferred, and{' '}
              <strong>Instance Family (30%)</strong> — widely available families (t3, m5, m6i, c5, c6i, r5, r6i)
              score higher than limited-availability or GPU instances.
              The winning instance is shown in the Summary sheet with its{' '}
              best Compute Savings Plan automatically selected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
