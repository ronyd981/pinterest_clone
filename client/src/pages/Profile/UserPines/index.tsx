import { useContext, useState } from "react";
import { DataLoader } from "@/components";
import Masonry from "react-masonry-css";
import { useParams } from "react-router-dom";
import { Pin } from "./components";
import { Modals } from "@/components";
import { useGetUserPines } from "./useGetUserPines";
import { ModalViewsContext } from "@/context";
import { TPinType } from "@/types";

interface IProps {
  id: string;
}

export default function UserPines({}: IProps) {
  const { changeModal, modal } = useContext(ModalViewsContext);
  const [pin, setPin] = useState<TPinType | undefined>();

  const { id } = useParams<{ id: string }>();
  const { data, loading } = useGetUserPines(id ?? "");

  const breakpointColumnsObj = {
    default: 6,
    1280: 5,
    1024: 4,
    768: 3,
    500: 2,
  };

  return (
    <section
      className="
      w-[95%] max-w-[1200px] mx-auto
    "
    >
      {modal && pin && (
        <Modals changeModal={changeModal} modalView={modal} pin={pin} />
      )}
      {loading ? (
        <div className="w-full flex justify-center flex-col gap-2 absolute top-2">
          <DataLoader />
        </div>
      ) : data && data.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.map((pin) => (
            <Pin
              key={pin.id}
              pin={pin}
              changeModal={changeModal}
              setPin={setPin}
            />
          ))}
        </Masonry>
      ) : (
        <div className="flex items-center justify-center flex-col gap-2">
          <p
            className="
            text-sm text-primary-gray text-center
            2xl:text-base
          "
          >
            Nothing to show...yet! Pins you create will live here.
          </p>
        </div>
      )}
    </section>
  );
}
