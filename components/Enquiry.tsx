"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState, useEffect, useState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/actions";
import { contact, vehicles } from "@/lib/content";
import { VEHICLE_EVENT } from "@/lib/enquiry";
import { SplitReveal } from "./ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;
const interests = ["Prestige vehicle", "Bespoke hire", "Supply partnership"];

const field =
  "peer w-full border-b border-white/20 bg-transparent pt-6 pb-3 text-lg text-ivory outline-none transition-colors placeholder:text-transparent focus:border-champagne";
const label =
  "pointer-events-none absolute top-6 left-0 text-ivory/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-champagne peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

function Field({
  name,
  text,
  type = "text",
  error,
  required,
  autoComplete,
  defaultValue,
}: {
  name: string;
  text: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <label className="relative block">
      <input
        name={name}
        type={type}
        placeholder={text}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        className={`${field} ${error ? "border-red-400/70" : ""}`}
      />
      <span className={label}>
        {text}
        {required && " *"}
      </span>
      {error && <span className="mt-2 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

export default function Enquiry() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  const [interest, setInterest] = useState(interests[0]);
  const [vehicle, setVehicle] = useState("");

  useEffect(() => {
    const onSelect = (e: Event) => {
      setVehicle((e as CustomEvent<string>).detail);
      setInterest(interests[0]);
    };
    window.addEventListener(VEHICLE_EVENT, onSelect);
    return () => window.removeEventListener(VEHICLE_EVENT, onSelect);
  }, []);

  return (
    <section id="enquire" className="relative overflow-hidden px-4 py-32 sm:px-8 sm:py-44">
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[420px] w-[min(900px,90vw)] -translate-x-1/2 rounded-full bg-racing/35 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-4 text-champagne">Enquiries</p>
          <SplitReveal text="Every relationship begins with a conversation." className="font-display text-[clamp(2.25rem,4.8vw,4.5rem)] leading-[1]" />
          <p className="mt-8 max-w-md text-lg text-ivory/65">
            Whether you require a prestigious vehicle, a bespoke hire arrangement or a commercial supply partnership, we welcome the opportunity
            to discuss your requirements.
          </p>
          <p className="mt-4 max-w-md text-ivory/45">Every enquiry receives individual attention, professionalism and discretion.</p>
          <a
            href={`mailto:${contact.email}`}
            className="group mt-10 inline-flex items-center gap-3 font-display text-2xl sm:text-3xl"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-lux group-hover:bg-[length:100%_1px]">
              {contact.email}
            </span>
            <span className="text-champagne transition-transform duration-500 group-hover:translate-x-1">↗</span>
          </a>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-10">
          <AnimatePresence mode="wait">
            {state.status === "success" ? (
              <motion.div
                key="done"
                className="flex min-h-[480px] flex-col items-start justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                role="status"
              >
                <span className="font-display text-7xl text-champagne">K</span>
                <h3 className="mt-6 font-display text-4xl">Thank you.</h3>
                <p className="mt-3 max-w-sm text-ivory/60">Your enquiry is with us. A member of the Kanestone team will be in touch personally.</p>
              </motion.div>
            ) : (
              <motion.form key="form" action={action} className="space-y-8" exit={{ opacity: 0, y: -20 }} noValidate>
                <fieldset>
                  <legend className="eyebrow mb-4 text-ivory/50">I’m looking for</legend>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setInterest(opt)}
                        aria-pressed={interest === opt}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                          interest === opt ? "border-ivory bg-ivory text-ink" : "border-white/20 text-ivory/70 hover:border-white/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="interest" value={interest} />
                </fieldset>

                <label className="block">
                  <span className="eyebrow mb-3 block text-ivory/50">Vehicle of interest</span>
                  <select
                    name="vehicle"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/15 bg-ink-2 px-4 py-3 text-ivory outline-none focus:border-champagne"
                  >
                    <option value="">Not decided yet</option>
                    {vehicles.map((v) => (
                      <option key={v.slug} value={`${v.marque} ${v.model}`}>
                        {v.marque} {v.model}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-8 sm:grid-cols-2">
                  <Field name="name" text="Full name" required autoComplete="name" defaultValue={state.values?.name} error={state.fieldErrors?.name} />
                  <Field name="company" text="Company" autoComplete="organization" defaultValue={state.values?.company} />
                  <Field name="email" text="Email" type="email" required autoComplete="email" defaultValue={state.values?.email} error={state.fieldErrors?.email} />
                  <Field name="phone" text="Phone" type="tel" autoComplete="tel" defaultValue={state.values?.phone} />
                </div>

                <label className="relative block">
                  <textarea name="message" rows={4} defaultValue={state.values?.message} placeholder="Tell us about your requirements" className={`${field} resize-none`} />
                  <span className={label}>Tell us about your requirements</span>
                </label>

                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                {state.status === "error" && state.message && <p className="text-sm text-red-300">{state.message}</p>}

                <button
                  type="submit"
                  disabled={pending}
                  className="group relative flex w-full items-center justify-between overflow-hidden rounded-full bg-ivory px-7 py-5 text-ink transition-colors disabled:opacity-60"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-lux group-hover:scale-x-100" />
                  <span className="relative font-medium">{pending ? "Sending…" : "Send enquiry"}</span>
                  <span className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
