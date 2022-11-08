import React, {useState, createContext, useContext} from "react";

const StateContext = createContext();

export const ContextProvider = ({children}) => {
	const [displayQuestion, setDisplayQuestion] = useState(true);
	return (
		<StateContext.Provider value={{displayQuestion, setDisplayQuestion}}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
