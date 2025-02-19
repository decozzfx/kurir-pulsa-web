import { Button, Typography } from "@mui/material";
import { HeroPng, PsPng } from "../assets/image";
import Section from "../components/Section";

interface IProps {
  toggleForm: () => void;
}

const Hero = (props: IProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  grid-flow-dense gap-6 py-10">
      <div className="flex flex-col justify-center gap-1">
        <Section delay={0.5}>
          <Typography
            variant="h3"
            fontWeight="bold"
            className="text-shadow shadow-gray-500"
          >
            Selamat datang di Kurir Pulsa
          </Typography>
          <Typography>
            iConvert adalah penyedia jasa convert pulsa yang mudah, aman dan
            terpercaya.
          </Typography>
          <div className="flex flex-col gap-5">
            <Button
              onClick={() => props.toggleForm()}
              sx={{ width: 200, height: 50, borderRadius: 2, marginTop: 5 }}
              variant="contained"
            >
              Convert Sekarang
            </Button>
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
        </Section>
      </div>
      <Section delay={0.7}>
        <div className="ml-32">
          <img
            src={HeroPng}
            alt="hero"
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=com.iconvert.webview.id&pcampaignid=web_share",
                "_blank"
              )
            }
          />
        </div>
      </Section>
    </div>
  );
};

export default Hero;
