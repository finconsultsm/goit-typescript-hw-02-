import sc from "./ImageCard.module.css";

interface Image {
  urls: {
    small: string;
  };
  alt_description: string;
}

interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const { urls, alt_description } = image;
  return (
    <div className={sc.card}>
      <img src={urls.small} alt={alt_description} className={sc.image} />
    </div>
  );
};

export default ImageCard;
