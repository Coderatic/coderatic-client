const fetchAPI = async (path: string, options: object) => {
  try {
    const res: any = await $fetch(`http://localhost:5000${path}`, options);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export default fetchAPI;
