import { useQuery } from "@tanstack/react-query";
import supabase from "../api/supabaseClient";

const useGetBankList = () => {
  const data = useQuery({
    queryKey: ["get-list-bank"],
    queryFn: async () => {
      const response = await supabase.from("list_bank").select("*");

      return response.data;
    },
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });

  return data;
};

export default useGetBankList;
