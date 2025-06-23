import self from "@/utils/self";
import Image from "next/image";
import { ReactElement } from "react";

const baseUrl = self

const getImage = (name: string, dir: "fellows" | "projects" = "fellows") => {
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
    name: 'Coinvise',
    fellowName: 'Jenil Thakker',
    description: 'Claim onchain rewards. A portal to the world of web3.',
    tag1: 'Tokens',
    tag2: null,
    url: 'https://www.coinvise.co/',
    projectImage: getImage("coinvise.jpeg", "projects"),
  },
  {
    name: 'Toucan',
    fellowName: 'Raphael Haupt, James Farrell',
    description: 'Digital rails for climate finance.',
    tag1: 'Climate Finance',
    tag2: null,
    url: 'https://toucan.earth/',
    projectImage: getImage("toucan.jpeg", "projects"),
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
  {
    name: "Tao Fei",
    position: "Cultural Worker, 221A",
    tag1: "builder",
    tag2: "creative",
    image: getImage('tao-fei.jpeg'),
    url: "https://221a.ca/contributors/tao-fei/",
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
  {
    name: "Stella Dennig",
    position: "Creator, Daytrip",
    tag1: "builder",
    tag2: "creative",
    image: getImage('stella.jpeg'),
    url: "https://www.instagram.com/this.is.daytrip",
    block: 5
  },
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
    position: "Director of Product, OKX",
    tag1: "builder",
    tag2: "creative",
    image: getImage('ankit.jpeg'),
    url: "#",
    block: 8
  },
  {
    name: "Zain Bacchus",
    position: "Product Manager, Optimism",
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
    position: "President, Akiya Collective",
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
    url: "https://x.com/MaraSchmiedt",
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
    position: "Co-founder, Window Finance",
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
    position: "Sidetrack (my own startup)",
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
  {
    name: "Glenn Poppe",
    position: "Co-founder, Catalog",
    tag1: "builder",
    tag2: "creative",
    image: getImage('glenn.png'),
    url: "https://meem.wtf",
    block: 5
  },
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
    name: "Francesco Agostir",
    position: "Co-founder, Phantom",
    tag1: "builder",
    tag2: "creative",
    image: getImage('francesco.png'),
    url: "https://x.com/fragosti",
    block: 2
  },
  {
    name: "Jenil Thakker",
    position: "Creator, Coinvise",
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
  }
]
