
import React from 'react';
import type { Language } from '../types';
import { translations } from '../constants';

interface HeaderProps {
    language: Language;
}

const Header: React.FC<HeaderProps> = ({ language }) => {
    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                {translations.schoolName[language]}
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-sky-700 mt-1">
                {translations.formTitle[language]}
            </h2>
            <p className="text-md md:text-lg text-slate-600 mt-2">
                {translations.formDate[language]}
            </p>
        </div>
    );
};

export default Header;
   