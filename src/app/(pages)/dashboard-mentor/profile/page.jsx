import React from 'react'
import DetailInformationMentor from './components/detail-information-mentor'
import SkillInformationMentor from './components/skill-information-mentor'

const page = () => {
  return (
    <div className='px-12 py-4 flex flex-col gap-8'>
        <DetailInformationMentor/>
        <SkillInformationMentor/>
    </div>
  )
}

export default page