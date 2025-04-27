import React, { useRef } from 'react';

interface IDCardBackProps {
  editMode: boolean;
}

const IDCardBack: React.FC<IDCardBackProps> = ({
  editMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative border border-gray-300 bg-white p-4 overflow-hidden"
      style={{ width: '145mm', height: '80mm' }}
    >
      <div className="max-w-full">
        <h3 className="text-lg font-bold text-center mb-4">RULES AND REGULATIONS</h3>
        <ol className="list-decimal pl-6 space-y-2 text-sm">
          <li>This card should be produced in the Library for every transaction.</li>
          <li>At time only 3 Books can be borrowed on this card for the duration of 15 days. Renewal will be made only on presentation of book and no same book is not reserved/required by any other student/faculty.</li>
          <li>If the Card is Lost, Duplicate card will be issued against payment of Rs. 200/- for once only.</li>
          <li>If the Book is lost immediate report to the Librarian and also the Borrower should have to pay 3 times the actual Book cost.</li>
          <li>Mutual exchange of book or card is strictly prohibited.</li>
        </ol>
      </div>

      {/* Edit mode indicator */}
      {editMode && (
        <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-400 pointer-events-none"></div>
      )}
    </div>
  );
};

export default IDCardBack;
