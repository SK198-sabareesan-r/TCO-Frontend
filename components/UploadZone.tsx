'use client';

import { useState } from 'react';
import Link from 'next/link';

const API_BASE_URL = '/api/proxy';

const STAGE_MESSAGES: Record<string, string> = {
  uploading: 'Uploading file...',
  matching: 'Finding AWS matches (SQL + AI)...',
  pricing: 'Fetching real-time AWS pricing...',
  report: 'Generating Excel report...',
  done: 'Complete!',
};

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [provider, setProvider] = useState<'Azure' | 'GCP'>('Azure');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) startUpload(droppedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) startUpload(selected);
  };

  const startUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    setProcessing(true);
    setProgress(0);
    setError(null);
    setDownloadBlob(null);
    setStage('uploading');
    setStatusMessage('Uploading file...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      formData.append('source_provider', provider);

      setProgress(10);

      // Start async job
      const response = await fetch(`${API_BASE_URL}/migrate/async`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        let detail = `Upload failed: ${response.statusText}`;
        try { detail = JSON.parse(text).detail || detail; } catch {}
        throw new Error(detail);
      }

      const { job_id: jobId } = await response.json();
      setProgress(20);

      // Poll for completion
      await new Promise<void>((resolve, reject) => {
        const poll = setInterval(async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
            const status = await res.json();

            setProgress(status.progress ?? 20);
            setStatusMessage(status.message || 'Processing...');

            // Map backend progress to a stage label
            if (status.progress < 30) setStage('uploading');
            else if (status.progress < 60) setStage('matching');
            else if (status.progress < 85) setStage('pricing');
            else if (status.progress < 100) setStage('report');

            if (status.status === 'completed') {
              clearInterval(poll);

              // Fetch Excel
              const dlRes = await fetch(`${API_BASE_URL}/download/${jobId}`);
              const blob = await dlRes.blob();
              setDownloadBlob(blob);

              // Persist job info for dashboard pages
              const summary = {
                jobId,
                provider,
                completedAt: new Date().toISOString(),
              };
              try { localStorage.setItem('tco_last_job', JSON.stringify(summary)); } catch {}

              setStage('done');
              setProgress(100);
              setStatusMessage('✅ Report ready!');
              setProcessing(false);
              resolve();
            } else if (status.status === 'failed') {
              clearInterval(poll);
              reject(new Error(status.error || 'Processing failed'));
            }
          } catch (err: any) {
            clearInterval(poll);
            reject(err);
          }
        }, 5000);
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    if (!downloadBlob) return;
    const url = URL.createObjectURL(downloadBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aws_migration_report_${Date.now()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setStage('');
    setStatusMessage('');
    setError(null);
    setDownloadBlob(null);
    setProcessing(false);
  };

  const stages = ['uploading', 'matching', 'pricing', 'report', 'done'];
  const stageIndex = stages.indexOf(stage);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Provider Selector */}
      {!file && (
        <div className="flex justify-center gap-4 mb-6">
          {(['Azure', 'GCP'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                provider === p
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                  : 'bg-white border border-ice-200 text-slate-600 hover:bg-ice-50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`glass-effect p-12 rounded-3xl border-2 border-dashed transition-all ${
          isDragging
            ? 'border-ice-400 bg-ice-50 shadow-ice-glow'
            : 'border-ice-200 hover:border-ice-300'
        }`}
      >
        {/* Initial state */}
        {!file && !error && (
          <div className="text-center">
            <div className="text-6xl mb-6">📤</div>
            <h3 className="text-2xl font-bold text-navy-dark mb-3">
              Upload Your Cloud Cost Data
            </h3>
            <p className="text-gray-600 mb-6">
              Drag and drop your {provider} Excel file here, or click to browse
            </p>
            <label className="inline-block px-8 py-4 bg-ice-gradient text-white rounded-full font-semibold hover-glow cursor-pointer">
              Choose File
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-4">Supports .xlsx, .xls and .csv</p>
          </div>
        )}

        {/* Processing */}
        {file && (processing || (stage === 'done' && !error)) && (
          <div className="space-y-6">
            {/* File info */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
              <div className="text-4xl">📄</div>
              <div className="flex-1">
                <div className="font-semibold text-navy-dark">{file.name}</div>
                <div className="text-sm text-gray-600">{(file.size / 1024).toFixed(1)} KB · {provider}</div>
              </div>
            </div>

            {processing && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                  <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-base text-blue-700 font-semibold">
                      {statusMessage || 'Starting analysis...'}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-slate-600 font-medium">{progress}% Complete</p>

                {/* Stage indicators */}
                <div className="grid grid-cols-5 gap-2">
                  {stages.slice(0, -1).map((s, i) => {
                    const isActive = s === stage;
                    const isComplete = stageIndex > i;
                    return (
                      <div
                        key={s}
                        className={`p-3 rounded-xl text-center text-xs transition-all ${
                          isActive
                            ? 'bg-indigo-500 text-white shadow-md'
                            : isComplete
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {STAGE_MESSAGES[s].split(' ')[0]}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Success */}
            {stage === 'done' && !processing && (
              <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="text-5xl mb-3">✅</div>
                <div className="text-xl font-bold text-green-700 mb-2">Analysis Complete!</div>
                <p className="text-gray-600 mb-5">Your AWS migration cost report is ready.</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleDownload}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold hover-glow text-sm flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Report
                  </button>
                  <Link
                    href="/dashboard/reports"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold text-sm flex items-center gap-2 hover-glow"
                  >
                    View Dashboard →
                  </Link>
                  <button
                    onClick={reset}
                    className="px-6 py-3 bg-slate-600 text-white rounded-full font-semibold text-sm hover:bg-slate-700 transition-colors"
                  >
                    Upload New
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="py-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <button
              onClick={reset}
              className="px-6 py-2 bg-slate-600 text-white rounded-full text-sm hover:bg-slate-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="glass-effect p-4 rounded-xl border border-ice-200">
          <div className="text-2xl mb-2">🔒</div>
          <div className="font-semibold text-navy-dark mb-1">Secure Upload</div>
          <div className="text-sm text-gray-600">Your data stays on your server</div>
        </div>
        <div className="glass-effect p-4 rounded-xl border border-ice-200">
          <div className="text-2xl mb-2">⚡</div>
          <div className="font-semibold text-navy-dark mb-1">Real-Time Pricing</div>
          <div className="text-sm text-gray-600">Live AWS Pricing API — no cached tables</div>
        </div>
        <div className="glass-effect p-4 rounded-xl border border-ice-200">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-semibold text-navy-dark mb-1">5-Sheet Report</div>
          <div className="text-sm text-gray-600">Summary, matches, CSP options & comparison</div>
        </div>
      </div>
    </div>
  );
}
