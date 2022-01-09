import { createContext, useState, FC } from "react";

type LoadFlugType = {
    menuFlug: boolean,
    setMenuFlug: Function,
};
export const MenuFlugContext = createContext<LoadFlugType>({ menuFlug: false, setMenuFlug: () => {} });

export const MenuFlugProvider: FC = props => {
    const { children } = props;
    
    const [ menuFlug, setMenuFlug ] = useState(true);

    return (
        <MenuFlugContext.Provider value={{ menuFlug, setMenuFlug }}>
            { children }
        </MenuFlugContext.Provider> 
    );
};