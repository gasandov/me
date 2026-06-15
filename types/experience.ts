export interface Subproject {
  key: string;
}

export interface ExperienceItem {
  key: string;
  company: string;
  start: string;
  end: string | null;
  subprojects?: Subproject[];
}
