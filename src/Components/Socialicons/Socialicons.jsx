import React from "react";
import { GrFacebookOption } from "react-icons/gr";
import { FaInstagram, FaPinterestP, FaTwitter } from "react-icons/fa";

const icons = [
  { href: "https://facebook.com", component: GrFacebookOption },
  { href: "https://instagram.com", component: FaInstagram },
  { href: "https://pinterest.com", component: FaPinterestP },
  { href: "https://twitter.com", component: FaTwitter },
];

const Socialicons = ({ wrapperClass = "" }) => (
  <>
    {/* eslint-disable-next-line no-unused-vars */}
    {icons.map(({ href, component: Icon }, i) => (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`social-icon ${wrapperClass}`}
      >
        <Icon className="social-svg" />
      </a>
    ))}
  </>
);

export default Socialicons;
