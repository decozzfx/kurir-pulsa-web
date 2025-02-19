import { useQuery } from "@tanstack/react-query";
import supabase from "../api/supabaseClient";

const useGetPrimaryData = () => {
  const data = useQuery({
    queryKey: ["get-primary-data"],
    queryFn: async () => {
      const response = await supabase.from("primary_data").select("*");

      return response.data;
    },
  });

  return data;
};

export default useGetPrimaryData;
