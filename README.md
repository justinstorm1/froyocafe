# Fro Yo Cafe

Website for [Fro Yo Cafe](https://froyocafenj.com), a family-owned self-serve frozen yogurt shop with locations in Aberdeen, Manalapan and Seaview (Ocean), NJ. Built with Next.js 16, Tailwind CSS 4 and shadcn/ui.

## Development

```bash
npm install
npm run dev
```

## Editing content

Almost all content lives in two files, so most updates don't touch any page code:

- [`lib/locations.ts`](lib/locations.ts): addresses, phone numbers, hours, flavors, toppings and social handles for each shop. Hours are in minutes after midnight, in NJ time, with Sunday first.
- [`lib/site.ts`](lib/site.ts): announcement banner, reviews, press, cakes and pies menu, and contact form topics.

Location pages (`/aberdeen`, `/manalapan`, `/seaview`) are generated from `lib/locations.ts`. To add a shop such as Brick, add an entry there and extend the `slug` union type.

## Contact form

The form posts JSON (`name`, `email`, `phone`, `topic`, `location`, `message`) to `CONTACT_WEBHOOK_URL`. Formspree, Zapier, Make or a Slack workflow all work. If the variable isn't set, the form asks visitors to call their shop instead. See `.env.example`.
