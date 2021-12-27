// aggregate funtions
export const sum = arr => arr.reduce((prev, curr) => (prev + curr), 0);

export const count = (arr) => arr.length || 0;

export const avg = (arr) => {
  if (arr.length) {
    return sum(arr) / count(arr);
  }

  return 0;
};