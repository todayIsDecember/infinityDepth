import { ButtonProps } from "./ButtonProps";
import cn from 'classnames'
import styles from './Button.module.css'

export const Button = ({className, children, isValid=true, ...props}: ButtonProps): JSX.Element => {
    return (
        <button className={cn(className, styles.button, {[styles.invalid]: !isValid})} {...props}>
            {children}
        </button>
    )
}