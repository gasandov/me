export type InstitutionType = "Banco" | "SOFIPO" | "Gubernamental";
export type InsuranceType = "IPAB" | "PROSOFIPO" | "Gubernamental";

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  insurance: InsuranceType;
  ratePercent: number;
  capAmount?: number;
  excessRatePercent?: number;
  annualFeeAmount?: number;
  referralUrl?: string;
  code?: string;
}
