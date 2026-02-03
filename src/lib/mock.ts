export type PaymentMethod = "easypaisa" | "jazzcash";

export type CompetitionStatus = "live" | "drawing" | "ended";

export type Competition = {
  id: string;
  titleEn: string;
  titleUr: string;
  prizeTitleEn: string;
  prizeTitleUr: string;
  prizeValuePKR: number;
  ticketPricePKR: number;
  ticketsTotal: number;
  ticketsSold: number;
  endsAt: string;
  status: CompetitionStatus;
  images: string[];
};

export type TicketPurchase = {
  id: string;
  competitionId: string;
  quantity: number;
  totalPKR: number;
  purchasedAt: string;
};

export type TransactionType = "deposit" | "withdraw" | "purchase";

export type TransactionStatus = "pending" | "completed" | "rejected";

export type Transaction = {
  id: string;
  type: TransactionType;
  method?: PaymentMethod;
  amountPKR: number;
  status: TransactionStatus;
  createdAt: string;
  meta?: Record<string, string>;
};

export type Winner = {
  id: string;
  competitionId: string;
  winnerName: string;
  city: string;
  wonAt: string;
};

type Db = {
  walletBalancePKR: number;
  competitions: Competition[];
  tickets: TicketPurchase[];
  transactions: Transaction[];
  winners: Winner[];
};

const nowPlusHours = (h: number) => new Date(Date.now() + h * 60 * 60 * 1000).toISOString();

const seed: Db = {
  walletBalancePKR: 12500,
  competitions: [
    {
      id: "lc200",
      titleEn: "Toyota Corolla 2020",
      titleUr: "ٹویوٹا کرولا 2020",
      prizeTitleEn: "Toyota Corolla Altis",
      prizeTitleUr: "ٹویوٹا کرولا آلٹس",
      prizeValuePKR: 4800000,
      ticketPricePKR: 250,
      ticketsTotal: 40000,
      ticketsSold: 18320,
      endsAt: nowPlusHours(38),
      status: "live",
      images: ["/prizes/corolla-1.svg", "/prizes/corolla-2.svg", "/prizes/corolla-3.svg"],
    },
    {
      id: "ip15",
      titleEn: "iPhone 15 Pro Max",
      titleUr: "آئی فون 15 پرو میکس",
      prizeTitleEn: "iPhone 15 Pro Max",
      prizeTitleUr: "آئی فون 15 پرو میکس",
      prizeValuePKR: 520000,
      ticketPricePKR: 150,
      ticketsTotal: 20000,
      ticketsSold: 14110,
      endsAt: nowPlusHours(11),
      status: "live",
      images: ["/prizes/iphone-1.svg", "/prizes/iphone-2.svg"],
    },
    {
      id: "ps5",
      titleEn: "PlayStation 5 Bundle",
      titleUr: "پلے اسٹیشن 5 بنڈل",
      prizeTitleEn: "PS5 + Extra Controller",
      prizeTitleUr: "پی ایس 5 + ایکسٹرا کنٹرولر",
      prizeValuePKR: 220000,
      ticketPricePKR: 100,
      ticketsTotal: 25000,
      ticketsSold: 9200,
      endsAt: nowPlusHours(73),
      status: "live",
      images: ["/prizes/ps5-1.svg", "/prizes/ps5-2.svg"],
    },
  ],
  tickets: [],
  transactions: [
    {
      id: "tx_seed_1",
      type: "deposit",
      method: "easypaisa",
      amountPKR: 5000,
      status: "completed",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "tx_seed_2",
      type: "purchase",
      amountPKR: 750,
      status: "completed",
      createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      meta: { competitionId: "ip15", quantity: "5" },
    },
  ],
  winners: [
    {
      id: "w1",
      competitionId: "lc199",
      winnerName: "Ahmed R.",
      city: "Lahore",
      wonAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "w2",
      competitionId: "ip14",
      winnerName: "Fatima K.",
      city: "Karachi",
      wonAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

const db: Db = seed;

const id = (prefix: string) => `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;

export const getCompetitions = () => db.competitions;

export const getCompetition = (competitionId: string) =>
  db.competitions.find((c) => c.id === competitionId) ?? null;

export const getWallet = () => ({ balancePKR: db.walletBalancePKR });

export const getTransactions = () => db.transactions.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

export const getTickets = () => db.tickets.slice().sort((a, b) => (a.purchasedAt < b.purchasedAt ? 1 : -1));

export const getWinners = () => db.winners.slice().sort((a, b) => (a.wonAt < b.wonAt ? 1 : -1));

export const deposit = (method: PaymentMethod, amountPKR: number) => {
  if (!Number.isFinite(amountPKR) || amountPKR <= 0) {
    throw new Error("Invalid amount");
  }

  db.walletBalancePKR += amountPKR;

  const tx: Transaction = {
    id: id("tx"),
    type: "deposit",
    method,
    amountPKR,
    status: "completed",
    createdAt: new Date().toISOString(),
  };

  db.transactions.push(tx);

  return { wallet: getWallet(), transaction: tx };
};

export const withdraw = (method: PaymentMethod, amountPKR: number) => {
  if (!Number.isFinite(amountPKR) || amountPKR <= 0) {
    throw new Error("Invalid amount");
  }

  if (db.walletBalancePKR < amountPKR) {
    throw new Error("Insufficient wallet balance");
  }

  db.walletBalancePKR -= amountPKR;

  const tx: Transaction = {
    id: id("tx"),
    type: "withdraw",
    method,
    amountPKR,
    status: "completed",
    createdAt: new Date().toISOString(),
  };

  db.transactions.push(tx);

  return { wallet: getWallet(), transaction: tx };
};

export const buyTickets = (competitionId: string, quantity: number) => {
  const c = getCompetition(competitionId);
  if (!c) {
    throw new Error("Competition not found");
  }

  if (c.status !== "live") {
    throw new Error("Competition is not live");
  }

  if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 100) {
    throw new Error("Invalid quantity");
  }

  const remaining = c.ticketsTotal - c.ticketsSold;
  if (quantity > remaining) {
    throw new Error("Not enough tickets remaining");
  }

  const total = c.ticketPricePKR * quantity;
  if (db.walletBalancePKR < total) {
    throw new Error("Insufficient wallet balance");
  }

  db.walletBalancePKR -= total;
  c.ticketsSold += quantity;

  const purchase: TicketPurchase = {
    id: id("tix"),
    competitionId,
    quantity,
    totalPKR: total,
    purchasedAt: new Date().toISOString(),
  };

  db.tickets.push(purchase);

  const tx: Transaction = {
    id: id("tx"),
    type: "purchase",
    amountPKR: total,
    status: "completed",
    createdAt: new Date().toISOString(),
    meta: { competitionId, quantity: String(quantity) },
  };

  db.transactions.push(tx);

  return { wallet: getWallet(), purchase, competition: c };
};

export const adminDraw = (competitionId: string) => {
  const c = getCompetition(competitionId);
  if (!c) {
    throw new Error("Competition not found");
  }

  c.status = "ended";

  const w: Winner = {
    id: id("w"),
    competitionId,
    winnerName: "Verified Winner",
    city: "Pakistan",
    wonAt: new Date().toISOString(),
  };

  db.winners.unshift(w);

  return { competition: c, winner: w };
};
