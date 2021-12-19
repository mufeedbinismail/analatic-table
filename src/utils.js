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