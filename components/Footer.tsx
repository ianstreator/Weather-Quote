import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="footer-container max-w-xs m-auto mt-0 md:max-w-full md:flex-col md:justify-between md:items-start md:pl-0">
      <a className="footer-card md:m-1" href="https://github.com/ianstreator" target="_blank" rel="noreferrer">
        <Image
          src={"/github-icon.svg"}
          width={25}
          height={25}
          alt="github"
        ></Image>
        &nbsp; ianstreator
      </a>
      <a className="footer-card md:m-1"  href="https://openweathermap.org" target="_blank" rel="noreferrer">
        <Image
          src={"/openweather-icon.svg"}
          width={25}
          height={25}
          alt="github"
        ></Image>
        &nbsp; OpenWeather
      </a>
    </div>
  );
}

export default Footer;
