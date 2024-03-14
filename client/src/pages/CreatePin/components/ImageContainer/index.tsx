import {
  DragEventHandler,
  useState,
  useRef,
  SetStateAction,
  Dispatch,
} from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

interface IProps {
  setFile: Dispatch<SetStateAction<File | null>>;
  file: File | null;
  hasImage: boolean;
  loading: boolean;
}

export default function ImageContainer({
  setFile,
  file,
  hasImage,
  loading,
}: IProps) {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (loading) return;
    if (isDragOver) return;

    setIsDragOver(true);
  };

  const handleLeaveDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (loading) return;
    if (!isDragOver) return;

    setIsDragOver(false);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (loading) return;

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      setFile(file);
    }
  };

  const handleInputChange = () => {
    if (loading) return;

    const files = inputRef.current?.files;

    if (files && files.length > 0) {
      if (files[0].type.startsWith("image/")) {
        setFile(files[0]);
      }
    }
  };

  const removeImage = () => {
    if (loading) return;

    setFile(null);
  };

  return (
    <div
      className="
      w-full h-[400px] bg-gray-200 rounded-md mx-auto
      sm:w-[250px]
      lg:h-auto
    "
      onDragOver={handleDragOver}
      onDragLeave={handleLeaveDragOver}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="w-full h-full flex items-center justify-center rounded-md relative">
          <figure className="w-full h-full">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-full h-full object-cover"
            />
          </figure>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer absolute"
            onClick={removeImage}
          >
            <FaTrash className="text-lg text-secondary-gray" />
          </button>
        </div>
      ) : (
        <>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            id="image"
            onChange={handleInputChange}
            ref={inputRef}
          />
          <label className="w-full h-full flex cursor-pointer" htmlFor="image">
            <div className="w-full h-full p-4 rounded-md">
              <div
                className={`
                w-full h-full flex justify-center items-end border border-gray-400 border-dashed rounded-md relative p-2
                ${isDragOver && "border-blue-500 border-2"}
                ${hasImage && "border-red-500 border-2"}
              `}
              >
                <div className="w-full flex items-center flex-col gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6">
                  <BsFillArrowUpCircleFill className="text-xl text-secondary-gray" />
                  <p className="text-xs text-secondary-gray text-center font-medium">
                    Drag and drop or click to upload
                  </p>
                </div>
                <p className="text-[10px] text-center text-secondary-gray font-medium">
                  We recommend using high quality .jpg files less than 2mb
                </p>
              </div>
            </div>
          </label>
        </>
      )}
    </div>
  );
}
