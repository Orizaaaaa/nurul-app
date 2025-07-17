import React from 'react'

type Props = {
    children?: React.ReactNode
    onClick?: any
    className?: string
    typeButon?: any
    disabled?: boolean
}

const ButtonPrimary = ({ children, onClick, className, disabled, typeButon = 'button' }: Props) => {
    return (
        <button type={typeButon} disabled={disabled} className={`bg-primaryGreen  text-white  ${className}`} onClick={onClick}  >
            {children}
        </button >
    )
}

export default ButtonPrimary