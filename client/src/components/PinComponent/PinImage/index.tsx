interface IPinImage {
  image: string;
  alt: string;
}

export default function PinImage({ image, alt }: IPinImage) {
  return (
    <figure
      className="
        w-full bg-gray-200 rounded-2xl
        lg:w-[350px]
      "
    >
      <img
        src={image}
        className="
          w-full h-full object-cover rounded-2xl
        "
        alt={alt}
      />
    </figure>
  );
}
