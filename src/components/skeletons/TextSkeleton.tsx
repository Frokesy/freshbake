const TextSkeleton = () => <div style={styles.skeleton} />;

const styles = {
  skeleton: {
    backgroundColor: "#e0e0e0",
    height: "1.2em",
    width: "100%",
    borderRadius: "6px",
    animation: "pulse 0.8s infinite",
  },
  "@keyframes pulse": {
    "0%": { backgroundColor: "#e0e0e0" },
    "50%": { backgroundColor: "#c0c0c0" },
    "100%": { backgroundColor: "#e0e0e0" },
  },
};

export default TextSkeleton;
