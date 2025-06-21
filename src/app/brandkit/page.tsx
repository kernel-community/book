'use client';

import Image from "next/image";
import LogoImage from "../../../public/logo.png";
import { MoveRight } from 'lucide-react';
import { useState } from 'react';
import { miriam, libreFranklin, poly } from '@/lib/fonts';

const Logo = () => {
  return (
    <Image
      src={LogoImage}
      alt="Kernel Logo"
      style={{ objectFit: "cover" }}
      height={1300}
      width={1200}
      unoptimized
    />
  )
}

const Navbar = () => {
  return (
    <div className="backdrop-blur-[80.20px] py-[12px] px-[24px] flex justify-between border-2">
      <div className="sm:w-9 w-6">
        <Logo />
      </div>
      <div className="place-self-end">
        <a href={"/"} className={`group inline-flex flex-col font-medium sm:text-lg text-base`}>
          <span className="inline-flex flex-row items-center gap-2">
            Back to Home <MoveRight />
          </span>
          <div className="bg-primary h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
        </a>
      </div>
    </div>
  )
}

const BrandAsset = ({ title, description, downloadUrl }: { title: string, description: string, downloadUrl?: string }) => {
  const scrollToSection = () => {
    const sectionId = title.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-[#4B5B33] transition-all cursor-pointer" onClick={scrollToSection}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {downloadUrl && (
        <a
          href={downloadUrl}
          className="bg-[#4B5B33] text-white px-4 py-2 rounded-full inline-flex items-center gap-2 hover:bg-opacity-90 transition-all"
          download
          onClick={(e) => e.stopPropagation()}
        >
          Download <MoveRight size={16} />
        </a>
      )}
    </div>
  )
}

export default function Brandkit() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="w-full">
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translate(-50%, -10px); }
          20% { opacity: 1; transform: translate(-50%, 0px); }
          80% { opacity: 1; transform: translate(-50%, 0px); }
          100% { opacity: 0; transform: translate(-50%, -10px); }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-in-out forwards;
        }
      `}</style>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className={`${miriam.className} text-5xl mb-6`}>Kernel Brand Kit</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to represent Kernel consistently. Download our logos, colors, and brand assets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <BrandAsset
            title="Primary Logo"
            description="The main Kernel logo for light backgrounds"
            downloadUrl="/logo.png"
          />

          {/* <BrandAsset
            title="Logo (Dark)"
            description="Kernel logo optimized for dark backgrounds"
          /> */}

          {/* <BrandAsset
            title="Icon Only"
            description="Standalone Kernel icon without text"
          /> */}

          <BrandAsset
            title="Color Palette"
            description="Official Kernel colors and hex codes"
          />

          <BrandAsset
            title="Typography"
            description="Font guidelines and usage examples"
          />

          {/* <BrandAsset
            title="Brand Guidelines"
            description="Complete brand usage guidelines and examples"
          /> */}
        </div>

        <div id="primary-logo" className="bg-white border-2 border-gray-200 rounded-lg p-8">
          <h2 className={`${miriam.className} text-3xl mb-6`}>Primary Logo</h2>
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-8 mb-6 inline-block">
              <div className="w-48">
                <Logo />
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              The main Kernel logo for light backgrounds. Maintain clear space around the logo and ensure high contrast with the background.
            </p>
            <a
              href="/logo.png"
              className="bg-[#4B5B33] text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-opacity-90 transition-all mb-8"
              download
            >
              Download Logo <MoveRight />
            </a>
          </div>

          <div className="bg-[#F9F9F9] rounded-lg p-6 mt-6">
            <h3 className={`${miriam.className} text-xl mb-4 font-bold`}>Logo Usage Guidelines</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Maintain clear space around the logo</li>
              <li>• Do not stretch or distort the logo</li>
              <li>• Use high contrast backgrounds</li>
              <li>• Minimum size: 24px height</li>
            </ul>
          </div>
        </div>

        <div id="color-palette" className="bg-white border-2 border-gray-200 rounded-lg p-8 mt-8">
          <h2 className={`${miriam.className} text-3xl mb-6`}>Color Palette</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200 relative" onClick={() => copyToClipboard('#4B5B33')}>
              <div className="w-24 h-24 bg-[#4B5B33] rounded-lg mx-auto mb-3 shadow-md hover:shadow-lg"></div>
              <span className="block font-mono text-lg font-semibold">#4B5B33</span>
              <span className="text-gray-600">Primary Glade</span>
              {copiedColor === '#4B5B33' && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-sm opacity-0 animate-fade-in">
                  Copied!
                </div>
              )}
            </div>
            <div className="text-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200 relative" onClick={() => copyToClipboard('#6166DC')}>
              <div className="w-24 h-24 bg-[#6166DC] rounded-lg mx-auto mb-3 shadow-md hover:shadow-lg"></div>
              <span className="block font-mono text-lg font-semibold">#6166DC</span>
              <span className="text-gray-600">Secondary Grape</span>
              {copiedColor === '#6166DC' && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-sm opacity-0 animate-fade-in">
                  Copied!
                </div>
              )}
            </div>
            <div className="text-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200 relative" onClick={() => copyToClipboard('#84B979')}>
              <div className="w-24 h-24 bg-[#84B979] rounded-lg mx-auto mb-3 shadow-md hover:shadow-lg"></div>
              <span className="block font-mono text-lg font-semibold">#84B979</span>
              <span className="text-gray-600">Secondary Melon</span>
              {copiedColor === '#84B979' && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-sm opacity-0 animate-fade-in">
                  Copied!
                </div>
              )}
            </div>
            <div className="text-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200 relative" onClick={() => copyToClipboard('#FFD500')}>
              <div className="w-24 h-24 bg-[#FFD500] rounded-lg mx-auto mb-3 shadow-md hover:shadow-lg"></div>
              <span className="block font-mono text-lg font-semibold">#FFD500</span>
              <span className="text-gray-600">Tertiary Sun</span>
              {copiedColor === '#FFD500' && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-sm opacity-0 animate-fade-in">
                  Copied!
                </div>
              )}
            </div>
          </div>
        </div>


        <div id="typography" className="bg-white border-2 border-gray-200 rounded-lg p-8 mt-8">
          <h2 className={`${miriam.className} text-3xl mb-6`}>Typography</h2>
          <div className="space-y-6">
            <div className="bg-[#f9f9f9] rounded-lg p-6">
              <h3 className={`${libreFranklin.className} text-2xl mb-2 font-bold`}>Libre Franklin</h3>
              <p className={`${libreFranklin.className} text-lg text-gray-600 mb-2`}>The quick brown fox jumps over the lazy dog</p>
              <div className="text-sm text-gray-500">
                <p><strong>Primary Type:</strong> Libre Franklin</p>
                {/* <p>Use cases: Headlines, hero text, primary navigation</p> */}
              </div>
            </div>

            <div className="bg-[#f9f9f9] rounded-lg p-6">
              <h3 className={`${poly.className} text-2xl mb-2 font-bold`}>Poly</h3>
              <p className={`${poly.className} text-lg text-gray-600 mb-2`}>The quick brown fox jumps over the lazy dog</p>
              <div className="text-sm text-gray-500">
                <p><strong>Secondary Type:</strong> Poly</p>
                {/* <p>Use cases: Subheadings, accent text, quotes</p> */}
              </div>
            </div>

            <div className="bg-[#f9f9f9] rounded-lg p-6">
              <h3 className={`${miriam.className} text-2xl mb-2 font-bold`}>Miriam Libre</h3>
              <p className={`${miriam.className} text-lg text-gray-600 mb-2`}>The quick brown fox jumps over the lazy dog</p>
              <div className="text-sm text-gray-500">
                <p><strong>Tertiary Type:</strong> Miriam Libre</p>
                {/* <p>Use cases: Body text, descriptions, general content</p> */}
              </div>
            </div>
          </div>
        </div>

        <div id="brand-name-stylization" className="bg-white border-2 border-gray-200 rounded-lg p-8 mt-8">
          <h2 className={`${miriam.className} text-3xl mb-6`}>Brand Name Stylization</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-bold text-lg bg-green-50 rounded-tl-lg">Please Do</th>
                  <th className="text-left py-4 px-6 font-bold text-lg bg-red-50 rounded-tr-lg">Please Don&apos;t</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-green-25">Use &ldquo;Kernel&rdquo; with proper capitalization.</td>
                  <td className="py-4 px-6 bg-red-25">Use the word community to refer to our wider web</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-green-25">Capitalize only the first letter of Kernel in all instances</td>
                  <td className="py-4 px-6 bg-red-25">Use &ldquo;kernel&rdquo; in lowercase</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-6 bg-green-25">Use &apos;the Kernel environment&apos; when referring to our wider web</td>
                  <td className="py-4 px-6 bg-red-25">Use inconsistent capitalization like &ldquo;KERNeL&rdquo;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Questions about brand usage? Need additional assets?
          </p>
          <a
            href="mailto:hello@kernel.community"
            className="bg-[#4B5B33] text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-opacity-90 transition-all"
          >
            Contact Us <MoveRight />
          </a>
        </div>
      </div>
    </div>
  );
}