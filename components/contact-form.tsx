"use client"

import { useActionState } from "react"
import { CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react"

import { sendMessage, type ContactState } from "@/app/contact/actions"
import { locations } from "@/lib/locations"
import { contactTopics } from "@/lib/site"
import { cn } from "@/lib/utils"

const initialState: ContactState = { status: "idle", message: "" }

const inputClass =
  "w-full rounded-2xl border-2 border-input bg-white px-4 py-3 text-base outline-none transition focus:border-brand aria-invalid:border-destructive"

function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <span className="relative block">
      <select
        className={cn(inputClass, "appearance-none pr-11", className)}
        {...props}
      />
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </span>
  )
}

function Field({
  label,
  error,
  children,
  optional,
}: {
  label: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-bold text-navy">
        {label}
        {optional && (
          <span className="font-normal text-muted-foreground"> (optional)</span>
        )}
      </span>
      {children}
      {error && (
        <span className="block text-sm font-semibold text-destructive">
          {error}
        </span>
      )}
    </label>
  )
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState)

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[2rem] bg-mint/15 p-10 text-center">
        <CheckCircle2 className="size-12 text-emerald-600" aria-hidden />
        <p className="font-display text-2xl font-bold text-navy" role="status">
          {state.message}
        </p>
      </div>
    )
  }

  const err = state.fieldErrors ?? {}

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={err.name}>
          <input
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!err.name}
            className={inputClass}
          />
        </Field>
        <Field label="Email" error={err.email}>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!err.email}
            className={inputClass}
          />
        </Field>
        <Field label="Phone" optional>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </Field>
        <Field label="Shop">
          <Select name="location" defaultValue="">
            <option value="">Any shop</option>
            {locations.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="What's it about?">
        <Select name="topic" defaultValue={contactTopics[0]}>
          {contactTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </Select>
      </Field>
      <Field label="Message" error={err.message}>
        <textarea
          name="message"
          rows={5}
          required
          aria-invalid={!!err.message}
          placeholder="Tell us about your party, fundraiser or question…"
          className={cn(inputClass, "resize-y")}
        />
      </Field>
      <div className="hidden" aria-hidden>
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-lg font-bold text-white shadow-[0_5px_0_var(--brand-deep)] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-none disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="size-5 animate-spin" aria-hidden />
        ) : (
          <Send className="size-5" aria-hidden />
        )}
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  )
}
