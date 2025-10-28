
import React, { useState } from 'react';
import type { Language } from '../types';
import { translations } from '../constants';

interface AdminLoginProps {
    language: Language;
    onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ language, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded credentials as per request
        if (username === '0833759527' && password === '0833759527') {
            (window as any).Swal.fire({
                icon: 'success',
                title: language === 'th' ? 'เข้าสู่ระบบสำเร็จ' : 'Login Successful',
                showConfirmButton: false,
                timer: 1500
            });
            onLoginSuccess();
        } else {
            (window as any).Swal.fire({
                icon: 'error',
                title: language === 'th' ? 'ข้อมูลไม่ถูกต้อง' : 'Invalid Credentials',
                text: language === 'th' ? 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' : 'Incorrect username or password.',
            });
        }
    };
    
    const inputStyles = "block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:ring-1 sm:text-base transition-shadow duration-150 ease-in-out";

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-center text-slate-800 mb-6">{translations.adminLogin[language]}</h3>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">{translations.username[language]}</label>
                    <div className="mt-1">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className={inputStyles}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">{translations.password[language]}</label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={inputStyles}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        {translations.login[language]}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;