import { Cards_Data } from "./data";

import { TodayCard } from "@/components";

export default function Today() {
  return (
    <main
      className="
      w-[90%] max-w-[1100px] flex items-center justify-center flex-col mx-auto my-6
    "
    >
      <h4 className="text-lg">7 de septiembre de 2023</h4>
      <h1 className="text-3xl font-bold">Mantén la inspiración</h1>
      <section
        className="
        w-full grid gap-4 mt-6
        sm:grid-cols-2
        lg:grid-cols-3
      "
      >
        {Cards_Data.map((cardInfo) => (
          <TodayCard
            key={cardInfo.id}
            image={cardInfo.image}
            title={cardInfo.title}
            secondary_title={cardInfo.secondary_title}
          />
        ))}
      </section>
    </main>
  );
}
