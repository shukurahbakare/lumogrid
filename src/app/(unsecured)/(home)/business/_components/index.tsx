import React from "react";
import HeroComp from "./Hero";
import GetReliablePowerComp from "./GetReliablePower";
import TheSolutionComp from "./TheSolution";
import HighROIComp from "./HighROI";
import Footer from "../../../../../../components/shared/footer";

const BusinessLandingPageModule = () => {
  return (
    <div>
      <HeroComp />
      <GetReliablePowerComp />
      <TheSolutionComp />
      <HighROIComp />
      <Footer />
    </div>
  );
};

export default BusinessLandingPageModule;
