import { useGetPines } from "@/hooks";
import { useGetSearch } from "./useGetSearch";

export default function Search() {
  const { zorm } = useGetPines();

  const isSearchErrored = !!zorm.errors["title"]();

  return (
    <form
      className="
      w-full hidden
      sm:block
    "
      ref={zorm.ref}
    >
      <input
        type="text"
        name="title"
        className={`
        w-full h-10 text-sm rounded-full px-4 focus:border-[3px] focus:border-blue-400 bg-gray-200 outline-none
        ${isSearchErrored && "border-red-500"}
        `}
        placeholder="Search"
      />
    </form>
  );
}
