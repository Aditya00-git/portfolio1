const isMobile = () => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: none)").matches ||
    window.innerWidth < 768
  );
};
export default isMobile;