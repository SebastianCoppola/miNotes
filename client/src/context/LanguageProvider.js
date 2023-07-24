import {createContext,useState} from "react";

export const LanguageContext = createContext(null);

const initialLanguage = "en";
const translations = {
    es: {
        "loginheader": "Desarrollada por Sebastián Coppola",
        "login1": "Iniciar Sesión",
        "login2": "E-mail",
        "login3": "Contraseña",
        "login4": "Iniciar Sesión",
        "login5": "¿Primera vez acá?",
        "login6": "Registrate",
        "login7a": "Contraseña Invalida.",
        "login7b": "Un email fue enviado a tu casilla con tu nueva contraseña.",
        "login8": "Recuperar Contraseña.",
        "register1": "Registrate",
        "register2": "Nombre",
        "register3": "Apellido",
        "register4": "E-mail",
        "register5": "Contraseña",
        "register6": "Guardar",
        "register7": "Cancelar",
        "register8": "El email ya está registrado.",
        "register9": "Error",
        "register10": "Tu información no es válida",
        "register11": "Error del servidor. Intentalo más tarde.",
        "register12": "Gracias por registrarte.",
        "register13": "Ahora iniciá sesión para empezar a organizar tu día.",
        "navnotes": "Notas",
        "navuser": "Usuario",
        "navabout": "Acerca de",
        "navlogout": "Cerrar Sesión",
        "hi": "Hola",
        "hip1": "Estas son tus tareas pendientes: ",
        "hip2": "No procastines! Las notas celestes serán eliminadas automáticamente en 24hs.",
        "crearnotatitle": "Crear Nota",
        "crearnotainput1": "Título",
        "crearnotainput2": "Detalles",
        "crearnotadue1a": "Hacerlo ",
        "crearnotadue1b": "Hoy",
        "crearnotadue2a": "Hacerlo ",
        "crearnotadue2b": "Mañana",
        "crearnotasave": "Guardar Nota",
        "userform1": "Tu Información Personal",
        "userform2": "Cualquier cambio va a requerir que repitas tu inicio de sesión.",
        "userform3": "Nombre",
        "userform4": "Apellido",
        "userform5": "E-mail",
        "userform6": "Contraseña",
        "userform7": "Guardar Cambios",
        "userform8": "Eliminar Cuenta",
        "about1": "miNotes ",
        "about2": "es una app cuyo fin es la no-procastinación. Usala como aliada para establecer prioridades y asegurate de hacer todo lo urgente.",
        "about3": "Fue desarrollada por Sebastián Coppola usando React 18.2 y Node Js.",
        "about4": "Podés ver más trabajos de Seba en ",
        "about5": " o en "
    },
    en: {
        "loginheader": "Developed by Sebastián Coppola",
        "login1": "Please Sign In to Access",
        "login2": "E-mail",
        "login3": "Password",
        "login4": "Sign In",
        "login5": "First time here?",
        "login6": "Register",
        "login7a": "Invalid Password.",
        "login7b": "An email has been sent to you with your new password.",
        "login8": "Recover.",
        "register1": "Registrate",
        "register2": "Nombre",
        "register3": "Apellido",
        "register4": "E-mail",
        "register5": "Contraseña",
        "register6": "Guardar",
        "register7": "Cancelar",
        "register8": "This email has already been registered.",
        "register9": "Error",
        "register10": "Your information is invalid",
        "register11": "Server Error. Please try again later",
        "register12": "Thank you for registering",
        "register13": "Please login to start tasking you day",
        "navnotes": "Notes",
        "navuser": "User",
        "navabout": "About",
        "navlogout": "Logout",
        "hi": "Hi",
        "hip1": "These are your notes for today:",
        "hip2": "Blue notes will be automatically deleted in 24 hours. Procastination is your worst enemy!",
        "crearnotatitle": "Create a Note",
        "crearnotainput1": "Title",
        "crearnotainput2": "Details",
        "crearnotadue1a": "Due ",
        "crearnotadue1b": "Today",
        "crearnotadue2a": "Due ",
        "crearnotadue2b": "Tomorrow",
        "crearnotasave": "Save Note",
        "userform1": "Your Personal Information",
        "userform2": "Any change will require you to login again.",
        "userform3": "Name",
        "userform4": "Last Name",
        "userform5": "E-mail",
        "userform6": "Password",
        "userform7": "Save Changes",
        "userform8": "Delete Account",
        "about1": "miNotes ",
        "about2": "main goal is to end procastination. Use it as your ally for setting priorities and make sure you get everything done.",
        "about3": "It was developed by Sebastián Coppola using React 18.2 and Node Js.",
        "about4": "Check out more of his work on ",
        "about5": " or on "
    }
}

export default function LanguageProvider({children}) {
    const [language, setLanguage] = useState(initialLanguage);
    const [texts, setTexts] = useState(translations[language]);
    
    const changeEn = () => {
        setLanguage("en");
        setTexts(translations.en);
    }
    const changeEs = () => {
        setLanguage("es");
        setTexts(translations.es);
    }

    const data = {texts,changeEs,changeEn};

    return <LanguageContext.Provider value={data}>{children}</LanguageContext.Provider>
}


