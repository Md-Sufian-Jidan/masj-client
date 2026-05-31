import React, { ReactNode } from "react";

interface ResuableContainerProps {
    children: ReactNode;
    className?: string;
}

const ResuableContainer = ({ children, className = "" }: ResuableContainerProps) => {
    return (
        <div className={`container mx-auto px-5 ${className}`}>{children}</div>
    );
};

export default ResuableContainer;