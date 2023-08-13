import { UseFetchOptions, useFetch } from "#app";

type useFetchType = typeof useFetch;

export const useAPIFetch = async (
	path: string,
	options: UseFetchOptions<any, any>
) => {
	const config = useRuntimeConfig();
	options.baseURL = config.public.APIBaseURL;

	const { data, error } = await useFetch(path, options).catch((error) =>
		Promise.reject(error)
	);
	if (error.value) {
		return Promise.reject(error.value);
	}
	return Promise.resolve(data.value);
};
