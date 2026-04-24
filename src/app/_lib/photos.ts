export type Photo = {
  id: string
  title: string
  category: "wedding" | "portrait"
  src: string    // path relative to /public, e.g. "/photos/wedding/first-dance.jpg"
  portrait: boolean
}

export const photos: Photo[] = [
  // Wedding — replace src values with your own file paths under public/
  { id: "w1",  title: "First Dance",   category: "wedding",  src: "/photos/wedding/first-dance.jpg",   portrait: false },
  { id: "w2",  title: "The Ceremony",  category: "wedding",  src: "/photos/wedding/ceremony.jpg",      portrait: true  },
  { id: "w3",  title: "Vows",          category: "wedding",  src: "/photos/wedding/vows.jpg",          portrait: false },
  { id: "w4",  title: "Just Married",  category: "wedding",  src: "/photos/wedding/just-married.jpg",  portrait: true  },
  { id: "w5",  title: "Golden Hour",   category: "wedding",  src: "/photos/wedding/golden-hour.jpg",   portrait: false },
  { id: "w6",  title: "Reception",     category: "wedding",  src: "/photos/wedding/reception.jpg",     portrait: true  },
  { id: "w7",  title: "Bouquet",       category: "wedding",  src: "/photos/wedding/bouquet.jpg",       portrait: false },
  { id: "w8",  title: "Together",      category: "wedding",  src: "/photos/wedding/together.jpg",      portrait: true  },
  { id: "w9",  title: "Candid Moment", category: "wedding",  src: "/photos/wedding/candid.jpg",        portrait: false },
  { id: "w10", title: "After Dark",    category: "wedding",  src: "/photos/wedding/after-dark.jpg",    portrait: false },
  // Portrait — replace src values with your own file paths under public/
  { id: "p1",  title: "Soft Light",    category: "portrait", src: "/photos/portrait/soft-light.jpg",   portrait: true  },
  { id: "p2",  title: "Studio",        category: "portrait", src: "/photos/portrait/studio.jpg",       portrait: false },
  { id: "p3",  title: "Afternoon",     category: "portrait", src: "/photos/portrait/afternoon.jpg",    portrait: true  },
  { id: "p4",  title: "City Walk",     category: "portrait", src: "/photos/portrait/city-walk.jpg",    portrait: false },
  { id: "p5",  title: "Silhouette",    category: "portrait", src: "/photos/portrait/silhouette.jpg",   portrait: true  },
  { id: "p6",  title: "Candid",        category: "portrait", src: "/photos/portrait/candid.jpg",       portrait: false },
  { id: "p7",  title: "Window Light",  category: "portrait", src: "/photos/portrait/window-light.jpg", portrait: true  },
  { id: "p8",  title: "Golden Hour",   category: "portrait", src: "/photos/portrait/golden-hour.jpg",  portrait: false },
  { id: "p9",  title: "Detail",        category: "portrait", src: "/photos/portrait/detail.jpg",       portrait: true  },
  { id: "p10", title: "Quiet",         category: "portrait", src: "/photos/portrait/quiet.jpg",        portrait: false },
]

export function getPhotosByCategory(category: "wedding" | "portrait"): Photo[] {
  return photos.filter((p) => p.category === category)
}
