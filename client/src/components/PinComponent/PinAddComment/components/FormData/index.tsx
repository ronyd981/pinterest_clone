import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import { useZorm } from "react-zorm";
import EmojiPicker from "emoji-picker-react";
import { MdSend } from "react-icons/md";

import { DataLoader } from "@/components";

interface IProps {
  zorm: ReturnType<typeof useZorm>;
  loading: boolean;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

type EmojiClickData = {
  emoji: string;
};

export default function FormData({
  loading,
  zorm,
  inputValue,
  setInputValue,
}: IProps) {
  const [isEmojiPickerLoaded, setIsEmojiPickerLoaded] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const positionRef = useRef<number | null>(null);

  function handleFocus() {
    if (loading) return;

    const input = textareaRef.current;
    if (!input) return;

    let position = input.selectionStart;
    positionRef.current = position + 1;
  }

  function handleEmoji(emoji: EmojiClickData) {
    if (loading) return;

    const input = textareaRef.current;
    if (!input) return;

    let length = input.value.length;

    const newText =
      input.value.slice(0, positionRef.current ?? input.value.length) +
      emoji.emoji +
      input.value.slice(positionRef.current ?? input.value.length);

    const example =
      input.value.slice(0, positionRef.current ?? length + 1) +
      emoji.emoji +
      input.value.slice(positionRef.current ?? length + 1);

    input.value = newText;
    //@ts-ignore
    document.activeElement?.blur();
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputValue, textareaRef.current]);

  useEffect(() => {
    const emojiPickerModuleUrl = import.meta.resolve("./emoji-picker-react");
    setIsEmojiPickerLoaded(emojiPickerModuleUrl !== null);
  }, []);

  return (
    <>
      {!isEmojiPickerLoaded ? (
        <div className="w-10 h-10 mx-auto">
          <DataLoader />
        </div>
      ) : (
        <form
          className={`
          w-[calc(100%-52px)] h-full
          ${loading && "animate-pulse"}
          `}
          ref={zorm.ref}
        >
          <fieldset disabled={loading}>
            <div className="w-full h- min-h-10 flex items-center gap-1 border rounded-3xl pr-4">
              <textarea
                name="message"
                className="w-full max-h-24 pl-4 resize-none outline-none overflow-y-auto no-scrollbar bg-inherit"
                rows={1}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                ref={textareaRef}
                onKeyDown={handleFocus}
                onClick={handleFocus}
                placeholder="Add a comment"
              ></textarea>
              <div className="h-full flex items-center gap-2 relative">
                <div className="relative group" tabIndex={1}>
                  <button className="w-4 h-4 flex items-center justify-center rounded-full">
                    <span className="cursor-pointer select-none text-lg">
                      😃
                    </span>
                  </button>
                  <div
                    className="w-4 h-4 hidden group-focus-within:block absolute z-30 rounded-full top-0 right-0 cursor-pointer"
                    onClick={() => {
                      //@ts-ignore
                      document.activeElement?.blur();
                    }}
                  ></div>
                  <div className="w-[250px] hidden group-focus-within:flex justify-end absolute -top-[310px] -right-12">
                    <EmojiPicker
                      width={250}
                      height={300}
                      onEmojiClick={handleEmoji}
                    />
                  </div>
                </div>
                <button className="w-7 h-7 flex items-center justify-center bg-primary-red rounded-full">
                  <MdSend className="text-white" />
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      )}
    </>
  );
}
