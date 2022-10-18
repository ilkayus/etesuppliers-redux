import React from "react";
import { logo } from "images";
import "./style/AnimatedLogo.css";

export interface Props {
  page: string;
}

const AnimatedLogo = ({ page }: Props) => {
  return (
    <div className="animated-logo">
      <img
        src={logo.halfLogo}
        className={"App-logo1 App-logo1-" + page}
        alt="logo"
      />
      <img
        src={logo.halfLogo}
        className={"App-logo2 App-logo2-" + page}
        alt="logo"
      />
    </div>
  );
};

export default AnimatedLogo;
