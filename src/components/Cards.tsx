"use client"
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Module = {
  title: string;
  link: string;
  personal: [string, string];
  web3: [string, string];
  extended: [string, string][];
};

const modules: Module[] = [
  {
    title: '🌠 Introduction to Kernel',
    link: 'https://read.kernel.community/en/learn/module-0',
    personal: ['🌈 Play of Pattern', 'https://read.kernel.community/en/learn/module-0/play-of-pattern'] as const,
    web3: ['✍️ Trust', 'https://read.kernel.community/en/learn/module-0/trust'] as const,
    extended: [
      ['Money Talks', 'https://read.kernel.community/en/learn/module-0/money-language'],
      ['In Weird Ways', 'https://read.kernel.community/en/learn/module-0/weird-ways'],
      ['Try Listening', 'https://read.kernel.community/en/learn/module-0/conversation'],
      ['With Love', 'https://read.kernel.community/en/learn/module-0/purpose'],
    ],
  },
  {
    title: "🌍 Ethereum's History and State",
    link: 'https://read.kernel.community/en/learn/module-1',
    personal: ['🤯 Meaning', 'https://read.kernel.community/en/learn/module-1/meaning'] as const,
    web3: ['💯 Value', 'https://read.kernel.community/en/learn/module-1/value'] as const,
    extended: [
      ['Shaping', 'https://read.kernel.community/en/learn/module-1/playdough-protocols'],
      ["Ethereum's", 'https://read.kernel.community/en/learn/module-1/understanding-ethereum'],
      ['Dreamers Of', 'https://read.kernel.community/en/learn/module-1/dreamers'],
      ['Joyful Subversion', 'https://read.kernel.community/en/learn/module-1/joyful-subversion'],
    ],
  },
  {
    title: '💰 A Global Financial System',
    link: 'https://read.kernel.community/en/learn/module-2',
    personal: ['⁉️ Better Questions', 'https://read.kernel.community/en/learn/module-2/better-questions'] as const,
    web3: ['💸 Money and Speech', 'https://read.kernel.community/en/learn/module-2/money-speech'] as const,
    extended: [
      ['Collecting', 'https://read.kernel.community/en/learn/module-2/shelling-out'],
      ['Debt', 'https://read.kernel.community/en/learn/module-2/debt'],
      ['In Pyramids?', 'https://read.kernel.community/en/learn/module-2/banking'],
      ['Engineer Better Solutions!', 'https://read.kernel.community/en/learn/module-2/engineering'],
    ],
  },
  {
    title: '🌐 Take Back The Web',
    link: 'https://read.kernel.community/en/learn/module-3',
    personal: ['🔍 Intention', 'https://read.kernel.community/en/learn/module-3/intention'] as const,
    web3: ['🦄 Freedom', 'https://read.kernel.community/en/learn/module-3/freedom'] as const,
    extended: [
      ['Remember', 'https://read.kernel.community/en/learn/module-3/remember'],
      ['The Present Time.', 'https://read.kernel.community/en/learn/module-3/time'],
      ['Lock It Open', 'https://read.kernel.community/en/learn/module-3/lock-it-open'],
      ['With Humility', 'https://read.kernel.community/en/learn/module-3/humility'],
    ],
  },
  {
    title: 'ℹ️ Internet Age Institutions',
    link: 'https://read.kernel.community/en/learn/module-4',
    personal: ['👑 Govern Yourself', 'https://read.kernel.community/en/learn/module-4/governance'] as const,
    web3: ['➕ Radically', 'https://read.kernel.community/en/learn/module-4/liberal-radical'] as const,
    extended: [
      ['Transform', 'https://read.kernel.community/en/learn/module-4/art'],
      ['Consensus', 'https://read.kernel.community/en/learn/module-4/consensus'],
      ['By Inventing', 'https://read.kernel.community/en/learn/module-4/self-enquiry'],
      ['Paradise', 'https://read.kernel.community/en/learn/module-4/the-garden'],
    ],
  },
  {
    title: '📈 Tokens and Mechanism Design',
    link: 'https://read.kernel.community/en/learn/module-5',
    personal: ['👂 Listening and Stories', 'https://read.kernel.community/en/learn/module-5/listening-stories'] as const,
    web3: ['👨‍👩‍👧‍👦 Incentives', 'https://read.kernel.community/en/learn/module-5/incentives'] as const,
    extended: [
      ['Unbounded Search', 'https://read.kernel.community/en/learn/module-5/amazon-unbounded-search'],
      ['Through Narrative', 'https://read.kernel.community/en/learn/module-5/the-peoples-narrative'],
      ['Reveals Universes', 'https://read.kernel.community/en/learn/module-5/reveal-the-universe'],
      ['Of Prosocial Value', 'https://read.kernel.community/en/learn/module-5/prosocial-value'],
    ],
  },
  {
    title: '⚖️ Scaling Principled Games',
    link: 'https://read.kernel.community/en/learn/module-6',
    personal: ['🎓 Learn How To Learn', 'https://read.kernel.community/en/learn/module-6/learn'] as const,
    web3: ['👮 Censorship Resistance', 'https://read.kernel.community/en/learn/module-6/censorship-resistance'] as const,
    extended: [
      ['Serenely', 'https://read.kernel.community/en/learn/module-6/serenity'],
      ['Participate In', 'https://read.kernel.community/en/learn/module-6/participate'],
      ['Principled', 'https://read.kernel.community/en/learn/module-6/inventing-on-principle'],
      ['Deep Song', 'https://read.kernel.community/en/learn/module-6/duende'],
    ],
  },
  {
    title: '🎁 The Gift',
    link: 'https://read.kernel.community/en/learn/module-7',
    personal: ['💝 Giving', 'https://read.kernel.community/en/learn/module-7/giving'] as const,
    web3: ['🏊 Scale-ability', 'https://read.kernel.community/en/learn/module-7/scale-ability'] as const,
    extended: [
      ['The Gift', 'https://read.kernel.community/en/learn/module-7/the-gift'],
      ['Of No Paradigm', 'https://read.kernel.community/en/learn/module-7/no-paradigm'],
      ['Is Perfection', 'https://read.kernel.community/en/learn/module-7/perfection'],
    ],
  },
];

function FlipCard({ module }: { module: Module }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-card w-full">
      <div className={`flip-card-inner relative ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-front bg-white rounded-md shadow-xl border-gray-200/50 border-2">
          <button
            onClick={() => setFlipped(true)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <div className="text-center font-black text-2xl sm:text-3xl p-8 border-b-2 border-gray-200 h-[175px]">
            <a href={module.link} className="font-bold">
              {module.title}
            </a>
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-200 h-[170px]">
            <div className="py-8 px-4 text-center">
              <div className="text-sm mb-6">Personal Inquiry</div>
              <a href={module.personal[1]} className="font-semibold text-base sm:text-sm">
                {module.personal[0]}
              </a>
            </div>
            <div className="py-8 px-4 text-center">
              <div className="text-sm mb-6">Web3 Inquiry</div>
              <a href={module.web3[1]} className="font-semibold text-base sm:text-sm">
                {module.web3[0]}
              </a>
            </div>
          </div>
        </div>

        <div className="flip-card-back bg-gray-100 rounded-md shadow-xl border-gray-200/50 border-2 p-4">
          <button
            onClick={() => setFlipped(false)}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <div className="text-center font-black text-xl sm:text-2xl mb-4">Extended Reading</div>
          <ul className="list-disc list-inside">
            {module.extended.map(([title, url]: [string, string]) => (
              <li key={url} className="my-2">
                <a href={url} className="text-blue-500 underline">{title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function FlipCardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mx-auto w-full sm:w-3/4">
      {modules.map((m, idx) => (
        <FlipCard key={idx} module={m} />
      ))}
    </div>
  );
}