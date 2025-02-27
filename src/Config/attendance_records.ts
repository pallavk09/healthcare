//attendanceRecord.attendance is an object with explicitly defined keys (term1, term2, etc.)
//TypeScript does not allow dynamic string indexing on an object unless an index signature is explicitly defined.
//Hence we need to define type for this
type AttendanceRecord = {
  [session: string]: {
    exams: {
      [exam_id: string]: {
        code: string;
        exam_name: string;
        total_working_days: number;
        total_days_present: number;
      };
    };
  };
};

export const attendance_records: {
  id: string;
  student_id: string;
  name: string;
  academic_year: string;
  class_id: string;
  section_id: string;
  attendance: AttendanceRecord; // ✅ Use the defined type
  remarks: string;
}[] = [
  {
    id: "2d154321",
    student_id: "2d154321",
    name: "Diane Lowe 1",
    academic_year: "2025-2026",
    class_id: "2d154378",
    section_id: "2d154374",
    attendance: {
      term1: {
        exams: {
          "2d154374": {
            code: "PT",
            exam_name: "Periodic Test",
            total_working_days: 20,
            total_days_present: 15,
          },
        },
      },
    },
    remarks: "Aut tripudio vilis.",
  },
  {
    id: "2d154322",
    student_id: "2d154322",
    name: "Diane Lowe 2",
    academic_year: "2025-2026",
    class_id: "2d154378",
    section_id: "2d154374",
    attendance: {
      term1: {
        exams: {
          "2d154374": {
            code: "PT",
            exam_name: "Periodic Test",
            total_working_days: 20,
            total_days_present: 18,
          },
        },
      },
    },
    remarks: "Aut tripudio vilis.",
  },
  {
    id: "2d154323",
    student_id: "2d154323",
    name: "Diane Lowe 3",
    academic_year: "2025-2026",
    class_id: "2d154378",
    section_id: "2d154374",
    attendance: {
      term1: {
        exams: {
          "2d154374": {
            code: "PT",
            exam_name: "Periodic Test",
            total_working_days: 20,
            total_days_present: 10,
          },
        },
      },
    },
    remarks: "Aut tripudio vilis.",
  },
  {
    id: "2d154324",
    student_id: "2d154324",
    name: "Diane Lowe 4",
    academic_year: "2025-2026",
    class_id: "2d154378",
    section_id: "2d154374",
    attendance: {
      term1: {
        exams: {
          "2d154374": {
            code: "PT",
            exam_name: "Periodic Test",
            total_working_days: 20,
            total_days_present: 16,
          },
        },
      },
    },
    remarks: "Aut tripudio vilis.",
  },
];
