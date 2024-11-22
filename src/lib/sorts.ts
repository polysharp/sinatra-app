export function newestToOldest<T>(field: keyof T): (a: T, b: T) => number {
  return (a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return bValue - aValue;
    }

    return 0;
  };
}

export function oldestToNewset<T>(field: keyof T): (a: T, b: T) => number {
  return (a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    return 0;
  };
}
