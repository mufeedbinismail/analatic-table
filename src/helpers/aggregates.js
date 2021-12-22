// aggregate funtions
export const sum = arr => arr.reduce((prev, curr) => (prev + curr), 0);
export const count = arr => (arr.length || 0);
export const avg = arr => sum(arr) / (count(arr) + 1);