import React, { useRef, useEffect } from 'react';
import { Student, CollegeInfo } from '../types';
import { generateBarcodeSVG, svgToDataUrl } from '../utils/barcodeGenerator';

interface IDCardFrontProps {
  student: Student;
  collegeInfo: CollegeInfo;
  editMode: boolean;
}

const IDCardFront: React.FC<IDCardFrontProps> = ({
  student,
  collegeInfo,
  editMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (barcodeRef.current && student.usn) {
      const barcodeSVG = generateBarcodeSVG(student.usn);
      const barcodeDataUrl = svgToDataUrl(barcodeSVG);
      barcodeRef.current.src = barcodeDataUrl;
    }
  }, [student.usn]);

  return (
    <div 
      ref={containerRef}
      className="relative border border-gray-300 bg-white p-4 overflow-hidden"
      style={{ width: '145mm', height: '80mm' }}
    >
      {/* Header with Logo and College Name */}
      <div className="flex items-center mb-4 space-x-4">
        <div className="flex items-center">
          {collegeInfo.logoUrl ? (
            <img 
              src={collegeInfo.logoUrl} 
              alt="College Logo" 
              className="w-20 h-20 object-contain"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
              Logo
            </div>
          )}
        </div>
        <div className="text-center flex-1">
          <h2 className="text-xl font-bold text-gray-900">{collegeInfo.name || 'College Name'}</h2>
          <p className="text-sm text-gray-600">{collegeInfo.address || 'College Address'}</p>
          <p className="text-lg font-semibold mt-2">STUDENT MEMBERSHIP CARD</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Photo */}
        <div className="w-24 h-32 border border-gray-300 overflow-hidden mr-4 relative z-10 bg-white">
          {student.photoUrl ? (
            <img 
              src={student.photoUrl} 
              alt={`${student.name} photo`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              Photo
            </div>
          )}
        </div>

        {/* Student Details */}
        <div className="flex-1 space-y-2">
          <div>
            <p className="text-sm">Name: {student.name || '<Name>'}</p>
          </div>
          <div>
            <p className="text-sm">Dept.: {student.department || '<Department>'}</p>
          </div>
          <div>
            <p className="text-sm">Valid Up to: {student.validUpto || '<Valid_Upto>'}</p>
          </div>
          <div>
            <p className="text-sm">USN: {student.usn || '<USN>'}</p>
          </div>

          {/* Barcode moved here below USN */}
          <div className="mt-0 text-left">
            <img 
              ref={barcodeRef}
              alt="Barcode"
              className="w-48 h-24 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
        <div className="text-center">
          {/* Signature line removed as per request */}
        </div>
        <div className="text-center">
          {collegeInfo.librarianSignatureUrl ? (
            <img
              src={collegeInfo.librarianSignatureUrl}
              alt="Librarian Signature"
              className="w-24 h-12 object-contain mx-auto border-b border-gray-400"
            />
          ) : (
            <div className="w-24 h-12 border-b border-gray-400"></div>
          )}
          <p className="text-xs mt-1">Librarian</p>
        </div>
      </div>

      {/* Edit mode indicator */}
      {editMode && (
        <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-400 pointer-events-none"></div>
      )}
    </div>
  );
};

export default IDCardFront;
