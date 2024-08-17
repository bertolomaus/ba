export const useData = () => {
  const userData = useState<Object>('userData', () => JSON.parse('{}'));

  const getName = (id: number) => {
    const name = 'olaf'
    // do something with userName
    return name
  };

  return { getName };
};