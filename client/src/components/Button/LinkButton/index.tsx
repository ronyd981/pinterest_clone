//

export default function LinkButton(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      {...props}
      className={
        props.className + " max-w-max px-2.5 py-2 rounded-3xl text-xs font-bold"
      }
    >
      {props.children}
    </button>
  );
}
