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
