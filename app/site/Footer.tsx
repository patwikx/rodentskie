import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer border-r z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <p className="text-slate-600">RD Realty Development Corporation.</p>
        <p className="text-slate-600">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
