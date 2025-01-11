import React from 'react'

const HeroCards = () => {
  return (
    <section className="h-60 py-4 bg-gray-100 dark:bg-gray-900 w-full flex">
      <div className="w-1/3 flex flex-col justify-center px-16 h-full">
        <div className="text-slate-400 dark:text-slate-200 text-lg">Join Connect Today</div>
        <div className="font-bold text-4xl text-gray-700 dark:text-slate-50">
          <span className="text-5xl">Experience</span> with Number
        </div>
      </div>
      <div className="w-2/3 h-full py-10 px-6 flex justify-around items-center">
        <div>
          <div className="text-2xl py-2 font-bold text-purple-500">92%</div>
          <div className="text-slate-500">
            Many users find relevant jobs <br /> according to skills
          </div>
        </div>
        <div className="h-[45%] w-[1px] bg-slate-400"></div>
        <div>
          <div className="text-2xl py-2 font-bold text-purple-500">90%</div>
          <div className="text-slate-500">
            Data filtering from <br /> companies doesn&apos;t take long
          </div>
        </div>
        <div className="h-[45%] w-[1px] bg-slate-400"></div>
        <div>
          <div className="text-2xl py-2 font-bold text-purple-500">89%</div>
          <div className="text-slate-500">
            Many top employers can <br /> connect with many users
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCards