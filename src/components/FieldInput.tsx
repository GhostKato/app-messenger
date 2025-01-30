import { Field, ErrorMessage } from 'formik';

interface FieldInputProps {
  name: string;
  type: string;
  label: string;
  className?: string;
  as?: string;
}

const FieldInput: React.FC<FieldInputProps> = ({ name, type, label, className = "", as }) => {
  
  const computedStyles = `flex-grow w-60 h-10 md:w-80 md:h-14 pl-3 text-sm  md:text-base xl:text-lg rounded-[15px] md:rounded-[20px] border-2 border: border-border hover:border-interaction shadow-custom-inset focus:border-interaction transition duration-300 ease-in-out ${className}`;
  
  return (
    <div className="flex flex-col flex-grow relative">
      <label htmlFor={name}>{label}</label>
      <Field
        as={as}
        id={name}
        name={name}
        type={type}        
        className={computedStyles}
      />
      <ErrorMessage name={name} component="div" className="absolute bottom-[-20px] left-0 text-red-500 text-sm" />
    </div>
  );
};

export default FieldInput;