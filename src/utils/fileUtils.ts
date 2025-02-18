import { ChangeEvent } from "react";

type HandleFileChangeProps = {
  event: ChangeEvent<HTMLInputElement>;
  setFieldValue: (field: string, value: File) => void;
  setPreview: (value: string | ArrayBuffer | null) => void;
}

export const handleFileChange = ({
  event,
  setFieldValue,
  setPreview,
}: HandleFileChangeProps): void => {
  const file = event.currentTarget.files?.[0]; 
  if (file) {
    setFieldValue("photo", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};
