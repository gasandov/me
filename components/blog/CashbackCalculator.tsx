"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type CardCategoryDef = {
  id: string;
  ratePercent: number;
};

type CardDefinition = {
  id: string;
  categories: CardCategoryDef[];
  /** Costco: optional Mexico warehouse effective-price savings (outside cashback cap). */
  includesWarehouseSavingsMx?: boolean;
};

const CARD_DEFINITIONS: CardDefinition[] = [
  {
    id: "banregio-platinum",
    categories: [{ id: "compras", ratePercent: 1.25 }],
  },
  {
    id: "santander-like-u",
    categories: [
      { id: "telecom", ratePercent: 4 },
      { id: "restaurantes", ratePercent: 5 },
      { id: "farmacias", ratePercent: 6 },
      { id: "supermercados", ratePercent: 1 },
    ],
  },
  {
    id: "costco-citibanamex",
    includesWarehouseSavingsMx: true,
    categories: [
      { id: "gasolina-costco-mx", ratePercent: 5 },
      { id: "educacion", ratePercent: 4 },
      { id: "costco-mx-us-web", ratePercent: 3 },
      { id: "rest-streaming-tv-internet", ratePercent: 2 },
      { id: "demas-compras", ratePercent: 1 },
    ],
  },
];

function zeroSpendingByCategory(card: CardDefinition): Record<string, number> {
  return Object.fromEntries(card.categories.map((c) => [c.id, 0]));
}

function bcp47FromLocale(locale: string): string {
  return locale === "es" ? "es-MX" : "en-US";
}

function formatMxAmount(amount: number, bcp47: string): string {
  return `$${amount.toLocaleString(bcp47)}`;
}

function formatRatePercent(rate: number, bcp47: string): string {
  return rate.toLocaleString(bcp47, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

const inputClassName =
  "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

/** Standard Mexico VAT rate applied to annual fee (typically added by the bank charge). */
const ANNUAL_FEE_VAT_RATE = 0.16;

export function CashbackCalculator() {
  const locale = useLocale();
  const bcp47 = bcp47FromLocale(locale);
  const t = useTranslations("cashbackCalculator");

  const firstCard = CARD_DEFINITIONS[0]!;
  const [selectedCardId, setSelectedCardId] = useState(firstCard.id);
  const [spendingByCategory, setSpendingByCategory] = useState<
    Record<string, number>
  >(() => zeroSpendingByCategory(firstCard));
  const [monthlyCap, setMonthlyCap] = useState(0);
  const [annualFee, setAnnualFee] = useState(0);
  const [warehouseSpendMx, setWarehouseSpendMx] = useState(0);

  const card = useMemo(
    () =>
      CARD_DEFINITIONS.find((c) => c.id === selectedCardId) ?? firstCard,
    [selectedCardId, firstCard],
  );

  const monthlyCashbackUncapped = card.categories.reduce(
    (sum, cat) =>
      sum + (spendingByCategory[cat.id] ?? 0) * (cat.ratePercent / 100),
    0,
  );
  const monthlyCashback =
    monthlyCap > 0
      ? Math.min(monthlyCashbackUncapped, monthlyCap)
      : monthlyCashbackUncapped;
  const annualCashback = monthlyCashback * 12;
  const annualFeeWithVat = annualFee * (1 + ANNUAL_FEE_VAT_RATE);
  const netCashbackBenefit = annualCashback - annualFeeWithVat;
  const warehouseSavingsMonthly =
    card.includesWarehouseSavingsMx === true ? warehouseSpendMx * 0.023 : 0;
  const warehouseSavingsAnnual = warehouseSavingsMonthly * 12;
  const totalEstimatedAnnual = netCashbackBenefit + warehouseSavingsAnnual;

  const vatPercentForMessage = (ANNUAL_FEE_VAT_RATE * 100).toLocaleString(
    bcp47,
    { maximumFractionDigits: 0 },
  );

  return (
    <div className="my-8 p-6 rounded-xl border border-border bg-card space-y-6">
      <h3 className="text-lg font-semibold text-foreground">{t("title")}</h3>

      <div>
        <label
          htmlFor="cashback-calculator-card"
          className="block text-sm font-medium text-foreground mb-1"
        >
          {t("cardLabel")}
        </label>
        <select
          id="cashback-calculator-card"
          value={selectedCardId}
          onChange={(e) => {
            const id = e.target.value;
            const next =
              CARD_DEFINITIONS.find((c) => c.id === id) ?? firstCard;
            setSelectedCardId(next.id);
            setSpendingByCategory(zeroSpendingByCategory(next));
            if (!next.includesWarehouseSavingsMx) setWarehouseSpendMx(0);
          }}
          className={inputClassName}
        >
          {CARD_DEFINITIONS.map((c) => (
            <option key={c.id} value={c.id}>
              {t(`cards.${c.id}.name` as Parameters<typeof t>[0])}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">
          {t("cashbackSectionHeading")}
        </h4>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {card.categories.map((cat) => (
            <div key={cat.id}>
              <label
                htmlFor={`cashback-calculator-spend-${cat.id}`}
                className="block text-sm font-medium text-foreground mb-1"
              >
                {t(
                  `cards.${card.id}.categories.${cat.id}` as Parameters<
                    typeof t
                  >[0],
                )}{" "}
                <span className="text-muted-foreground font-normal">
                  ({formatRatePercent(cat.ratePercent, bcp47)}%)
                </span>
              </label>
              <input
                id={`cashback-calculator-spend-${cat.id}`}
                type="number"
                min={0}
                step={500}
                value={spendingByCategory[cat.id] ?? 0}
                onChange={(e) =>
                  setSpendingByCategory((prev) => ({
                    ...prev,
                    [cat.id]: Number(e.target.value) || 0,
                  }))
                }
                className={inputClassName}
              />
            </div>
          ))}
        </div>
      </div>

      {card.includesWarehouseSavingsMx ? (
        <div>
          <label
            htmlFor="cashback-calculator-warehouse-mx"
            className="block text-sm font-medium text-foreground mb-1"
          >
            {t("warehouseLabel")}{" "}
            <span className="text-muted-foreground font-normal">
              {t("warehouseRateHint")}
            </span>
          </label>
          <input
            id="cashback-calculator-warehouse-mx"
            type="number"
            min={0}
            step={500}
            value={warehouseSpendMx}
            onChange={(e) =>
              setWarehouseSpendMx(Number(e.target.value) || 0)
            }
            className={inputClassName}
          />
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("warehouseHelp")}
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cashback-calculator-monthly-cap"
            className="block text-sm font-medium text-foreground mb-1"
          >
            {t("monthlyCapLabel")}
          </label>
          <input
            id="cashback-calculator-monthly-cap"
            type="number"
            min={0}
            step={100}
            value={monthlyCap}
            onChange={(e) => setMonthlyCap(Number(e.target.value) || 0)}
            className={inputClassName}
          />
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("monthlyCapHelp")}
          </p>
        </div>
        <div>
          <label
            htmlFor="cashback-calculator-annual-fee"
            className="block text-sm font-medium text-foreground mb-1"
          >
            {t("annualFeeLabel")}
          </label>
          <input
            id="cashback-calculator-annual-fee"
            type="number"
            min={0}
            step={500}
            value={annualFee}
            onChange={(e) => setAnnualFee(Number(e.target.value) || 0)}
            className={inputClassName}
          />
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("annualFeeHelp", { rate: vatPercentForMessage })}
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-border space-y-2">
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span className="text-muted-foreground">
            {t("monthlyCashbackNoCap")}{" "}
            <strong className="text-foreground">
              {formatMxAmount(monthlyCashbackUncapped, bcp47)}
            </strong>
          </span>
          {monthlyCap > 0 && (
            <span className="text-muted-foreground">
              {t("monthlyCashbackWithCap")}{" "}
              <strong className="text-foreground">
                {formatMxAmount(monthlyCashback, bcp47)}
              </strong>
              {monthlyCashbackUncapped > monthlyCap && (
                <span className="text-muted-foreground/80">
                  {" "}
                  {t("capApplied")}
                </span>
              )}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span className="text-muted-foreground">
            {t("annualCashback")}{" "}
            <strong className="text-foreground">
              {formatMxAmount(annualCashback, bcp47)}
            </strong>
          </span>
          {annualFee > 0 && (
            <span className="text-muted-foreground">
              {t("annualFeeWithVat")}{" "}
              <strong className="text-foreground">
                {formatMxAmount(annualFeeWithVat, bcp47)}
              </strong>
            </span>
          )}
          <span className="text-muted-foreground">
            {t("netBenefit")}{" "}
            <strong
              className={
                netCashbackBenefit >= 0
                  ? "text-primary"
                  : "text-red-500 dark:text-red-400"
              }
            >
              {formatMxAmount(netCashbackBenefit, bcp47)}
            </strong>
          </span>
        </div>
        {card.includesWarehouseSavingsMx ? (
          <div className="flex flex-col gap-1 text-sm pt-2 border-t border-border/60">
            <span className="text-muted-foreground">
              {t("warehouseAnnualSavings")}{" "}
              <strong className="text-foreground">
                {formatMxAmount(warehouseSavingsAnnual, bcp47)}
              </strong>
            </span>
            <span className="text-muted-foreground">
              {t("totalEstimated")}{" "}
              <strong
                className={
                  totalEstimatedAnnual >= 0
                    ? "text-primary"
                    : "text-red-500 dark:text-red-400"
                }
              >
                {formatMxAmount(totalEstimatedAnnual, bcp47)}
              </strong>
            </span>
            <p className="text-xs text-muted-foreground">
              {t("totalDisclaimer")}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
