import { ReactNode } from "react";

export interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}