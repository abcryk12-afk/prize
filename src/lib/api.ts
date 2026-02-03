import type { Competition, PaymentMethod, TicketPurchase, Transaction, Winner } from "@/lib/mock";

const json = async <T,>(res: Response): Promise<T> => {
  const data = (await res.json()) as T;
  if (!res.ok) {
    const message = (data as { error?: string } | null)?.error ?? "Request failed";
    throw new Error(message);
  }
  return data;
};

export const api = {
  wallet: async () => json<{ balancePKR: number }>(await fetch("/api/wallet", { cache: "no-store" })),
  competitions: async () =>
    json<{ competitions: Competition[] }>(await fetch("/api/competitions", { cache: "no-store" })),
  competition: async (id: string) =>
    json<{ competition: Competition }>(await fetch(`/api/competitions/${id}`, { cache: "no-store" })),
  tickets: async () =>
    json<{ tickets: TicketPurchase[] }>(await fetch("/api/tickets", { cache: "no-store" })),
  transactions: async () =>
    json<{ transactions: Transaction[] }>(await fetch("/api/transactions", { cache: "no-store" })),
  winners: async () => json<{ winners: Winner[] }>(await fetch("/api/winners", { cache: "no-store" })),
  deposit: async (method: PaymentMethod, amountPKR: number) =>
    json(await fetch("/api/deposit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ method, amountPKR }),
    })),
  withdraw: async (method: PaymentMethod, amountPKR: number) =>
    json(await fetch("/api/withdraw", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ method, amountPKR }),
    })),
  purchase: async (competitionId: string, quantity: number) =>
    json(await fetch("/api/purchase", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ competitionId, quantity }),
    })),
};
