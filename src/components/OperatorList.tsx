import { Typography } from "@mui/material";
import { OperatorTypes } from "../types";
import { numericInputFormatter } from "../utils/common";

interface IProps {
  dataOperatorList: OperatorTypes[];
}

const OperatorList = (props: IProps) => {
  const { dataOperatorList } = props;
  return (
    <div className="grid gap-6">
      <div className="w-full ">
        <Typography variant="h4" textAlign="center" fontWeight="bold">
          Rate Convert Pulsa Hari Ini
        </Typography>
        <Typography className="px-0 lg:px-32" textAlign="center">
          Tukar Pulsamu menjadi uang / saldo e-wallet hanya dalam hitungan
          menit.
        </Typography>
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        {dataOperatorList &&
          dataOperatorList?.map((operator) => (
            <div
              key={operator.id}
              className="grid gap-2 transition delay-150 hover:shadow-md border border-gray-200 p-4 rounded-lg"
            >
              <img
                className="object-contain w-48 h-20 mx-auto"
                src={operator.img_url}
                alt="operator"
              />
              <Typography textAlign="center" fontWeight="bold" variant="body1">
                {operator.rate}
              </Typography>
              <Typography textAlign="center" variant="body2">
                Rp.{" "}
                {numericInputFormatter.formatter(
                  operator.min_order?.toString()
                )}{" "}
                - 1,000,000
              </Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OperatorList;
