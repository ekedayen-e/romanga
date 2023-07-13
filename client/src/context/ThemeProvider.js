import { useState, useContext, createContext} from "react";


const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext)
}

export const ThemeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(true)
    
    const toggle = () => {
        setDarkMode(prev => !prev);
    }

    return (
        <ThemeContext.Provider value={{darkMode, toggle}}>
            <div className={darkMode ? 'dark' : null}>{children}</div>
        </ThemeContext.Provider>
    )
}