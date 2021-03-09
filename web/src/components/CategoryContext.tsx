import React, { useState, createContext } from 'react';

interface CategoryContextProps {
    categories: string[]
    setCategories: React.Dispatch<React.SetStateAction<string[]>>
}

export const CategoryContext = createContext({} as CategoryContextProps)


export const CategoryContextProvider = (props) => {    

    const [categories, setCategories] = useState([] as string[]);

    return (
        <CategoryContext.Provider value={{categories, setCategories}}>
            {props.children}
        </CategoryContext.Provider>
    )
}