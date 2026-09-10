export const isSafeUrl = (path) => {
  if (path && path.startsWith("/") && !path.startsWith("//")) return true;
  return false;
};
