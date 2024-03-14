import { DataLoader } from "@/components";
import { ImageContainer, FormData } from "./components";

import { useCreatePin } from "./useCreatePin";

export default function CreatePin() {
  const { loading, error, hasImage, setFile, file, zorm } = useCreatePin();

  return (
    <div
      className="
      w-full h-[calc(100dvh-80px)] pt-4 overflow-hidden bg-gray-200
    "
    >
      <div className="w-full h-full overflow-y-auto pb-4">
        <div
          className={`
          max-w-xs flex flex-col gap-6 p-5 rounded-2xl mx-auto shadow-lg bg-white relative
          sm:w-[480px] sm:max-w-none
          lg:w-[800px] lg:h-[550px] lg:flex-row lg:p-12 lg:gap-2
          ${loading && "animate-pulse"}
          `}
        >
          <ImageContainer
            setFile={setFile}
            file={file}
            hasImage={hasImage}
            loading={loading}
          />
          <div
            className="
            w-full h-full flex flex-col gap-4
            lg:w-[calc(100%-258px)] lg:pt-4 lg:pl-4
          "
          >
            <FormData loading={loading} error={error} zorm={zorm} />
          </div>
          {loading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <DataLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
