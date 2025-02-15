import "./App.css";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImages } from "./helpers/fetchImages";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMore from "./components/LoadMore/LoadMore";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<Image | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const loadImages = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const results: Image[] = await fetchImages(query, page);
        if (results.length === 0 && page === 1) {
          toast("No images found for your query.", { icon: "🔍" });
          setHasMore(false);
        } else {
          setImages((prevImages) =>
            page === 1 ? results : [...prevImages, ...results]
          );
          setHasMore(results.length > 0);
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearch = async (newQuery: string) => {
    if (!newQuery.trim()) {
      setQuery("");
      toast.error("Please enter a search query!");
      return;
    }

    setImages([]);
    setLoading(true);
    setError(null);
    setQuery(newQuery);
    setPage(1);

    try {
      const results: Image[] = await fetchImages(newQuery);
      if (results.length === 0) {
        toast("No images found for your query.", { icon: "🔍" });
      }
      setImages(results);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image: Image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="App">
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} query={query} setQuery={setQuery} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMore onClick={loadMore} />}
      <ImageModal
        isOpen={!!modalImage}
        onClose={closeModal}
        image={modalImage}
      />
    </div>
  );
}

export default App;
