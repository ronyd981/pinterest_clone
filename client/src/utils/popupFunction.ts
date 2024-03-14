import toast from "react-hot-toast";

export function popupFunction(message: string, color: string, icon: string) {
  return toast(message, {
    duration: 2000,
    position: "top-center",
    className: "text-white font-medium " + color,
    icon: icon,
  });
}
