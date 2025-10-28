
import React, { useState, useCallback } from 'react';
import type { Language } from './types';
import ParentForm from './components/ParentForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import LanguageSwitcher from './components/LanguageSwitcher';
import Header from './components/Header';
import { translations } from './constants';


type View = 'form' | 'login' | 'admin';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('th');
    const [view, setView] = useState<View>('form');

    const handleLoginSuccess = useCallback(() => {
        setView('admin');
    }, []);

    const handleLogout = useCallback(() => {
        setView('login');
    }, []);

    const renderView = () => {
        switch (view) {
            case 'admin':
                return <AdminDashboard language={language} onLogout={handleLogout} />;
            case 'login':
                return <AdminLogin language={language} onLoginSuccess={handleLoginSuccess} />;
            case 'form':
            default:
                return <ParentForm language={language} />;
        }
    };
    
    const toggleAdminView = () => {
        if(view === 'admin' || view === 'login') {
            setView('form');
        } else {
            setView('login');
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
                <header className="text-center mb-4">
                    <Header language={language} />
                </header>

                <div className="flex justify-center items-center space-x-4 mb-8">
                    <LanguageSwitcher language={language} setLanguage={setLanguage} />
                    <button 
                        onClick={toggleAdminView}
                        className="px-3 py-1 text-sm rounded-md transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        {view === 'admin' || view === 'login' ? (language === 'th' ? 'กลับไปหน้าฟอร์ม' : 'Back to Form') : translations.adminLogin[language]}
                    </button>
                </div>

                <main>
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
