export const accessCookie = async (name: string) => {
  try {
    const request = await $fetch("/server/api/accessCookie", {
      method: "POST",
      body: {
        name: name,
      },
    });
    return request;
  } catch (error) {
    return error;
  }
};
