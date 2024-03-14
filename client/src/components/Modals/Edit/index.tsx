import EmojiPicker from "emoji-picker-react";
import { DataLoader } from "@/components/Loaders";
import { TPinType } from "@/types";
import { useRef } from "react";
import { useEditPin } from "./useEditPin";

interface IEdit {
  changeModal: (modal: string | null) => void;
  pin: TPinType | undefined;
}

type EmojiClickData = {
  emoji: string;
};

export default function Edit({ changeModal, pin }: IEdit) {
  const { zorm, loading } = useEditPin(pin, changeModal);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const positionRef = useRef<number | null>(null);

  function handleFocus() {
    const input = inputRef.current;
    if (!input) return;

    let position = input.selectionStart;
    positionRef.current = position + 1;
  }

  function handleEmoji(emoji: EmojiClickData) {
    if (loading) return;

    const input = inputRef.current;
    if (!input) return;

    const newText =
      input.value.slice(0, positionRef.current ?? input.value.length) +
      emoji.emoji +
      input.value.slice(positionRef.current ?? input.value.length);

    input.value = newText;
    //@ts-ignore
    document.activeElement?.blur();
  }

  const isTitleErrored = !!zorm.errors["title"]();
  const isDescriptionErrored = !!zorm.errors["description"]();
  const isUrlErrored = !!zorm.errors["url"]();

  return (
    <form
      className="
      w-[95%] flex flex-col gap-5 absolute bg-white py-6 rounded-2xl top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
      sm:w-[380px]
    "
      ref={zorm.ref}
    >
      <div className="w-4/5 mx-auto">
        <h3 className="text-xl font-medium text-center">Edit this pin</h3>
      </div>
      <div
        className="
        w-3/4 flex flex-col gap-3 mx-auto
      "
      >
        <div className="w-full">
          <input
            type="text"
            className={`
            w-full font-medium text-primary-gray text-xl outline-none px-2 pb-1 placeholder-gray-500 border-b
            ${isTitleErrored ? "border-red-500" : "focus:border-b-blue-500"}
            `}
            placeholder="Add your title"
            name="title"
            defaultValue={pin?.title}
          />
        </div>
        <div className="w-full relative">
          <div className="w-full h-16">
            <textarea
              name="description"
              className={`
              w-full h-full outline-none text-sm pl-2 pr-8 border-b resize-none no-scrollbar
              ${
                isDescriptionErrored
                  ? "border-red-500"
                  : "focus:border-b-blue-500"
              }
              `}
              placeholder="Tell everyone what your Pin is about"
              ref={inputRef}
              onKeyDown={handleFocus}
              onClick={handleFocus}
              defaultValue={pin?.description}
            ></textarea>
          </div>
          <div
            className="w-5 h-5 flex items-center justify-center absolute top-5 right-2 group rounded-full"
            tabIndex={1}
          >
            <span className="cursor-pointer select-none">😃</span>
            <div
              className="w-5 h-5 hidden group-focus-within:block absolute z-30 rounded-full top-0 right-0 cursor-pointer"
              onClick={() => {
                //@ts-ignore
                document.activeElement?.blur();
              }}
            ></div>
            <div className="w-[300px] hidden group-focus-within:flex justify-end absolute top-0 right-6">
              <EmojiPicker
                width={300}
                height={300}
                onEmojiClick={handleEmoji}
              />
            </div>
          </div>
        </div>
        <div>
          <input
            type="text"
            className={`
            px-2 pb-1 outline-none border-b text-sm
            ${isUrlErrored ? "border-red-500" : "focus:border-b-blue-500"}
            `}
            placeholder="Add destination link"
            name="url"
            defaultValue={pin?.url}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button
          className="h-7 rounded-full bg-primary-red text-white border px-4 truncate text-xs font-medium hover:brightness-95"
          type="submit"
        >
          Edit
        </button>
        <button
          className="h-7 rounded-full bg-gray-200 border px-4 truncate text-xs font-medium hover:brightness-95"
          onClick={() => changeModal(null)}
          type="button"
        >
          Cancel
        </button>
      </div>
      {loading && <DataLoader />}
    </form>
  );
}
