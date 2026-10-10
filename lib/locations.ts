// Hours are minutes after midnight, America/New_York. Index 0 = Sunday.
export type DayHours = { open: number; close: number }

export type ToppingGroup = { name: string; items: string[] }

export type Location = {
  slug: "aberdeen" | "manalapan" | "seaview"
  name: string
  town: string
  venue: string
  street: string
  city: string
  state: "NJ"
  zip: string
  phone: string
  hours: DayHours[]
  instagram: string
  facebook?: string
  tiktok?: string
  delivery?: string[]
  flavors: string[]
  rotatingFlavors?: string[]
  toppings: ToppingGroup[]
  hasTreatMenu?: boolean
  blurb: string
}

const h = (open: string, close: string): DayHours => {
  const toMin = (t: string) => {
    const [hh, mm] = t.split(":").map(Number)
    return hh * 60 + mm
  }
  return { open: toMin(open), close: toMin(close) }
}

const sharedToppings: ToppingGroup[] = [
  {
    name: "Bakery",
    items: [
      "Biscoff Cookies",
      "Brownie Bites",
      "Cheesecake",
      "Cookie Dough Pieces",
      "Edible Dough",
      "Frosted Animal",
      "Fudge Strip Cookies",
      "Keebler Cookies",
      "Oreo Cookies",
      "Vanilla Cake",
    ],
  },
  { name: "Boba Balls", items: ["Mango", "Strawberry"] },
  {
    name: "Candy",
    items: [
      "Gummy Bears",
      "Gummy Sharks",
      "Gummy Worms",
      "Nerds",
      "Sour Patch",
      "Sour Worms",
      "Chocolate Sprinkles",
      "Rainbow Sprinkles",
      "Swedish Fish",
    ],
  },
  {
    name: "Chocolate",
    items: [
      "Andes Mints",
      "Carob Chips",
      "Chocolate Chips",
      "Chocolate Pretzels",
      "Chocolate Raspberry Truffles",
      "Chocolate Rocks",
      "Heath Bar",
      "Kit Kat",
      "M&M's",
      "Peanut Butter Cups (Broken)",
      "Peanut Butter Cups (Whole)",
      "Peanut M&M's",
      "Reese's Pieces",
      "Sugar-Free Chocolate Chips",
      "Snickers",
      "Snow Caps",
      "Twix",
    ],
  },
  { name: "Cereal", items: ["Cap'n Crunch", "Fruity Pebbles"] },
  {
    name: "Crunchy & Dry",
    items: [
      "Cake Crunch",
      "Toasted Coconut",
      "Coconut Flakes",
      "Honey Nut Granola",
      "Mini Marshmallows",
      "Mochi Rice Cake",
      "Oreo Crunch",
      "Pistachio Crunch",
      "Strawberry Crunch",
      "Waffle Pieces",
      "Yogurt Chips",
    ],
  },
  { name: "Dubai", items: ["Dubai Chocolate", "Kataifi", "Pistachio Butter"] },
  {
    name: "Fruit Toppings",
    items: ["Black Cherry", "Blueberry", "Cherries", "Strawberry"],
  },
  {
    name: "Nuts",
    items: [
      "Almonds",
      "Chocolate Almonds",
      "Peanuts",
      "Walnuts",
      "Wet Walnuts",
    ],
  },
  { name: "Real Fruit", items: ["Blueberries", "Pineapple", "Strawberries"] },
  {
    name: "Sauces",
    items: [
      "Biscoff",
      "Butterscotch",
      "Caramel",
      "Hard Shell Crunch",
      "Hershey's Chocolate",
      "Hot Caramel",
      "Hot Fudge",
      "Marshmallow",
      "Nutella",
      "Reese's Peanut Butter Sauce",
      "Raspberry Sauce",
      "SF/FF Hot Fudge",
    ],
  },
]

const sharedFlavors = [
  "Cake Batter",
  "Chocolate",
  "No Sugar Added Vanilla",
  "Chocolate Strawberry",
  "Cookies and Cream",
  "Cookie Cake",
  "Cookie Monster",
  "Double Stuffed Oreo",
  "Original Tart",
  "Peanut Butter",
  "Strawberry Dole Whip (Dairy Free)",
  "Strawberry",
  "Strawberry Tart Creamsicle",
  "Vanilla Peanut Butter",
  "Vanilla",
]

export const locations: Location[] = [
  {
    slug: "aberdeen",
    name: "Aberdeen",
    town: "Matawan",
    venue: "Aberdeen Town Square Plaza",
    street: "1071B NJ-34",
    city: "Matawan",
    state: "NJ",
    zip: "07747",
    phone: "(732) 970-7888",
    hours: [
      h("12:00", "22:00"),
      h("13:00", "22:30"),
      h("13:00", "22:30"),
      h("13:00", "22:30"),
      h("13:00", "22:30"),
      h("13:00", "23:00"),
      h("12:00", "23:00"),
    ],
    instagram: "froyocafe_aberdeen",
    facebook: "https://www.facebook.com/p/Fro-Yo-Cafe-100054461860708/",
    delivery: ["DoorDash", "Uber Eats", "Grubhub"],
    flavors: [
      "Banana",
      "Birthday Cake",
      "Black Raspberry",
      "Cappuccino",
      "Caramel Pretzel",
      "Cherry",
      "Chocolate",
      "Coconut",
      "Coffee",
      "Cookies and Cream",
      "Cotton Candy",
      "Dole Whip",
      "Dulce De Leche",
      "Fudge Brownie",
      "Irish Mint",
      "Lemon",
      "Mango",
      "Orange",
      "Pineapple",
      "Pomegranate",
      "Raspberry",
      "Strawberry",
      "Watermelon",
    ],
    toppings: [
      {
        name: "Bakery",
        items: [
          "Biscoff Crumbles",
          "Brownie Bites",
          "Cheesecake",
          "Cookie Dough Pieces",
          "Edible Dough",
          "Frosted Animal",
          "Keebler Cookies",
          "Oreo Cookies",
          "Rice Krispies",
        ],
      },
      { name: "Boba Balls", items: ["Strawberry", "Mango", "Kiwi", "Cherry"] },
      {
        name: "Candy",
        items: [
          "Gummy Bears",
          "Gummy Worms",
          "Gushers",
          "Nerds",
          "Sour Patch",
          "Sour Worms",
          "Chocolate Sprinkles",
          "Rainbow Sprinkles",
          "Swedish Fish",
        ],
      },
      {
        name: "Chocolate",
        items: [
          "Andes Mints",
          "Carob Chips",
          "Chocolate Chips",
          "Chocolate Pretzels",
          "Chocolate Raspberry Truffles",
          "Chocolate Rocks",
          "Chocolate Raisins",
          "Chocolate Almonds",
          "Chocolate Caramel",
          "Heath Bar",
          "Kit Kat",
          "M&M's",
          "Peanut Butter Cups (Broken)",
          "Peanut Butter Cups (Whole)",
          "Peanut M&M's",
          "Reese's Pieces",
          "Sugar-Free Chocolate Chips",
          "Snickers",
          "Snow Caps",
          "Twix",
        ],
      },
      {
        name: "Cereal",
        items: ["Cap'n Crunch", "Cinnamon Toast Crunch", "Fruity Pebbles"],
      },
      {
        name: "Crunchy & Dry",
        items: [
          "Cake Crunch",
          "Toasted Coconut",
          "Coconut Flakes",
          "Granola",
          "Honey Nut Granola",
          "Mini Marshmallows",
          "Mochi Rice Cake",
          "Rainbow Cookies",
          "Waffle Pieces",
          "Yogurt Chips",
        ],
      },
      {
        name: "Dubai",
        items: ["Dubai Chocolate", "Kataifi", "Pistachio Butter"],
      },
      {
        name: "Fruit Toppings",
        items: ["Black Cherry", "Blueberry", "Strawberry"],
      },
      {
        name: "Nuts",
        items: [
          "Almonds",
          "Chocolate Almonds",
          "Peanuts",
          "Walnuts",
          "Wet Walnuts",
        ],
      },
      {
        name: "Real Fruit",
        items: [
          "Banana",
          "Blueberries",
          "Cherries",
          "Pineapple",
          "Strawberries",
        ],
      },
      sharedToppings.find((g) => g.name === "Sauces")!,
    ],
    hasTreatMenu: true,
    blurb:
      "Our original shop, serving the Bayshore since 2012 from the Aberdeen Town Square Plaza.",
  },
  {
    slug: "manalapan",
    name: "Manalapan",
    town: "Manalapan",
    venue: "Manalapan Epicenter",
    street: "55 US-9 #335",
    city: "Manalapan Township",
    state: "NJ",
    zip: "07726",
    phone: "(732) 761-2345",
    hours: [
      h("13:00", "22:00"),
      h("13:30", "22:00"),
      h("13:30", "22:00"),
      h("13:30", "22:00"),
      h("13:30", "22:00"),
      h("13:30", "23:00"),
      h("13:00", "23:00"),
    ],
    instagram: "froyocafe_manalapan",
    facebook:
      "https://www.facebook.com/p/Fro-Yo-Cafe-Manalapan-61578368165393/",
    tiktok: "froyocafemanalapan",
    flavors: sharedFlavors,
    toppings: sharedToppings,
    blurb:
      "Our newest shop in the Manalapan Epicenter, and home base for dine-to-donate nights.",
  },
  {
    slug: "seaview",
    name: "Seaview",
    town: "Ocean",
    venue: "Seaview Square Mall",
    street: "2317 NJ-66",
    city: "Ocean Township",
    state: "NJ",
    zip: "07712",
    phone: "(732) 361-0113",
    hours: [
      h("13:00", "22:00"),
      h("13:00", "22:00"),
      h("13:00", "22:00"),
      h("13:00", "22:00"),
      h("13:00", "22:00"),
      h("13:00", "23:00"),
      h("13:00", "23:00"),
    ],
    instagram: "froyocafe_seaview",
    tiktok: "froyocafeseaview",
    flavors: sharedFlavors,
    rotatingFlavors: [
      "Pistachio Berry",
      "S'mores",
      "Strawberry Banana",
      "Raspberry",
      "Mango",
      "Cherry",
      "Watermelon",
      "Pineapple Dole Whip",
    ],
    toppings: sharedToppings,
    blurb:
      "Find us inside Seaview Square Mall in Ocean, just minutes from the shore.",
  },
]

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}

export function telHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, "")}`
}

export function fullAddress(l: Location) {
  return `${l.street}, ${l.city}, ${l.state} ${l.zip}`
}

export function mapsHref(l: Location) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Fro Yo Cafe ${fullAddress(l)}`
  )}`
}

export function toppingCount(l: Location) {
  return l.toppings.reduce((n, g) => n + g.items.length, 0)
}
