export type LessonBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | {
      type: "formula";
      label: string;
      expression: string;
      worked?: string;
      terms?: { symbol: string; meaning: string }[];
    };

export type QuizQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  minutes: number;
  blocks: LessonBlock[];
  quiz: QuizQuestion[];
};

export type Module = {
  id: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
};

export const curriculum: Module[] = [
  {
    id: "pre-school",
    title: "Pre-School",
    subtitle: "Foundations & market anatomy",
    lessons: [
      {
        id: "what-is-forex",
        title: "What Is the Forex Market?",
        summary:
          "The largest market on earth trades relationships, not products. Here is how those relationships are priced.",
        minutes: 6,
        blocks: [
          {
            type: "p",
            text: "Foreign exchange is the simultaneous purchase of one currency and the sale of another. You never buy a currency in isolation — you always trade a pair, expressing an opinion about one economy relative to another.",
          },
          {
            type: "p",
            text: "Roughly 7.5 trillion dollars change hands every trading day, spread across banks, funds, corporates and retail traders. That depth is why the market runs 24 hours from the Sydney open on Monday to the New York close on Friday.",
          },
          { type: "h2", text: "How a quote is built" },
          {
            type: "p",
            text: "In EUR/USD, the euro is the base currency and the dollar is the quote currency. A price of 1.0842 means one euro costs 1.0842 dollars. Buy the pair and you are long euros, short dollars — always both at once.",
          },
          {
            type: "list",
            items: [
              "Majors — pairs containing USD, the deepest liquidity and tightest spreads.",
              "Crosses — pairs with no USD leg, such as EUR/GBP or AUD/JPY.",
              "Exotics — a major against a smaller economy, wider spreads and sharper moves.",
            ],
          },
          {
            type: "callout",
            title: "Remember",
            text: "Every forex position is a relative bet. A currency can strengthen against one counterpart while weakening against another on the same day.",
          },
          {
            type: "formula",
            label: "Quote conversion",
            expression: "Cost in quote currency = Units of base × Exchange rate",
            worked: "10,000 EUR × 1.0842 = 10,842 USD",
            terms: [
              { symbol: "Base", meaning: "First currency in the pair" },
              { symbol: "Quote", meaning: "Second currency, the price unit" },
            ],
          },
        ],
        quiz: [
          {
            question: "In the pair GBP/JPY, which currency is the base?",
            options: ["JPY", "GBP", "Both", "Neither — crosses have no base"],
            answer: 1,
            explanation:
              "The first currency listed in a forex pair is always the base currency, while the second is the quote currency.",
          },
          {
            question: "Buying EUR/USD means you are:",
            options: [
              "Long euros and long dollars",
              "Short euros and long dollars",
              "Long euros and short dollars",
              "Neutral on both",
            ],
            answer: 2,
            explanation: "Buying a pair is long the base and short the quote currency.",
          },
        ],
      },
      {
        id: "pips-and-pipettes",
        title: "Pips, Pipettes & Pip Value",
        summary:
          "Before you can size a trade you must know exactly what one digit of the price is worth in your account currency.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "A pip is the smallest standard increment of a currency pair — the fourth decimal for most majors, the second decimal for yen pairs. A pipette is the fractional fifth digit brokers add for finer pricing.",
          },
          {
            type: "p",
            text: "Pip value is not fixed. It scales with position size and with the currency your account is denominated in, which is why the same ten-pip move can be trivial on a micro lot and material on a standard lot.",
          },
          {
            type: "formula",
            label: "Pip value",
            expression: "Pip value = (Pip size ÷ Exchange rate) × Lot size",
            worked: "(0.0001 ÷ 1.0842) × 100,000 = 9.22 USD per pip",
            terms: [
              { symbol: "Pip size", meaning: "0.0001, or 0.01 for JPY pairs" },
              { symbol: "Lot size", meaning: "100,000 units for a standard lot" },
            ],
          },
          { type: "h2", text: "Lot sizes at a glance" },
          {
            type: "list",
            items: [
              "Standard lot — 100,000 units, roughly 10 USD per pip.",
              "Mini lot — 10,000 units, roughly 1 USD per pip.",
              "Micro lot — 1,000 units, roughly 0.10 USD per pip.",
            ],
          },
          {
            type: "callout",
            title: "Rule of thumb",
            text: "For a USD-denominated account trading a pair quoted in USD, a standard lot is worth about 10 USD per pip. Use it as a sanity check, never as a substitute for the calculation.",
          },
        ],
        quiz: [
          {
            question: "A standard lot of EUR/USD moves 15 pips in your favour. Your gain is roughly:",
            options: ["$15.00", "$150.00", "$1,500.00", "$1.50"],
            answer: 1,
            explanation: "15 pips × ~10 USD per pip on a standard lot ≈ 150 USD.",
          },
          {
            question: "For USD/JPY, one pip is which decimal place?",
            options: ["First", "Second", "Fourth", "Fifth"],
            answer: 1,
            explanation: "Yen pairs are quoted to two decimals, so a pip is 0.01.",
          },
        ],
      },
      {
        id: "brokers-spreads-orders",
        title: "Brokers, Spreads & Order Types",
        summary:
          "Your broker is your gateway to the market. Know what you pay them and how your orders actually execute.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "A broker quotes you two prices: the bid, where you can sell, and the ask, where you can buy. The gap between them is the spread — the first cost every trade must overcome before it can profit.",
          },
          {
            type: "formula",
            label: "Spread cost",
            expression: "Spread cost = Spread in pips × Pip value × Lots",
            worked: "1.2 pips × $10 × 0.5 lots = $6.00 per trade",
            terms: [
              { symbol: "Bid", meaning: "Price at which you sell" },
              { symbol: "Ask", meaning: "Price at which you buy" },
            ],
          },
          { type: "h2", text: "The orders you will actually use" },
          {
            type: "list",
            items: [
              "Market order — fills immediately at the best available price.",
              "Limit order — fills only at your price or better; used for planned entries.",
              "Stop order — triggers once price trades through a level; the basis of every stop-loss.",
              "Stop-loss — a protective stop order that caps the damage of a wrong idea.",
            ],
          },
          {
            type: "callout",
            title: "Cost awareness",
            text: "A two-pip spread on a ten-pip target means the market must move twenty percent further in your favour just for you to break even. Scalpers live and die by this number.",
          },
        ],
        quiz: [
          {
            question: "The spread is the difference between:",
            options: [
              "Two currency pairs",
              "The bid and the ask",
              "Entry and stop-loss",
              "Two brokers' leverage",
            ],
            answer: 1,
            explanation: "The spread is the gap between the bid (sell) and ask (buy) prices.",
          },
          {
            question: "Which order caps your loss on an open position?",
            options: ["Market order", "Limit order", "Stop-loss", "Trailing take-profit"],
            answer: 2,
            explanation: "A stop-loss is a protective stop order that closes the trade at a predefined loss.",
          },
        ],
      },
      {
        id: "trading-sessions",
        title: "Trading Sessions & Market Hours",
        summary:
          "The market never sleeps, but liquidity does. Trade when the volume is there to carry your position.",
        minutes: 6,
        blocks: [
          {
            type: "p",
            text: "The forex day rolls through four major sessions: Sydney, Tokyo, London and New York. Each has its own character — Asia tends to be quiet and range-bound, while London brings the deepest liquidity of the day.",
          },
          {
            type: "p",
            text: "The most tradable window is the London–New York overlap, roughly four hours where both centres are open. Spreads tighten, volume peaks, and the day's real trends are usually born here.",
          },
          {
            type: "list",
            items: [
              "Sydney / Tokyo — lower volatility; yen and aussie pairs most active.",
              "London — the largest session; euro and pound pairs come alive.",
              "New York — dollar pairs dominate; US data releases drive sharp moves.",
              "Overlaps — where two sessions run together and liquidity peaks.",
            ],
          },
          {
            type: "callout",
            title: "Match pair to session",
            text: "Trading AUD/JPY during New York hours means trading a pair whose home markets are asleep. Align your pairs with the sessions that move them.",
          },
        ],
        quiz: [
          {
            question: "The deepest liquidity of the day usually occurs during:",
            options: [
              "The Sydney open",
              "The London–New York overlap",
              "The Tokyo close",
              "Weekends",
            ],
            answer: 1,
            explanation: "Both major centres are open during the overlap, so volume and liquidity peak.",
          },
          {
            question: "Which session is typically the quietest for the majors?",
            options: ["London", "New York", "Sydney/Tokyo", "The overlap"],
            answer: 2,
            explanation: "Asian hours tend to be range-bound for EUR/USD and other dollar majors.",
          },
        ],
      },
      {
        id: "fundamental-analysis-news",
        title: "Fundamental Analysis & Economic News",
        summary:
          "Currencies are priced on economies. Learn which numbers move them and why the surprise matters more than the number.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "A currency strengthens when its economy attracts capital — higher interest rates, strong growth, political stability. Fundamental analysis is the study of those forces, and its heartbeat is the economic calendar.",
          },
          { type: "h2", text: "The releases that move markets" },
          {
            type: "list",
            items: [
              "Interest rate decisions — the single biggest driver of currency value.",
              "Inflation (CPI) — shapes where rates go next; hot inflation lifts the currency.",
              "Employment reports — US Non-Farm Payrolls is the most watched release on earth.",
              "GDP and retail sales — the broad health check of an economy.",
            ],
          },
          {
            type: "p",
            text: "Markets price in expectations weeks ahead. What moves price is the surprise — the gap between what was forecast and what was printed. A strong number that merely matches forecasts can see the currency fall as traders take profit.",
          },
          {
            type: "formula",
            label: "The surprise factor",
            expression: "Market reaction ∝ Actual − Forecast",
            worked: "CPI forecast 3.0%, actual 3.6% → positive surprise → currency rallies",
          },
          {
            type: "callout",
            title: "Stand aside or size down",
            text: "Spreads widen and slippage spikes in the seconds around major releases. Beginners should close or reduce positions before red-folder news, not gamble on the print.",
          },
        ],
        quiz: [
          {
            question: "What primarily moves a currency on a news release?",
            options: [
              "The absolute size of the number",
              "The gap between the actual figure and the forecast",
              "The time of day",
              "The currency's symbol",
            ],
            answer: 1,
            explanation: "Expectations are already priced in — the surprise is what reprices the market.",
          },
          {
            question: "Which release is typically the biggest market mover?",
            options: [
              "Trade balance",
              "Consumer confidence",
              "Interest rate decisions",
              "Housing starts",
            ],
            answer: 2,
            explanation: "Interest rates are the price of money itself, so rate decisions dominate currency valuation.",
          },
        ],
      },
      {
        id: "demo-trading-getting-started",
        title: "Demo Trading & Getting Started",
        summary:
          "Every professional once traded with fake money. Here is how to use a demo account properly — and when to leave it.",
        minutes: 6,
        blocks: [
          {
            type: "p",
            text: "A demo account is a full trading platform fed with live prices but funded with virtual money. It is where you learn the mechanics — placing orders, setting stops, reading the deal ticket — without paying tuition to the market.",
          },
          {
            type: "p",
            text: "Used well, demo trading is a rehearsal with rules. Used badly, it is a video game: oversized positions, no stops, and habits that will destroy a real account in weeks.",
          },
          { type: "h2", text: "Demo with discipline" },
          {
            type: "list",
            items: [
              "Trade the same size you could afford with real money — not a fictional million.",
              "Follow your written plan on every single trade, especially the boring ones.",
              "Journal every demo trade exactly as you would a live one.",
              "Set a graduation rule: e.g. 30 journal entries with positive expectancy before going live.",
            ],
          },
          {
            type: "callout",
            title: "The one thing demo cannot teach",
            text: "Demo trading carries no fear and no greed. When you go live, start with the smallest size your broker allows — you are paying to learn emotional control, not to get rich.",
          },
        ],
        quiz: [
          {
            question: "The healthiest way to use a demo account is to:",
            options: [
              "Trade huge size to learn faster",
              "Skip stops since the money is fake",
              "Trade exactly as you would with real money",
              "Only practise winning strategies",
            ],
            answer: 2,
            explanation: "Demo is a rehearsal — the habits you build there are the ones you take live.",
          },
          {
            question: "What can a demo account NOT teach you?",
            options: [
              "How to place orders",
              "How to set a stop-loss",
              "Emotional control under real risk",
              "How spreads work",
            ],
            answer: 2,
            explanation: "Fear and greed only appear when real money is at stake.",
          },
        ],
      },
      {
        id: "correlations-safe-havens",
        title: "Currency Correlations & Safe Havens",
        summary:
          "Pairs do not move independently. Knowing which currencies travel together stops you from doubling a bet you meant to place once.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "Correlation measures how two pairs move in relation to each other, from +1 (lockstep) to −1 (mirror image). EUR/USD and GBP/USD often correlate above +0.8 — buying both is not two trades, it is one trade twice the size.",
          },
          {
            type: "formula",
            label: "Effective exposure",
            expression: "Net risk = Position A + (Correlation × Position B)",
            worked: "1 lot EUR/USD + (0.8 × 1 lot GBP/USD) ≈ 1.8 lots of the same bet",
            terms: [
              { symbol: "+1", meaning: "Pairs move together perfectly" },
              { symbol: "−1", meaning: "Pairs move in perfect opposition" },
            ],
          },
          { type: "h2", text: "The safe-haven trio" },
          {
            type: "list",
            items: [
              "US dollar — the world's reserve currency; bid in every crisis.",
              "Japanese yen — strengthened by repatriation when markets panic.",
              "Swiss franc — the classic European bolt-hole in times of stress.",
            ],
          },
          {
            type: "p",
            text: "In risk-off episodes, capital flees growth-linked currencies like the aussie and kiwi into these havens. Watching USD/JPY fall fast is often the earliest tell that something in the wider market has gone wrong.",
          },
          {
            type: "callout",
            title: "Check before you stack",
            text: "Before opening a second position, ask what it correlates with. Three 'different' trades that are all secretly long the dollar is one trade with triple the risk.",
          },
        ],
        quiz: [
          {
            question: "EUR/USD and GBP/USD correlate at +0.8. Buying one lot of each is closest to:",
            options: [
              "Two independent trades",
              "One trade at roughly 1.8× size",
              "A hedged, risk-free position",
              "Half a trade",
            ],
            answer: 1,
            explanation: "High positive correlation means the positions largely overlap — the risk stacks.",
          },
          {
            question: "In a market panic, capital typically flows into:",
            options: [
              "AUD and NZD",
              "Emerging market currencies",
              "USD, JPY and CHF",
              "Exotic pairs",
            ],
            answer: 2,
            explanation: "The dollar, yen and franc are the classic safe havens in risk-off episodes.",
          },
        ],
      },
      {
        id: "account-types-choosing-broker",
        title: "Account Types & Choosing a Broker",
        summary:
          "The broker you choose is a business partner that takes the other side of your costs. Choose like it matters — because it does.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "Brokers broadly come in two flavours. Dealing-desk brokers may internalise your trades, while ECN-style brokers route orders to a liquidity pool and charge a commission on raw spreads. Neither is automatically better — the total cost per trade is what counts.",
          },
          {
            type: "formula",
            label: "True trading cost",
            expression: "Cost per lot = (Spread in pips × Pip value) + Commission",
            worked: "(0.2 × $10) + $7 = $9 vs a 1.2-pip zero-commission account at $12",
            terms: [
              { symbol: "Raw spread", meaning: "Near-zero spread plus commission" },
              { symbol: "Marked-up spread", meaning: "No commission, wider spread" },
            ],
          },
          { type: "h2", text: "The checklist that matters" },
          {
            type: "list",
            items: [
              "Regulation — a serious licence from a top-tier regulator is non-negotiable.",
              "Total cost — spread plus commission plus swap, not just the headline spread.",
              "Execution — how stops and orders fill during fast markets.",
              "Withdrawals — fast, reliable payouts matter more than any bonus.",
            ],
          },
          {
            type: "callout",
            title: "Bonuses are not value",
            text: "A deposit bonus with withdrawal restrictions is marketing, not money. Compare brokers on regulation, cost and execution — the things that still matter on your hundredth trade.",
          },
        ],
        quiz: [
          {
            question: "A raw-spread account charges 0.2 pips + $7 commission. A zero-commission account charges 1.2 pips. Per standard lot, which is cheaper?",
            options: [
              "The zero-commission account",
              "The raw-spread account",
              "They cost the same",
              "Impossible to say",
            ],
            answer: 1,
            explanation: "Raw: (0.2 × $10) + $7 = $9. Zero-commission: 1.2 × $10 = $12. Compare total cost, not headlines.",
          },
          {
            question: "The single most important broker criterion is:",
            options: ["Deposit bonuses", "Regulation by a top-tier authority", "Platform colours", "Leverage of 1000:1"],
            answer: 1,
            explanation: "Regulation determines whether your funds are protected and the broker can be held to account.",
          },
        ],
      },
      {
        id: "lot-sizes-trade-value",
        title: "Lot Sizes & Trade Value",
        summary:
          "Standard, mini, micro and nano lots — how the size you pick turns every pip into real money, and why lot size is the biggest single lever on your risk.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "A lot is simply a standardised bundle of currency. One standard lot equals 100,000 units of the base currency. Because forex prices move in tiny fractions, position size is measured in bundles — and each bundle size changes what a pip is worth to you.",
          },
          { type: "h2", text: "The lot ladder" },
          {
            type: "list",
            items: [
              "Standard lot = 100,000 units → typically $10 per pip on USD-quoted pairs.",
              "Mini lot = 10,000 units → about $1 per pip.",
              "Micro lot = 1,000 units → about $0.10 per pip — the natural starting size.",
              "Nano lot = 100 units → about $0.01 per pip, offered by only some brokers.",
            ],
          },
          {
            type: "formula",
            label: "Position size",
            expression: "Value of position = lots × 100,000 units of the base currency",
            worked: "0.4 lots of EUR/USD = €40,000 of exposure",
            terms: [
              { symbol: "Lots", meaning: "Number of standard bundles traded" },
              { symbol: "Base", meaning: "The first currency in the pair" },
            ],
          },
          {
            type: "p",
            text: "For pairs quoted to four decimal places where the USD is the quote currency — EUR/USD, GBP/USD, AUD/USD — a standard lot has a fixed pip value of $10. The pip value scales down with the lot: a mini lot is $1 per pip, a micro lot $0.10.",
          },
          {
            type: "formula",
            label: "Pip value",
            expression: "Pip value = pip size × units of base currency",
            worked: "1 pip on 0.10 lots of EUR/USD = 0.0001 × 10,000 = $1",
            terms: [
              { symbol: "Pip size", meaning: "0.0001 for most pairs, 0.01 for JPY pairs" },
              { symbol: "Units", meaning: "Position size in base-currency units" },
            ],
          },
          {
            type: "callout",
            title: "Size before strategy",
            text: "Beginners lose money through oversized positions far more often than through bad analysis. Choosing the lot size that makes each pip worth a small fraction of your account is the first risk decision you make — before the trade even starts.",
          },
        ],
        quiz: [
          {
            question: "One standard lot of EUR/USD moves 15 pips in your favour. At $10 per pip, what is the profit?",
            options: ["$15", "$150", "$1,500", "15% of the account"],
            answer: 1,
            explanation: "15 pips × $10 per pip = $150 on a standard lot.",
          },
          {
            question: "You have a $2,000 account and want each pip to be worth about $0.20. Which size fits?",
            options: ["One standard lot", "One mini lot", "Two micro lots", "Ten mini lots"],
            answer: 2,
            explanation: "A micro lot is $0.10 per pip, so two micro lots give $0.20 per pip — a sensible size for a small account.",
          },
        ],
      },
      {
        id: "common-beginner-mistakes",
        title: "Common Beginner Mistakes",
        summary:
          "The five errors that empty most new accounts — and the recovery maths that explains why avoiding one big loss matters more than finding another winning setup.",
        minutes: 6,
        blocks: [
          {
            type: "p",
            text: "Most new traders do not fail because they lack a winning strategy. They fail because of a handful of behavioural mistakes that any strategy would struggle to survive. Learn them now, and you skip the most expensive part of the education.",
          },
          { type: "h2", text: "The classic five" },
          {
            type: "list",
            items: [
              "Overleveraging — positions so large that one ordinary move wipes out the account.",
              "Trading without a stop loss — 'it will come back' is not a risk plan.",
              "Revenge trading — immediately re-entering after a loss, with bigger size and no setup.",
              "Trading too many pairs — no pair gets studied properly and correlated risk stacks up.",
              "Switching systems weekly — abandoning a method before it has enough trades to be judged.",
            ],
          },
          {
            type: "formula",
            label: "Recovery maths",
            expression: "Gain needed to recover = Drawdown / (1 − Drawdown)",
            worked: "A 50% loss needs a 100% gain just to get back to break-even",
            terms: [
              { symbol: "Drawdown", meaning: "Peak-to-valley loss as a decimal (0.5 = 50%)" },
              { symbol: "Recovery", meaning: "Gain required to return to the previous high" },
            ],
          },
          { type: "h2", text: "How to avoid them" },
          {
            type: "list",
            items: [
              "Fix risk per trade as a percentage (0.5–1%) and let the lot size follow from it.",
              "Attach the stop loss the moment the order is placed — never 'mentally'.",
              "After a loss, the rule is simple: no new trade until the original setup appears again.",
              "Master one or two pairs until their behaviour is familiar in trends, ranges and news.",
              "Give any system at least 50–100 trades of data before deciding it does not work.",
            ],
          },
          {
            type: "callout",
            title: "Blow-ups are mathematical",
            text: "Accounts do not usually die from many small losses — they die from one oversized, unrecovered one. Protecting the downside is the whole game.",
          },
        ],
        quiz: [
          {
            question: "After a 50% drawdown, what gain is required to return to break-even?",
            options: ["50%", "75%", "100%", "125%"],
            answer: 2,
            explanation: "0.5 / (1 − 0.5) = 1.0 — a 100% gain is needed to undo a 50% loss. Deep holes are brutally expensive to climb out of.",
          },
          {
            question: "The main danger of revenge trading is:",
            options: [
              "It increases broker commissions",
              "Oversized, unplanned entries that turn one loss into a string of them",
              "It only works on Mondays",
              "It reduces the spread you pay",
            ],
            answer: 1,
            explanation: "Revenge trades have no setup and outsized size — they are the most common way a normal loss becomes an account-ender.",
          },
        ],
      },
    ],
  },
  {
    id: "elementary-school",
    title: "Elementary School",
    subtitle: "Charts, structure & position sizing",
    lessons: [
      {
        id: "position-sizing",
        title: "Position Sizing & Risk Per Trade",
        summary:
          "Decide the size first from your risk budget, then let the stop distance be the input — never the outcome.",
        minutes: 9,
        blocks: [
          {
            type: "p",
            text: "A position is only as good as the size behind it. Sizing converts a fixed risk figure into a concrete number of units, so that a loss stays a loss regardless of how volatile the market becomes.",
          },
          {
            type: "p",
            text: "Start from the capital you are willing to lose on a single idea. Disciplined desks cap that at one to two percent of equity, then let the stop distance decide how much of the market they can hold.",
          },
          {
            type: "formula",
            label: "Position size",
            expression: "Lots = Risk amount ÷ (Stop in pips × Pip value per lot)",
            worked: "$100 ÷ (20 pips × $10) = 0.50 lots",
            terms: [
              { symbol: "Risk amount", meaning: "1–2% of account equity" },
              { symbol: "Stop in pips", meaning: "Distance from entry to invalidation" },
            ],
          },
          { type: "h2", text: "Reward against risk" },
          {
            type: "p",
            text: "Sizing only pays if the payoff justifies the exposure. Expressed as a ratio, the distance to target divided by the distance to stop tells you how often you need to be right to stay profitable.",
          },
          {
            type: "formula",
            label: "Risk-reward ratio",
            expression: "R:R = (Target − Entry) ÷ (Entry − Stop)",
            worked: "(1.0920 − 1.0860) ÷ (1.0860 − 1.0840) = 3.0",
          },
          {
            type: "callout",
            title: "Discipline note",
            text: "Widening a stop after entry to avoid being taken out silently doubles your risk. Adjust size before the trade, never the stop during it.",
          },
        ],
        quiz: [
          {
            question:
              "Your risk budget is $200 and your stop is 40 pips on a pair worth $10 per pip per lot. What size do you trade?",
            options: ["0.25 lots", "0.50 lots", "1.00 lot", "2.00 lots"],
            answer: 1,
            explanation: "200 ÷ (40 × 10) = 0.50 lots.",
          },
          {
            question: "A trade risks 20 pips to make 60 pips. The risk-reward ratio is:",
            options: ["1:2", "1:3", "3:1 against you", "1:1"],
            answer: 1,
            explanation: "60 ÷ 20 = 3, so you risk one unit to make three.",
          },
        ],
      },
      {
        id: "support-resistance",
        title: "Support, Resistance & Market Structure",
        summary:
          "Price has memory. Structure tells you where that memory is dense enough to matter.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "Support is a zone where buying pressure has repeatedly absorbed selling; resistance is its mirror. They are areas, not lines — drawn from the body of price action rather than a single wick.",
          },
          {
            type: "p",
            text: "Structure is the sequence those zones create. Higher highs and higher lows describe an uptrend; the trend is intact until a prior swing low breaks and the sequence inverts.",
          },
          {
            type: "list",
            items: [
              "Mark zones on the higher timeframe first, then refine on the lower.",
              "The more times a level is tested without breaking, the thinner the remaining liquidity behind it.",
              "Broken resistance often becomes support — the role flips, the level does not.",
            ],
          },
          {
            type: "formula",
            label: "Pivot point",
            expression: "P = (High + Low + Close) ÷ 3",
            worked: "(1.0895 + 1.0821 + 1.0860) ÷ 3 = 1.0859",
          },
        ],
        quiz: [
          {
            question: "An uptrend is structurally broken when:",
            options: [
              "A single red candle appears",
              "A prior swing low is broken",
              "Price touches resistance",
              "Volume falls",
            ],
            answer: 1,
            explanation: "The higher-low sequence failing is what inverts the structure.",
          },
          {
            question: "Given High 1.1000, Low 1.0900, Close 1.0950, the pivot point is:",
            options: ["1.0925", "1.0950", "1.0975", "1.0900"],
            answer: 1,
            explanation: "(1.1000 + 1.0900 + 1.0950) ÷ 3 = 1.0950.",
          },
        ],
      },
      {
        id: "candlesticks-patterns",
        title: "Candlesticks & Chart Patterns",
        summary:
          "Every candle is a record of a battle between buyers and sellers. Learn to read the story in the wicks.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "A candlestick shows four prices: open, high, low and close. The body marks the distance between open and close; the wicks show how far price travelled before being rejected.",
          },
          {
            type: "p",
            text: "Single candles hint at sentiment — a long lower wick at support shows buyers absorbing supply. Patterns of several candles, like engulfing bars or morning stars, carry more weight because they show a shift in control.",
          },
          { type: "h2", text: "Patterns worth knowing" },
          {
            type: "list",
            items: [
              "Bullish engulfing — a green body that fully swallows the prior red body at support.",
              "Pin bar — a long wick rejecting a level; the wick points away from the likely move.",
              "Head and shoulders — three peaks marking exhaustion; the neckline break confirms reversal.",
              "Double top / bottom — two failures at the same level, signalling fading momentum.",
            ],
          },
          {
            type: "formula",
            label: "Measured move target",
            expression: "Target = Breakout level ± Pattern height",
            worked: "Neckline 1.0850 − (Head 1.0950 − Neckline 1.0850) = 1.0750",
          },
          {
            type: "callout",
            title: "Context beats pattern",
            text: "A perfect pin bar in the middle of nowhere is just noise. Patterns only matter at levels that matter — support, resistance, or the edge of a range.",
          },
        ],
        quiz: [
          {
            question: "A long lower wick at support suggests:",
            options: [
              "Sellers are in control",
              "Buyers rejected lower prices",
              "The market is closed",
              "Volatility is falling",
            ],
            answer: 1,
            explanation: "Price was pushed down and bought back up — a sign of demand at that level.",
          },
          {
            question: "A head and shoulders pattern completes when:",
            options: [
              "The head forms",
              "The right shoulder forms",
              "Price breaks the neckline",
              "Volume doubles",
            ],
            answer: 2,
            explanation: "The neckline break is the confirmation that the reversal is underway.",
          },
        ],
      },
      {
        id: "trendlines-moving-averages",
        title: "Trendlines & Moving Averages",
        summary:
          "Trend is the only edge a retail trader can borrow. These two tools keep you on the right side of it.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "A trendline connects swing lows in an uptrend or swing highs in a downtrend. Two touches draw it; a third touch that holds is the trade. A decisive close through the line is the first warning that the trend is tiring.",
          },
          {
            type: "p",
            text: "A moving average smooths price into a single line, filtering the noise. The 50 and 200 period averages are watched by so many participants that they become self-fulfilling support and resistance.",
          },
          {
            type: "formula",
            label: "Simple moving average",
            expression: "SMA = (P₁ + P₂ + … + Pₙ) ÷ n",
            worked: "(1.0810 + 1.0830 + 1.0860 + 1.0840 + 1.0880) ÷ 5 = 1.0844",
            terms: [
              { symbol: "Pₙ", meaning: "Closing price of period n" },
              { symbol: "n", meaning: "Number of periods, e.g. 50" },
            ],
          },
          {
            type: "list",
            items: [
              "Price above a rising 200 SMA — long bias; below a falling one — short bias.",
              "Golden cross — the 50 crossing above the 200, a classic trend signal.",
              "Death cross — the 50 crossing below the 200, its bearish mirror.",
            ],
          },
          {
            type: "callout",
            title: "Lagging, not magic",
            text: "Moving averages describe the past. Use them to frame bias and place stops, never as standalone entry signals in a ranging market.",
          },
        ],
        quiz: [
          {
            question: "A valid uptrend line requires at least:",
            options: ["One touch", "Two touches", "Three touches", "Five touches"],
            answer: 1,
            explanation: "Two swing lows define the line; the third touch is where traders act on it.",
          },
          {
            question: "A golden cross is:",
            options: [
              "Price crossing the spread",
              "The 50 SMA crossing above the 200 SMA",
              "Two trendlines intersecting",
              "A candlestick pattern",
            ],
            answer: 1,
            explanation: "The 50-period average rising through the 200-period average signals a strengthening uptrend.",
          },
        ],
      },
      {
        id: "timeframes-top-down",
        title: "Timeframes & Top-Down Analysis",
        summary:
          "The same chart can be bullish and bearish at once. The timeframe you choose decides which story you hear.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "A daily candle compresses a full day of trading into one bar; a five-minute candle shows a fragment of it. Higher timeframes carry more information per bar, which is why their levels and trends command more respect.",
          },
          {
            type: "p",
            text: "Top-down analysis starts on the higher timeframe to establish bias — trend direction, key zones — then steps down to a lower timeframe to time the entry. You trade in the direction of the big picture, with the precision of the small one.",
          },
          {
            type: "list",
            items: [
              "Weekly / Daily — the map: trend, major support and resistance.",
              "4-hour / 1-hour — the setup: structure shifts and patterns forming at those zones.",
              "15-minute / 5-minute — the trigger: the actual entry candle.",
            ],
          },
          {
            type: "formula",
            label: "Timeframe ratio",
            expression: "Trading timeframe ≈ Bias timeframe ÷ 4 to 6",
            worked: "Daily bias → 4-hour setups → 1-hour entries",
          },
          {
            type: "callout",
            title: "One pair, three charts",
            text: "Before any trade, look at the same pair on three timeframes. If they disagree, the trade is not ready — wait for alignment or move on.",
          },
        ],
        quiz: [
          {
            question: "In top-down analysis, the higher timeframe is used for:",
            options: [
              "Exact entry timing",
              "Establishing trend bias and key zones",
              "Calculating pip value",
              "Avoiding stop-losses",
            ],
            answer: 1,
            explanation: "The higher timeframe sets the map; lower timeframes only time the entry.",
          },
          {
            question: "If your bias comes from the daily chart, a sensible entry timeframe is:",
            options: ["Monthly", "Weekly", "1-hour or 4-hour", "1-second"],
            answer: 2,
            explanation: "Step down by a factor of four to six — daily bias pairs with hourly entries.",
          },
        ],
      },
      {
        id: "indicators-rsi-macd",
        title: "Indicators: RSI & MACD",
        summary:
          "Indicators are derivatives of price, not oracles. Two of them earn their place on almost every chart.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "The Relative Strength Index measures the speed of recent price changes on a scale from zero to one hundred. Above seventy is called overbought, below thirty oversold — but in a strong trend, RSI can stay 'overbought' for weeks while price keeps rising.",
          },
          {
            type: "formula",
            label: "Relative Strength Index",
            expression: "RSI = 100 − 100 ÷ (1 + Avg gain ÷ Avg loss)",
            worked: "Avg gain 0.8, avg loss 0.4 → RSI = 100 − 100 ÷ 3 = 66.7",
            terms: [
              { symbol: "Avg gain/loss", meaning: "Smoothed over 14 periods by default" },
            ],
          },
          {
            type: "p",
            text: "MACD tracks the gap between a fast and a slow moving average. When the fast line pulls away from the slow line, momentum is building; when the gap closes, the move is tiring. Crossovers of the signal line mark the shift.",
          },
          {
            type: "list",
            items: [
              "RSI divergence — price makes a new high but RSI does not; momentum is fading.",
              "MACD crossover — the MACD line crossing its signal line flags a momentum shift.",
              "Use them for confirmation and timing, never as standalone entry signals.",
            ],
          },
          {
            type: "callout",
            title: "Divergence is the real signal",
            text: "Overbought and oversold labels fail in trends. The signal worth waiting for is divergence — price and indicator disagreeing about the strength of a move.",
          },
        ],
        quiz: [
          {
            question: "RSI above 70 in a strong uptrend means:",
            options: [
              "Sell immediately",
              "The trend must reverse today",
              "Momentum is strong — it can stay elevated for weeks",
              "The indicator is broken",
            ],
            answer: 2,
            explanation: "Overbought is a description of momentum, not a sell signal — trends keep RSI high.",
          },
          {
            question: "Bullish divergence occurs when:",
            options: [
              "Price and RSI both make new highs",
              "Price makes a new low but RSI makes a higher low",
              "MACD crosses above zero",
              "RSI hits exactly 50",
            ],
            answer: 1,
            explanation: "Price falling while momentum improves suggests the selling is exhausting itself.",
          },
        ],
      },
      {
        id: "fibonacci-retracements",
        title: "Fibonacci Retracements & Extensions",
        summary:
          "Markets breathe in proportions. Fibonacci levels map where a pullback is likely to end and where the next leg aims.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "After a strong move, price rarely continues in a straight line — it pulls back, then resumes. Fibonacci retracement levels, derived from ratios in the Fibonacci sequence, mark the depths where that pullback statistically tends to stall.",
          },
          {
            type: "list",
            items: [
              "38.2% — a shallow pullback; the sign of a very strong trend.",
              "50% — not a true Fibonacci ratio, but watched by everyone.",
              "61.8% — the golden ratio; the classic deep-retracement entry zone.",
            ],
          },
          {
            type: "formula",
            label: "Retracement level",
            expression: "Level = Swing high − (Ratio × Swing range)",
            worked: "1.1000 − (0.618 × 0.0200) = 1.0876 for a 200-pip up-move",
            terms: [
              { symbol: "Swing range", meaning: "High minus low of the measured move" },
              { symbol: "Ratio", meaning: "0.382, 0.5 or 0.618" },
            ],
          },
          {
            type: "p",
            text: "Extensions run the same maths in the other direction: the 127.2% and 161.8% extensions project where the resumed trend may run out of steam — natural spots to take profit.",
          },
          {
            type: "callout",
            title: "Confluence or nothing",
            text: "A Fibonacci level alone is a line on a chart. A 61.8% retracement that lands on prior structure, a trendline and a round number is a trade.",
          },
        ],
        quiz: [
          {
            question: "The most watched deep-retracement entry level is:",
            options: ["23.6%", "38.2%", "61.8%", "100%"],
            answer: 2,
            explanation: "The 61.8% golden ratio is the classic deep-pullback zone.",
          },
          {
            question: "Fibonacci levels work best when they:",
            options: [
              "Are drawn on every swing",
              "Align with other evidence like structure or trendlines",
              "Are used on the 1-minute chart",
              "Are traded blindly",
            ],
            answer: 1,
            explanation: "Confluence — multiple independent reasons at the same level — is what gives a level weight.",
          },
        ],
      },
      {
        id: "price-action-reading-charts",
        title: "Reading Price Action",
        summary:
          "Strip the indicators away and price itself tells the story — if you know which features to read.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "Price action trading reads the raw chart: swings, candles and levels, without indicators. The premise is simple — every indicator is derived from price, so price is the fastest information available.",
          },
          { type: "h2", text: "What to read, in order" },
          {
            type: "list",
            items: [
              "Structure first — is the market trending, ranging, or transitioning?",
              "Swings — where are the obvious highs and lows other traders see?",
              "Momentum — are bodies growing or shrinking as the move progresses?",
              "Rejection — long wicks at levels show who lost the last battle.",
            ],
          },
          {
            type: "p",
            text: "Ranging markets reward buying support and selling resistance. Trending markets punish it. The first and most profitable skill is simply naming the regime you are in before deciding what to do.",
          },
          {
            type: "formula",
            label: "Range expectation",
            expression: "Expected rotation ≈ Range height ÷ 2 from the midpoint",
            worked: "Range 1.0800–1.0900 → midpoint 1.0850, rotations of ~50 pips",
          },
          {
            type: "callout",
            title: "Trade what is, not what should be",
            text: "The chart does not owe you a trend. If structure is messy and swings overlap, the correct position is often no position at all.",
          },
        ],
        quiz: [
          {
            question: "The first thing to establish when reading a chart is:",
            options: [
              "Which indicator to add",
              "Whether the market is trending or ranging",
              "The spread",
              "The next news release time",
            ],
            answer: 1,
            explanation: "The regime — trend or range — decides which tactics are appropriate.",
          },
          {
            question: "Shrinking candle bodies as a move progresses suggest:",
            options: [
              "Momentum is building",
              "Momentum is fading",
              "The market is closed",
              "Spreads are widening",
            ],
            answer: 1,
            explanation: "Smaller bodies mean each new push achieves less — the move is losing energy.",
          },
        ],
      },
      {
        id: "breakouts-fakeouts",
        title: "Breakouts & Fakeouts",
        summary:
          "Big moves are born at breakouts — and so are the trades that trap the most people. How to tell a genuine level break from the stop hunt that precedes it.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "A breakout is when price pushes through a level everyone can see — a swing high, a range edge, a trendline. Because these levels are obvious, stop orders cluster just beyond them, and the market has learned to feed on that cluster. That is why so many first-time breakouts fail.",
          },
          { type: "h2", text: "What a real breakout looks like" },
          {
            type: "list",
            items: [
              "The candle closes beyond the level — wicks through a level are not breakouts.",
              "Expansion: the breakout candle has visibly larger range and momentum than recent candles.",
              "The retest holds: price pulls back to the broken level and it now acts as support or resistance.",
              "Continuation follows — higher lows after an upside break, lower highs after a downside break.",
          ],
          },
          { type: "h2", text: "The fakeout" },
          {
            type: "p",
            text: "A fakeout (or false breakout) is a push beyond the level that immediately reverses. It usually comes as a single long wick that runs the resting stops and snaps back inside the range. The traders who bought the wick are now trapped, and their exits fuel the move in the opposite direction — which is exactly why fakeouts are tradeable in their own right.",
          },
          {
            type: "formula",
            label: "Breakout quality",
            expression: "Quality = Close beyond level + Range expansion + Retest that holds",
            worked: "Two of three present → wait; all three present → tradeable",
            terms: [
              { symbol: "Close", meaning: "Body beyond the level, not just a wick" },
              { symbol: "Expansion", meaning: "Breakout candle larger than the recent average" },
              { symbol: "Retest", meaning: "Pullback to the old level that holds" },
            ],
          },
          {
            type: "callout",
            title: "Zoom out first",
            text: "A breakout of a two-hour-old level is noise. Only levels that are obvious on the daily or 4-hour chart attract enough orders to matter. The more visible the level, the more violent both the fakeout and the true break.",
          },
        ],
        quiz: [
          {
            question: "A candle spikes above resistance but closes back below it. This is best described as:",
            options: ["A confirmed breakout", "A false breakout (fakeout)", "A trend continuation", "A spread widening"],
            answer: 1,
            explanation: "Only a close beyond the level counts. A wick through it that reverses is a classic fakeout — often a stop hunt.",
          },
          {
            question: "The strongest confirmation that a breakout is real is:",
            options: [
              "The wick touches the level",
              "Price closes beyond the level and the retest holds",
              "You feel the momentum",
              "Volume and range shrink after the break",
            ],
            answer: 1,
            explanation: "Close plus holding retest is the professional standard — it filters most stop hunts before you commit.",
          },
        ],
      },
      {
        id: "ranges-mean-reversion",
        title: "Trading Ranges & Mean Reversion",
        summary:
          "Markets spend most of their life going sideways. How to read a range, fade its edges with the odds on your side, and recognise the conditions that precede its death.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "Trending is the exception, not the rule — currency pairs spend most of their time oscillating between visible boundaries. A range is defined by two levels: support, where buyers repeatedly step in, and resistance, where sellers repeatedly appear. Between them sits the midpoint, the mean that price keeps reverting toward.",
          },
          { type: "h2", text: "Anatomy of a range" },
          {
            type: "list",
            items: [
              "At least two touches of support and two of resistance, roughly horizontal.",
              "Price rotates from edge to edge through the midpoint — the rotation is the tradeable rhythm.",
              "Candles near the edges tend to shrink and lose momentum before reverting.",
              "The most probable trade fades the edge: sell resistance, buy support, target the opposite side.",
          ],
          },
          {
            type: "formula",
            label: "Range midpoint",
            expression: "Midpoint = (Range high + Range low) / 2",
            worked: "High 1.1050, low 1.0950 → midpoint 1.1000",
            terms: [
              { symbol: "High / Low", meaning: "The tested boundaries of the range" },
              { symbol: "Midpoint", meaning: "The mean price gravitates back toward" },
            ],
          },
          {
            type: "p",
            text: "Mean reversion works because a range is a balance: orders accumulate at the edges and get consumed. The edge trades are taken when momentum is clearly fading at the boundary — not against a candle that is still slamming into it. Entering mid-range is the amateur's mistake: the odds and the reward are both poor there.",
          },
          {
            type: "callout",
            title: "Ranges die loudly",
            text: "Every range eventually breaks, and the longer and cleaner it is, the more violent the break. After several successful edge fades, stop fading — the odds of the next one being a trap rise with each attempt.",
          },
        ],
        quiz: [
          {
            question: "In a well-defined range, the highest-probability trade is usually:",
            options: [
              "Buying the midpoint",
              "Selling the midpoint",
              "Fading the edges — selling resistance, buying support",
              "Holding a position until the range breaks",
            ],
            answer: 2,
            explanation: "Edges are where the balance of orders lies. Mid-range entries have poor odds and poor reward in both directions.",
          },
          {
            question: "What often precedes a genuine range breakout?",
            options: [
              "Price hugging the midpoint for days",
              "Shrinking candles and fading momentum near one edge",
              "Huge volume in the middle of the range",
              "Nothing — breakouts are unpredictable",
            ],
            answer: 1,
            explanation: "Compression near an edge — small bodies, fading pushes — signals the balance is breaking before the level does.",
          },
        ],
      },
    ],
  },
  {
    id: "high-school",
    title: "High School",
    subtitle: "Leverage, carry & execution",
    lessons: [
      {
        id: "leverage-and-margin",
        title: "Leverage, Margin & Survivability",
        summary:
          "Leverage does not increase your edge. It only compresses the time you have to be right.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "Margin is the collateral your broker holds against an open position. Leverage is simply the inverse of the margin requirement — thirty-to-one leverage means roughly 3.33 percent of the notional value is posted.",
          },
          {
            type: "formula",
            label: "Required margin",
            expression: "Margin = (Lot size × Exchange rate) ÷ Leverage",
            worked: "(100,000 × 1.0842) ÷ 30 = 3,614 USD",
            terms: [
              { symbol: "Leverage", meaning: "Broker multiple, e.g. 30 for 30:1" },
              { symbol: "Notional", meaning: "Lot size × exchange rate" },
            ],
          },
          { type: "h2", text: "The margin level that ends accounts" },
          {
            type: "p",
            text: "Brokers monitor equity against used margin. Once that ratio falls through the stop-out threshold, positions are liquidated automatically — the account is closed by arithmetic, not by opinion.",
          },
          {
            type: "formula",
            label: "Margin level",
            expression: "Margin level = (Equity ÷ Used margin) × 100%",
            worked: "(4,000 ÷ 3,614) × 100 = 110.7%",
          },
          {
            type: "callout",
            title: "Survivability first",
            text: "Two percent risk per trade survives a ten-loss streak with over eighty percent of capital intact. Ten percent risk does not survive it at all.",
          },
        ],
        quiz: [
          {
            question: "At 50:1 leverage, the margin for one standard lot of EUR/USD at 1.1000 is:",
            options: ["$1,100", "$2,200", "$5,500", "$11,000"],
            answer: 1,
            explanation: "(100,000 × 1.1000) ÷ 50 = 2,200 USD.",
          },
          {
            question: "Margin level falling toward the stop-out threshold means:",
            options: [
              "Your positions may be liquidated automatically",
              "Your leverage increases",
              "Spreads narrow",
              "Nothing — it is informational",
            ],
            answer: 0,
            explanation: "Breaching the stop-out level triggers forced liquidation.",
          },
        ],
      },
      {
        id: "carry-and-swaps",
        title: "Carry, Swaps & Holding Costs",
        summary:
          "Holding a pair overnight means financing one currency with another. That financing has a price.",
        minutes: 6,
        blocks: [
          {
            type: "p",
            text: "Every pair carries an interest rate differential. Hold the higher-yielding currency long and you may earn a swap credit; hold it short and you pay. Over weeks, the drag or the boost becomes material.",
          },
          {
            type: "formula",
            label: "Overnight swap",
            expression: "Swap ≈ Notional × (Rate long − Rate short) ÷ 365",
            worked: "100,000 × (5.25% − 3.75%) ÷ 365 = 4.11 USD per night",
          },
          {
            type: "p",
            text: "Most brokers apply a triple swap on Wednesday to account for weekend value dates. Swing traders should price that into the expectancy of any position held across it.",
          },
          {
            type: "callout",
            title: "Carry is not free money",
            text: "Carry trades unwind violently. A favourable differential is quickly erased by a two percent adverse move in the spot rate.",
          },
        ],
        quiz: [
          {
            question: "You are long a currency yielding 5% against one yielding 1%. Overnight you most likely:",
            options: ["Pay swap", "Earn swap", "Neither", "Pay spread instead"],
            answer: 1,
            explanation: "Long the higher-yielding leg generally earns the differential.",
          },
          {
            question: "Triple swap is usually charged on:",
            options: ["Monday", "Wednesday", "Friday", "Sunday"],
            answer: 1,
            explanation: "Wednesday rollover covers the weekend value date.",
          },
        ],
      },
      {
        id: "risk-management-drawdowns",
        title: "Risk Management & Drawdowns",
        summary:
          "Survival is a strategy. The maths of drawdowns explains why most accounts die long before their ideas do.",
        minutes: 9,
        blocks: [
          {
            type: "p",
            text: "A drawdown is the peak-to-trough decline of your equity. It is the single most honest statistic in trading, because it measures what you actually lived through, not what you hoped for.",
          },
          {
            type: "p",
            text: "The brutal part is the recovery. Losses and gains are not symmetrical — a fifty percent drawdown needs a one hundred percent gain just to get back to even. The deeper the hole, the steeper the climb out.",
          },
          {
            type: "formula",
            label: "Recovery required",
            expression: "Recovery % = Drawdown ÷ (1 − Drawdown)",
            worked: "50% ÷ (1 − 0.50) = 100% gain needed to break even",
            terms: [
              { symbol: "Drawdown", meaning: "Peak-to-trough equity loss, as a decimal" },
              { symbol: "Recovery", meaning: "Gain required to return to the peak" },
            ],
          },
          { type: "h2", text: "Rules that keep you in the game" },
          {
            type: "list",
            items: [
              "Cap risk per trade at 1–2% of equity — no exceptions for 'sure things'.",
              "Set a daily loss limit; hit it and the platform closes for the day.",
              "Reduce size after a losing streak, not after a winning one.",
              "Track expectancy: win rate × average win − loss rate × average loss.",
            ],
          },
          {
            type: "formula",
            label: "Expectancy",
            expression: "E = (Win rate × Avg win) − (Loss rate × Avg loss)",
            worked: "(0.45 × $300) − (0.55 × $150) = $52.50 per trade",
          },
          {
            type: "callout",
            title: "The professional's secret",
            text: "Professionals are not better at predicting the market. They are better at losing small, losing rarely, and still being solvent when their edge finally shows up.",
          },
        ],
        quiz: [
          {
            question: "Your account falls 25% from its peak. What gain gets you back to even?",
            options: ["25%", "33.3%", "50%", "20%"],
            answer: 1,
            explanation: "0.25 ÷ (1 − 0.25) = 33.3%. Losses and gains are not symmetrical.",
          },
          {
            question: "A strategy wins 40% of the time, averaging $400 wins and $150 losses. Its expectancy is:",
            options: ["$70 per trade", "$160 per trade", "−$10 per trade", "$250 per trade"],
            answer: 0,
            explanation: "(0.40 × 400) − (0.60 × 150) = 160 − 90 = $70 per trade.",
          },
        ],
      },
      {
        id: "building-a-trading-plan",
        title: "Building a Trading Plan",
        summary:
          "A plan converts trading from gambling into a repeatable business process. Write it before you need it.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "A trading plan answers every question before the market asks it: what you trade, when you trade, where you enter, where you exit, and exactly how much you risk. If a decision is made mid-trade, the plan has failed.",
          },
          { type: "h2", text: "The five components" },
          {
            type: "list",
            items: [
              "Market selection — two or three pairs you know deeply, not twenty you skim.",
              "Session filter — only trade the hours where your pairs have liquidity.",
              "Entry criteria — the exact conditions that must align before you click buy.",
              "Exit rules — stop-loss and target defined before entry, never adjusted in hope.",
              "Risk parameters — fixed risk per trade, daily loss limit, maximum open positions.",
            ],
          },
          {
            type: "p",
            text: "Then comes the part nobody wants: the journal. Record every trade with its reasoning and its result. After thirty entries your journal will tell you more about your edge than any indicator ever will.",
          },
          {
            type: "formula",
            label: "Journal win rate check",
            expression: "Win rate = Winning trades ÷ Total trades × 100%",
            worked: "18 wins ÷ 40 trades × 100 = 45%",
          },
          {
            type: "callout",
            title: "Plan the trade, trade the plan",
            text: "The market will always offer a reason to break your rules. The plan exists for exactly that moment.",
          },
        ],
        quiz: [
          {
            question: "When should your stop-loss and target be decided?",
            options: [
              "After the trade moves in your favour",
              "Before entering the trade",
              "When the trade is at breakeven",
              "At the end of the session",
            ],
            answer: 1,
            explanation: "Exits defined before entry are decisions; exits defined mid-trade are emotions.",
          },
          {
            question: "The main purpose of a trading journal is to:",
            options: [
              "Impress other traders",
              "Record your best trades only",
              "Measure your edge with real data over time",
              "Calculate swap costs",
            ],
            answer: 2,
            explanation: "A journal turns your history into statistics — win rate, expectancy, and where you actually go wrong.",
          },
        ],
      },
      {
        id: "trading-psychology",
        title: "Trading Psychology & Discipline",
        summary:
          "The market is not your opponent — your own brain is. Master the four emotions that blow up accounts.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "Every trading error is an emotion wearing a disguise. Fear closes winners too early. Greed oversizes positions. Hope holds losers past their stop. Revenge re-enters immediately after a loss, doubling down on nothing.",
          },
          { type: "h2", text: "The four account killers" },
          {
            type: "list",
            items: [
              "Fear — cutting winners at the first sign of a pullback.",
              "Greed — adding size after a win streak, right before the loss.",
              "Hope — moving a stop 'just this once' to give the trade room.",
              "Revenge — trading to win back a loss instead of trading the setup.",
            ],
          },
          {
            type: "p",
            text: "The antidote is process, not willpower. Fixed risk per trade, a written plan, and a daily loss limit remove the decisions that emotions hijack. You cannot stop feeling fear; you can stop letting it click the mouse.",
          },
          {
            type: "formula",
            label: "The tilt equation",
            expression: "Expected damage = Emotional trade size × Reduced edge",
            worked: "3× normal size × an edge you no longer have = account damage",
          },
          {
            type: "callout",
            title: "The two-trade rule",
            text: "After two consecutive losses, step away for the day. Statistically your edge is unchanged — but psychologically you are no longer the person who should be trading it.",
          },
        ],
        quiz: [
          {
            question: "Re-entering the market immediately to win back a loss is called:",
            options: ["Hedging", "Revenge trading", "Scaling in", "Averaging down"],
            answer: 1,
            explanation: "Revenge trading is emotion-driven re-entry — the setup is gone, only the feeling remains.",
          },
          {
            question: "The best defence against emotional decisions is:",
            options: [
              "Stronger willpower",
              "Watching more charts",
              "A fixed process that removes in-trade decisions",
              "Higher leverage",
            ],
            answer: 2,
            explanation: "Process beats willpower — pre-defined risk and exits leave nothing for emotion to hijack.",
          },
        ],
      },
      {
        id: "news-trading-volatility",
        title: "News Trading & Volatility",
        summary:
          "Red-folder events are where spreads widen, stops slip, and fortunes change in seconds. Trade them deliberately or not at all.",
        minutes: 7,
        blocks: [
          {
            type: "p",
            text: "Volatility is the speed of price. Around major news it can multiply tenfold in seconds — stops fill far beyond their level, spreads widen several times over, and the price you click is not the price you get.",
          },
          {
            type: "formula",
            label: "Average True Range",
            expression: "ATR = Average of true ranges over n periods",
            worked: "14-day ATR of 80 pips → a 20-pip stop is inside normal noise",
            terms: [
              { symbol: "True range", meaning: "Largest of high−low, |high−prev close|, |low−prev close|" },
              { symbol: "ATR", meaning: "The market's current breathing room" },
            ],
          },
          {
            type: "p",
            text: "ATR is the practical tool: it tells you how much a pair normally moves, so your stop can sit outside ordinary noise and your size can shrink when volatility expands. A stop that made sense in a quiet week is a donation in a volatile one.",
          },
          {
            type: "list",
            items: [
              "Check the economic calendar every morning before anything else.",
              "Reduce size or stand aside in the minutes around red-folder releases.",
              "Widen stops with ATR in volatile regimes — and cut size to keep risk constant.",
              "Never add to a losing position during a news spike.",
            ],
          },
          {
            type: "callout",
            title: "Volatility cuts both ways",
            text: "The same spike that doubles your profit doubles your loss. If you cannot define exactly where you are wrong before the release, you are gambling, not trading.",
          },
        ],
        quiz: [
          {
            question: "ATR is primarily used to:",
            options: [
              "Predict the direction of news",
              "Measure how much a pair normally moves",
              "Calculate the spread",
              "Time the London open",
            ],
            answer: 1,
            explanation: "ATR measures typical movement, so stops and size can adapt to current volatility.",
          },
          {
            question: "When volatility doubles, to keep the same money risk you should:",
            options: [
              "Double your position size",
              "Keep everything the same",
              "Halve your position size",
              "Remove your stop-loss",
            ],
            answer: 2,
            explanation: "Wider stops mean more pips at risk — size must fall to keep the cash risk constant.",
          },
        ],
      },
      {
        id: "scaling-advanced-orders",
        title: "Scaling In, Scaling Out & Trade Management",
        summary:
          "Professionals rarely enter or exit all at once. Managing a position in pieces smooths both the maths and the emotions.",
        minutes: 8,
        blocks: [
          {
            type: "p",
            text: "Scaling out means closing part of a winning position at a first target and letting the rest run. You bank some profit, reduce risk to near zero, and keep exposure to the big move — at the cost of a smaller maximum win.",
          },
          {
            type: "formula",
            label: "Blended exit",
            expression: "Avg exit = (Size₁ × Exit₁ + Size₂ × Exit₂) ÷ Total size",
            worked: "(0.5 × +40 pips + 0.5 × +100 pips) = +70 pips average",
          },
          {
            type: "p",
            text: "Scaling in is the dangerous mirror. Adding to a winner as it confirms is legitimate pyramiding. Adding to a loser to 'improve the average price' is how accounts die — the position grows exactly when the idea is failing.",
          },
          {
            type: "list",
            items: [
              "Move the stop to breakeven only after structure confirms, not out of fear.",
              "Trail stops behind swing points, letting the market decide when the trend ends.",
              "Never scale into a loser — your stop already defined where you are wrong.",
            ],
          },
          {
            type: "callout",
            title: "Write the management plan first",
            text: "Decide before entry: where you take partials, where the stop moves, what invalidates the trade. In-trade improvisation is emotion with extra steps.",
          },
        ],
        quiz: [
          {
            question: "Scaling out of a winning trade primarily:",
            options: [
              "Maximises total profit",
              "Banks partial profit and reduces risk",
              "Increases exposure",
              "Avoids paying the spread",
            ],
            answer: 1,
            explanation: "Partials trade some upside for certainty and lower risk on the remainder.",
          },
          {
            question: "Adding to a losing position to lower your average entry is:",
            options: [
              "Smart pyramiding",
              "Averaging down — growing risk on a failing idea",
              "Required by risk management",
              "Only bad in uptrends",
            ],
            answer: 1,
            explanation: "The position grows precisely when the market is proving the idea wrong.",
          },
        ],
      },
      {
        id: "backtesting-strategy",
        title: "Backtesting & Proving Your Edge",
        summary:
          "An untested strategy is an opinion. Backtesting turns 'I think this works' into numbers you can trust — or discard.",
        minutes: 9,
        blocks: [
          {
            type: "p",
            text: "Backtesting applies your exact rules to historical data, trade by trade, as if you had traded them live. Done honestly, it reveals win rate, expectancy, drawdown and losing streaks before they cost you money.",
          },
          {
            type: "p",
            text: "The cardinal sin is curve-fitting: tweaking rules until the past looks perfect. A strategy tuned to fit history exactly usually fits nothing else. Fewer rules, tested across more years and more pairs, generalise better.",
          },
          {
            type: "formula",
            label: "Sample size check",
            expression: "Minimum trades for a meaningful test ≈ 100+",
            worked: "20 trades at 60% win rate proves almost nothing; 200 trades starts to",
            terms: [
              { symbol: "Sample", meaning: "Trades included in the test" },
              { symbol: "Variance", meaning: "Luck dominates small samples" },
            ],
          },
          { type: "h2", text: "An honest testing process" },
          {
            type: "list",
            items: [
              "Write fixed rules first — entry, exit, stop, size, sessions, news filter.",
              "Scroll the chart back and trade forward bar by bar, logging every signal.",
              "Include the ugly periods — ranging months and news chaos, not just clean trends.",
              "Finish with a forward test on demo before risking a single real dollar.",
            ],
          },
          {
            type: "callout",
            title: "Expect the live discount",
            text: "Live results are almost always worse than backtests — slippage, spreads and hesitation all take a cut. If the backtest is only marginally profitable, the live version is a loser.",
          },
        ],
        quiz: [
          {
            question: "Curve-fitting means:",
            options: [
              "Testing on too much data",
              "Tuning rules until they fit the past perfectly but fail going forward",
              "Using a demo account",
              "Drawing smooth trendlines",
            ],
            answer: 1,
            explanation: "Over-optimised rules memorise history instead of capturing a real edge.",
          },
          {
            question: "Why should a backtest include choppy, unfavourable periods?",
            options: [
              "To make the results look worse",
              "Because live trading includes them too — skipping them inflates the results",
              "It should not — only test trends",
              "To practise drawing ranges",
            ],
            answer: 1,
            explanation: "A strategy must survive its bad months; testing only good ones is self-deception.",
          },
        ],
      },
    ],
  },
];

export const allLessons = curriculum.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })),
);

export const DERIV_AFFILIATE_URL = "https://t.deriv.link?t=YRL2VSHWS49A";
