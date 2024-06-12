import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface AlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    children: ReactNode
    appierence: 'error' | 'success'
} 