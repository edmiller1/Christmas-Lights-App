import { cloudinary } from "./cloudinary";

export const generateUID = (): string => {
  let firstPart: number | string = (Math.random() * 46656) | 0;
  let secondPart: number | string = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const getBase64Value = (
  image: File | Blob,
  callback: (imageBase64Value: string) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => {
    callback(reader.result as string);
  };
};

export const convertTime = (seconds: number) => {
  const roundedSeconds = Math.floor(seconds);
  const hours = Math.floor(roundedSeconds / 3600);
  const remainingSeconds = roundedSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  const formattedTime = `${hours === 0 ? "" : hours + "h"} ${
    minutes < 10 ? minutes : ""
  }${minutes}min`;

  return formattedTime;
};

export const convertDistance = (distance: number) => {
  const km = distance / 1000;
  const formattedDistance = `${km.toFixed(1)}km`;
  return formattedDistance;
};

export const convertStepDistance = (distance: number) => {
  const formattedDistance = `${
    Math.floor(distance) > 1000
      ? distance.toFixed(0) + "km"
      : distance.toFixed(0) + "m"
  }`;
  return formattedDistance;
};

export const optimizeImage = (id: string) => {
  const image = cloudinary.image(id).format("auto").quality("auto");

  return image.toURL();
};
