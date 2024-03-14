interface ICardProp {
  image: string;
  title: string;
}

export default function CardComponent({ image, title }: ICardProp) {
  return (
    <>
      <img src={image} alt={title} className="bg-orange-300" />
    </>
  );
}
