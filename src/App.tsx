import React, { useState, useEffect } from 'react';
import { Student, CollegeInfo, ElementPosition, CardSide } from './types';
import StudentForm from './components/StudentForm';
import CollegeInfoForm from './components/CollegeInfoForm';
import IDCardPage from './components/IDCardPage';
import { generatePDF, printCards } from './utils/pdfGenerator';
import { GraduationCap, Printer, Download, Edit, Eye, Save, Plus, Minus } from 'lucide-react';

function App() {
  // College information state
  const [collegeInfo, setCollegeInfo] = useState<CollegeInfo>({
    name: '',
    address: '',
    logoUrl: null,
    librarianSignatureUrl: null,
    rules: 'This identification card is the property of the College and must be worn at all times while on campus.\n\n1. This card must be presented upon request by any college official.\n\n2. This card is non-transferable.\n\n3. If found, please return to the college library.\n\n4. A fee will be charged for replacement of lost cards.\n\n5. Report loss immediately to prevent unauthorized use.',
  });

  // Student records state
  const [students, setStudents] = useState<Student[]>(() => {
    return Array.from({ length: 4 }).map((_, index) => ({
      id: `student-${index + 1}`,
      name: '',
      usn: '',
      validUpto: '',
      photoUrl: null,
    }));
  });

  // Element positions for drag-and-drop functionality
  const [positions, setPositions] = useState<ElementPosition[]>([]);

  // UI state
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [editMode, setEditMode] = useState(false);

  // Initialize default positions for card elements
  useEffect(() => {
    const defaultPositions: ElementPosition[] = [];
    
    // For each student, set default positions for all draggable elements
    students.forEach((student) => {
      // Front card elements
      defaultPositions.push({ id: `logo-${student.id}`, x: 10, y: 10 });
      defaultPositions.push({ id: `college-name-${student.id}`, x: 80, y: 15 });
      defaultPositions.push({ id: `photo-${student.id}`, x: 10, y: 60 });
      defaultPositions.push({ id: `details-${student.id}`, x: 150, y: 60 });
      defaultPositions.push({ id: `signature-${student.id}`, x: 150, y: 140 });
      defaultPositions.push({ id: `barcode-${student.id}`, x: 10, y: 150 });
      
      // Back card elements
      defaultPositions.push({ id: `rules-${student.id}`, x: 20, y: 20 });
    });
    
    setPositions(defaultPositions);
  }, [students.length]);

  // Handle position changes from draggable elements
  const handlePositionChange = (id: string, position: { x: number; y: number }) => {
    setPositions((prevPositions) => {
      const updatedPositions = [...prevPositions];
      const index = updatedPositions.findIndex((pos) => pos.id === id);
      
      if (index !== -1) {
        updatedPositions[index] = { ...updatedPositions[index], ...position };
      } else {
        updatedPositions.push({ id, ...position });
      }
      
      return updatedPositions;
    });
  };

  // Update student data
  const handleStudentUpdate = (updatedStudent: Student) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  // Update student photo
  const handleStudentPhotoChange = (studentId: string, photoUrl: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, photoUrl } : student
      )
    );
  };

  // Update college logo
  const handleLogoChange = (logoUrl: string) => {
    setCollegeInfo((prevInfo) => ({ ...prevInfo, logoUrl }));
  };

  // Update librarian signature
  const handleSignatureChange = (signatureUrl: string) => {
    setCollegeInfo((prevInfo) => ({ ...prevInfo, librarianSignatureUrl: signatureUrl }));
  };

  // Toggle edit mode for drag-and-drop
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Add new student
  const addStudent = () => {
    setStudents(prevStudents => [
      ...prevStudents,
      {
        id: `student-${prevStudents.length + 1}`,
        name: '',
        usn: '',
        validUpto: '',
        photoUrl: null,
      }
    ]);
  };

  // Remove last student
  const removeStudent = () => {
    if (students.length > 1) {
      setStudents(prevStudents => prevStudents.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Student ID Card Generator</h1>
          </div>
          
          <div className="space-x-2">
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'edit'
                  ? 'bg-white text-blue-800'
                  : 'bg-blue-700 text-white hover:bg-blue-600'
              }`}
            >
              <Edit className="h-4 w-4 inline mr-1" />
              Edit
            </button>
            
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'preview'
                  ? 'bg-white text-blue-800'
                  : 'bg-blue-700 text-white hover:bg-blue-600'
              }`}
            >
              <Eye className="h-4 w-4 inline mr-1" />
              Preview
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Edit Tab */}
        {activeTab === 'edit' && (
          <div className="space-y-8">
            {/* College Information Form */}
            <CollegeInfoForm
              collegeInfo={collegeInfo}
              onUpdate={setCollegeInfo}
              onLogoChange={handleLogoChange}
              onSignatureChange={handleSignatureChange}
            />
            
            {/* Student Forms */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Student Information</h2>
                <div className="space-x-2">
                  <button
                    onClick={removeStudent}
                    disabled={students.length <= 1}
                    className="px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4 inline" />
                  </button>
                  <button
                    onClick={addStudent}
                    className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 inline" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((student) => (
                  <StudentForm
                    key={student.id}
                    student={student}
                    onUpdate={handleStudentUpdate}
                    onPhotoChange={handleStudentPhotoChange}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">ID Card Preview</h2>
                
                <div className="flex space-x-3">
                  <button
                    onClick={toggleEditMode}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      editMode 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {editMode ? (
                      <>
                        <Save className="h-4 w-4 inline mr-1" />
                        Save Layout
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 inline mr-1" />
                        Adjust Layout
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => printCards()}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition-colors"
                  >
                    <Printer className="h-4 w-4 inline mr-1" />
                    Print
                  </button>
                  
                  <button
                    onClick={() => generatePDF('id-card-page')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
                  >
                    <Download className="h-4 w-4 inline mr-1" />
                    Download PDF
                  </button>
                </div>
              </div>
              
              {editMode && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Layout Edit Mode:</strong> Drag and drop elements to reposition them on the ID card. Click "Save Layout" when finished.
                  </p>
                </div>
              )}
              
              <div className="overflow-auto print:overflow-visible mt-4" id="id-card-page">
                <IDCardPage
                  students={students}
                  collegeInfo={collegeInfo}
                  positions={positions}
                  onPositionChange={handlePositionChange}
                  editMode={editMode}
                />
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-800">
                <strong>Printing Tip:</strong> When printing, make sure to set your printer to A4 paper size and disable any scaling options for accurate sizing.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} Student ID Card Generator | All rights reserved
          </p>
        </div>
      </footer>

      {/* Print Styles - only applied when printing */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #id-card-page, #id-card-page * {
              visibility: visible;
            }
            #id-card-page {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `
      }} />
    </div>
  );
}

export default App;