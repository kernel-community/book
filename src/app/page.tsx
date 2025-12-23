import Image from "next/image";
import Link from "next/link";
import KernelPlant from "../../public/kernel-plant.gif";
import PixelBg from "../../public/pixel.png";
import Trees from "../../public/trees.png";
import LogoImage from "../../public/logo.png";
import Anoma from "../../public/supporters/anoma.svg";
import Celo from "../../public/supporters/celo.png";
import Ethereum from "../../public/supporters/ethereum.svg";
import Filecoin from "../../public/supporters/filecoin.jpeg";
import Gitcoin from "../../public/supporters/gitcoin.svg";
import Optimism from "../../public/supporters/optimism.svg";
import TheGraph from "../../public/supporters/thegraph.png";
import {fellows as featured, projects} from "../components/Featured";
import type { Fellow, Project } from "../components/Featured";
import FlipCardGrid from "@/components/Cards";
import { ReactElement } from "react";
import { MoveRight } from 'lucide-react';
import { miriam } from '@/lib/fonts';

const KernelPlantComponent = () => {
  return (
    <Image
      src={KernelPlant}
      alt="Kernel plant"
      unoptimized
      style={{ objectFit: "cover" }}
      height={'1300'}
      width={'1200'}
    />
  )
}

const Logo = () => {
  return (
    <Image
      src={LogoImage}
      alt="Kernel Logo"
      style={{ objectFit: "cover" }}
      height={'1300'}
      width={'1200'}
      unoptimized
    />
  )
}

const PixelBgComponent = () => {
  return (
    <Image
      src={PixelBg}
      alt="pixel background"
      style={{ objectFit: "cover" }}
      height={'1300'}
      width={'1200'}
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
      <Link href={"/en/start"} className={`group inline-flex flex-col font-medium sm:text-lg text-base`}>
        <span className="inline-flex flex-row items-center gap-2">
          Read the Kernel Book <MoveRight />
        </span>
        <div className="bg-primary h-[2px] w-0 group-hover:w-full transition-all duration-500"></div>
      </Link>
      </div>
    </div>
  )
}

const Button = ({children, type, href}: {children: ReactElement, type:"primary" | "secondary", href: string}) => {
  if (type === "primary") {
    return (
      <a className="bg-[#4B5B33] border-2 border-[#4B5B33] text-white px-[12px] py-[10px] rounded-full inline-flex gap-3 w-full sm:w-auto cursor-pointer hover:bg-opacity-90 transition-all ease-in delay-100" href={href} target="_blank">
        {children}
      </a>
    )
  }

  if (type === "secondary") {
    return (
      <a className="border-2 border-[#4B5B33] px-[12px] py-[10px] rounded-full w-full sm:w-auto cursor-pointer hover:bg-[#4B5B33]/30 transition-all ease-in delay-100" href={href} target="_blank">
        {children}
      </a>
    )
  }

  return <></>

}

// hero section
const FirstFold = () => {
  return (
    <div className={`grid sm:grid-cols-2 sm:h-[500px] mb-12`}>
      <div className="sm:hidden block">
        <KernelPlantComponent />
      </div>
      <div className="flex items-center sm:pl-16">
        <div className="sm:w-[40rem] w-full p-12 sm:p-0">
          <div className={`flex flex-col justify-start text-5xl ${miriam.className} `}>
            <div>
              Cultivate a greater web,
            </div>
            <div>
              together
            </div>
          </div>
          <div className="text-base md:text-lg mt-6">
            Kernel is about building, through repeated interactions with peers, the patterns required for a better web.
          </div>
          <div className="text-base md:text-lg mt-6">
            Kernel serves up to 150 Kernel fellows — technologists, artists, engineers, researchers, designers, linguists — who each are building or researching something novel.
          </div>
          <div className="text-base md:text-lg mt-6">
            Our next block, KB11, begins in September, but you can start anytime. Apply and hear back in two weeks.
          </div>
          <div className="flex gap-6 mt-[32px] items-center sm:flex-row flex-col">
            <Button type="primary" href="https://apply.kernel.community/">
              <>
                Apply to Kernel <MoveRight />
              </>
            </Button>
            <Button type="secondary" href="https://read.kernel.community/en/learn/">
              <>
                Read the Book
              </>
            </Button>
          </div>
        </div>
      </div>
      <div className="h-full relative overflow-hidden hidden sm:block">
        <div className="absolute -bottom-12 -right-48">
          <KernelPlantComponent />
        </div>
        <div className="absolute -bottom-10 -right-48 -z-10">
          <PixelBgComponent />
        </div>
      </div>
    </div>
  )
}

const Tag = ({text}: {text: string}) => {
  return (
    <div className="inline-flex gap-3">
    <div className="border-[1px] border-slate-400 rounded-lg text-xs p-[2px]">
      {text}
    </div>
  </div>
  )
}

const Fellow = ({ fellow }: { fellow: Fellow }) => {
  return (
    <a className="flex flex-col gap-2 h-[221px] w-[112px] ml-3" href={fellow.url ?? ""} target="_blank">
      {/* image */}
      <div className="rounded-lg relative h-[112px] w-[112px]">
        {fellow.image}
      </div>
      {/* details */}
      <div className="w-full cursor-pointer flex flex-col justify-between">
        <div className="font-bold">
          {fellow.name}
        </div>
        <div className="text-sm">
          {fellow.position}
        </div>
        <div className="inline-flex gap-3">
          {/* <Tag text={fellow.tag1} />
          {fellow.tag2 && <Tag text={fellow.tag2} />} */}
        </div>
      </div>
    </a>
  )
}


const Fellows = () => {
  return (
    <>
      {
        featured.map((fellow, key) => {
          return (
            <Fellow fellow={fellow} key={key}/>
          )
        })
      }
    </>
  )
}


// fellows
const SecondFold = () => {
  return (
    <div className={`h-[780px] w-full flex flex-col items-center p-3 relative bg-[#F9F9F9] overflow-clip mb-12`}>
      <div className={`sm:text-4xl text-3xl z-10 mt-20 ${miriam.className}`}>
        Meet the Kernel Fellows
      </div>
      <div className="w-full h-full grow overflow-hidden mt-12 z-10 mb-14">
        <div className="gap-6 sm:gap-16 grid grid-rows-2 grid-flow-col w-full h-full overflow-x-auto overflow-y-hidden">
          <Fellows />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 overflow-clip">
        <Image src={Trees} style={{ objectFit: "cover" }} height={1100} width={1100} alt="trees background" unoptimized />
      </div>
    </div>
  )
}

const StatItem = ({big, description} :{big: string, description: string}) => {
  return (
  <div className="flex flex-col items-center justify-center hover:bg-[#F9F9F9] p-6 sm:p-0">
    <div className="text-3xl sm:text-6xl font-medium">
      {big}
    </div>
    <div className={`sm:text-xl text-sm ${miriam.className}`}>
      {description}
    </div>
  </div>
  )
}

// stats
const ThirdFold = () => {
  return (
    <div className={`sm:h-[250px] w-full overflow-hidden grid sm:grid-rows-1 grid-rows-2 grid-flow-col divide-x divide-y sm:divide-y-0 sm:border-t-2 sm:border-b-2`}>
      <StatItem big="2,211" description="Kernel Fellows" />
      <StatItem big="92" description="countries" />
      <StatItem big="150+" description="Active Projects" />
      <StatItem big="$40M+" description="Raised by Fellows" />
    </div>
  )
}

const Project = ({project}: {project: Project}) => {
  return (
    <a className="h-[250px] w-[250px] sm:h-[320px] sm:w-[320px] border-[1px] border-slate-200 flex flex-col rounded-lg m-3 cursor-pointer" href={project.url} target="_blank">
          <div className="relative min-h-[40%]">
            {project.projectImage}
            {/* <div className="absolute -bottom-4 right-4 bg-neutral-900 rounded-full w-12 h-12">
              <div className="relative h-full w-full rounded-full overflow-clip">
              {project.fellowImage}
              </div>
            </div> */}
          </div>
          <div className="flex flex-col min-h-[60%] overflow-auto justify-between p-2">
            <div className="flex flex-col">
            <div className="text-xl font-bold">{project.name}</div>
            <div className="font-bold">by {project.fellowName}</div>
            </div>
            <div>
              {project.description}
            </div>
            <div className="flex gap-3">
              <Tag text={project.tag1} />
              {project.tag2 && <Tag text={project.tag2} />}
            </div>
          </div>
        </a>
  )
}

const Projects = () => {
  return (
    <>
      {
        projects.map((proj, key) => {
          return (
            <Project project={proj} key={key}/>
          )
        })
      }
    </>
  )
}

// projects
const FourthFold = () => {
  return (
    <div className={`h-[500px] w-full bg-[#F9F9F9] flex flex-col items-center p-3 overflow-hidden relative mb-12`}>
      <div className={`sm:text-4xl text-3xl mt-14 z-10 ${miriam.className}`}>
        Projects by Kernel Fellows
      </div>
      <div className="grid grid-rows-1 grid-flow-col absolute bottom-12 sm:bottom-0 sm:mt-12 w-full px-3 overflow-x-auto overflow-y-hidden gap-6">
        <Projects />
      </div>
    </div>
  )
}

// kernel syllabus
const FifthFold = () => {
  return (
    <div className={`w-full flex flex-col items-center p-3 mb-12`}>
      <div className={`sm:text-4xl text-3xl font-medium ${miriam.className}`}>
        Explore the Kernel Book
      </div>
      <div className="sm:text-xl sm:w-[990px] text-base w-full text-center mb-12 mt-6">
        The Kernel Book is an open-source spring of fundamental ideas relating our web. Start anywhere that calls to you. The book guides each Kernel Block, one chapter per week.
      </div>
      <FlipCardGrid />
    </div>
  )
}

// footer
const Footer = () => {
  return (
    <div className={`w-full flex flex-col items-center p-3 overflow-hidden pt-12 pb-32`}>
      <Button type="primary" href="https://apply.kernel.community/">
        <>
          Apply to Kernel <MoveRight />
        </>
      </Button>
      <div className="w-full">
        <div className="text-center font-medium text-l sm:text-2xl mt-10 mb-8">Supporters</div>
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto items-center center"> */}
        <div className="flex flex-wrap justify-center gap-12 max-w-2xl mx-auto items-center">
                    <a href="https://www.gitcoin.co/" target="_blank" rel="noreferrer noopener" className="flex justify-center p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <Image src={Gitcoin} style={{ objectFit: "contain" }} height={50} width={80} alt="Gitcoin" unoptimized />
          </a>
          <a href="https://anoma.net/" target="_blank" rel="noreferrer noopener" className="flex justify-center p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <Image src={Anoma} style={{ objectFit: "contain" }} height={50} width={80} alt="Anoma" unoptimized />
          </a>
          <a href="https://celo.org/" target="_blank" rel="noreferrer noopener" className="flex justify-center p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <Image src={Celo} style={{ objectFit: "contain" }} height={50} width={80} alt="Celo" unoptimized />
          </a>
          <a href="https://ethereum.org/" target="_blank" rel="noreferrer noopener" className="flex justify-center p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <Image src={Ethereum} style={{ objectFit: "contain" }} height={50} width={80} alt="Ethereum" unoptimized />
          </a>
          <a href="https://filecoin.io/" target="_blank" rel="noreferrer noopener" className="flex justify-center p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <Image src={Filecoin} style={{ objectFit: "contain" }} height={50} width={80} alt="Filecoin" unoptimized />
          </a>
          <a href="https://www.optimism.io/" target="_blank" rel="noreferrer noopener" className="flex justify-center p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <Image src={Optimism} style={{ objectFit: "contain" }} height={50} width={80} alt="Optimism" unoptimized />
          </a>
          <a href="https://thegraph.com/" target="_blank" rel="noreferrer noopener" className="flex justify-center p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer col-span-2 sm:col-span-1">
            <Image src={TheGraph} style={{ objectFit: "contain" }} height={50} width={80} alt="The Graph" unoptimized />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />

      <FirstFold />

      <ThirdFold />

      <SecondFold />

      <FourthFold />

      <FifthFold />

      <Footer />
    </div>
  );
}
