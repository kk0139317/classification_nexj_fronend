import React from 'react'

const HeroSection = () => {
  return (
      <section className="dark:bg-gray-100 dark:text-gray-800">
          <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
              <div className="flex items-center justify-center p-6 mt-8 ml-10 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                  <img src="https://png.pngtree.com/png-vector/20230915/ourmid/pngtree-artificial-intelligence-modern-computing-concept-png-image_10074799.png" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
              </div>
              <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                  <h1 className="text-5xl font-bold leading-none sm:text-6xl">AI Model <br />
                      <span className="dark:text-violet-600"> For</span> Cat and Dog Classification
                  </h1>
                  <p className="mt-6 mb-8 text-lg sm:mb-12">Lorem ipsum dolor sit amet consectetur.
                      <br className="hidden md:inline lg:hidden" /> Lorem ipsum dolor sit amet.
                  </p>
                  <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                      <a rel="noopener noreferrer" href="classify" className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50">Classify</a>
                      <a rel="noopener noreferrer" href="aboutus" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800">About US</a>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default HeroSection