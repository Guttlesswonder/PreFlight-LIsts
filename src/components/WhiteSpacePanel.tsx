import type { WhiteSpaceCard } from '../types';

export const WhiteSpacePanel = ({ cards }: { cards: WhiteSpaceCard[] }) => (
  <div className="space-y-2">
    {cards.length === 0 ? (
      <p className="text-xs text-slate-500">No white space opportunities detected.</p>
    ) : (
      cards.map((card) => (
        <div key={card.id} className="rounded border border-slate-200 bg-white p-3 text-xs">
          <p className="font-semibold">{card.title}</p>
          <p>
            {card.lens} · {card.signal}
          </p>
          <p className="text-slate-600">{card.motion}</p>
        </div>
      ))
    )}
  </div>
);
