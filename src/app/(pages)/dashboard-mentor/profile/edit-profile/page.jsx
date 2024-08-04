import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { IoSaveOutline } from 'react-icons/io5'
import EditInformationMentor from './components/edit-information-mentor'
import EditInformationSkill from './components/edit-information-skill-mentor'
import EditInformationSocialMedia from './components/edit-information-socialmedia'

const page = () => {
  return (
    <div className='p-6 flex flex-col gap-8 w-full items-end'>
      <EditInformationMentor />
      <EditInformationSkill />
      <EditInformationSocialMedia />
        <button className='bg-primary py-3 flex justify-center items-center w-full border-2 h-fit text-xl gap-2  font-semibold text-white border-primary rounded-lg hover:bg-purple-700 hover:text-white '>
         <IoSaveOutline/>
          Simpan
        </button>
    </div>
  )
}

export default page