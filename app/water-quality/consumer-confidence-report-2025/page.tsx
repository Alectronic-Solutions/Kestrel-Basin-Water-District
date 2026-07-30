import Link from 'next/link';
import { Breadcrumbs, PageStamp } from '@/components/interior';
import { Localized } from '@/components/localized';

export const metadata = {
  title: '2025 Consumer Confidence Report',
  description: 'Accessible HTML demonstration of an annual drinking-water quality report.',
};

const results = [
  ['Arsenic', '2.1 ppb', '10 ppb', 'No'],
  ['Fluoride', '0.71 ppm', '2 ppm', 'No'],
  ['Nitrate', '2.8 ppm', '10 ppm', 'No'],
  ['Total trihalomethanes', '34 ppb', '80 ppb', 'No'],
];

export default function ConsumerConfidenceReportPage() {
  return (
    <main id="main-content">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Water quality records', href: '/services/water-quality-records' },
        { label: '2025 Consumer Confidence Report' },
      ]} />
      <article className="prose shell py-8">
        <p className="eyebrow m-0"><Localized en="Accessible HTML report" es="Informe HTML accesible" /></p>
        <h1 className="mb-2 mt-1 text-4xl text-[#123b5d]"><Localized en="2025 Consumer Confidence Report" es="Informe de Confianza del Consumidor 2025" /></h1>
        <div className="border-l-4 border-[#8f1d21] bg-[#fff4f4] p-4 text-sm">
          <strong><Localized en="Fictional demonstration:" es="Demostración ficticia:" /></strong>{' '}
          <Localized en="These results do not describe any real water system and must not be used for health or service decisions." es="Estos resultados no describen ningún sistema de agua real y no deben usarse para decisiones de salud o servicio." />
        </div>

        <h2><Localized en="Water quality summary" es="Resumen de calidad del agua" /></h2>
        <p><Localized en="The fictional District collected samples throughout 2025. Every demonstration result shown below is beneath its listed regulatory limit." es="El Distrito ficticio recolectó muestras durante 2025. Cada resultado de demostración a continuación está por debajo de su límite reglamentario indicado." /></p>
        <div className="table-wrap">
          <table className="responsive-table">
            <caption><Localized en="Selected 2025 demonstration monitoring results" es="Resultados seleccionados de monitoreo de demostración de 2025" /></caption>
            <thead><tr><th scope="col"><Localized en="Substance" es="Sustancia" /></th><th scope="col"><Localized en="Detected level" es="Nivel detectado" /></th><th scope="col"><Localized en="Regulatory limit" es="Límite reglamentario" /></th><th scope="col"><Localized en="Violation" es="Infracción" /></th></tr></thead>
            <tbody>{results.map(([substance, detected, limit, violation]) => <tr key={substance}><th scope="row" data-label="Substance" className="bg-white text-[#1d2935]">{substance}</th><td data-label="Detected level">{detected}</td><td data-label="Regulatory limit">{limit}</td><td data-label="Violation">{violation}</td></tr>)}</tbody>
          </table>
        </div>

        <h2><Localized en="Terms used in this report" es="Términos usados en este informe" /></h2>
        <dl>
          <dt className="font-bold">ppb</dt><dd><Localized en="Parts per billion." es="Partes por mil millones." /></dd>
          <dt className="font-bold">ppm</dt><dd><Localized en="Parts per million." es="Partes por millón." /></dd>
        </dl>

        <h2><Localized en="Questions and alternate formats" es="Preguntas y formatos alternativos" /></h2>
        <p><Localized en="For this demonstration, return to the water-quality service page for fictional contact information and format guidance." es="Para esta demostración, vuelva a la página del servicio de calidad del agua para obtener información de contacto ficticia y orientación sobre formatos." /></p>
        <p><Link href="/services/water-quality-records"><Localized en="Return to water quality records" es="Volver a registros de calidad del agua" /></Link></p>
        <PageStamp date="July 29, 2026" />
      </article>
    </main>
  );
}
