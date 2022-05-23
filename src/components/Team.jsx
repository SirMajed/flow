import React from 'react'
import Majed from '../assets/images/Majed.jpg'
import Abdulrahman from '../assets/images/Abdulrahman.jpg'
import Abdullah from '../assets/images/Abdullah.jpg'
import Ryan from '../assets/images/Ryan.jpg'
import Murad from '../assets/images/Murad.jpg'
export const TeamMember = (props) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="h-28 w-28">
        <img src={props.image} alt="avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <p className="text-base font-semibold leading-none text-center text-gray-800">{props.name}</p>
        <p className="text-sm text-center text-gray-600">{props.title}</p>
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <div className="overflow-y-hidden">
      <div className="flex justify-center items-center flex-col mt-3 px-4 md:px-6 ">
        <div className="flex justify-center items-center flex-col space-y-4">
          <p className="w-full text-base leading-normal text-center text-gray-600">المساهمين في بناء هذا المشروع</p>
        </div>

        <div className="mt-6 md:mt-10 xl:mt-14 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-5 gap-y-12 md:gap-y-14 md:gap-x-24 xl:gap-y-0 lg:gap-x-14">
          <TeamMember name="عبدالرحمن خياط" title="مهندس برمجيات" image={Abdulrahman} />
          <TeamMember name="ماجد الحاسن" title="مهندس برمجيات" image={Majed} />
          <TeamMember name="مراد بيك" title="مهندس برمجيات" image={Murad} />
          <TeamMember name="عبدالله الحازمي" title="مهندس برمجيات" image={Abdullah} />
          <TeamMember name="ريان الغريبي" title="مهندس برمجيات" image={Ryan} />
        </div>
      </div>
    </div>
  )
}
