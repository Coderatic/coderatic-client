const fetchAPI = async (path: string, options: object) => {
  try {
    const res: any = await $fetch(`http://localhost:5000${path}`, options);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default fetchAPI;
