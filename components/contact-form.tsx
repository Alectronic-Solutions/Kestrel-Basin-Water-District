'use client';

import { useEffect, useRef, useState } from 'react';

type FieldName = 'name' | 'email' | 'topic' | 'message';
type Fields = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialFields: Fields = { name: '', email: '', topic: '', message: '' };

export function ContactForm() {
  const [ready, setReady] = useState(false);
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const errorSummary = useRef<HTMLDivElement>(null);

  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (Object.keys(errors).length > 0) errorSummary.current?.focus();
  }, [errors]);

  const update = (field: FieldName, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSubmitted(false);
  };

  const validate = () => {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = 'Enter your name.';
    if (!fields.email.trim()) next.email = 'Enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = 'Enter an email address in the correct format.';
    if (!fields.topic) next.topic = 'Choose a topic.';
    if (!fields.message.trim()) next.message = 'Enter a message.';
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  };

  const describedBy = (field: FieldName) => errors[field] ? `${field}-error` : undefined;

  return (
    <div role="form" aria-label="Demonstration contact form" className="mt-4 border border-slate-400 p-5">
      {Object.keys(errors).length > 0 && (
        <div ref={errorSummary} id="form-errors" role="alert" tabIndex={-1} className="mb-5 border-l-4 border-[#8f1d21] bg-[#fff4f4] p-4">
          <strong>Please correct the following {Object.keys(errors).length} error{Object.keys(errors).length === 1 ? '' : 's'}:</strong>
          <ul className="mb-0 mt-1">
            {Object.entries(errors).map(([field, message]) => <li key={field}><a href={`#${field}`}>{message}</a></li>)}
          </ul>
        </div>
      )}
      {submitted && (
        <div role="status" className="mb-5 border-l-4 border-[#1e6a44] bg-[#eff8f2] p-4">
          <strong>Your demonstration message was validated.</strong>
          <p className="mb-0 mt-1">Nothing was sent or stored. This fictional site does not accept service requests.</p>
        </div>
      )}
      {!ready && <p role="status" className="mt-0 text-sm">Loading the private, browser-only demonstration form.</p>}
      <p className="mt-0 text-sm">Fields marked <span aria-hidden="true">*</span> are required.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-bold">Name <span aria-hidden="true">*</span></label>
          <input required disabled={!ready} autoComplete="name" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} id="name" name="name" value={fields.name} onChange={(event) => update('name', event.target.value)} className="mt-1 w-full border border-slate-500 px-3 py-2 disabled:bg-slate-100" />
          {errors.name && <p id="name-error" className="mb-0 mt-1 text-sm text-[#8f1d21]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="font-bold">Email address <span aria-hidden="true">*</span></label>
          <input required disabled={!ready} autoComplete="email" maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} id="email" name="email" type="email" value={fields.email} onChange={(event) => update('email', event.target.value)} className="mt-1 w-full border border-slate-500 px-3 py-2 disabled:bg-slate-100" />
          {errors.email && <p id="email-error" className="mb-0 mt-1 text-sm text-[#8f1d21]">{errors.email}</p>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="topic" className="font-bold">Topic <span aria-hidden="true">*</span></label>
        <select required disabled={!ready} aria-invalid={Boolean(errors.topic)} aria-describedby={describedBy('topic')} id="topic" name="topic" value={fields.topic} onChange={(event) => update('topic', event.target.value)} className="mt-1 w-full border border-slate-500 bg-white px-3 py-2 disabled:bg-slate-100">
          <option value="">Choose a topic</option>
          <option>Billing and account</option>
          <option>Water quality</option>
          <option>Conservation</option>
          <option>Development and permits</option>
          <option>Public records</option>
          <option>Other</option>
        </select>
        {errors.topic && <p id="topic-error" className="mb-0 mt-1 text-sm text-[#8f1d21]">{errors.topic}</p>}
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="font-bold">Message <span aria-hidden="true">*</span></label>
        <textarea required disabled={!ready} maxLength={2000} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message')} id="message" name="message" rows={6} value={fields.message} onChange={(event) => update('message', event.target.value)} className="mt-1 w-full border border-slate-500 px-3 py-2 disabled:bg-slate-100" />
        {errors.message && <p id="message-error" className="mb-0 mt-1 text-sm text-[#8f1d21]">{errors.message}</p>}
      </div>
      <button className="button mt-5 disabled:cursor-not-allowed disabled:opacity-60" type="button" disabled={!ready} onClick={validate}>Validate message</button>
    </div>
  );
}
