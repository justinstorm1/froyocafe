"use server"

import { getLocation } from "@/lib/locations"
import { contactTopics } from "@/lib/site"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company")) return { status: "success", message: "Thanks!" }

  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()
  const topic = String(formData.get("topic") ?? "")
  const location = getLocation(String(formData.get("location") ?? ""))

  const fieldErrors: ContactState["fieldErrors"] = {}
  if (!name) fieldErrors.name = "Please tell us your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = "Please enter a valid email."
  if (message.length < 5)
    fieldErrors.message = "Please add a little more detail."
  if (message.length > 4000)
    fieldErrors.message = "That's a bit long — please trim it down."
  if (Object.keys(fieldErrors).length) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    }
  }

  // Forward to any JSON webhook (Formspree, Zapier, Make, Slack workflow, etc.).
  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (!webhook) {
    console.warn(
      "CONTACT_WEBHOOK_URL is not set; contact form message was not delivered."
    )
    return {
      status: "error",
      message: location
        ? `Online messages aren't available right now. Please call Fro Yo Cafe ${location.name} at ${location.phone}.`
        : "Online messages aren't available right now. Please give your nearest shop a call.",
    }
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        topic: contactTopics.includes(topic) ? topic : "Something else",
        location: location?.name ?? "Any",
        message,
      }),
    })
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`)
  } catch (err) {
    console.error("Contact form delivery failed", err)
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again or give us a call.",
    }
  }

  return {
    status: "success",
    message: `Thanks, ${name.split(" ")[0]}! Your message is on its way — we'll get back to you soon.`,
  }
}
