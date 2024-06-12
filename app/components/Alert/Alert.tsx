import { AlertProps } from "./AlertProps";
import cn from 'classnames'
import styles from './Alert.module.css'

export const Alert = ({children, appierence, className, ...props}: AlertProps): JSX.Element => {
    return (
        <div className={cn(className, styles.alert, styles[appierence])}>
            {children}
        </div>
    )
}