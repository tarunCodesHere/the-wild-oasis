import { getSettings } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, error, settings };
}
