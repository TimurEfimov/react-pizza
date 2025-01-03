import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="136" cy="136" r="136" />
    <rect x="0" y="293" rx="15" ry="15" width="280" height="25" />
    <rect x="0" y="345" rx="10" ry="10" width="280" height="88" />
    <rect x="-2" y="450" rx="10" ry="10" width="90" height="30" />
    <rect x="125" y="443" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
