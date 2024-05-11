'use client'
import React from "react";

const Button = ({ styles }) => (
  <button type="button" className={`py-4 px-6 font-poppins font-bold text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none text-slate-900 ${styles}`}>
    Get Started
  </button>
);

export default Button;
