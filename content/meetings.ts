import type { Meeting } from './types';
import { publicAsset } from '@/lib/paths';

const meeting = (id: string, date: string, time: string, type: string, typeEs: string, status: 'upcoming' | 'past', posted: string, minutes?: string): Meeting => ({ id, date, time, status, posted, minutes: minutes ? publicAsset(minutes) : undefined, body: { en: 'Board of Directors', es: 'Junta Directiva' }, type: { en: type, es: typeEs }, location: { en: 'District Board Room, 4100 Basin Way, Arroyo Vale', es: 'Sala de Juntas del Distrito, 4100 Basin Way, Arroyo Vale' }, agenda: publicAsset(`/documents/agendas/${id}.pdf`) });

export const meetings: Meeting[] = [
  meeting('2026-08-12-regular', 'August 12, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'upcoming', '2026-08-07 4:30 p.m.'),
  meeting('2026-08-26-regular', 'August 26, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'upcoming', '2026-08-21 4:30 p.m.'),
  meeting('2026-09-09-regular', 'September 9, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'upcoming', '2026-09-04 4:30 p.m.'),
  meeting('2026-09-23-regular', 'September 23, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'upcoming', '2026-09-18 4:30 p.m.'),
  meeting('2026-07-22-regular', 'July 22, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-07-17 4:30 p.m.', '/documents/minutes/2026-07-22-regular.pdf'),
  meeting('2026-07-08-regular', 'July 8, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-07-03 4:30 p.m.', '/documents/minutes/2026-07-08-regular.pdf'),
  meeting('2026-06-24-regular', 'June 24, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-06-19 4:30 p.m.', '/documents/minutes/2026-06-24-regular.pdf'),
  meeting('2026-06-10-regular', 'June 10, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-06-05 4:30 p.m.', '/documents/minutes/2026-06-10-regular.pdf'),
  meeting('2026-05-27-regular', 'May 27, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-05-22 4:30 p.m.', '/documents/minutes/2026-05-27-regular.pdf'),
  meeting('2026-05-13-regular', 'May 13, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-05-08 4:30 p.m.', '/documents/minutes/2026-05-13-regular.pdf'),
  meeting('2026-04-22-regular', 'April 22, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-04-17 4:30 p.m.', '/documents/minutes/2026-04-22-regular.pdf'),
  meeting('2026-04-08-regular', 'April 8, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-04-03 4:30 p.m.', '/documents/minutes/2026-04-08-regular.pdf'),
  meeting('2026-03-25-regular', 'March 25, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-03-20 4:30 p.m.', '/documents/minutes/2026-03-25-regular.pdf'),
  meeting('2026-03-11-regular', 'March 11, 2026', '6:00 p.m.', 'Regular meeting', 'Reunión ordinaria', 'past', '2026-03-06 4:30 p.m.', '/documents/minutes/2026-03-11-regular.pdf'),
];
