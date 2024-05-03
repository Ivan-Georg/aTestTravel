import React from "react";


interface ModalProps {
    isOpen: boolean,
    children: React.ReactNode,
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) {
        return null;
    }
    
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="bg-white p-6 rounded shadow-lg z-10">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal;