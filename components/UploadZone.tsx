'use client';

import { useState } from 'react';

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');

  const stages = [
    'Reading Excel',
    'SQL Matching',
    'AI Fallback',
    'Pricing Calculation',
    'Generating Report',
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls'))) {
      setFile(droppedFile);
      processFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const processFile = (file: File) => {
    setProcessing(true);
    setProgress(0);
    
    // Simulate processing stages
    stages.forEach((stageName, index) => {
      setTimeout(() => {
        setStage(stageName);
        setProgress(((index + 1) / stages.length) * 100);
        
        if (index === stages.length - 1) {
          setTimeout(() => {
            setProcessing(false);
            setStage('Complete!');
          }, 500);
        }
      }, (index + 1) * 1000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
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
        {!file ? (
          <div className="text-center">
            <div className="text-6xl mb-6">📤</div>
            <h3 className="text-2xl font-bold text-navy-dark mb-3">
              Upload Your Cloud Cost Data
            </h3>
            <p className="text-gray-600 mb-6">
              Drag and drop your Azure or GCP Excel file here, or click to browse
            </p>
            <label className="inline-block px-8 py-4 bg-ice-gradient text-white rounded-full font-semibold hover-glow cursor-pointer">
              Choose File
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supports .xlsx and .xls files
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
              <div className="text-4xl">📄</div>
              <div className="flex-1">
                <div className="font-semibold text-navy-dark">{file.name}</div>
                <div className="text-sm text-gray-600">
                  {(file.size / 1024).toFixed(2)} KB
                </div>
              </div>
              {!processing && (
                <button
                  onClick={() => {
                    setFile(null);
                    setProgress(0);
                    setStage('');
                  }}
                  className="text-alert-red hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Processing Stages */}
            {processing && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-navy-dark mb-2">
                    Processing...
                  </div>
                  <div className="text-ice-600 font-medium">{stage}</div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-ice-gradient transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Stage Indicators */}
                <div className="grid grid-cols-5 gap-2">
                  {stages.map((stageName, index) => {
                    const isActive = stage === stageName;
                    const isComplete = stages.indexOf(stage) > index;
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-xl text-center text-xs transition-all ${
                          isActive
                            ? 'bg-ice-400 text-white shadow-ice-glow'
                            : isComplete
                            ? 'bg-savings-green text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {stageName}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Success State */}
            {!processing && stage === 'Complete!' && (
              <div className="text-center p-6 bg-savings-green/10 rounded-xl border border-savings-green/20">
                <div className="text-5xl mb-3">✅</div>
                <div className="text-xl font-bold text-savings-green mb-2">
                  Processing Complete!
                </div>
                <p className="text-gray-600 mb-4">
                  Your cost analysis report is ready
                </p>
                <button className="px-8 py-3 bg-savings-green text-white rounded-full font-semibold hover-glow">
                  Download Report
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="glass-effect p-4 rounded-xl border border-ice-200">
          <div className="text-2xl mb-2">🔒</div>
          <div className="font-semibold text-navy-dark mb-1">Secure Upload</div>
          <div className="text-sm text-gray-600">Your data is encrypted and secure</div>
        </div>
        <div className="glass-effect p-4 rounded-xl border border-ice-200">
          <div className="text-2xl mb-2">⚡</div>
          <div className="font-semibold text-navy-dark mb-1">Fast Processing</div>
          <div className="text-sm text-gray-600">Results in under 30 seconds</div>
        </div>
        <div className="glass-effect p-4 rounded-xl border border-ice-200">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-semibold text-navy-dark mb-1">Detailed Reports</div>
          <div className="text-sm text-gray-600">5-sheet comprehensive analysis</div>
        </div>
      </div>
    </div>
  );
}
