import { useState } from "react";
import { useZorm } from "react-zorm";
import { newRequest } from "@/utils";
import { uploadImage } from "@/firebase";
import { popupFunction } from "@/utils";

import PinSchema from "./PinSchema";

export function useCreatePin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [hasImage, setHasImage] = useState<boolean>(false);

  const zorm = useZorm("pin", PinSchema, {
    async onValidSubmit(e) {
      e.preventDefault();

      const title = e.data.title,
        description = e.data.description,
        url = e.data.url;

      if (!file) return setHasImage(true);

      try {
        setLoading(true);
        setError(null);
        setHasImage(false);

        let urlImage = file ? await uploadImage(file, "pin") : null;

        await newRequest({
          method: "post",
          data: {
            title,
            description,
            url,
            image: urlImage,
          },
          url: "/pin",
        });

        popupFunction("Pin created", "bg-green-400", "😄");
        setFile(null);
        e.target.reset();
      } catch (error) {
        popupFunction("Something went wrong", "bg-red-400", "😔");
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    zorm,
    loading,
    error,
    hasImage,
    setFile,
    file,
  };
}
