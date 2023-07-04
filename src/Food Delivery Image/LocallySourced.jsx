import React from 'react'
import { useImgStore } from '../Component/zustand/useImgStore'

export const LocallySourced = () => {
    const {allImg} = useImgStore();
  return (
    <div className="mt-5">
      <img
        src={allImg["32"]}
        alt=""
        className="rounded-xl xs:h-[145px] md:w-full md:h-[270px] xs:w-full sm:h-[232px]"
      />
    </div>
  )
}