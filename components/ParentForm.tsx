import React, { useState } from 'react';
import type { Language, Parent, Student } from '../types';
import { translations, PARENT_TITLES, STUDENT_TITLES, PROGRAMS, CLASS_DATA } from '../constants';
import { SCRIPT_URL } from '../config';

interface ParentFormProps {
    language: Language;
}

const ParentForm: React.FC<ParentFormProps> = ({ language }) => {
    const [parents, setParents] = useState<Parent[]>([{ id: crypto.randomUUID(), title: '', fullName: '', phone: '' }]);
    const [students, setStudents] = useState<Student[]>([{ id: crypto.randomUUID(), title: '', fullName: '', program: '', className: '' }]);
    const [attendance, setAttendance] = useState<'attending' | 'not_attending' | 'pending'>('pending');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddParent = () => {
        if (parents.length < 3) {
            setParents([...parents, { id: crypto.randomUUID(), title: '', fullName: '', phone: '' }]);
        }
    };

    const handleRemoveParent = (id: string) => {
        setParents(parents.filter(p => p.id !== id));
    };

    const handleParentChange = (id: string, field: keyof Omit<Parent, 'id'>, value: string) => {
        setParents(parents.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleAddStudent = () => {
        if (students.length < 3) {
            setStudents([...students, { id: crypto.randomUUID(), title: '', fullName: '', program: '', className: '' }]);
        }
    };

    const handleRemoveStudent = (id: string) => {
        setStudents(students.filter(s => s.id !== id));
    };

    const handleStudentChange = (id: string, field: keyof Omit<Student, 'id'>, value: string) => {
        setStudents(students.map(s => {
            if (s.id === id) {
                const updatedStudent = { ...s, [field]: value };
                if (field === 'program') {
                    updatedStudent.className = ''; // Reset class when program changes
                }
                return updatedStudent;
            }
            return s;
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (attendance === 'pending' || parents.some(p => !p.fullName || !p.phone) || students.some(s => !s.fullName || !s.program || !s.className)) {
            (window as any).Swal.fire({
                icon: 'error',
                title: language === 'th' ? 'ข้อมูลไม่ครบถ้วน' : 'Incomplete Information',
                text: language === 'th' ? 'กรุณากรอกข้อมูลที่จำเป็นทั้งหมด' : 'Please fill in all required fields.',
            });
            return;
        }

        if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
             (window as any).Swal.fire({
                icon: 'error',
                title: language === 'th' ? 'การตั้งค่าไม่สมบูรณ์' : 'Configuration Incomplete',
                text: language === 'th' ? 'กรุณาตั้งค่า SCRIPT_URL ในไฟล์ config.ts ก่อน' : 'Please set the SCRIPT_URL in the config.ts file.',
            });
            return;
        }

        setIsSubmitting(true);

        const newSubmission = {
            id: crypto.randomUUID(),
            parents,
            students,
            attendance,
            submissionDate: new Date().toISOString(),
        };

        const payload = {
            action: 'add',
            submission: newSubmission
        };

        fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Required for Apps Script
        })
        .then(res => res.json())
        .then(data => {
            if (data.result === 'success') {
                (window as any).Swal.fire({
                    icon: 'success',
                    title: language === 'th' ? 'ส่งข้อมูลสำเร็จ' : 'Submission Successful',
                    text: language === 'th' ? 'ขอบคุณสำหรับการตอบรับ' : 'Thank you for your response.',
                });
                // Reset form
                setParents([{ id: crypto.randomUUID(), title: '', fullName: '', phone: '' }]);
                setStudents([{ id: crypto.randomUUID(), title: '', fullName: '', program: '', className: '' }]);
                setAttendance('pending');
            } else {
                throw new Error(data.message || 'Unknown error from server');
            }
        })
        .catch(error => {
             (window as any).Swal.fire({
                icon: 'error',
                title: language === 'th' ? 'เกิดข้อผิดพลาด' : 'An Error Occurred',
                text: language === 'th' ? `ไม่สามารถส่งข้อมูลได้: ${error.message}` : `Could not submit data: ${error.message}`,
            });
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    const inputStyles = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-base px-4 py-3 transition-shadow duration-150 ease-in-out";

    return (
        <form onSubmit={handleSubmit} className="space-y-10 bg-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-200">
            <p className="text-center text-lg">{translations.formInstructions[language]}</p>
            
            {/* Parent Information */}
            <fieldset className="space-y-4 p-4 border rounded-lg">
                <legend className="text-xl font-semibold px-2">{translations.parentInfo[language]}</legend>
                <p className="text-sm text-gray-500 px-2">{translations.parentNote[language]}</p>
                {parents.map((parent, index) => (
                    <div key={parent.id} className="p-4 bg-gray-50 rounded-lg border relative">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">{translations.title[language]}</label>
                                <select value={parent.title} onChange={e => handleParentChange(parent.id, 'title', e.target.value)} className={inputStyles}>
                                    <option value="">{translations.selectTitle[language]}</option>
                                    {(language === 'th' ? PARENT_TITLES.th : PARENT_TITLES.en).map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">{translations.fullName[language]}</label>
                                <input type="text" value={parent.fullName} onChange={e => handleParentChange(parent.id, 'fullName', e.target.value)} required className={inputStyles} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">{translations.phone[language]}</label>
                                <input type="tel" value={parent.phone} onChange={e => handleParentChange(parent.id, 'phone', e.target.value)} required className={inputStyles} />
                            </div>
                        </div>
                        {parents.length > 1 && (
                            <button type="button" onClick={() => handleRemoveParent(parent.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold hover:bg-red-600">&times;</button>
                        )}
                    </div>
                ))}
                {parents.length < 3 && <button type="button" onClick={handleAddParent} className="text-sky-700 font-medium hover:underline pt-2">{`+ ${translations.addParent[language]}`}</button>}
            </fieldset>

            {/* Student Information */}
            <fieldset className="space-y-4 p-4 border rounded-lg">
                <legend className="text-xl font-semibold px-2">{translations.studentInfo[language]}</legend>
                 <p className="text-sm text-gray-500 px-2">{translations.studentNote[language]}</p>
                {students.map((student, index) => (
                     <div key={student.id} className="p-4 bg-gray-50 rounded-lg border relative space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{translations.title[language]}</label>
                                <select value={student.title} onChange={e => handleStudentChange(student.id, 'title', e.target.value)} className={inputStyles}>
                                    <option value="">{translations.selectTitle[language]}</option>
                                    {(language === 'th' ? STUDENT_TITLES.th : STUDENT_TITLES.en).map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{translations.fullName[language]}</label>
                                <input type="text" value={student.fullName} onChange={e => handleStudentChange(student.id, 'fullName', e.target.value)} required className={inputStyles} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">{translations.program[language]}</label>
                                <select value={student.program} onChange={e => handleStudentChange(student.id, 'program', e.target.value)} required className={inputStyles}>
                                    <option value="">{translations.selectProgram[language]}</option>
                                    {Object.entries(PROGRAMS).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">{translations.class[language]}</label>
                                <select value={student.className} onChange={e => handleStudentChange(student.id, 'className', e.target.value)} required disabled={!student.program} className={`${inputStyles} disabled:bg-gray-200`}>
                                    <option value="">{translations.selectClass[language]}</option>
                                    {student.program && (CLASS_DATA as any)[student.program].classes.map((c: string) => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {student.program && <p className="text-xs text-sky-600 mt-1">{(CLASS_DATA as any)[student.program].time[language]}</p>}
                            </div>
                        </div>
                        {students.length > 1 && (
                            <button type="button" onClick={() => handleRemoveStudent(student.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold hover:bg-red-600">&times;</button>
                        )}
                    </div>
                ))}
                 {students.length < 3 && <button type="button" onClick={handleAddStudent} className="text-sky-700 font-medium hover:underline pt-2">{`+ ${translations.addStudent[language]}`}</button>}
            </fieldset>

            {/* Attendance */}
            <fieldset className="p-4 border rounded-lg">
                <legend className="text-xl font-semibold px-2">{translations.attendanceTitle[language]}</legend>
                <div className="mt-4 flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
                    <div className="flex items-center">
                        <input id="attending" name="attendance" type="radio" checked={attendance === 'attending'} onChange={() => setAttendance('attending')} required className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500" />
                        <label htmlFor="attending" className="ml-3 block text-sm font-medium text-gray-700">{translations.attending[language]}</label>
                    </div>
                    <div className="flex items-center">
                        <input id="not-attending" name="attendance" type="radio" checked={attendance === 'not_attending'} onChange={() => setAttendance('not_attending')} required className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500" />
                        <label htmlFor="not-attending" className="ml-3 block text-sm font-medium text-gray-700">{translations.notAttending[language]}</label>
                    </div>
                </div>
            </fieldset>

            <div className="flex justify-center">
                <button type="submit" disabled={isSubmitting} className="px-12 py-3 bg-sky-700 text-white font-bold rounded-lg shadow-md hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
                     {isSubmitting ? (language === 'th' ? 'กำลังส่ง...' : 'Submitting...') : translations.submit[language]}
                </button>
            </div>
        </form>
    );
};

export default ParentForm;
