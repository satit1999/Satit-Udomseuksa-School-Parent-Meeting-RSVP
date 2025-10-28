
export type Language = 'th' | 'en';

export interface Parent {
  id: string;
  title: string;
  fullName: string;
  phone: string;
}

export interface Student {
  id: string;
  title: string;
  fullName: string;
  program: string;
  className: string;
}

export interface Submission {
  id: string;
  parents: Parent[];
  students: Student[];
  attendance: 'attending' | 'not_attending' | 'pending';
  submissionDate: string;
}
   