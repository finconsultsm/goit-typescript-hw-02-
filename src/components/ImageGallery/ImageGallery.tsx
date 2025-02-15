import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import sc from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  if (!images.length) return null;

  return (
    <ul className={sc.gallery}>
      {images.map((image) => (
        <li
          key={image.id}
          onClick={() => onImageClick(image)}
          className={sc.item}
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
