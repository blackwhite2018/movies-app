export default async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (e) {
    return null;
  }
};
