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

export const navigation = [
  { name: "About", href: "#about" },
  { name: "Explore", href: "#explore" },
  { name: "Create", href: "#create" },
  { name: "Features", href: "#features" },
];

export const decorations = [
  {
    title: "Twinkling House",
    rating: "4.8",
    source:
      "https://images.unsplash.com/photo-1606946184955-a8cb11e66336?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "Christchurch, New Zealand",
  },
  {
    title: "Christmas Characters",
    rating: "3.2",
    source:
      "https://images.unsplash.com/photo-1663792262627-dd0699588e58?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "Waikanae Beach, New Zealand",
  },
  {
    title: "Windy Wellington Decoration",
    rating: "3.6",
    source:
      "https://images.unsplash.com/photo-1608466833943-a33d924f6a12?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "Wellington, New Zealand",
  },
  {
    title: "Christmas Train",
    rating: "4.0",
    source:
      "https://images.unsplash.com/photo-1663792269643-c96ca1608126?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "Auckland, New Zealand",
  },
  {
    title: "Summer Christmas",
    rating: "4.0",
    source:
      "https://images.unsplash.com/photo-1609542101758-cf2bf6d3e6eb?q=80&w=3289&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "Sydney, New Zealand",
  },
  {
    title: "Breathtaking Nativity Sets",
    rating: "4.5",
    source:
      "https://images.unsplash.com/photo-1664289337198-0ce0c51fe09f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "Perth, New Zealand",
  },
  {
    title: "Down Under Christmas",
    rating: "4.2",
    source:
      "https://images.unsplash.com/photo-1664289340916-b5a53ab297b0?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "Melbourne, New Zealand",
  },
  {
    title: "Backyard Christmas",
    rating: "3.7",
    source:
      "https://images.unsplash.com/photo-1664289340914-e88538627c02?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address: "Brisbane, New Zealand",
  },
];
