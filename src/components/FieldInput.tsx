import { Field, ErrorMessage } from 'formik';

interface FieldInputProps {
  name: string;
  type: string;
  label: string;
  as?: string;
}

const FieldInput: React.FC<FieldInputProps> = ({ name, type, label, as}) => {
  return (
    <div className="flex flex-col flex-grow relative">
      <label htmlFor={name}>{label}</label>
      <Field
        as={as}
        id={name}
        name={name}
        type={type}
        className="flex-grow h-[50px] md:h-[55px] xl:h-[60px] pl-6 text-sm md:w-40  md:text-base xl:w-60  xl:text-lg rounded-full border-2 border: border-three hover:border-four shadow-custom-inset focus:border-four transition duration-300 ease-in-out"
      />
      <ErrorMessage name={name} component="div" className="absolute bottom-[-20px] left-0 text-red-500 text-sm" />
    </div>
  );
};

export default FieldInput;