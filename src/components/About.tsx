import { Typography } from "@mui/material";
import { AboutUsSvg, FbPng, IgPng, PsPng, WaPng, XPng } from "../assets/image";
import { IGetPrimaryDataResonse } from "../types";
import { FC } from "react";
import { WhatsAppLink } from "../utils/common";

interface IProps {
  primaryData: IGetPrimaryDataResonse;
}

const About: FC<IProps> = (props) => {
  return (
    <div
      id="about"
      className="grid grid-cols-1 lg:grid-cols-2 mb-8 grid-flow-dense gap-6"
    >
      <div className="flex flex-col justify-between gap-1 pl-8">
        <Typography variant="h4" fontWeight="bold">
          About us
        </Typography>
        <Typography variant="body2">
          Kami adalah penyedia layanan convert pulsa yang aman dan terpecaya.
        </Typography>
        <div className="grid gap-3">
          <Typography fontWeight="bold" variant="body2">
            Temukan kami di
          </Typography>
          <div className="flex flex-wrap gap-6">
            <img
              onClick={() =>
                window.open(
                  "https://www.facebook.com/profile.php?id=61573542867888",
                  "_blank"
                )
              }
              className="cursor-pointer object-contain w-11 h-11"
              src={FbPng}
              alt="fb"
            />
            <img
              className="cursor-pointer object-contain w-11 h-11"
              src={IgPng}
              alt="ig"
              onClick={() =>
                window.open("https://www.instagram.com/kurirpulsaid/", "_blank")
              }
            />
            <button
              onClick={() => WhatsAppLink(props.primaryData.nomor_hp?.[0])}
            >
              <img
                className="cursor-pointer object-contain w-11 h-11"
                src={WaPng}
                alt="wa"
                id="wa-about"
              />
            </button>
            <img
              className="cursor-pointer object-contain w-11 h-11"
              src={XPng}
              alt="x"
              onClick={() => window.open("https://x.com/KurirPulsa", "_blank")}
            />
            <img
              className="cursor-pointer object-contain w-36 h-11"
              src={PsPng}
              alt="ps"
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.iconvert.webview.id&pcampaignid=web_share",
                  "_blank"
                )
              }
            />
          </div>
        </div>
        <Typography variant="body2" marginTop={2}>
          Bantu kami untuk memperbaiki layanan kami dengan memberikan ulasan dan
          komentar anda di PlayStore.
        </Typography>
      </div>
      <div className="m-auto">
        <img src={AboutUsSvg} className="w-64" alt="About" />
      </div>
    </div>
  );
};

export default About;
