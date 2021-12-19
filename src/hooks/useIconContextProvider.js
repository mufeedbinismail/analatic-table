import { IconContext } from "react-icons";

const useIconContextProvider = (value) => ({children}) => (
    <IconContext.Provider value={value}>
        {children}
    </IconContext.Provider>
)

export default useIconContextProvider;