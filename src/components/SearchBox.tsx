import React from 'react';

const SearchBox: React.FC = () => {  

  return (
    <div className='flex-grow'>
      <label className='flex'>       
              <input
        className='th-[50px] md:h-[55px] xl:h-[60px] flex-grow rounded-full pl-3 border-2 border: border-gray text-w transition-all duration-300 ease-in-out '          
                 
          type="text"          
        />
      </label>
    </div>
  );
};

export default SearchBox;
