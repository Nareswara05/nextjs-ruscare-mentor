import React from 'react'

const ButtonSubmit = ({title, onClick}) => {
    return (
        <button onClick={onClick}  className='bg-primary mt-9 py-4 rounded-lg font-medium w-[200px] hover:bg-purple-700'>{title}</button>
    )
}

export default ButtonSubmit