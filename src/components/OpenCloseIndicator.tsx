import { useMemo } from "react";
import { useGetPrimaryData } from "../hooks";
import dayjs from "dayjs";

const OpenCloseIndicator = () => {
  const { data: dataPrimary } = useGetPrimaryData();

  const jamBuka = dataPrimary?.[0].jam_buka;
  const jamTutup = dataPrimary?.[0].jam_tutup;

  const current = dayjs().format("HH:mm");

  const isOpen = useMemo(() => {
    if (jamBuka && jamTutup) {
      if (current >= jamBuka && current <= jamTutup) {
        return true;
      }
    }

    return false;
  }, [jamBuka, jamTutup, current]);

  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: isOpen ? "#00FB0A" : "red",
      }}
    />
  );
};

export default OpenCloseIndicator;
