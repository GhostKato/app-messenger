import React from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../redux/filters/slice';

const SearchBox: React.FC = () => { 
  
  const dispatch = useDispatch();  

  return (
    <div className='flex-grow'>
      <label className='flex'>       
              <input
        className='h-[45px] md:h-[55px] xl:h-[60px] flex-grow rounded-full pl-6 border-2 border: border-border hover:border-interaction focus:border-interaction text-w transition-all duration-300 ease-in-out shadow-custom-inset'          
               onChange={e => dispatch(changeFilter(e.target.value))}  
          type="text"          
        />
      </label>
    </div>
  );
};

export default SearchBox;
