import { LanguageContext } from './LanguageProvider';
import { useContext } from 'react';

function useLang() {
    return useContext(LanguageContext);
}

export default useLang;