import React, {useState, createContext, useContext} from "react";

const StateContext = createContext();

export const ContextProvider = ({children}) => {
	const [displayQuestion, setDisplayQuestion] = useState(true);
	const [responses, setResponses] = useState([]);
	const [currentUserId, setcurrentUserId] = useState("");

	return (
		<StateContext.Provider
			value={{
				displayQuestion,
				setDisplayQuestion,
				responses,
				setResponses,
				currentUserId,
				setcurrentUserId,
			}}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
