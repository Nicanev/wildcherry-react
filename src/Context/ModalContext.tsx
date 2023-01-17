import React, { createContext, useState } from "react";

interface IModalContext {
	modal: boolean;
	toggle: () => void;
}

export const ModalContext = createContext<IModalContext>({
	modal: false,
	toggle: () => {},
});

export const ModalState = ({ children }: { children: React.ReactNode }) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal((prev) => (prev = !prev));
	return (
		<ModalContext.Provider value={{ modal, toggle }}>
			{children}
		</ModalContext.Provider>
	);
};
