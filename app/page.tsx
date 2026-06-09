'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

const API_BASE_URL = '/api/proxy';

export default function Home() {
  const [uploading, setUploading] = useState(false);
  const [provider, setProvider] = useState<'Azure' | 'GCP'>('Azure');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);
  const [combinedLink, setCombinedLink] = useState<string>('');

  // Remove the loading timer effect

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);
    setDownloadBlob(null);

    try {
      setUploadProgress(10);

      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('source_provider', provider);

      console.log('Uploading file:', file.name, 'Provider:', provider, 'Size:', file.size);

      // Use /migrate/async endpoint for background processing
      const response = await fetch(`${API_BASE_URL}/migrate/async`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend response:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { detail: errorText };
        }
        throw new Error(errorData.detail || errorData.message || `Upload failed: ${response.statusText}`);
      }

      const jobData = await response.json();
      const jobId = jobData.job_id;
      console.log('Job created:', jobId);

      setUploadProgress(20);

      // Poll for job status
      const pollInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
          const status = await statusResponse.json();

          console.log('Job status:', status.status, 'Progress:', status.progress, 'Message:', status.message);

          // Update progress AND detailed message
          setUploadProgress(status.progress);
          setStatusMessage(status.message || 'Processing...');

          if (status.status === 'completed') {
            clearInterval(pollInterval);
            setStatusMessage('✅ Analysis complete! Downloading...');

            // Download the Excel result
            const downloadResponse = await fetch(`${API_BASE_URL}/download/${jobId}`);
            const blob = await downloadResponse.blob();
            setDownloadBlob(blob);

            // Capture combined calculator link from job status
            const link = status.combined_calculator_link || '';
            if (link) setCombinedLink(link);

            // Persist for later
            try {
              localStorage.setItem('tco_last_job', JSON.stringify({
                jobId, provider, completedAt: new Date().toISOString(),
                combinedLink: link,
              }));
            } catch {}

            setResults({ success: true });
            setUploading(false);
            setStatusMessage('✅ Report ready!');
            console.log('Job completed, combined link:', link || '(none yet)');
          } else if (status.status === 'failed') {
            clearInterval(pollInterval);
            throw new Error(status.error || 'Processing failed');
          }
          // Also capture combined link as it appears (combined step runs at ~98%)
          if (status.combined_calculator_link && !combinedLink) {
            setCombinedLink(status.combined_calculator_link);
          }
        } catch (pollErr: any) {
          console.error('Polling error:', pollErr);
          clearInterval(pollInterval);
          throw pollErr;
        }
      }, 5000); // Poll every 5 seconds

    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
      console.error('Upload error:', err);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDownload = () => {
    if (!downloadBlob) return;
    
    const url = window.URL.createObjectURL(downloadBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aws_migration_report_${Date.now()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen bg-white relative">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-blue-300 rounded-full blur-3xl opacity-25 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-60 sm:w-96 h-60 sm:h-96 bg-indigo-300 rounded-full blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-slate-300 rounded-full blur-3xl opacity-15 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex justify-start">
            <Image src="/shellkode-logo.svg" alt="Shellkode" width={160} height={50} className="w-32 sm:w-40 md:w-48 h-auto opacity-90" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 pt-6 sm:pt-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 sm:space-y-6 text-center lg:text-left flex flex-col lg:items-start"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-slate-800 tracking-tight leading-[1.25] max-w-2xl mx-auto lg:mx-0">
                Intelligent Cloud Migration Cost Optimization
              </h1>
              <p className="text-base sm:text-[17px] text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0 font-normal">
                AI-powered Azure &amp; GCP to AWS cost comparison with real-time pricing and savings insights.
              </p>
              <div className="flex justify-center lg:justify-start">
                <a
                  href="#upload"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full font-semibold hover-glow text-center text-sm sm:text-base shadow-md"
                >
                  Get Estimate
                </a>
              </div>
            </motion.div>

            {/* Right Side - Dashboard Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex items-center justify-center -mx-4 sm:mx-0 [perspective:1400px]"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-[50px] blur-[80px] opacity-25 pointer-events-none" />
              <div
                className="relative w-full max-w-[600px] xl:max-w-[700px] rounded-3xl overflow-hidden shadow-[-30px_50px_80px_-20px_rgba(30,27,75,0.3)] border-[3px] border-white/60 group bg-white/40 backdrop-blur-sm"
                style={{
                  transform: 'rotateY(-25deg) rotateX(15deg) rotateZ(2deg) scale(0.95)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/5 to-transparent pointer-events-none z-10" />
                <Image
                  src="/hero-dashboard.png"
                  alt="Cloud Migration Dashboard"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-35 animate-float" style={{ animationDelay: '1.5s' }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 sm:mb-3">
              Start Analysis
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Upload your cloud cost data to begin optimization
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {/* Provider Selection */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setProvider('Azure')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  provider === 'Azure'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                    : 'bg-white/50 text-slate-600 hover:bg-white/70'
                }`}
              >
                Azure
              </button>
              <button
                onClick={() => setProvider('GCP')}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  provider === 'GCP'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                    : 'bg-white/50 text-slate-600 hover:bg-white/70'
                }`}
              >
                GCP
              </button>
            </div>

            {/* Upload Box */}
            <div className="relative rounded-2xl border border-white/60 bg-white/50 backdrop-blur-xl p-6 sm:p-8 text-center hover-lift overflow-hidden shadow-md">
              <div className="absolute inset-3 rounded-xl border-2 border-dashed border-indigo-300/60 pointer-events-none" />
              
              {!uploading && !results && (
                <>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center mb-6"
                  >
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_8px_32px_rgba(99,102,241,0.4)]">
                      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                      </svg>
                    </div>
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                    Upload Your Cloud Cost Data
                  </h3>
                  <p className="text-sm text-slate-600 mb-5">
                    Drag and drop your {provider === 'Azure' ? 'Azure' : 'GCP'} file here, or click to browse
                  </p>
                  <label className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover-glow cursor-pointer text-sm shadow-md transition-transform active:scale-95">
                    Choose File
                    <input 
                      type="file" 
                      accept=".xlsx,.xls,.csv" 
                      className="hidden" 
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                  <p className="text-xs text-slate-400 mt-3">
                    Supports Excel (.xlsx, .xls) and CSV (.csv) files
                  </p>
                </>
              )}

              {uploading && (
                <div className="py-8">
                  <div className="w-20 h-20 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="text-slate-700 font-bold text-lg mb-3">Analyzing your data...</p>

                  {/* Detailed status message - MORE PROMINENT */}
                  <div className="mb-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-base text-blue-700 font-semibold min-h-6">
                      {statusMessage || '🔄 Starting analysis...'}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full max-w-md mx-auto mb-2">
                    <div className="bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">{uploadProgress}% Complete</p>
                </div>
              )}

              {error && (
                <div className="py-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-red-600 font-semibold mb-4">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="px-6 py-2 bg-slate-600 text-white rounded-full text-sm hover:bg-slate-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {results && !error && (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-1">Analysis Complete!</h4>
                  <p className="text-slate-500 text-sm mb-5">Your AWS migration report is ready.</p>

                  {/* Combined AWS Calculator Link — primary CTA */}
                  {combinedLink ? (
                    <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-xl text-left">
                      <p className="text-xs font-semibold text-blue-500 uppercase mb-1">
                        🔗 Combined AWS Calculator — All Services in One Estimate
                      </p>
                      <a
                        href={combinedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-700 font-semibold text-sm break-all hover:underline mb-3"
                      >
                        {combinedLink}
                      </a>
                      <a
                        href={combinedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold text-sm hover-glow"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        Open All Services in AWS Calculator →
                      </a>
                    </div>
                  ) : (
                    <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                      ⏳ Combined AWS Calculator link is being generated — check the downloaded Excel report (Summary sheet row 1) once ready.
                    </div>
                  )}

                  {/* Secondary: Download report */}
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={handleDownload}
                      className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-sm shadow-md flex items-center gap-2 hover-glow"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Download Full Report
                    </button>
                    <button
                      onClick={() => { setResults(null); setDownloadBlob(null); setCombinedLink(''); }}
                      className="px-6 py-2.5 bg-slate-600 text-white rounded-full font-semibold text-sm hover:bg-slate-700 transition-colors"
                    >
                      Upload New File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
