export default (strOrigin: string, nbr: number): string => {
  let length: number = 0;
  const arr: Array<string> = strOrigin.split(' ');
  const res: Array<string> = arr.reduce((acc: Array<string>, str: string): Array<string> => {
    if (str.length + length <= nbr) {
      length += str.length;
      acc.push(str);
    }
    return [...acc];
  }, []);
  return `${res.join(' ')}...`;
};
