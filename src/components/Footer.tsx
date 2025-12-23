"use client";

import Image from "next/image";
import LocaleLink from "./LocaleLink";
import { Twitter, MessageCircle, Youtube } from "lucide-react";

const socialLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/kernel0x",
    icon: Twitter,
  },
  {
    name: "Chat",
    url: "https://kernel-community.slack.com/",
    icon: MessageCircle,
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/watch?v=AdmuZalNPIQ&list=PLvTrX8LNPbPk3yfCY1uuPsiBgpxaO_G8-",
    icon: Youtube,
  },
];

const Footer = () => {
  return (
    <footer className="relative">
      <div className="relative max-w-[1364px] mx-auto px-6 md:px-[52px] pt-10 md:pt-[50px] pb-[119px] md:pb-[54px] flex flex-col md:flex-row md:items-center">
        {/* Gradient line at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[101%] max-w-[1364px] h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(115,115,125,0.1) 0%, rgba(115,115,125,1) 50%, rgba(115,115,125,0.1) 100%)",
          }}
        />

        {/* Logo and social links */}
        <div className="inline-block w-[217px] -mt-2.5 text-gray-900">
          <LocaleLink
            href="/"
            className="inline-block"
            aria-label="Kernel Community Home">
            <Image
              src="/logos/KernelLogo.svg"
              alt="Kernel Logo"
              width={217}
              height={100}
              className="block mb-2.5"
            />
          </LocaleLink>
          <div className="flex gap-[18px]">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={`footer-social-link-${index}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-[#4B5B33] transition-colors"
                  aria-label={social.name}>
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation links */}
        <div className="ml-0 md:ml-[5vw] mt-14 md:mt-0 inline-block w-full md:w-[calc(100%-106px-217px)] align-top">
          <div className="flex-1">
            <ul className="m-0 p-0 list-none flex flex-wrap md:flex-nowrap text-gray-900">
              {/* About */}
              <li className="font-medium shrink-0 flex-[0_50%] md:flex-1 w-[calc(50%-66px)] md:w-auto pr-[66px] md:pr-0 mb-16 md:mb-0 md:mr-[5vw]">
                <span className="mt-0 font-bold block">About</span>
                <ul className="p-0 mt-3 list-none">
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/start"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      What is Kernel?
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/start/how-to-use"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      How to use this site
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/start/principled-people"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Principles
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/blog/"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Blog
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/start/faq"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      FAQs
                    </LocaleLink>
                  </li>
                </ul>
              </li>

              {/* Participate */}
              <li className="font-medium shrink-0 flex-[0_50%] md:flex-1 w-[calc(50%-66px)] md:w-auto pr-[66px] md:pr-0 mb-16 md:mb-0 md:mr-[5vw]">
                <span className="mt-0 font-bold block">Participate</span>
                <ul className="p-0 mt-3 list-none">
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/learn"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Learn
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/build"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Build
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/conversation"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Converse
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <a
                      href="https://github.com/kernel-community/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Contribute
                    </a>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/start/faq#contact"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Contact
                    </LocaleLink>
                  </li>
                </ul>
              </li>

              {/* Technical Care */}
              <li className="font-medium shrink-0 flex-[0_50%] md:flex-1 w-[calc(50%-66px)] md:w-auto pr-[66px] md:pr-0 mb-16 md:mb-0">
                <span className="font-bold block">Technical Care</span>
                <ul className="p-0 mt-3 list-none">
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/guiding/privacy"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Privacy Policy
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <LocaleLink
                      href="/guiding/terms-of-service"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Terms of Service
                    </LocaleLink>
                  </li>
                  <li className="max-w-[200px] mb-2.5">
                    <a
                      href="https://kernel.community/brandkit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-normal hover:text-[#4B5B33] hover:underline">
                      Brand Kit
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

