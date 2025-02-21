import { Typography } from "@mui/material";
import { PatternSvg, WaPng } from "../assets/image";
import { IGetPrimaryDataResonse } from "../types";
import { WhatsAppLink } from "../utils/common";

interface IProps {
  primaryData: IGetPrimaryDataResonse;
}
const ContactSupport = (props: IProps) => {
  return (
    <div
      id="contact-support"
      className="grid grid-cols-1 lg:grid-cols-2  grid-flow-dense gap-6  bg-[#F5F6FA] "
    >
      <div className="flex flex-col justify-center gap-1 pl-8 pt-8">
        <Typography variant="h4" fontWeight="bold">
          Ada kendala atau pertanyaan?
        </Typography>
        <Typography variant="body2">
          Hubungi CS kami dengan klik logo WhatsApp dibawah untuk mendapatkan
          bantuan maupun informasi lebih lanjut tentang Kurir Pulsa.{" "}
        </Typography>
        <div className="h-full w-full flex items-center justify-center">
          <button
            id="wa-contact-support"
            onClick={() => WhatsAppLink(props.primaryData.nomor_hp?.[0])}
            className="flex gap-5 items-center cursor-pointer"
          >
            <Typography variant="h5">Contact Support Kami</Typography>
            <img src={WaPng} />
          </button>
        </div>
      </div>
      <div className="ml-32">
        <img src={PatternSvg} alt="ContactSupport" />
      </div>
    </div>
  );
};

export default ContactSupport;
