interface ICardData {
  image: string;
  title: string;
  secondary_title: string;
}

export default function TodayCard({
  image,
  title,
  secondary_title,
}: ICardData) {
  return (
    <div
      className="
      w-full h-64 relative overflow-hidden rounded-xl bg-gray-200
  "
    >
      <img
        src={image}
        alt={secondary_title}
        className="w-full h-full relative z-0 object-cover rounded-xl"
      />
      <div className="w-full h-full flex items-center justify-end flex-col gap-2 p-2 absolute z-10 bottom-0 rounded-xl bg-[#00000020] hover:bg-[#00000040]">
        <p className="text-xs text-white text-center">{secondary_title}</p>
        <h4 className="text-2xl text-white font-bold text-center">{title}</h4>
      </div>
    </div>
  );
}
