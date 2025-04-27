export interface Student {
  id: string;
  name: string;
  usn: string;
  department: string;
  validUpto: string;
  photoUrl: string | null;
}

export interface CollegeInfo {
  name: string;
  address: string;
  logoUrl: string | null;
  librarianSignatureUrl: string | null;
  rules: string;
}

export interface ElementPosition {
  id: string;
  x: number;
  y: number;
}

export interface IDCardSettings {
  positions: ElementPosition[];
}

export type CardSide = 'front' | 'back';