import React from 'react';
import { Student, CollegeInfo } from '../types';
import IDCardFront from './IDCardFront';
import IDCardBack from './IDCardBack';

interface IDCardPageProps {
  students: Student[];
  collegeInfo: CollegeInfo;
  editMode: boolean;
}

const IDCardPage: React.FC<IDCardPageProps> = ({
  students,
  collegeInfo,
  editMode,
}) => {
  // Create pairs of students for the grid layout
  const studentPairs = [];
  for (let i = 0; i < students.length; i += 2) {
    studentPairs.push([
      students[i],
      students[i + 1] || {
        id: `empty-${i + 1}`,
        name: '',
        usn: '',
        validUpto: '',
        photoUrl: null,
      }
    ]);
  }

  return (
    <div className="w-[297mm] bg-white border border-gray-300 shadow-md print:shadow-none">
      <div className="flex flex-col gap-1">
        {studentPairs.map((pair, index) => (
          <div 
            key={`pair-${index}`} 
            className="flex gap-0.25"
            style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}
          >
            {/* First student in pair */}
            <div className="w-1/2">
              <IDCardFront
                student={pair[0]}
                collegeInfo={collegeInfo}
                editMode={editMode}
              />
              <IDCardBack
                editMode={editMode}
              />
            </div>
            
            {/* Second student in pair */}
            <div className="w-1/2">
              <IDCardFront
                student={pair[1]}
                collegeInfo={collegeInfo}
                editMode={editMode}
              />
              <IDCardBack
                editMode={editMode}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IDCardPage;
