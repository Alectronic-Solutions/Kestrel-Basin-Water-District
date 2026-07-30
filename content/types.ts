export type Bilingual = { en: string; es: string };
export type Service = { slug: string; name: Bilingual; category: Bilingual; summary: Bilingual; eligibility: Bilingual; steps: Bilingual[]; division: string; forms: string[]; phone: string };
export type ServiceGuidance = {
  facts: { label: Bilingual; value: Bilingual }[];
  beforeYouBegin: Bilingual[];
  detailHeading: Bilingual;
  detail: Bilingual;
  nextSteps: Bilingual;
  relatedServices: string[];
  paymentOptions?: { method: Bilingual; details: Bilingual; posting: Bilingual }[];
};
export type Notice = { slug: string; title: Bilingual; summary: Bilingual; department: string; posted: string; year: number; urgent?: boolean };
export type Meeting = { id: string; body: Bilingual; date: string; time: string; location: Bilingual; type: Bilingual; status: 'upcoming' | 'past'; posted: string; agenda: string; minutes?: string };
export type Form = { id: string; title: Bilingual; category: Bilingual; format: 'PDF' | 'XLSX'; size: string; revised: string; description: Bilingual };
export type StaffMember = { name: string; title: Bilingual; division: Bilingual; extension: string; email: string };
export type Project = { name: Bilingual; status: Bilingual; budget: string; timeline: Bilingual; description: Bilingual };
