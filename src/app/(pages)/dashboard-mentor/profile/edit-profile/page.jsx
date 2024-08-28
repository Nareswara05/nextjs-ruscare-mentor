import React from 'react'
import ChangeEmail from './components/change-email'
import ChangePassword from './components/change-password'
import EditForm from './components/edit-form'
import EditProfile from './components/edit-profile'

const EditProfilePage = () => {
    return (
        <div className='px-16 py-20 bg-white'>
            <h1 className='text-textPrimary text-[36px] font-bold'>Edit Profil</h1>
            <div className='mt-8 flex flex-col gap-16'>
                <EditProfile />
                <ChangeEmail />
                <ChangePassword />
            </div>
        </div>
    )
}

export default EditProfilePage