
import React, {createContext, useContext, useState, ReactNode,} from 'react';
import type { Student } from '../navigation/types';

type StudentContextType = {
  students: Student[];
  addStudent: (student: Student) => boolean;
  updateStudent: (student: Student) => void;
  deleteStudent: (studentId: number) => void;
};

const initialStudents: Student[] = [
  {
    student_id: 1,
    nis: '2024001',
    name: 'Andi Pratama',
    gender: 'L',
    class: 'XI',
    major: 'RPL',
    phone: '081234567890',
    is_active: true,
  },
  {
    student_id: 2,
    nis: '2024002',
    name: 'Siti Rahma',
    gender: 'P',
    class: 'XI',
    major: 'RPL',
    phone: '081234567891',
    is_active: true,
  },
  {
    student_id: 3,
    nis: '2024003',
    name: 'Budi Santoso',
    gender: 'L',
    class: 'X',
    major: 'TKJ',
    phone: '081234567892',
    is_active: true,
  },
  {
    student_id: 4,
    nis: '2024004',
    name: 'Dewi Lestari',
    gender: 'P',
    class: 'XII',
    major: 'RPL',
    phone: '081234567893',
    is_active: false,
  },
];

const StudentContext = createContext<StudentContextType | undefined>(
  undefined,
);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const addStudent = (student: Student) => {
    const duplicate = students.some(
      item => item.nis === student.nis,
    );

    if (duplicate) {
      return false;
    }

    setStudents(current => [...current, student]);
    return true;
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(current =>
      current.map(student =>
        student.student_id === updatedStudent.student_id
          ? updatedStudent
          : student,
      ),
    );
  };

  const deleteStudent = (studentId: number) => {
    setStudents(current =>
      current.filter(student => student.student_id !== studentId),
    );
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      'useStudents harus digunakan di dalam StudentProvider',
    );
  }

  return context;
}