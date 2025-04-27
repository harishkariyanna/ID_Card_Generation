import React from 'react';
import { Student } from '../types';
import FileUploader from './FileUploader';

interface StudentFormProps {
  student: Student;
  onUpdate: (updatedStudent: Student) => void;
  onPhotoChange: (studentId: string, photoUrl: string) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onUpdate, onPhotoChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...student,
      [name]: value,
    });
  };

  const handlePhotoUpload = (url: string, _: File) => {
    onPhotoChange(student.id, url);
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <h3 className="font-medium text-lg mb-3">Student #{student.id.slice(-1)}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label htmlFor={`name-${student.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id={`name-${student.id}`}
              name="name"
              value={student.name}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor={`department-${student.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              id={`department-${student.id}`}
              name="department"
              value={student.department}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor={`usn-${student.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              USN (University Seat Number)
            </label>
            <input
              type="text"
              id={`usn-${student.id}`}
              name="usn"
              value={student.usn}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor={`validUpto-${student.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Valid Upto
            </label>
            <input
              type="date"
              id={`validUpto-${student.id}`}
              name="validUpto"
              value={student.validUpto}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <FileUploader
            label="Student Photo"
            onFileSelected={handlePhotoUpload}
            accept="image/jpeg,image/png"
          />
          
          {student.photoUrl && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-1">Photo Preview:</p>
              <div className="w-24 h-32 bg-gray-100 border overflow-hidden">
                <img 
                  src={student.photoUrl} 
                  alt={`${student.name} photo`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentForm;