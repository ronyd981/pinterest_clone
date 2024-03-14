import { useRef, useContext } from "react";
import { useZorm } from "react-zorm";
import EmojiPicker from "emoji-picker-react";
import { UserContext } from "@/context";

interface IProps {
  zorm: ReturnType<typeof useZorm>;
  loading: boolean;
  error: null | string;
}

type EmojiClickData = {
  emoji: string;
};

export default function FormData({ zorm, loading, error }: IProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const positionRef = useRef<number | null>(null);

  const { user } = useContext(UserContext);

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
    <form className="w-full h-full overflow-y-auto" ref={zorm.ref}>
      <fieldset
        className="w-full h-full flex flex-col gap-4"
        disabled={loading}
      >
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            className={`
            w-full font-medium text-primary-gray text-2xl outline-none px-2 pb-1 placeholder-gray-500 border-b focus:border-b-blue-500
            ${isTitleErrored && "border-red-500"}
            `}
            placeholder="Add your title"
            name="title"
          />
          {zorm.errors["title"]((e) => (
            <span className="text-xs text-red-500">{e.message}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
            <span className="text-lg font-medium uppercase">
              {user?.first_name.charAt(0)}
            </span>
          </div>
          <span className="text-xs font-medium text-primary-gray">
            {user?.first_name} {user?.last_name}
          </span>
        </div>
        <div className="w-full relative">
          <div className="w-full h-16">
            <textarea
              name="description"
              className={`
              w-full h-full outline-none text-sm pl-2 pr-8 border-b resize-none no-scrollbar focus:border-b-blue-500
              ${isDescriptionErrored && "border-red-500"}
              `}
              placeholder="Tell everyone what your Pin is about"
              ref={inputRef}
              onKeyDown={handleFocus}
              onClick={handleFocus}
            ></textarea>
          </div>
          {zorm.errors["description"]((e) => (
            <span className="text-xs text-red-500">{e.message}</span>
          ))}
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
        <div className="flex flex-col gap-2 mt-auto">
          <input
            type="text"
            className={`
            px-2 pb-1 outline-none border-b text-sm focus:border-b-blue-500
            ${isUrlErrored && "border-red-500"}
            `}
            placeholder="Add destination link"
            name="url"
          />
          {zorm.errors["url"]((e) => (
            <span className="text-xs text-red-500">{e.message}</span>
          ))}
          <button className="max-w-max p-2 rounded-lg outline-none bg-primary-red text-white font-medium text-sm">
            Save pin
          </button>
        </div>
      </fieldset>
    </form>
  );
}
