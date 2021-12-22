export function classNames() {
  const _classes = [];

  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i];

    if (!arg) continue;

    switch (typeof arg) {
      case 'string':
        _classes.push(arg);
        break;
      case 'object':
        Object.entries(arg)
          .filter(entry => entry[1])
          .forEach(entry => _classes.push(entry[0]));
        break;
    }
  }

  return _classes.join(' ');
}

export function invert(obj) {
  const _obj = {};

  for (let key in obj) {
    _obj[obj[key]] = key;
  }
  
  return _obj;
}

export function reorderArray(arr, item, source, dest) {
  const newArr = Array.from(arr);
  newArr.splice(source, 1);
  newArr.splice(dest, 0, item);

  return newArr;
}

export function isDate(date) {
  if (!date) return false;

  const dt = new Date(date);
  return (dt instanceof Date) && !isNaN(dt.getTime());
}