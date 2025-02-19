import { useQuery } from "@tanstack/react-query";
import supabase from "../api/supabaseClient";

const useGetOperatorList = () => {
  const data = useQuery({
    queryKey: ["get-list-operator"],
    queryFn: async () => {
      const response = await supabase.from("list_operator").select("*");

      return response.data;
    },
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });

  return data;
};

export default useGetOperatorList;
