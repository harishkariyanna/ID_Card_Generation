import React from 'react';
import { CollegeInfo } from '../types';
import FileUploader from './FileUploader';

interface CollegeInfoFormProps {
  collegeInfo: CollegeInfo;
  onUpdate: (updatedInfo: CollegeInfo) => void;
  onLogoChange: (logoUrl: string) => void;
  onSignatureChange: (signatureUrl: string) => void;
}

const CollegeInfoForm: React.FC<CollegeInfoFormProps> = ({
  collegeInfo,
  onUpdate,
  onLogoChange,
  onSignatureChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onUpdate({
      ...collegeInfo,
      [name]: value,
    });
  };

  const handleLogoUpload = (url: string, _: File) => {
    onLogoChange(url);
  };

  const handleSignatureUpload = (url: string, _: File) => {
    onSignatureChange(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">College Information</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              College Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={collegeInfo.name}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., National Institute of Technology"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              College Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={collegeInfo.address}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., 123 Education Street, City, State, ZIP"
            />
          </div>
          
          <div>
            <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-1">
              Rules and Regulations (Back of ID Card)
            </label>
            <textarea
              id="rules"
              name="rules"
              value={collegeInfo.rules}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter rules and regulations to appear on the back of all ID cards..."
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <FileUploader
              label="College Logo"
              onFileSelected={handleLogoUpload}
              accept="image/jpeg,image/png"
            />
            
            {collegeInfo.logoUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-1">Logo Preview:</p>
                <div className="w-32 h-32 bg-gray-100 border rounded-lg overflow-hidden">
                  <img 
                    src={collegeInfo.logoUrl} 
                    alt="College Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <FileUploader
              label="Librarian Signature"
              onFileSelected={handleSignatureUpload}
              accept="image/jpeg,image/png"
            />
            
            {collegeInfo.librarianSignatureUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-1">Signature Preview:</p>
                <div className="w-32 h-16 bg-gray-100 border rounded-lg overflow-hidden">
                  <img 
                    src={collegeInfo.librarianSignatureUrl} 
                    alt="Librarian Signature" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeInfoForm;