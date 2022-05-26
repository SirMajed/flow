import React, { useEffect } from 'react'

const FormLayout = ({ children }) => {
  useEffect(() => {})

  const showDropDownMenu = (el) => {
    el.target.parentElement.children[1].classList.toggle('hidden')
  }
  const swaptext = (el) => {
    const targetText = el.innerText
    document.getElementById('drop-down-content-setter').innerText = targetText
    document.getElementById('drop-down-div').classList.toggle('hidden')
  }
  return (
    <>
      <div dir="rtl" className="lg:max-w-[1124px] bg-white  py-4 shadow-md rounded">
        <div className="lg:block md:hidden hidden">
          <div className="flex justify-evenly pt-[48px] h-[90px] pb- border-b border-gray-300 ">
            <div>
              <div className="pb-6 hover:border-b-2 border-blue-700 wiz-instance px-4">
                <div className="flex ">
                  <p className="text-base font-semibold leading-none text-slate-800">1</p>
                  <span className="mr-3 text-base font-medium leading-none text-slate-800">اصحاب المصلحة</span>
                </div>
              </div>
            </div>
            <div>
              <div className="pb-6 hover:border-b-2 border-blue-700 wiz-instance px-4">
                <div className="flex ">
                  <p className="text-base font-semibold leading-none text-slate-800">2</p>
                  <span className="mr-3 text-base font-medium leading-none text-gray-800">العلاقات</span>
                </div>
              </div>
            </div>
            <div>
              <div className="pb-6 hover:border-b-2 border-blue-700 wiz-instance px-4">
                <div className="flex ">
                  <p className="text-base  leading-none text-slate-800 font-semibold">3</p>
                  <span className="mr-3 text-base font-medium leading-none text-slate-800">النتائج</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 px-6 lg:hidden md:block block">
          <div className="dropdown-one border  border-gray-300 w-full rounded outline-none   relative mt-2">
            <button onClick={showDropDownMenu} className="dropbtn-one relative px-5 py-[12px] flex items-center justify-between w-full bg-gray-100">
              <span className=" pr-4 font-medium text-gray-600 text-sm" id="drop-down-content-setter">
                <span className="pr-2">1</span> Account Type
              </span>
              <svg width={12} height={8} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.06216 1.9393L5.43028 7.0368C5.50069 7.11892 5.58803 7.18484 5.68631 7.23003C5.78459 7.27522 5.89148 7.29862 5.99966 7.29862C6.10783 7.29862 6.21472 7.27522 6.313 7.23003C6.41128 7.18484 6.49862 7.11892 6.56903 7.0368L10.9372 1.9393C11.354 1.45273 11.0084 0.701172 10.3678 0.701172H1.63028C0.989656 0.701172 0.644031 1.45273 1.06216 1.9393Z"
                  fill="#1F2937"
                />
              </svg>
            </button>
            <div className="hidden rounded w-full shadow border-t border-gray-200 px-1 py-2 absolute top-12 right-0 bg-white" id="drop-down-div">
              <a href="#">
                <p
                  className=" hover:bg-gray-100 hover:text-gray-800 text-sm leading-none text-gray-600 p-3 font-medium cursor-pointer"
                  onClick={(e) => {
                    swaptext(e.target)
                  }}
                >
                  <span className="pr-2">1</span> Account Type
                </p>
              </a>
              <a href="#">
                <p
                  className="  hover:bg-gray-100 hover:text-gray-800 text-sm leading-none text-gray-600 p-3 font-medium cursor-pointer"
                  onClick={(e) => {
                    swaptext(e.target)
                  }}
                >
                  <span className="pr-2">2</span> Account Settings
                </p>
              </a>
              <a href="#">
                <p
                  className="  hover:bg-gray-100 hover:text-gray-800 text-sm leading-none text-gray-600 p-3 font-medium cursor-pointer"
                  onClick={(e) => {
                    swaptext(e.target)
                  }}
                >
                  <span className="pr-2">3</span> Business Deals
                </p>
              </a>
              <a href="#">
                <p
                  className="  hover:bg-gray-100 hover:text-gray-800 text-sm leading-none text-gray-600 p-3 font-medium cursor-pointer"
                  onClick={(e) => {
                    swaptext(e.target)
                  }}
                >
                  <span className="pr-2">4</span> Business Information{' '}
                </p>
              </a>
              <a href="#">
                <p
                  className="  hover:bg-gray-100 hover:text-gray-800 text-sm leading-none text-gray-600 p-3 font-medium cursor-pointer"
                  onClick={(e) => {
                    swaptext(e.target)
                  }}
                >
                  <span className="pr-2">5</span> Finished
                </p>
              </a>
            </div>
          </div>
          {/* end */}
        </div>
        <div></div>
        {/* main content */}
        <div className="lg:px-[288px] md:px-6 px-3  pt-10">{children}</div>
      </div>
    </>
  )
}

export default FormLayout
