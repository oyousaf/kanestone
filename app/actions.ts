"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name."),
  company: z.string().trim().max(120).optional(),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().max(40).optional(),
  interest: z.string().trim().min(1, "Please choose what you’re looking for."),
  vehicle: z.string().trim().max(80).optional(),
  message: z.string().trim().max(4000).optional(),
});

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
  values?: Record<string, string>;
};

export async function sendEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: bots fill every field.
  if (formData.get("website")) return { status: "success" };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: EnquiryState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      fieldErrors[key] ??= issue.message;
    }
    const values = Object.fromEntries([...formData].map(([k, v]) => [k, String(v)]));
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const d = parsed.data;
  const text = [
    `Name: ${d.name}`,
    d.company ? `Company: ${d.company}` : null,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    `Interest: ${d.interest}`,
    d.vehicle ? `Vehicle: ${d.vehicle}` : null,
    "",
    d.message ?? "",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[enquiry] RESEND_API_KEY not set — enquiry logged only\n" + text);
    return { status: "success" };
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.ENQUIRY_FROM ?? "Kanestone <enquiries@kanestone.co.uk>",
    to: process.env.ENQUIRY_TO ?? "info@kanestone.co.uk",
    replyTo: d.email,
    subject: `New enquiry — ${d.interest}${d.vehicle ? ` · ${d.vehicle}` : ""}`,
    text,
  });

  if (error) {
    console.error("[enquiry]", error);
    return { status: "error", message: "We couldn’t send your enquiry. Please email info@kanestone.co.uk." };
  }
  return { status: "success" };
}
