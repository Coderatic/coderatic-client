type useFetchType = typeof useFetch;

export const useNitroFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig();
  options.baseURL = config.public.NitroBaseURL;
  return useFetch(path, options);
};
