import { useQuery } from "react-query";

function useAPI(queryKey: string, queryFn: () => any): APIResponse {
  const response = useQuery([queryKey], () => queryFn());
  return {
    status: response.status,
    data: response.data,
    error: response.error,
    // isFetching: response.isFetching,
    isLoading: response.isLoading,
  };
}

export interface APIResponse {
  status: "idle" | "error" | "loading" | "success";
  data: any;
  error: any;
  //   isFetching: boolean;
  isLoading: boolean;
}

export default useAPI;
