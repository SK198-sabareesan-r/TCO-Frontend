'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LastJob {
  jobId: string;
  provider: string;
  completedAt: string;
  message?: string;
}

export default function ReportsPage() {
  const [lastJob, setLastJob] = useState<LastJob | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('tco_last_job');
      if (raw) setLastJob(JSON.parse(raw));
    } catch {}
  }, []);

  const handleDownload = async () => {
    if (!lastJob) return;
    setDownloading(true);
    setError(null);
    try {
      let blob = downloadBlob;
      if (!blob) {
        const res = await fetch(`/api/proxy/download/${lastJob.jobId}`);
        if (!res.ok) throw new Error('Report file no longer available. Please re-upload your file.');
        blob = await res.blob();
        setDownloadBlob(blob);
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aws_migration_report_${lastJob.provider.toLowerCase()}_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message || 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">Reports</h1>
        <p className="text-gray-600">View and download your cost analysis reports</p>
      </div>

      {lastJob ? (
        <div className="grid gap-6">
          <div className="glass-effect p-6 rounded-2xl border border-ice-200 hover-glow animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📊
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-dark mb-1">
                    {lastJob.provider} → AWS Migration Analysis
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Completed: {new Date(lastJob.completedAt).toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Job ID: {lastJob.jobId}</p>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover-glow disabled:opacity-60 flex items-center gap-2"
                >
                  {downloading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download
                    </>
                  )}
                </button>
                <Link
                  href="/dashboard/upload"
                  className="px-6 py-3 bg-white border border-ice-200 text-ice-600 rounded-xl font-semibold hover:bg-ice-50 transition-all text-center"
                >
                  New Analysis
                </Link>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="glass-effect p-5 rounded-2xl border border-blue-100 bg-blue-50/50 animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold text-navy-dark mb-1">Report contains 5 sheets</p>
                <p className="text-sm text-gray-600">
                  Summary · All Matches · CSP Options · Cost Comparison · Mapping Details
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="glass-effect p-12 rounded-2xl border border-ice-200 text-center animate-fade-in">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-2xl font-bold text-navy-dark mb-2">No Reports Yet</h3>
          <p className="text-gray-600 mb-6">
            Upload your Azure or GCP cost data to generate your first report.
          </p>
          <Link
            href="/dashboard/upload"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover-glow"
          >
            Upload File
          </Link>
        </div>
      )}
    </div>
  );
}
