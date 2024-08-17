import { useAuth } from '~/composables/useAuth'

interface UserData {
  name: string;
  projekte: number[];
}

export const useData = () => {
  const userData = useState<UserData>('userData', () => ({name: "", projekte: []}));
  const { userId } = useAuth()
  
  // login with credentials
  const fetchData = async () => {
    try {
      // send request to api/data
      const dataRequest = await $fetch('/api/data/getData', {
        method: 'POST',
        body: {
          id: userId.value,
        }
      })
      if(dataRequest.success && dataRequest.result){
        userData.value = JSON.parse(dataRequest.result.data)
      }
    }
    catch (error) {
      // console.error(error.statusMessage);
    }
  }

  const updateUserData = async (data: Object) => {
    const dataString = JSON.stringify(data)

    try {
      // send credentials to api/auth
      const dataRequest = await $fetch('/api/data/updateData', {
        method: 'POST',
        body: {
          id: userId.value,
          data: dataString,
        }
      })
      if(dataRequest.success && dataRequest.result){
        userData.value = JSON.parse(dataRequest.result.data)
      }
    }
    catch (error) {
      // console.error(error.statusMessage);
    }
  }

  // fetch userData & return name from the JSON
  const getName = () => {
    fetchData()
    return userData.value.name
  };

  return { getName, updateUserData };
};