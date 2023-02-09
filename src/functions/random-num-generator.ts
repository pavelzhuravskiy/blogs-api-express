/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
export const randomNumber = (min: number, max: number) =>
  (Math.floor(Math.random() * (max - min + 1) + min)).toString();