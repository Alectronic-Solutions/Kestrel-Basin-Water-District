import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { forms } from '@/content/forms';
import { serviceGuidance } from '@/content/service-guidance';
import { serviceSubmissions } from '@/content/service-submission';
import { services } from '@/content/services';
import { Breadcrumbs, ContactCard, PageStamp, SectionNav } from '@/components/interior';
import { Localized } from '@/components/localized';
import { Helpful } from '@/components/helpful';
import { ServiceAreaExplorer } from '@/components/service-area-explorer';
import { publicAsset } from '@/lib/paths';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  return service ? { title: service.name.en, description: service.summary.en } : { title: 'Service not found' };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();

  const guidance = serviceGuidance[service.slug];
  if (!guidance) notFound();
  const submission = serviceSubmissions[service.slug];
  if (!submission) notFound();

  const relatedServices = guidance.relatedServices.flatMap((slug) => {
    const related = services.find((entry) => entry.slug === slug);
    return related ? [related] : [];
  });
  const relatedForms = Array.from(new Set([...service.forms, ...(submission.forms ?? [])])).flatMap((id) => {
    const form = forms.find((entry) => entry.id === id);
    return form ? [form] : [];
  });

  return <main id="main-content">
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.name.en }]} />
    <div className="shell grid gap-7 py-7 lg:grid-cols-[230px_minmax(0,1fr)_260px]">
      <SectionNav title="Services" links={[{ label: 'Service directory', href: '/services' }, { label: 'Pay your bill', href: '/services/pay-your-bill', current: service.slug === 'pay-your-bill' }, { label: 'Report a water problem', href: '/services/report-water-problem', current: service.slug === 'report-water-problem' }, { label: 'Conservation programs', href: '/services/conservation-rebate', current: service.slug === 'conservation-rebate' }, { label: 'New development', href: '/services/new-development', current: service.slug === 'new-development' }, { label: 'Public records', href: '/services/public-records-request', current: service.slug === 'public-records-request' }]} />
      <article className="prose">
        <p className="eyebrow m-0"><Localized en={service.category.en} es={service.category.es} /></p>
        <h1 className="mb-3 mt-1 text-4xl text-[#123b5d]"><Localized en={service.name.en} es={service.name.es} /></h1>
        <p className="text-xl"><Localized en={service.summary.en} es={service.summary.es} /></p>
        <hr className="rule" />

        <h2><Localized en="Who can use this service" es="Quién puede usar este servicio" /></h2>
        <p><Localized en={service.eligibility.en} es={service.eligibility.es} /></p>

        <h2><Localized en="At a glance" es="Información rápida" /></h2>
        <dl className="not-prose grid border-y border-slate-300 sm:grid-cols-2">
          {guidance.facts.map((fact) => <div key={fact.label.en} className="border-b border-slate-300 px-4 py-3 odd:sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"><dt className="font-bold text-[#123b5d]"><Localized en={fact.label.en} es={fact.label.es} /></dt><dd className="m-0 mt-1 text-sm"><Localized en={fact.value.en} es={fact.value.es} /></dd></div>)}
        </dl>

        <h2><Localized en="Before you begin" es="Antes de comenzar" /></h2>
        <ul className="service-checklist">{guidance.beforeYouBegin.map((item) => <li key={item.en}><Localized en={item.en} es={item.es} /></li>)}</ul>

        <h2><Localized en="Prepare your request" es="Prepare su solicitud" /></h2>
        <ol className="service-steps">{service.steps.map((step, index) => <li key={index}><Localized en={step.en} es={step.es} /></li>)}</ol>

        <section><h2><Localized en={submission.heading.en} es={submission.heading.es} /></h2><p><Localized en={submission.introduction.en} es={submission.introduction.es} /></p><ol className="service-steps">{submission.steps.map((step) => <li key={step.en}><Localized en={step.en} es={step.es} /></li>)}</ol>{submission.note && <p className="border-l-4 border-[#c98b16] bg-[#fff8e9] px-4 py-3 text-sm"><Localized en={submission.note.en} es={submission.note.es} /></p>}</section>

        {guidance.paymentOptions && <section aria-labelledby="payment-options-heading"><h2 id="payment-options-heading"><Localized en="Ways to pay" es="Formas de pago" /></h2><div className="table-wrap"><table className="responsive-table"><caption><Localized en="Payment methods and posting times" es="Métodos de pago y tiempos de registro" /></caption><thead><tr><th scope="col"><Localized en="Method" es="Método" /></th><th scope="col"><Localized en="How to use it" es="Cómo usarlo" /></th><th scope="col"><Localized en="When it posts" es="Cuándo se registra" /></th></tr></thead><tbody>{guidance.paymentOptions.map((option) => <tr key={option.method.en}><th scope="row" data-label="Method" className="bg-white text-[#1d2935]"><Localized en={option.method.en} es={option.method.es} /></th><td data-label="How to use it"><Localized en={option.details.en} es={option.details.es} /></td><td data-label="When it posts"><Localized en={option.posting.en} es={option.posting.es} /></td></tr>)}</tbody></table></div></section>}

        <section><h2><Localized en={guidance.detailHeading.en} es={guidance.detailHeading.es} /></h2><p><Localized en={guidance.detail.en} es={guidance.detail.es} /></p></section>

        {relatedForms.length > 0 && <section aria-labelledby="related-forms-heading"><h2 id="related-forms-heading"><Localized en="Related forms" es="Formularios relacionados" /></h2><ul className="related-form-list">{relatedForms.map((form) => <li key={form.id}><a href={publicAsset(`/documents/forms/${form.id}.pdf`)}><Localized en={form.title.en} es={form.title.es} /> ({form.format}, {form.size})</a><span className="text-sm">, <Localized en={`revised ${form.revised}`} es={`revisado ${form.revised}`} /></span></li>)}</ul></section>}

        {service.slug === 'water-quality-records' && <section aria-labelledby="available-report-heading"><h2 id="available-report-heading"><Localized en="Available report" es="Informe disponible" /></h2><p><Link href="/water-quality/consumer-confidence-report-2025"><Localized en="2025 Consumer Confidence Report (accessible HTML)" es="Informe de Confianza del Consumidor 2025 (HTML accesible)" /></Link></p><p className="text-sm"><Localized en="This fictional report demonstrates an accessible alternative to an untagged PDF." es="Este informe ficticio demuestra una alternativa accesible a un PDF sin etiquetas." /></p></section>}

        {service.slug === 'district-map' && <ServiceAreaExplorer />}

        <h2><Localized en="What happens next" es="Qué sucede después" /></h2>
        <p><Localized en={guidance.nextSteps.en} es={guidance.nextSteps.es} /></p>
        <PageStamp />
        <Helpful />
      </article>
      <div className="space-y-4">
        <ContactCard division={service.division} phone={service.phone} />
        <aside aria-label="Related services" className="border border-slate-400 bg-[#f1f5f7] p-4 text-sm"><h2 className="mt-0 text-lg text-[#123b5d]"><Localized en="Related services" es="Servicios relacionados" /></h2><ul className="mb-0 pl-5">{relatedServices.map((related) => <li key={related.slug}><Link href={`/services/${related.slug}`}><Localized en={related.name.en} es={related.name.es} /></Link></li>)}</ul></aside>
        <aside aria-label="Service help" className="border border-slate-400 bg-white p-4 text-sm"><h2 className="mt-0 text-lg text-[#123b5d]"><Localized en="Need help?" es="¿Necesita ayuda?" /></h2><p className="mb-0"><Localized en="Call during regular business hours:" es="Llame durante el horario regular de oficina:" /><br /><a href={`tel:${service.phone.replace(/[^\d+]/g, '')}`}>{service.phone}</a><br /><span className="text-xs"><Localized en="For an immediate water emergency, call the 24-hour line at (555) 010-0111." es="Para una emergencia de agua inmediata, llame a la línea de 24 horas al (555) 010-0111." /></span></p></aside>
      </div>
    </div>
  </main>;
}
