import Image from "next/image";
import { ReactElement } from "react";

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://www.kernel.community';
};

const getImage = (name: string, dir: "fellows" | "projects" = "fellows") => {
  const baseUrl = getBaseUrl();
  return (
    <Image src={`${baseUrl}/${dir}/${name}`} alt="fellow image" style={{ objectFit: "contain", objectPosition: "center" }} unoptimized fill className="rounded-lg"></Image>
  )
}

export type Fellow = {
  name: string,
  position: string,
  tag1: string,
  tag2: string | undefined | null,
  image: ReactElement,
  url: string | undefined | null,
  block?: number
}

export type Project = {
  name: string,
  fellowName: string,
  fellowImage?: ReactElement,
  projectImage: ReactElement,
  description: string,
  tag1: string,
  tag2: string | undefined | null,
  url: string
}

export const projects: Array<Project> = [
  {
    name: 'Commit',
    fellowName: 'Rev Miller',
    description: 'Programmable accountability.',
    tag1: 'social',
    tag2: null,
    url: 'https://www.commit.wtf/',
    projectImage: getImage("commit.svg", "projects"),
  },
    {
    name: 'Plastic Labs',
    fellowName: 'Vince Trost & Courtland Leer',
    description: 'A research-driven company building at the intersection of human and machine cognition.',
    tag1: 'ai',
    tag2: '',
    url: 'https://plasticlabs.ai/',
    projectImage: getImage("plastic.png", "projects"),
  },
  {
    name: 'Coinshift',
    fellowName: 'Tarun Gupta',
    description: 'Beyond a wallet: simpler, safer, and more rewarding.',
    tag1: 'Wallets',
    tag2: null,
    url: 'https://coinshift.xyz/',
    projectImage: getImage("coinshift.png", "projects"),
  },
  {
    name: 'Sherlock',
    fellowName: 'Jack Sanford',
    description: 'The final exam audit before mainnet.',
    tag1: 'Security',
    tag2: null,
    url: 'https://sherlock.xyz/',
    projectImage: getImage("sherlock.jpeg", "projects"),
  },
  {
    name: 'Toucan',
    fellowName: 'Raphael Haupt, James Farrell',
    description: 'Digital rails for climate finance.',
    tag1: 'Climate Finance',
    tag2: null,
    url: 'https://toucan.earth/',
    projectImage: getImage("toucan.svg", "projects"),
  },

  {
    name: 'LiFi',
    fellowName: 'Philipp Zentner',
    description: 'One API to swap, bridge, and zap across all major blockchains and protocols.',
    tag1: 'Interoperability',
    tag2: 'Exchanges',
    url: 'https://li.fi/',
    projectImage: getImage("lifi.png", "projects"),
  },
  {
    name: 'Jokerace',
    fellowName: 'David Phelps, Sean McCaffery',
    description: 'Contests for communities to run, grow, and monetize.',
    tag1: 'Contests',
    tag2: null,
    url: 'https://www.jokerace.io/',
    projectImage: getImage("jokerace.jpeg", "projects"),
  },
  {
    name: 'Chaos Labs',
    fellowName: 'Omer Goldberg',
    description: 'Transforms data on risk, security, and incentive strategies into powerful tools to evolve decentralized finance.',
    tag1: 'Security',
    tag2: 'DeFi',
    url: 'https://chaoslabs.xyz/',
    projectImage: getImage("chaos.jpeg", "projects"),
  },
  {
    name: 'Future Primitive',
    fellowName: 'Benny Giang',
    description: 'Net new human relationships by designing and building networks, objects, and narratives.',
    tag1: 'Token Primitives',
    tag2: null,
    url: 'https://futureprimitive.xyz/',
    projectImage: getImage("fp.jpeg", "projects"),
  },
  {
    name: 'dLogos',
    fellowName: 'Anonymous',
    description: 'Participate in the world\'s most valuable conversations.',
    tag1: 'Dialogues',
    tag2: 'Markets',
    url: 'https://www.dlogos.xyz/',
    projectImage: getImage("dlogos.jpeg", "projects"),
  },
]

export const fellows: Array<Fellow> = [
  // {
  //   name: "Tao Fei",
  //   position: "Cultural Worker, 221A",
  //   tag1: "builder",
  //   tag2: "creative",
  //   image: getImage('tao-fei.jpeg'),
  //   url: "https://221a.ca/contributors/tao-fei/",
  //   block: 5
  // },
  {
    // Liz Kukka, Co-founder & CEO, Lane3
    name: "Liz Kukka",
    position: "Co-founder & CEO, Lane3",
    tag1: "builder",
    tag2: "creative",
    image: getImage('liz.jpg'),
    url: "https://www.linkedin.com/in/elizabethkukka/",
    block: 5
  },
  {
    // Julia Wu, Co-founder, Spark AI
    name: "Julia Wu",
    position: "Co-founder, Spark AI",
    tag1: "builder",
    tag2: "creative",
    image: getImage('julia-wu.jpg'),
    url: "https://x.com/thejuliawu",
    block: 5
  },
  {
    name: "John Hoopes",
    position: "Founder, Astral Protocol",
    tag1: "builder",
    tag2: "creative",
    image: getImage('john2.jpg'),
    url: "https://x.com/johnx25bd",
    block: 5
  },
  {
    name: "Alanah Lam",
    position: "Lead Designer, Future Primitive",
    tag1: "builder",
    tag2: "creative",
    image: getImage('alanah.jpeg'),
    url: "https://www.alanahlam.com/",
    block: 5
  },
  {
    name: "Benny Giang",
    position: "Co-founder, Future Primitive",
    tag1: "builder",
    tag2: "creative",
    image: getImage('benny.jpg'),
    url: "https://x.com/bennygiang",
    block: 5
  },
  {
    name: "Sophia Rokhlin",
    position: "Community, Ma Earth",
    tag1: "builder",
    tag2: "creative",
    image: getImage('Sophia.jpg'),
    url: "https://x.com/SophiaRokhlin",
    block: 5
  },
  {
    name: "Akasha Stallworth",
    position: "Founder, Concordance",
    tag1: "builder",
    tag2: "creative",
    image: getImage('akasha.jpg'),
    url: "https://www.linkedin.com/in/akasha-stallworth-75a458160/",
    block: 5
  },
  {
    name: "Marvin Janssen",
    position: "Founder & CTO, Ryder",
    tag1: "builder",
    tag2: "creative",
    image: getImage('marvin.jpg'),
    url: "https://x.com/MarvinJanssen",
    block: 5
  },
  {
    name: "Henry Zhu",
    position: "Hope in Source",
    tag1: "builder",
    tag2: "creative",
    image: getImage('henryzoo.jpg'),
    url: "https://henryzoo.com/",
    block: 5
  },
  {
    name: "Jess Sun",
    position: "Founder, Mouthpiece",
    tag1: "builder",
    tag2: "creative",
    image: getImage('jess-sun.jpeg'),
    url: "https://jess-sun.com",
    block: 7
  },
  {
    name: "Joan Bødker Pedersen",
    position: "Independent, The Matrix",
    tag1: "builder",
    tag2: "creative",
    image: getImage('joan.jpeg'),
    url: "https://www.linkedin.com/in/joanbp/",
    block: 7
  },
  {
    name: "Shawn Dimantha",
    position: "Product at Google / YouTube",
    tag1: "builder",
    tag2: "creative",
    image: getImage('shawn.png'),
    url: "https://www.shawndimantha.com/",
    block: 5
  },
  // {
  //   name: "Stella Dennig",
  //   position: "Creator, Daytrip",
  //   tag1: "builder",
  //   tag2: "creative",
  //   image: getImage('stella.jpeg'),
  //   url: "https://www.instagram.com/this.is.daytrip",
  //   block: 5
  // },
  {
    name: "Yatú Peláez-Espinsoa",
    position: "Founder, USB Club",
    tag1: "builder",
    tag2: "creative",
    image: getImage('yatu.jpeg'),
    url: "https://yatu.xyz/",
    block: 5
  },
  {
    name: "Mark Redito",
    position: "M𝘰𝘷𝘦 𝘲𝘶𝘪𝘦𝘵𝘭𝘺 𝘢𝘯𝘥 𝘱𝘭𝘢𝘯𝘵 𝘵𝘩𝘪𝘯𝘨𝘴",
    tag1: "builder",
    tag2: "creative",
    image: getImage('mark-redito.jpeg'),
    url: "https://linktr.ee/markredito",
    block: 5
  },
  {
    name: "Rebecca Mqamelo",
    position: "Architecture, Yale",
    tag1: "builder",
    tag2: "creative",
    image: getImage('rebecca.jpeg'),
    url: "https://x.com/0xthembi",
    block: 2
  },
  {
    name: "Niran Babalola",
    position: "Engineering, Base",
    tag1: "builder",
    tag2: "creative",
    image: getImage('niran.png'),
    url: "https://x.com/0xthembi",
    block: 1
  },
  {
    name: "Davide Crapis",
    position: "Co-founder, PIN AI",
    tag1: "builder",
    tag2: "creative",
    image: getImage('david.png'),
    url: "https://x.com/DavideCrapis",
    block: 1
  },
  {
    name: "MacEagon Voyce",
    position: "Co-founder, Grey Matter",
    tag1: "builder",
    tag2: "creative",
    image: getImage('maceagon.jpeg'),
    url: "https://www.maceagonvoyce.com/",
    block: 7
  },
  {
    name: "Haitham Mengad",
    position: "Co-founder, Stems",
    tag1: "builder",
    tag2: "creative",
    image: getImage('haitham.jpeg'),
    url: "https://x.com/haithamengad",
    block: 5
  },
  {
    name: "Ankit",
    position: "Founder, dLogos",
    tag1: "builder",
    tag2: "creative",
    image: getImage('ankit.jpeg'),
    url: "#",
    block: 8
  },
  {
    name: "Zain Bacchus",
    position: "Lead Product Manager, Helius",
    tag1: "builder",
    tag2: "creative",
    image: getImage('zain.png'),
    url: "https://www.linkedin.com/in/zainbacchus/",
    block: 5
  },
  {
    name: "Holly Grimm",
    position: "Navajo Artist & Software Engineer",
    tag1: "builder",
    tag2: "creative",
    image: getImage('holly.png'),
    url: "https://hollygrimm.com/",
    block: 2
  },
  {
    name: "Michelle Huang",
    position: "Founder, Akiya Collective",
    tag1: "builder",
    tag2: "creative",
    image: getImage('michelle.jpeg'),
    url: "https://michellekhuang.com/current-quests/",
    block: 5
  },
  {
    name: "Mara Schmiedt",
    position: "CEO, Alluvial Finance",
    tag1: "builder",
    tag2: "creative",
    image: getImage('mara.png'),
    url: "https://x.com/maraschmiedt?lang=en",
    block: 1
  },
  {
    name: "Devin Walsh",
    position: "Executive Director, Uniswap Foundation",
    tag1: "builder",
    tag2: "creative",
    image: getImage('devin.png'),
    url: "https://x.com/devinawalsh",
    block: 2
  },
  {
    name: "Greg Bateman",
    position: "Partner, Inflection Point",
    tag1: "builder",
    tag2: "creative",
    image: getImage('greg.png'),
    url: "https://www.linkedin.com/in/gbateman/",
    block: 4
  },
  {
    name: "Paul Gadi",
    position: "Co-Founder, OP Games",
    tag1: "builder",
    tag2: "creative",
    image: getImage('paul.png'),
    url: "https://x.com/polats",
    block: 1
  },
  {
    name: "Apurva Chitnis",
    position: "CTO, Koodos",
    tag1: "builder",
    tag2: "creative",
    image: getImage('apurva.jpeg'),
    url: "https://apuchitnis.github.io/",
    block: 5
  },
  {
    name: "Mariale Montenegro",
    position: "Co-Founder, Mentaport",
    tag1: "builder",
    tag2: "creative",
    image: getImage('mariale.jpeg'),
    url: "http://thinkmariale.com/",
    block: 5
  },
  {
    name: "Nikhil Raghuveera",
    position: "Co-founder, Predicate",
    tag1: "builder",
    tag2: "creative",
    image: getImage('nikhil.jpeg'),
    url: "https://www.atlanticcouncil.org/expert/nikhil-raghuveera/",
    block: 5
  },
  // {
  //   name: "Glenn Poppe",
  //   position: "Co-founder, Catalog",
  //   tag1: "builder",
  //   tag2: "creative",
  //   image: getImage('glenn.png'),
  //   url: "https://meem.wtf",
  //   block: 5
  // },
  {
    name: "Amelie Lasker",
    position: "Co-founder, Alexandria Labs",
    tag1: "builder",
    tag2: "creative",
    image: getImage('amelie.jpeg'),
    url: "https://alexandrialabs.xyz",
    block: 5
  },
  {
    name: "Francesco Agosti",
    position: "Co-founder, Phantom",
    tag1: "builder",
    tag2: "creative",
    image: getImage('francesco.png'),
    url: "https://x.com/fragosti",
    block: 2
  },
  {
    name: "Jenil Thakker",
    position: "CEO, EarnKit",
    tag1: "builder",
    tag2: "creative",
    image: getImage('jenil.jpeg'),
    url: "https://x.com/0xjenil",
    block: 2
  },
  {
    name: "Ben Lakoff",
    position: "GP, Bankless Ventures",
    tag1: "builder",
    tag2: "creative",
    image: getImage('ben.jpeg'),
    url: "https://x.com/benlakoff",
    block: 1
  },
]

// Component for rendering a single Fellow
const FellowCard = ({ fellow }: { fellow: Fellow }) => {
  return (
    <a className="flex flex-col gap-2 h-[221px] w-[112px] flex-shrink-0" href={fellow.url ?? ""} target="_blank" rel="noopener noreferrer">
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
      </div>
    </a>
  )
}

// Component for rendering all Fellows
export const Fellows = () => {
  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-hidden -mx-6 px-6">
      <div className="grid grid-rows-2 grid-flow-col gap-6 sm:gap-16 min-w-max">
        {fellows.map((fellow, key) => (
          <FellowCard fellow={fellow} key={key} />
        ))}
      </div>
    </div>
  )
}

// Component for rendering a single Project
const ProjectCard = ({ project }: { project: Project }) => {
  const Tag = ({ text }: { text: string }) => {
    return (
      <div className="inline-flex gap-3">
        <div className="border-[1px] border-slate-400 rounded-lg text-xs p-[2px]">
          {text}
        </div>
      </div>
    )
  }

  return (
    <a className="h-[250px] w-[250px] sm:h-[320px] sm:w-[320px] border-[1px] border-slate-200 flex flex-col rounded-lg flex-shrink-0 cursor-pointer" href={project.url} target="_blank" rel="noopener noreferrer">
      <div className="relative min-h-[40%]">
        {project.projectImage}
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

// Component for rendering all Projects
export const Projects = () => {
  return (
    <div className="w-full max-w-full overflow-x-auto overflow-y-hidden -mx-6 px-6">
      <div className="flex flex-row gap-6 min-w-max">
        {projects.map((proj, key) => (
          <ProjectCard project={proj} key={key} />
        ))}
      </div>
    </div>
  )
}
