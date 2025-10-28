
import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
    const buttonStyle = "px-3 py-1 text-sm rounded-md transition-colors";
    const activeStyle = "bg-sky-700 text-white font-semibold";
    const inactiveStyle = "bg-gray-200 text-gray-700 hover:bg-gray-300";

    return (
        <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
            <button
                onClick={() => setLanguage('th')}
                className={`${buttonStyle} ${language === 'th' ? activeStyle : inactiveStyle}`}
            >
                ไทย
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`${buttonStyle} ${language === 'en' ? activeStyle : inactiveStyle}`}
            >
                English
            </button>
        </div>
    );
};

export default LanguageSwitcher;
   