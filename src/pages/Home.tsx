import Hero from "../components/Hero";
import {
  useGetBankList,
  useGetOperatorList,
  useGetPrimaryData,
} from "../hooks";
import OperatorList from "../components/OperatorList";
import BankList from "../components/BankList";
import Contact from "../components/Contact";
import About from "../components/About";
import FormConvert from "../components/FormConvert";
import { useState } from "react";
import Snk from "../components/Snk";
import useStore from "../zustand";
import { Helmet } from "react-helmet-async";
import Section from "../components/Section";
import Footer from "../components/Footer";

const Home = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const { snkModal, snkToggle } = useStore();

  // Queries
  const { data: dataOperatorList } = useGetOperatorList();
  const { data: dataBankList } = useGetBankList();
  const { data: dataPrimary } = useGetPrimaryData();

  // Function
  const toggleForm = () => {
    setIsOpen((p) => !p);
  };

  return (
    // screen
    <div className="home p-0 m-0 grid grid-cols-1 gap-24 scroll-smooth ">
      <Helmet>
        <title>Kurir Pulsa</title>
        <meta name="Kurir Pulsa" content="Kurir Pulsa" />
      </Helmet>

      {/* Hero */}
      <Hero toggleForm={toggleForm} />

      {/* Rate */}
      <Section delay={0.5}>
        <OperatorList dataOperatorList={dataOperatorList ?? []} />
      </Section>

      {/* Bank */}
      <Section delay={0.5}>
        <BankList dataBankList={dataBankList ?? []} />
      </Section>

      {/* CS */}
      <Section delay={0.5}>
        <Contact primaryData={dataPrimary?.[0]} />
      </Section>

      {/* About */}
      <Section delay={0.5}>
        <About primaryData={dataPrimary?.[0]} />
      </Section>

      <Section delay={0.5}>
        <Footer />
      </Section>

      {/* Modal Form Convert */}
      {isOpen && (
        <FormConvert
          dataBankList={dataBankList ?? []}
          dataOperatorList={dataOperatorList ?? []}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          primaryData={dataPrimary?.[0]}
        />
      )}

      {/* Modal SNK */}
      {snkModal && (
        <Snk
          primaryData={dataPrimary?.[0]}
          isOpen={snkModal}
          setIsOpen={snkToggle}
        />
      )}
    </div>
  );
};

export default Home;
