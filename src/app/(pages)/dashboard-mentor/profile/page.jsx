import React from 'react'
import DetailInformationMentor from './components/detail-information-mentor'
import SkillInformationMentor from './components/skill-information-mentor'
import getMentor from '@/app/lib/service/endpoint/mentor/get-mentor';

export default async function page () {


  return (
    <div className='px-12 py-4 flex flex-col gap-8'>
        <DetailInformationMentor />
        <SkillInformationMentor/>
    </div>
  )
}

