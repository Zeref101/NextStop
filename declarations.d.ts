// any import ending in .png should be treated as a string.
declare module ".png" {
  const value: string;
  export default value;
}
