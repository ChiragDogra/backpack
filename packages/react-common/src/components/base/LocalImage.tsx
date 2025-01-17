import { useRef, useState } from "react";
import { OFFLINE_IMAGES } from "@coral-xyz/common";
import { useFeatureGates } from "@coral-xyz/recoil";

export const LocalImage = (props) => {
  const featureGates = useFeatureGates();
  const [imageUrl, setImageUrl] = useState(
    featureGates[OFFLINE_IMAGES]
      ? localStorage.getItem(`img-${props.src}`) || props.src
      : props.src
  );
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <img
      src={imageUrl}
      ref={imageRef}
      onError={(...e) => {
        if (imageRef.current) imageRef.current.src = props.src;
      }}
      onClick={props.onClick}
      alt={props.alt}
      className={props.className}
    />
  );
};
