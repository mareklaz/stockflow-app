// import { useQuery } from "@tanstack/react-query";
// import http from "../../services/axiosService";

// const fetchData = async (url) => {
//   const { data } = await http.get(url);
//   return data;
// };

// export const useData = (url) => {
//   const { data, isLoading, error, refetch } = useQuery(
//     url,
//     () => fetchData(url),
//     {
//       staleTime: 1000 * 60 * 5, // los datos se consideran antiguos después de 5 minutos
//     },
//   );

//   return { data, isLoading, error, refetch };
// };
