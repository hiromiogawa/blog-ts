import { createContext, useState, FC } from "react";

type LoadFlugType = {
    loadFlug: boolean,
    setLoadFlug: Function,
};
export const LoadFlugContext = createContext<LoadFlugType>({ loadFlug: true, setLoadFlug: () => {} });

export const LoadFlugProvider: FC = props => {
    const { children } = props;
    
    const [ loadFlug, setLoadFlug ] = useState(true);

    return (
        <LoadFlugContext.Provider value={{ loadFlug, setLoadFlug }}>
            { children }
        </LoadFlugContext.Provider> 
    );
};