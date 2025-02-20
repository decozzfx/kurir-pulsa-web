import React, { useMemo } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import InputField from "./input/InputField";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  BankType,
  IGetPrimaryDataResonse,
  IPayloadConvertPulsaTypes,
  OperatorTypes,
} from "../types";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Dropdown from "./input/Dropdown";
import SubmitConfirmationModal from "./SubmitConfirmationModal";
import { numericInputFormatter, WhatsAppLink } from "../utils/common";
import NumericField from "./input/NumericField";
import { useGetPrimaryData } from "../hooks";
import dayjs from "dayjs";

interface AddDataProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataBankList: BankType[];
  dataOperatorList: OperatorTypes[];
  primaryData: IGetPrimaryDataResonse;
}

const FormConvert: React.FC<AddDataProps> = ({
  isOpen,
  setIsOpen,
  dataOperatorList,
  dataBankList,
  primaryData,
}) => {
  const [showFormModal, setShowFormModal] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);

  // Yup Schema
  const dataFormSchema = Yup.object().shape({
    provider: Yup.object()
      .shape({
        id: Yup.string().required("Harap pilih provider"),
        value: Yup.string().required("Harap pilih provider"),
      })
      .required("Harap pilih provider"),
    nomorRekening: Yup.string().required("Harap isi nomor rekening"),
    pulsaQty: Yup.string()
      .required("Harap isi nominal pulsa")
      .matches(
        /^([3-9][0-9]{4}|[1-9][0-9]{5}|1000000)$/,
        "Harap isi dengan angkat yang valid, min 30.000 dan max 1.000.000"
      ),
    nomorPengirim: Yup.string()
      .required("Harap isi nomor pengirim")
      .min(10, "Nomor pengirim tidak valid")
      .max(13, "Nomor pengirim tidak valid")
      .matches(/^[0-9]+$/, "Nomor pengirim tidak valid"),
    paymentMethod: Yup.object()
      .shape({
        id: Yup.string().required("Harap pilih metode pembayaran"),
        value: Yup.string().required("Harap pilih metode pembayaran"),
      })
      .required("Harap pilih provider"),
    pemilikRekening: Yup.string().required("Harap isi nama pemilik rekening"),
  });

  // Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IPayloadConvertPulsaTypes>({
    resolver: yupResolver(dataFormSchema),
  });

  const {
    nomorPengirim,
    nomorRekening,
    paymentMethod,
    pemilikRekening,
    provider,
    pulsaQty,
  } = watch();

  const { data: dataPrimary } = useGetPrimaryData();

  const jamBuka = dataPrimary?.[0].jam_buka;
  const jamTutup = dataPrimary?.[0].jam_tutup;

  const current = dayjs().format("HH:mm");

  const isOpenTime = useMemo(() => {
    if (jamBuka && jamTutup) {
      if (current >= jamBuka && current <= jamTutup) {
        return true;
      }
    }

    return false;
  }, [jamBuka, jamTutup, current]);

  const onSubmitHandler = () => {
    toggleCorfirmation();
  };

  const toggleCorfirmation = () => {
    setShowConfirmationModal((p) => !p);
  };

  const findOperator: OperatorTypes | undefined = dataOperatorList?.find(
    (op) => op.id === provider?.id
  );

  const rate = numericInputFormatter.formatter(
    (Number(pulsaQty || 0) * (findOperator?.rate ?? 0)).toFixed(0)
  );

  const onConfirmButtonClick = () => {
    const messageChat = `Halo kak, saya ingin tukar pulsa 
*Provider* : ${provider?.value}
*Nominal* : ${numericInputFormatter.formatter(pulsaQty)}
*Pengirim* : ${nomorPengirim}
*Biaya Admin* : 'Gratis'
*Uang/Saldo Diterima* : Rp. ${numericInputFormatter.formatter(rate)}
*Bank* : ${paymentMethod?.value}
*Penerima* : ${pemilikRekening}
*Nomor Rekening* : ${nomorRekening}
`;

    WhatsAppLink(primaryData.nomor_hp?.[0], messageChat);
  };

  const OperatorListOptions = useMemo(() => {
    return dataOperatorList.reduce((prevItem, item) => {
      if (item.isEnable) {
        return [...prevItem, { id: item.id, value: item.operator_name }];
      }
      return prevItem;
    }, [] as { id: string; value: string }[]);
  }, [dataOperatorList]);

  const bankListOptions = useMemo(() => {
    return dataBankList.map((item) => ({
      id: item.id,
      value: item.nama_bank,
    }));
  }, [dataBankList]);

  React.useEffect(() => {
    setShowFormModal(isOpen);
  }, [isOpen]);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
      <div
        className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
          showFormModal ? "translate-y-0" : "translate-y-full"
        }
            ${showFormModal ? "opacity-100" : "opacity-0"}`}
      >
        {!isOpenTime ? (
          <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
            <button
              onClick={() => {
                setShowFormModal(false);
                setIsOpen(false);
              }}
              className="absolute top-5 right-3 btn btn-ghost btn-circle"
            >
              <HiOutlineXMark className="text-xl font-bold" />
            </button>
            <span className="text-2xl font-bold text-center w-full">
              Layanan Sedang Offline
            </span>
          </div>
        ) : (
          <>
            <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
              <button
                onClick={() => {
                  setShowFormModal(false);
                  setIsOpen(false);
                }}
                className="absolute top-5 right-3 btn btn-ghost btn-circle"
              >
                <HiOutlineXMark className="text-xl font-bold" />
              </button>
              <span className="text-2xl font-bold text-center w-full">
                Form Convert
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Dropdown
                  control={control}
                  inputName="provider"
                  label="Provider"
                  options={OperatorListOptions ?? []}
                  placeholder="Provider"
                  error={errors.provider?.value?.message}
                />

                <NumericField
                  label="Nominal Pulsa"
                  control={control}
                  inputName="pulsaQty"
                  placeholder="Nominal Pulsa"
                  error={errors.pulsaQty?.message}
                />

                <InputField
                  label="Nomor Pengirim"
                  control={control}
                  inputName="nomorPengirim"
                  placeholder="Nomor Pengirim"
                  error={errors.nomorPengirim?.message}
                />

                <Dropdown
                  control={control}
                  inputName="paymentMethod"
                  label="Metode Pembayaran"
                  options={bankListOptions ?? []}
                  placeholder="Metode Pembayaran"
                  error={errors.paymentMethod?.value?.message}
                />

                <InputField
                  label="Nama Pemilik Rekening / e-wallet"
                  control={control}
                  inputName="pemilikRekening"
                  placeholder="Nama Pemilik Rekening / e-wallet"
                  error={errors.pemilikRekening?.message}
                />

                <InputField
                  label="Nomor Rekening / e-wallet"
                  control={control}
                  inputName="nomorRekening"
                  placeholder="Nomor Rekening / e-wallet"
                  error={errors.nomorRekening?.message}
                />
              </div>
              <div className="mt-10">
                <LoadingButton
                  id="submit-convert"
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Submit
                </LoadingButton>
              </div>
            </form>
          </>
        )}
      </div>

      <SubmitConfirmationModal
        watch={watch}
        onCloseButtonClick={toggleCorfirmation}
        onConfirmButtonClick={onConfirmButtonClick}
        open={showConfirmationModal}
      />
    </div>
  );
};

export default FormConvert;
