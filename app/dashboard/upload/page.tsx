import UploadZone from '@/components/UploadZone';

export default function UploadPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold text-navy-dark mb-2">
          Upload Cost Data
        </h1>
        <p className="text-gray-600">
          Upload your Azure or GCP Excel file to start the analysis
        </p>
      </div>

      {/* Upload Zone */}
      <UploadZone />
    </div>
  );
}
