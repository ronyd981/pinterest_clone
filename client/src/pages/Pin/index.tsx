import { useParams } from "react-router-dom";
import { DataLoader, PinComponent } from "@/components";
import { useGetPin } from "./useGetPin";

export default function Pin() {
  const { id } = useParams();
  const { pin, loading } = useGetPin(id ?? "");

  if (loading) return <DataLoader />;

  return (
    <section className="w-full pb-4">
      {pin && id && <PinComponent pin={pin} pinId={id} />}
    </section>
  );
}
