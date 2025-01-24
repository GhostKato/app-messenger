import React from 'react';

const SearchBox: React.FC = () => {  

  return (
    <div className='flex-grow'>
      <label className='flex'>       
              <input
        className='h-[50px] md:h-[55px] xl:h-[60px] flex-grow rounded-[8px] pl-3 border-0 bg-white text-w transition-all duration-300 ease-in-out focus:outline-[2px] focus:outline-red-500] hover:outline-[2px] hover:outline-red-500 '          
                 
          type="text"          
        />
      </label>
    </div>
  );
};

export default SearchBox;
