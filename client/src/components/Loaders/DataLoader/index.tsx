export default function Loader() {
  return (
    <div className="w-8 h-8 flex flex-col justify-between py-2 mx-auto bg-gray-600 rounded-full animate-spin">
      <div className="flex justify-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
      </div>
      <div className="flex justify-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
      </div>
    </div>
  );
}
