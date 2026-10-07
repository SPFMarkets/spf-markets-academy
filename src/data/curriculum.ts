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
    ],
  },
];

export const allLessons = curriculum.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })),
);

export const DERIV_AFFILIATE_URL = "https://t.deriv.link?t=YRL2VSHWS49A";
