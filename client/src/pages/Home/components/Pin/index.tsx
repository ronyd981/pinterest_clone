import { Link } from "react-router-dom";
import { MdSaveAlt } from "react-icons/md";

import { TPinType } from "@/types";

interface IProps {
  pin: TPinType;
}

export default function Pin({ pin }: IProps) {
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Link
      to={`/pin/${pin.id}`}
      className="w-full cursor-zoom-in relative aspect-auto"
      key={pin.id}
    >
      <div
        className="w-full h-full absolute hover:bg-[#00000065] group"
        tabIndex={2}
      >
        <div className="w-full h-full hidden group-hover:flex justify-between flex-col p-4">
          <div className="flex justify-end">
            <button
              className="max-w-max p-3 text-white font-medium text-sm rounded-full bg-primary-red hover:bg-secondary-red"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Save
            </button>
          </div>
          <div className="flex justify-end gap-2">
            {pin.url && (
              <button
                className="w-[calc(100%-36px)] h-7 rounded-full bg-white px-4 truncate text-xs font-medium underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(pin.url);
                }}
              >
                {pin.url}
              </button>
            )}
            <button className="w-7 h-7 flex items-center justify-center bg-white rounded-full">
              <MdSaveAlt className="text-xl text-primary-gray" />
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
    </Link>
  );
}
