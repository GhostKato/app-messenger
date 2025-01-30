import React from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { ErrorMessage } from "formik";
import { handleFileChange } from "../utils/fileUtils";

interface FileInputProps {
  setFieldValue: (field: string, value: File) => void;
setPreview: (value: string | ArrayBuffer | null) => void;
  className?: string;  
}

const FileInput: React.FC<FileInputProps> = ({ setFieldValue, setPreview, className = ""}) => {
  return (
    <label className='relative w-[250px]'>
      <span className='absolute top-[25px] left-[10px] md:left-[-30px]'>
        <MdAddPhotoAlternate className="text-[45px] md:text-[60px] text-white transition-colors duration-300 ease-in-out hover:text-interaction"/>
      </span>
      <input        
        type="file"
        name="photo"
        accept="image/*"
        onChange={(event) => handleFileChange({ event, setFieldValue, setPreview })}
        className={`hidden ${className}`}
      />
      <ErrorMessage name="photo" component="span"/>
    </label>
  );
};

export default FileInput;
