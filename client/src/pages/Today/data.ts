import AssetOne from "@/assets/today/asset_0.webp";
import AssetTwo from "@/assets/today/asset_1.webp";
import AssetThree from "@/assets/today/asset_2.webp";
import AssetFour from "@/assets/today/asset_3.webp";
import AssetFive from "@/assets/today/asset_4.webp";
import AssetSix from "@/assets/today/asset_5.webp";
import AssetSeven from "@/assets/today/asset_6.webp";

export const Cards_Data: Array<{
  id: number;
  image: string;
  title: string;
  secondary_title: string;
}> = [
  {
    id: 0,
    image: AssetOne,
    title: "Toma o edita fotos analógicas",
    secondary_title: "El arte de fotografiar",
  },
  {
    id: 1,
    image: AssetTwo,
    title: "Tu próximo pasatiempo preferido",
    secondary_title: "Hobbies aesthetics",
  },
  {
    id: 2,
    image: AssetThree,
    title: "Paredes pintadas de forma aesthetic",
    secondary_title: "Diseños diferentes",
  },
  {
    id: 3,
    image: AssetFour,
    title: "Empieza bien tus días",
    secondary_title: "Desayunos para ir a la escuela, la uni o el trabajo",
  },
  {
    id: 4,
    image: AssetFive,
    title: "Para darte el ánimo que necesitas",
    secondary_title: "Frases motivacionales",
  },
  {
    id: 5,
    image: AssetSix,
    title: "Rutinas para una piel más sana y bonita",
    secondary_title: "Cuida tu carita",
  },
  {
    id: 6,
    image: AssetSeven,
    title: "Cómo hacer pasta casera",
    secondary_title: "¡Mamma mía!",
  },
];
