export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  const storedData = localStorage.getItem(key);
  if (!storedData) {
    return defaultValue;
  }
  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return defaultValue;
  }
};

export const saveToStorage = (key: string, data: unknown): void => {
  const dataToSave = data === undefined ? null : data;
  localStorage.setItem(key, JSON.stringify(dataToSave));
};
