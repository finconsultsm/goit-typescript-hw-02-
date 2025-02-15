import React from "react";
import sc from "./LoadMore.module.css";

interface LoadMoreProps {
  onClick: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick }) => (
  <button onClick={onClick} className={sc.button}>
    Load More
  </button>
);

export default LoadMore;
