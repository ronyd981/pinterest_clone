import { TPinType } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  pin: TPinType;
  changeModal: (modal: string | null) => void;
  setPin: Dispatch<SetStateAction<TPinType | undefined>>;
}

export default function Pin({ pin, changeModal, setPin }: IProps) {
  return (
    <div className="w-full relative">
      <div className="w-full h-full absolute bg-[#00000065] group" tabIndex={2}>
        <div className="w-full h-full flex justify-end flex-col p-4">
          <div className="flex justify-end gap-2">
            <button
              className="h-7 rounded-full bg-white px-4 truncate text-xs font-medium"
              onClick={() => {
                changeModal("edit");
                setPin(pin);
              }}
            >
              Edit
            </button>
            <button
              className="h-7 rounded-full bg-primary-red text-white px-4 truncate text-xs font-medium"
              onClick={() => {
                changeModal("delete");
                setPin(pin);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-full rounded-md bg-gray-200">
        <img
          src={pin.image}
          className="w-full h-full rounded-md object-cover"
          alt={pin.title}
        />
      </div>
    </div>
  );
}
