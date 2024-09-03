import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  const skeletonStyle = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "16px",
      padding: "16px",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #808080",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "16px",
    },
    imageSkeleton: {
      marginBottom: "16px",
    },
    textSkeleton: {
      marginBottom: "8px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };

  return (
    <div style={skeletonStyle.container}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} style={skeletonStyle.card}>
            <Skeleton
              height={117}
              width="100%"
              style={skeletonStyle.imageSkeleton}
            />
            <div style={skeletonStyle.row}>
              <Skeleton width="60%" style={skeletonStyle.textSkeleton} />
              <Skeleton circle={true} height={20} width={20} />
            </div>
            <div style={skeletonStyle.row}>
              <Skeleton width="30%" style={skeletonStyle.textSkeleton} />
              <Skeleton width="30%" style={skeletonStyle.textSkeleton} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductSkeleton;
