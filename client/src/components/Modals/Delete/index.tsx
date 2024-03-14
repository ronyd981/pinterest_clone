import { TPinType } from "@/types";
import { DataLoader } from "@/components";
import { useDeletePin } from "./useDeletePin";

interface IDelete {
  changeModal: (modal: string | null) => void;
  pin: TPinType | undefined;
}

export default function Delete({ changeModal, pin }: IDelete) {
  const { deletePin, loading } = useDeletePin(pin, changeModal);

  return (
    <div
      className="
      w-[95%] flex flex-col gap-2.5 absolute bg-white py-6 rounded-2xl top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
      sm:w-[380px]
    "
    >
      <div className="w-4/5 mx-auto">
        <h3 className="text-lg font-medium text-center">
          Are you sure you want to delete this pin?
        </h3>
      </div>
      <div className="flex justify-center gap-2">
        <button
          className="h-7 rounded-full bg-primary-red text-white border px-4 truncate text-xs font-medium hover:brightness-95"
          onClick={deletePin}
        >
          Yes
        </button>
        <button
          className="h-7 rounded-full bg-gray-200 border px-4 truncate text-xs font-medium hover:brightness-95"
          onClick={() => changeModal(null)}
        >
          No
        </button>
      </div>
      {loading && <DataLoader />}
    </div>
  );
}
