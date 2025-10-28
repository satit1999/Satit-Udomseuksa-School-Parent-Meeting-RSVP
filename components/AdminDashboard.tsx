import React, { useState, useEffect, useMemo } from 'react';
import type { Language, Submission, Student } from '../types';
import { translations, PROGRAMS } from '../constants';
import { SCRIPT_URL } from '../config';

interface AdminDashboardProps {
    language: Language;
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language, onLogout }) => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [filterProgram, setFilterProgram] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        setIsLoading(true);
        if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            (window as any).Swal.fire({
                icon: 'error',
                title: language === 'th' ? 'การตั้งค่าไม่สมบูรณ์' : 'Configuration Incomplete',
                text: language === 'th' ? 'กรุณาตั้งค่า SCRIPT_URL ในไฟล์ config.ts ก่อน' : 'Please set the SCRIPT_URL in the config.ts file.',
            });
            setIsLoading(false);
            return;
        }

        fetch(SCRIPT_URL)
            .then(res => res.json())
            .then(data => {
                if(Array.isArray(data)){
                    setSubmissions(data);
                } else {
                    throw new Error("Invalid data format received.");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                (window as any).Swal.fire({
                    icon: 'error',
                    title: language === 'th' ? 'ไม่สามารถโหลดข้อมูลได้' : 'Failed to Load Data',
                    text: error.message
                });
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id: string) => {
        (window as any).Swal.fire({
            title: language === 'th' ? 'คุณแน่ใจหรือไม่?' : 'Are you sure?',
            text: language === 'th' ? 'คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!' : "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: language === 'th' ? 'ใช่, ลบเลย!' : 'Yes, delete it!',
            cancelButtonText: language === 'th' ? 'ยกเลิก' : 'Cancel'
        }).then((result:any) => {
            if (result.isConfirmed) {
                const payload = { action: 'delete', id };
                fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                })
                .then(res => res.json())
                .then(data => {
                    if (data.result === 'success') {
                        setSubmissions(submissions.filter(s => s.id !== id));
                        (window as any).Swal.fire(
                            language === 'th' ? 'ลบแล้ว!' : 'Deleted!',
                            language === 'th' ? 'ข้อมูลถูกลบเรียบร้อยแล้ว' : 'The entry has been deleted.',
                            'success'
                        )
                    } else {
                         throw new Error(data.message || 'Failed to delete');
                    }
                })
                .catch(error => {
                    (window as any).Swal.fire({
                        icon: 'error',
                        title: language === 'th' ? 'เกิดข้อผิดพลาด' : 'Error',
                        text: language === 'th' ? `ไม่สามารถลบข้อมูลได้: ${error.message}` : `Could not delete entry: ${error.message}`
                    });
                });
            }
        })
    };
    
    // In a real app, Add/Edit would open a proper modal form. For simplicity, we'll skip the implementation.
    const handleEdit = (submission: Submission) => {
         (window as any).Swal.fire({
            icon: 'info',
            title: language === 'th' ? 'ฟังก์ชันแก้ไข' : 'Edit Function',
            text: language === 'th' ? 'ฟังก์ชันแก้ไขยังไม่เปิดใช้งานในเวอร์ชันนี้' : 'The edit functionality is not implemented in this version.',
         });
    };
    
    const handleAdd = () => {
         (window as any).Swal.fire({
            icon: 'info',
            title: language === 'th' ? 'ฟังก์ชันเพิ่มข้อมูล' : 'Add Function',
            text: language === 'th' ? 'ฟังก์ชันเพิ่มข้อมูลยังไม่เปิดใช้งานในเวอร์ชันนี้' : 'The add functionality is not implemented in this version.',
         });
    };


    const filteredSubmissions = useMemo(() => {
        return submissions
            .filter(submission => {
                if (!filterProgram) return true;
                return submission.students.some(student => student.program === filterProgram);
            })
            .filter(submission => {
                if (!searchTerm.trim()) return true;
                const lowerSearchTerm = searchTerm.toLowerCase();
                const hasParent = submission.parents.some(p => p.fullName.toLowerCase().includes(lowerSearchTerm) || p.phone.includes(lowerSearchTerm));
                const hasStudent = submission.students.some(s => s.fullName.toLowerCase().includes(lowerSearchTerm));
                return hasParent || hasStudent;
            }).sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime());
    }, [submissions, filterProgram, searchTerm]);
    
    const inputStyles = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-base px-4 py-3 transition-shadow duration-150 ease-in-out";

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-2xl font-bold text-slate-800">{translations.adminDashboard[language]}</h3>
                <div className="flex items-center gap-2">
                    <button onClick={fetchData} className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 text-sm font-medium">
                        {language === 'th' ? 'โหลดข้อมูลใหม่' : 'Refresh Data'}
                    </button>
                    <button onClick={onLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium">{translations.logout[language]}</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="md:col-span-1">
                    <label htmlFor="program-filter" className="block text-sm font-medium text-gray-700">{translations.filterByProgram[language]}</label>
                    <select id="program-filter" value={filterProgram} onChange={e => setFilterProgram(e.target.value)} className={inputStyles}>
                        <option value="">{translations.allPrograms[language]}</option>
                        {Object.entries(PROGRAMS).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700">{language === 'th' ? 'ค้นหา (ชื่อ, เบอร์โทร)' : 'Search (Name, Phone)'}</label>
                    <input type="text" id="search-filter" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={inputStyles} placeholder={language === 'th' ? 'พิมพ์เพื่อค้นหา...' : 'Type to search...'}/>
                </div>
            </div>

            <div className="overflow-x-auto">
                 {isLoading ? (
                    <p className="text-center py-8 text-gray-500">{language === 'th' ? 'กำลังโหลดข้อมูล...' : 'Loading data...'}</p>
                 ) : (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{translations.parentInfo[language]}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{translations.studentInfo[language]}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{translations.attending[language]}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{translations.submissionDate[language]}</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">{translations.actions[language]}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSubmissions.map(submission => (
                            <tr key={submission.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {submission.parents.map(p => <div key={p.id} className="mb-1">{p.title} {p.fullName} ({p.phone})</div>)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {submission.students.map(s => <div key={s.id} className="mb-1">{s.title} {s.fullName} <br/><span className="text-xs text-sky-700">({(PROGRAMS as any)[s.program]})</span></div>)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {submission.attendance === 'attending' ? 
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{translations.attending[language]}</span> : 
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{translations.notAttending[language]}</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(submission.submissionDate).toLocaleString(language === 'th' ? 'th-TH' : 'en-US')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button onClick={() => handleEdit(submission)} className="text-indigo-600 hover:text-indigo-900">{translations.edit[language]}</button>
                                    <button onClick={() => handleDelete(submission.id)} className="text-red-600 hover:text-red-900">{translations.delete[language]}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 )}
                 {!isLoading && filteredSubmissions.length === 0 && <p className="text-center py-8 text-gray-500">{language === 'th' ? 'ไม่พบข้อมูล' : 'No submissions found.'}</p>}
            </div>
        </div>
    );
};

export default AdminDashboard;
