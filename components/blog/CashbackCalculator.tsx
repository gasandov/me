"use client";

import { useState } from "react";

export function CashbackCalculator() {
  const [gastoMensual, setGastoMensual] = useState(15000);
  const [cashback, setCashback] = useState(2);
  const [topeMensual, setTopeMensual] = useState(0);
  const [anualidad, setAnualidad] = useState(0);
  const [diasFinanciamiento, setDiasFinanciamiento] = useState(45);
  const [tasaRendimiento, setTasaRendimiento] = useState(11);

  // Cashback: si hay tope, aplicar por mes; si no, ilimitado
  const cashbackMensualSinTope = gastoMensual * (cashback / 100);
  const cashbackMensual = topeMensual > 0
    ? Math.min(cashbackMensualSinTope, topeMensual)
    : cashbackMensualSinTope;
  const cashbackAnual = cashbackMensual * 12;
  const beneficioNetoCashback = cashbackAnual - anualidad;

  // Financiamiento gratuito: interés ganado al mantener el dinero invertido
  const interesPorCiclo =
    gastoMensual * (tasaRendimiento / 100 / 365) * diasFinanciamiento;
  const interesAnual = interesPorCiclo * 12;

  const beneficioTotal = beneficioNetoCashback + interesAnual;

  return (
    <div className="my-8 p-6 rounded-xl border border-border bg-card space-y-6">
      <h3 className="text-lg font-semibold text-foreground">
        Calcula tu beneficio real
      </h3>

      {/* Sección Cashback */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">
          Cashback
        </h4>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="gasto-mensual"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Gasto mensual (MXN)
            </label>
            <input
              id="gasto-mensual"
              type="number"
              min={0}
              step={1000}
              value={gastoMensual}
              onChange={(e) => setGastoMensual(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label
              htmlFor="cashback"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Cashback (%)
            </label>
            <input
              id="cashback"
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={cashback}
              onChange={(e) => setCashback(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label
              htmlFor="tope-mensual"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Tope mensual (MXN)
            </label>
            <input
              id="tope-mensual"
              type="number"
              min={0}
              step={100}
              value={topeMensual}
              onChange={(e) => setTopeMensual(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground mt-0.5">
              0 = sin tope
            </p>
          </div>
          <div>
            <label
              htmlFor="anualidad"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Anualidad (MXN)
            </label>
            <input
              id="anualidad"
              type="number"
              min={0}
              step={500}
              value={anualidad}
              onChange={(e) => setAnualidad(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Sección Financiamiento gratuito */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">
          Financiamiento gratuito
        </h4>
        <p className="text-xs text-muted-foreground mb-3">
          Interés que ganas al mantener el pago invertido (Cetes, Nu, etc.) hasta
          la fecha límite.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="dias-financiamiento"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Días de financiamiento gratuito
            </label>
            <input
              id="dias-financiamiento"
              type="number"
              min={0}
              max={60}
              value={diasFinanciamiento}
              onChange={(e) =>
                setDiasFinanciamiento(Number(e.target.value) || 0)
              }
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground mt-0.5">
              Ej: ~50 si compras tras el corte
            </p>
          </div>
          <div>
            <label
              htmlFor="tasa-rendimiento"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Tasa anual de rendimiento (%)
            </label>
            <input
              id="tasa-rendimiento"
              type="number"
              min={0}
              max={30}
              step={0.5}
              value={tasaRendimiento}
              onChange={(e) => setTasaRendimiento(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground mt-0.5">
              Ej: ~11% Cetes
            </p>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="pt-4 border-t border-border space-y-2">
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span className="text-muted-foreground">
            Cashback anual:{" "}
            <strong className="text-foreground">
              ${cashbackAnual.toLocaleString("es-MX")}
            </strong>
            {topeMensual > 0 && cashbackMensualSinTope > topeMensual && (
              <span className="text-muted-foreground/80"> (tope aplicado)</span>
            )}
          </span>
          <span className="text-muted-foreground">
            Beneficio cashback:{" "}
            <strong
              className={
                beneficioNetoCashback >= 0
                  ? "text-primary"
                  : "text-red-500 dark:text-red-400"
              }
            >
              ${beneficioNetoCashback.toLocaleString("es-MX")}
            </strong>
          </span>
          <span className="text-muted-foreground">
            Interés por financiamiento (anual):{" "}
            <strong className="text-foreground">
              ${interesAnual.toLocaleString("es-MX")}
            </strong>
          </span>
        </div>
        <div className="pt-2 text-sm">
          <span className="text-muted-foreground">Beneficio total estimado: </span>
          <strong
            className={
              beneficioTotal >= 0
                ? "text-primary text-base"
                : "text-red-500 dark:text-red-400 text-base"
            }
          >
            ${beneficioTotal.toLocaleString("es-MX")}/año
          </strong>
        </div>
      </div>
    </div>
  );
}
