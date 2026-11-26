export type Student = {
  student_id: number;
  nis: string;
  name: string;
  gender: 'L' | 'P';
  class: string;
  major: string;
  phone: string;
  is_active: boolean;
};

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  StudentList: undefined;
  StudentDetail: { student: Student };
  StudentAdd: undefined;
  StudentEdit: { student: Student };
};
