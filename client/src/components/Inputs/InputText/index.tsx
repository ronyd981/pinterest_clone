import { useZorm } from "react-zorm";

interface IProps {
  name: string;
  title?: string;
  labelId?: string;
  placeholder?: string;
  zorm: ReturnType<typeof useZorm>;
  type?: string;
}

export default function InputText({
  name,
  title,
  zorm,
  type,
  placeholder,
  labelId,
}: IProps) {
  const isErrored = !!zorm.errors[name]();

  return (
    <div className={" w-full outline-none text-sm focus:border-blue-300"}>
      <div className="flex flex-col gap-0.5">
        {title && (
          <label htmlFor={labelId} className="text-xs ml-2">
            {title}
          </label>
        )}
        <input
          type={type ? type : "text"}
          className={`
          w-full h-10 rounded-2xl border-2 outline-none px-2 text-sm focus:border-blue-300
          ${isErrored && "border-red-500"}
          `}
          id={labelId}
          placeholder={placeholder}
          name={
            typeof zorm.fields[name.toString()] === "function" &&
            //@ts-ignore
            zorm.fields[name.toString()]()
          }
        />
        {zorm.errors[name]((e) => (
          <span className="text-xs text-red-500" id={e.code} key={e.code}>
            {e.message}
          </span>
        ))}
      </div>
    </div>
  );
}
