import { Typography } from "@mui/material";
import { BankType } from "../types";

interface IProps {
  dataBankList: BankType[];
}

const BankList = (props: IProps) => {
  const { dataBankList } = props;
  return (
    <div className="grid gap-6">
      <div className="w-full">
        <Typography
          className=""
          variant="h4"
          textAlign="center"
          fontWeight="bold"
        >
          Bank & e-Wallet Support
        </Typography>
        <div className="grid grid-cols-2 lg:grid-cols-5 items-center mt-5">
          {dataBankList?.map((bank) => {
            return (
              <div className="m-auto">
                <img
                  className="object-contain w-28 h-16"
                  src={bank.img_url}
                  alt="bank-img"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BankList;
