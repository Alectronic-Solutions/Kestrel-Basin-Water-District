import type { Bilingual } from './types';

const b = (en: string, es: string): Bilingual => ({ en, es });

type NoticeGuidance = { heading: Bilingual; detail: Bilingual; actions: Bilingual[] };

const guidanceByDepartment: Record<string, NoticeGuidance> = {
  Operations: {
    heading: b('What to expect', 'Qué esperar'),
    detail: b('District crews may need access to public streets, hydrants, valves, or other water facilities while this work is underway. Temporary pressure changes, brief discoloration, or traffic activity can occur during routine system work.', 'Las cuadrillas del Distrito pueden necesitar acceso a calles públicas, hidrantes, válvulas u otras instalaciones de agua mientras se realiza este trabajo. Pueden ocurrir cambios temporales de presión, decoloración breve o actividad de tráfico durante el trabajo rutinario del sistema.'),
    actions: [b('Keep clear of work areas and do not move cones, barricades, or equipment.', 'Manténgase alejado de las áreas de trabajo y no mueva conos, barricadas ni equipos.'), b('If water remains discolored or pressure does not return after the work window, call the 24-hour Operations line at (555) 010-0111.', 'Si el agua permanece decolorada o la presión no regresa después del periodo de trabajo, llame a la línea de Operaciones de 24 horas al (555) 010-0111.')],
  },
  'District Clerk': {
    heading: b('How to participate', 'Cómo participar'),
    detail: b('This notice is part of the District’s public meeting and decision-making process. Supporting materials are posted when available, and public comments become part of the record according to the applicable meeting procedures.', 'Este aviso forma parte del proceso público de reuniones y toma de decisiones del Distrito. Los materiales de respaldo se publican cuando están disponibles, y los comentarios públicos pasan a formar parte del expediente de acuerdo con los procedimientos de reunión aplicables.'),
    actions: [b('Review the related agenda or notice materials before submitting a comment or attending.', 'Revise la agenda relacionada o los materiales del aviso antes de enviar un comentario o asistir.'), b('Contact the District Clerk for an accessible format, language assistance, or help understanding how to participate.', 'Comuníquese con la Secretaría del Distrito para obtener un formato accesible, asistencia lingüística o ayuda para entender cómo participar.')],
  },
  Conservation: {
    heading: b('How this affects water use', 'Cómo afecta esto al uso de agua'),
    detail: b('Conservation notices help customers plan outdoor watering and identify available programs. Requirements can change with water-supply conditions, so the current conservation alert and this notice should be read together.', 'Los avisos de conservación ayudan a los clientes a planificar el riego exterior e identificar programas disponibles. Los requisitos pueden cambiar según las condiciones de suministro de agua, por lo que la alerta de conservación actual y este aviso deben leerse juntos.'),
    actions: [b('Adjust irrigation schedules promptly and repair visible leaks or runoff.', 'Ajuste los horarios de riego con prontitud y repare fugas o escurrimientos visibles.'), b('Contact Conservation before beginning a project or requesting a rebate when approval may be required.', 'Comuníquese con Conservación antes de comenzar un proyecto o solicitar un reembolso cuando pueda requerirse aprobación.')],
  },
  Engineering: {
    heading: b('Construction and project information', 'Información de construcción y proyectos'),
    detail: b('Project notices describe planned work that supports water reliability and safety. Work schedules can change because of weather, field conditions, utility coordination, or emergency operations.', 'Los avisos de proyectos describen trabajo planificado que respalda la confiabilidad y seguridad del agua. Los horarios de trabajo pueden cambiar debido al clima, condiciones de campo, coordinación de servicios públicos u operaciones de emergencia.'),
    actions: [b('Use caution near work zones and allow extra time when travel or access may be affected.', 'Tenga precaución cerca de las zonas de trabajo y permita tiempo adicional cuando el tránsito o acceso pueda verse afectado.'), b('Contact Engineering with parcel, access, or project questions related to the area described in this notice.', 'Comuníquese con Ingeniería si tiene preguntas sobre parcelas, acceso o proyectos relacionados con el área descrita en este aviso.')],
  },
  'Customer Services': {
    heading: b('Customer service information', 'Información de servicio al cliente'),
    detail: b('This notice may affect counter service, payment timing, meter access, or other account-related work. Emergency water response remains available outside normal office hours.', 'Este aviso puede afectar el servicio en ventanilla, el tiempo de pagos, el acceso a medidores u otro trabajo relacionado con cuentas. La respuesta a emergencias de agua sigue disponible fuera del horario normal de oficina.'),
    actions: [b('Plan routine visits and payments before the date listed when possible, and keep your account number available if you call.', 'Planifique visitas y pagos rutinarios antes de la fecha indicada cuando sea posible y tenga disponible su número de cuenta si llama.'), b('For a water emergency, call (555) 010-0111. For account assistance during business hours, call (555) 010-0140.', 'Para una emergencia de agua, llame al (555) 010-0111. Para ayuda con cuentas durante el horario de oficina, llame al (555) 010-0140.')],
  },
  'Water Quality': {
    heading: b('Water quality information', 'Información sobre calidad del agua'),
    detail: b('The District monitors the water system and publishes required public information. This notice provides context for the report, testing activity, or customer action described above; it does not replace an emergency advisory.', 'El Distrito monitorea el sistema de agua y publica la información pública requerida. Este aviso proporciona contexto para el informe, actividad de prueba o acción del cliente descrita arriba; no reemplaza un aviso de emergencia.'),
    actions: [b('Read the linked report or instructions and keep any required test or maintenance documentation for your records.', 'Lea el informe o instrucciones vinculadas y conserve cualquier documentación requerida de prueba o mantenimiento para sus registros.'), b('Contact Water Quality for an alternate format, a specific monitoring question, or help understanding a required action.', 'Comuníquese con Calidad del Agua para obtener un formato alternativo, una pregunta específica de monitoreo o ayuda para entender una acción requerida.')],
  },
  Finance: {
    heading: b('Budget and financial information', 'Información presupuestaria y financiera'),
    detail: b('District financial notices summarize public decisions about funding, capital work, and customer programs. Supporting reports are available through the transparency and compliance section.', 'Los avisos financieros del Distrito resumen decisiones públicas sobre financiamiento, obras de capital y programas para clientes. Los informes de respaldo están disponibles en la sección de transparencia y cumplimiento.'),
    actions: [b('Review the budget and project information before the next Board meeting if you want to comment on District priorities.', 'Revise la información de presupuesto y proyectos antes de la próxima reunión de la Junta si desea comentar sobre las prioridades del Distrito.'), b('Request an accessible document or public record if the posted materials do not answer your question.', 'Solicite un documento accesible o un registro público si los materiales publicados no responden a su pregunta.')],
  },
  'Community Relations': {
    heading: b('Community event details', 'Detalles del evento comunitario'),
    detail: b('Community notices share voluntary opportunities to learn about water stewardship and District programs. They do not change account service or emergency response procedures.', 'Los avisos comunitarios comparten oportunidades voluntarias para aprender sobre el cuidado del agua y los programas del Distrito. No cambian los procedimientos de servicio de cuenta ni de respuesta a emergencias.'),
    actions: [b('Check the location and date before traveling, as event details may be updated.', 'Verifique el lugar y la fecha antes de viajar, ya que los detalles del evento pueden actualizarse.'), b('Contact the District if you need an accommodation or language assistance to participate.', 'Comuníquese con el Distrito si necesita una adaptación o asistencia lingüística para participar.')],
  },
};

const fallback: NoticeGuidance = {
  heading: b('More information', 'Más información'),
  detail: b('Read this notice together with the linked District resources for the dates, area, and service information that apply. Contact the responsible division if you need clarification or an alternate format.', 'Lea este aviso junto con los recursos del Distrito vinculados para conocer las fechas, el área y la información de servicio que corresponde. Comuníquese con la división responsable si necesita aclaración o un formato alternativo.'),
  actions: [b('Keep this notice for your records and review any updates posted by the District.', 'Conserve este aviso para sus registros y revise cualquier actualización publicada por el Distrito.'), b('Contact the District before taking an action if the information is unclear or your circumstances are different.', 'Comuníquese con el Distrito antes de tomar una acción si la información no está clara o sus circunstancias son diferentes.')],
};

export const noticeGuidance = (department: string) => guidanceByDepartment[department] ?? fallback;
