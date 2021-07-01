import { createContext } from "react";

const PreferencesContext = createContext({
    theme: '',
    toogleTheme: () => {}
});

export default PreferencesContext;