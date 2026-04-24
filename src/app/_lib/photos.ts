export type Photo = {
  id: string
  title: string
  category: "wedding" | "portrait"
  seed: number
  portrait: boolean
}

export const photos: Photo[] = [
  // Wedding
  { id: "w1",  title: "First Dance",       category: "wedding",  seed: 11,  portrait: false },
  { id: "w2",  title: "The Ceremony",      category: "wedding",  seed: 22,  portrait: true  },
  { id: "w3",  title: "Vows",              category: "wedding",  seed: 33,  portrait: false },
  { id: "w4",  title: "Just Married",      category: "wedding",  seed: 44,  portrait: true  },
  { id: "w5",  title: "Golden Hour",       category: "wedding",  seed: 55,  portrait: false },
  { id: "w6",  title: "Reception",         category: "wedding",  seed: 66,  portrait: true  },
  { id: "w7",  title: "Bouquet",           category: "wedding",  seed: 77,  portrait: false },
  { id: "w8",  title: "Together",          category: "wedding",  seed: 88,  portrait: true  },
  { id: "w9",  title: "Candid Moment",     category: "wedding",  seed: 99,  portrait: false },
  { id: "w10", title: "After Dark",        category: "wedding",  seed: 110, portrait: false },
  // Portrait
  { id: "p1",  title: "Soft Light",        category: "portrait", seed: 120, portrait: true  },
  { id: "p2",  title: "Studio",            category: "portrait", seed: 130, portrait: false },
  { id: "p3",  title: "Afternoon",         category: "portrait", seed: 140, portrait: true  },
  { id: "p4",  title: "City Walk",         category: "portrait", seed: 150, portrait: false },
  { id: "p5",  title: "Silhouette",        category: "portrait", seed: 160, portrait: true  },
  { id: "p6",  title: "Candid",            category: "portrait", seed: 170, portrait: false },
  { id: "p7",  title: "Window Light",      category: "portrait", seed: 180, portrait: true  },
  { id: "p8",  title: "Golden Hour",       category: "portrait", seed: 190, portrait: false },
  { id: "p9",  title: "Detail",            category: "portrait", seed: 200, portrait: true  },
  { id: "p10", title: "Quiet",             category: "portrait", seed: 210, portrait: false },
]

export function getPhotosByCategory(category: "wedding" | "portrait"): Photo[] {
  return photos.filter((p) => p.category === category)
}

export function photoSrc(seed: number, portrait: boolean): string {
  const w = portrait ? 800 : 1200
  const h = portrait ? 1000 : 800
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}
