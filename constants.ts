
export const PARENT_TITLES = {
    th: ['นาย', 'นาง', 'นางสาว'],
    en: ['Mr.', 'Mrs.', 'Miss', 'Ms.']
};

export const STUDENT_TITLES = {
    th: ['เด็กชาย', 'เด็กหญิง', 'นาย', 'นางสาว'],
    en: ['Master', 'Miss', 'Mr.']
};

export const PROGRAMS = {
    'kindergarten': 'อนุบาล Kindergarten',
    'english_programme': 'โปรแกรมภาษาอังกฤษ English Programme',
    'thai_programme': 'โปรแกรมภาษาไทย Thai Programme'
};

export const CLASS_DATA = {
    'kindergarten': {
        time: { th: 'เวลา 09.00-10.00 น.', en: 'Time 09:00-10:00 AM' },
        classes: [
            'อนุบาล 1A TP / Kindergarten 1A TP',
            'อนุบาล 1B TP / Kindergarten 1B TP',
            'อนุบาล 2A TP / Kindergarten 2A TP',
            'อนุบาล 3A TP / Kindergarten 3A TP',
            'อนุบาล 3B TP / Kindergarten 3B TP',
            'อนุบาล 1A EP / Kindergarten 1A EP',
            'อนุบาล 2A EP / Kindergarten 2A EP',
            'อนุบาล 3A EP / Kindergarten 3A EP',
            'อนุบาล 3B EP / Kindergarten 3B EP',
        ]
    },
    'english_programme': {
        time: { th: 'เวลา 11.00-12.00 น.', en: 'Time 11:00-12:00 PM' },
        classes: [
            'ป.1A EP / P.1A EP', 'ป.1B EP / P.1B EP', 'ป.2A EP / P.2A EP', 'ป.2B EP / P.2B EP',
            'ป.3A EP / P.3A EP', 'ป.3B EP / P.3B EP', 'ป.4A EP / P.4A EP', 'ป.4B EP / P.4B EP',
            'ป.5A EP / P.5A EP', 'ป.5B EP / P.5B EP', 'ป.6A EP / P.6A EP', 'ป.6B EP / P.6B EP',
            'ม.1A EP / M.1A EP', 'ม.1B EP / M.1B EP', 'ม.2A EP / M.2A EP', 'ม.2B EP / M.2B EP',
            'ม.3A EP / M.3A EP', 'ม.4A EP / M.4A EP', 'ม.5A EP / M.5A EP', 'ม.6A EP / M.6A EP'
        ]
    },
    'thai_programme': {
        time: { th: 'เวลา 13.00-14.00 น.', en: 'Time 01:00-02:00 PM' },
        classes: [
            'ป.1A TP / P.1A TP', 'ป.1B TP / P.1B TP', 'ป.2A TP / P.2A TP', 'ป.2B TP / P.2B TP',
            'ป.3A TP / P.3A TP', 'ป.3B TP / P.3B TP', 'ป.4A TP / P.4A TP', 'ป.4B TP / P.4B TP',
            'ป.5A TP / P.5A TP', 'ป.5B TP / P.5B TP', 'ป.6A TP / P.6A TP', 'ป.6B TP / P.6B TP',
            'ม.1A TP / M.1A TP', 'ม.1B TP / M.1B TP', 'ม.2A TP / M.2A TP', 'ม.3A TP / M.3A TP',
            'ม.4A TP / M.4A TP', 'ม.5A TP / M.5A TP', 'ม.6A TP / M.6A TP'
        ]
    }
};

export const translations = {
    schoolName: {
        th: "โรงเรียนสาธิตอุดมศึกษา",
        en: "Satit Udomseuksa School"
    },
    formTitle: {
        th: "แบบตอบรับการเข้าร่วมประชุมผู้ปกครอง",
        en: "Parent-Teacher Conference RSVP Form"
    },
    formDate: {
        th: "วันเสาร์ที่ 8 พฤศจิกายน 2568",
        en: "Saturday, 8th November 2025"
    },
    formInstructions: {
        th: "กรุณากรอกข้อมูลต่อไปนี้ให้ครบถ้วน",
        en: "Please complete the following information."
    },
    parentInfo: {
        th: "ข้อมูลผู้ปกครอง",
        en: "Parent Information"
    },
    parentNote: {
        th: "โปรดระบุข้อมูลผู้ปกครองที่เข้าร่วมทั้งหมดให้ชัดเจน (เพิ่มได้สูงสุด 3 คน)",
        en: "Please provide clear information for all attending parents (max 3)."
    },
    addParent: {
        th: "เพิ่มผู้ปกครอง",
        en: "Add Parent"
    },
    remove: {
        th: "ลบ",
        en: "Remove"
    },
    parent: {
        th: "ผู้ปกครอง",
        en: "Parent"
    },
    title: {
        th: "คำนำหน้าชื่อ",
        en: "Title"
    },
    selectTitle: {
        th: "เลือกคำนำหน้า...",
        en: "Select Title..."
    },
    fullName: {
        th: "ชื่อ-สกุล",
        en: "Full Name"
    },
    phone: {
        th: "เบอร์โทรศัพท์",
        en: "Phone Number"
    },
    studentInfo: {
        th: "ข้อมูลนักเรียน",
        en: "Student Information"
    },
    studentNote: {
        th: "เพิ่มได้สูงสุด 3 คน",
        en: "Max 3 students"
    },
    addStudent: {
        th: "เพิ่มนักเรียน",
        en: "Add Student"
    },
    student: {
        th: "นักเรียน",
        en: "Student"
    },
    program: {
        th: "โปรแกรมการเรียน",
        en: "Learning Program"
    },
    selectProgram: {
        th: "เลือกโปรแกรม...",
        en: "Select Program..."
    },
    class: {
        th: "ห้องเรียน",
        en: "Class"
    },
    selectClass: {
        th: "เลือกห้องเรียน...",
        en: "Select Class..."
    },
    attendanceTitle: {
        th: "ท่านจะเข้าร่วมการประชุมผู้ปกครองในวันที่ 8 พฤศจิกายน 2568 หรือไม่?",
        en: "Will you attend the parent-teacher conference on November 8, 2025?"
    },
    attending: {
        th: "เข้าร่วม",
        en: "Will Attend"
    },
    notAttending: {
        th: "ไม่สามารถเข้าร่วมได้",
        en: "Cannot Attend"
    },
    submit: {
        th: "ส่งข้อมูล",
        en: "Submit"
    },
    adminLogin: {
        th: "เข้าสู่ระบบผู้ดูแล",
        en: "Admin Login"
    },
    username: {
        th: "ชื่อผู้ใช้",
        en: "Username"
    },
    password: {
        th: "รหัสผ่าน",
        en: "Password"
    },
    login: {
        th: "เข้าสู่ระบบ",
        en: "Login"
    },
    logout: {
        th: "ออกจากระบบ",
        en: "Logout"
    },
    adminDashboard: {
        th: "แดชบอร์ดผู้ดูแลระบบ",
        en: "Admin Dashboard"
    },
    submissions: {
        th: "ข้อมูลที่ส่งเข้ามา",
        en: "Submissions"
    },
    filterByProgram: {
        th: "กรองตามโปรแกรม",
        en: "Filter by Program"
    },
    allPrograms: {
        th: "ทุกโปรแกรม",
        en: "All Programs"
    },
    submissionDate: {
        th: "วันที่ส่ง",
        en: "Submission Date"
    },
    actions: {
        th: "การกระทำ",
        en: "Actions"
    },
    edit: {
        th: "แก้ไข",
        en: "Edit"
    },
    delete: {
        th: "ลบ",
        en: "Delete"
    },
    addSubmission: {
        th: "เพิ่มข้อมูลใหม่",
        en: "Add New Entry"
    },
    editSubmission: {
        th: "แก้ไขข้อมูล",
        en: "Edit Entry"
    },
    save: {
        th: "บันทึก",
        en: "Save"
    },
    cancel: {
        th: "ยกเลิก",
        en: "Cancel"
    },
};
   