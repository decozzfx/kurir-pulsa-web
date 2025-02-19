/* React Imports */
import React from "react";

/* MUI Imports */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

/* Icon Imports */

/* Third Party Imports */
import { LoadingButton } from "@mui/lab";
import { UseFormWatch } from "react-hook-form";
import { IPayloadConvertPulsaTypes, OperatorTypes } from "../types";
import { numericInputFormatter } from "../utils/common";
import { useGetOperatorList } from "../hooks";

/* Type Imports */
type IProps = {
  open: boolean;
  isConfirmButtonLoading?: boolean;
  isConfirmButtonDisabled?: boolean;
  onConfirmButtonClick: () => void;
  onCloseButtonClick: () => void;
  watch: UseFormWatch<IPayloadConvertPulsaTypes>;
};

const SubmitConfirmationModal: React.FC<IProps> = (props) => {
  const {
    open,
    isConfirmButtonLoading = false,
    isConfirmButtonDisabled = false,
    onConfirmButtonClick,
    onCloseButtonClick,
    watch,
  } = props;

  /* States */
  const {
    nomorPengirim,
    provider,
    nomorRekening,
    paymentMethod,
    pemilikRekening,
    pulsaQty,
  } = watch();

  // Queries
  const { data: dataOperatorList } = useGetOperatorList();

  const findOperator: OperatorTypes = dataOperatorList?.find(
    (op) => op.id === provider?.id
  );

  const rate = numericInputFormatter.formatter(
    (
      Number(pulsaQty?.replace(/[^0-9.]/g, "") || 0) * findOperator?.rate
    ).toFixed(0)
  );

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle
        textAlign="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "16px",
          maxWidth: "16ch",
          margin: "auto",
          gap: 3,
        }}
      >
        <Typography sx={{ fontWeight: 600 }} variant="h6">
          Konfirmasi
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingX: 4 }}>
        <div className="bg-[#F5F6FA] rounded-md p-4">
          <Row
            title="Nominal Pulsa"
            value={numericInputFormatter.formatter(pulsaQty)}
          />
          <Row title="Provider" value={provider?.value ?? "-"} />
          <Row title="No. Pengirim" value={nomorPengirim ?? "-"} />
          <Row title="Bank" value={paymentMethod?.value ?? "-"} />
          <Row title="No. Rekening" value={nomorRekening ?? "-"} />
          <Row title="Nama Pemilik Rekening" value={pemilikRekening ?? "-"} />
          <Row
            title="Biaya Admin"
            value={findOperator?.notes_trf_pulsa || "Gratis"}
          />
          <Row title="Saldo Diterima" value={"Rp. " + rate} />
        </div>
        <div className="bg-yellow-100/50 mt-5 rounded-md p-4">
          <p className="text-[12px]  text-center sm:text-sm lg:text-[16px]">
            Pastikan nomor rekening atau e-wallet sudah benar, jika terdapat
            kesalahan data, sepenuhnya menjadi tanggung jawab penukar
          </p>
        </div>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "space-between", paddingX: 4, paddingY: 2 }}
      >
        <LoadingButton
          variant="outlined"
          disabled={isConfirmButtonLoading}
          onClick={onCloseButtonClick}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          id="submit-confirm"
          variant="contained"
          loading={isConfirmButtonLoading}
          disabled={isConfirmButtonDisabled}
          onClick={onConfirmButtonClick}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

const Row = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex w-9/12 items-center  justify-between">
        <span className=" text-[12px] leading-[1.2] sm:text-sm lg:text-[16px]">
          {title}
        </span>
        <span className="mr-[40%]">:</span>
      </div>
      <span className="text-[12px] text-right w-4/12 leading-[1.2] sm:text-sm lg:text-[16px]">
        {value}
      </span>
    </div>
  );
};

export default SubmitConfirmationModal;
