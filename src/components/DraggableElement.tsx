import React, { useState, useRef, useEffect } from 'react';
import { ElementPosition } from '../types';

interface DraggableElementProps {
  id: string;
  initialPosition?: { x: number, y: number };
  containerRef: React.RefObject<HTMLDivElement>;
  onPositionChange: (id: string, position: { x: number, y: number }) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  id,
  initialPosition = { x: 0, y: 0 },
  containerRef,
  onPositionChange,
  disabled = false,
  children,
  className = '',
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialElementPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled || !containerRef.current) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    
    const containerRect = containerRef.current.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top
    };
    initialElementPos.current = position;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current || !elementRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = elementRef.current.getBoundingClientRect();
    
    const newX = e.clientX - containerRect.left - dragStartPos.current.x + initialElementPos.current.x;
    const newY = e.clientY - containerRect.top - dragStartPos.current.y + initialElementPos.current.y;
    
    // Apply constraints
    const maxX = containerRect.width - elementRect.width;
    const maxY = containerRect.height - elementRect.height;
    
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: constrainedX, y: constrainedY });
    onPositionChange(id, { x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={elementRef}
      className={`absolute ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab'} ${disabled ? 'cursor-default' : ''} ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.1s ease',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default DraggableElement;