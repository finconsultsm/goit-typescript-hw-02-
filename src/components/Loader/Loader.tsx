import { ColorRing } from "react-loader-spinner";

const Loader = () => (
  <div style={{ width: "100%", textAlign: "center", margin: "20px 0" }}>
    <ColorRing
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      height={80}
      width={80}
    />
  </div>
);

export default Loader;
