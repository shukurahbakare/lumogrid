import React from 'react'
import CustomButton from "@/../components/shared/button/CustomButton";

const solutionPoints = [
  {
    title: 'Reduced Operational Costs',
    description: 'Save money on your electricity bills from day one.',
  },
  {
    title: 'Reliability',
    description: 'Solar provides constant, uninterrupted power, ensuring your business can continue without setbacks.',
  },
  {
    title: 'Sustainability',
    description: 'Help protect the environment while running your business efficiently.',
  },
]

const TheSolutionComp = () => {
  return (
    <div className="bg-[#DCFCE7] border-b border-gray-200 py-16 sm:py-16 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between items-center gap-10 text-center">
      <div className='flex flex-col gap-4 justify-between items-center'><h2 className='text-3xl font-bold max-w-lg leading-10'>The Solution – Solar Power, the Future of Business Energy</h2>
        <p className='text-sm max-w-lg'>
          Solar power offers a sustainable, reliable, and affordable alternative to grid electricity. With LumoGrid, your business can reduce energy costs, gain energy independence, and protect your operations from unpredictable outages.
        </p>
        </div>
        <ul className="grid md:grid-cols-3 gap-4">
          {solutionPoints.map((point, idx) => (
            <li key={idx} className='border-2 border-green-600/50 bg-white px-4 py-12 rounded-2xl'>
              <strong className='text-xl max-w-2xs'>{point.title}</strong> <div>{point.description}
                </div>
            </li>
          ))}
        </ul>
        <CustomButton text='Ready to make the switch?' />
      </div>
    </div>
  )
}

export default TheSolutionComp