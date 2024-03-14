import Masonry from "react-masonry-css";

import { DataLoader } from "@/components";
import { Pin } from "./components";
import { useGetPines } from "@/hooks";

export default function Home() {
  const { loading, data, error } = useGetPines();

  const breakpointColumnsObj = {
    default: 6,
    1280: 5,
    1024: 4,
    768: 3,
    500: 2,
  };

  return (
    <main
      className="
      w-[95%] mx-auto py-2 relative
      "
    >
      {loading ? (
        <div className="w-full flex justify-center flex-col gap-2 absolute top-2">
          <DataLoader />
          <div className="w-64 mx-auto">
            <p className="text-xl text-primary-gray font-bold text-center">
              We're adding new ideas to your home's feed
            </p>
          </div>
        </div>
      ) : data && data.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.map((pin) => (
            <Pin key={pin.id} pin={pin} />
          ))}
        </Masonry>
      ) : data === null || data?.length === 0 ? (
        <p className="text-lg text-primary-gray font-medium text-center">
          There are no pins
        </p>
      ) : null}
      {error && (
        <p className="text-lg text-primary-red font-medium text-center">
          Something went wrong
        </p>
      )}
    </main>
  );
}
