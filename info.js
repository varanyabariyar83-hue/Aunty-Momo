/**
 * GET /api/info
 * Returns Aunty Momo restaurant information as JSON.
 */
export async function onRequestGet() {
  const info = {
    name:     "Aunty Momo",
    tagline:  "Handmade with love, steamed to perfection.",
    phone:    "+91 85277 88210",
    whatsapp: "https://wa.me/918527788210",
    address: {
      line1:   "Main Market, Block C",
      line2:   "Amar Colony, Lajpat Nagar",
      city:    "New Delhi",
      state:   "Delhi",
      pincode: "110024",
      country: "India",
    },
    hours: {
      monday:    "11:00–23:30",
      tuesday:   "11:00–23:30",
      wednesday: "11:00–23:30",
      thursday:  "11:00–23:30",
      friday:    "11:00–23:30",
      saturday:  "11:00–23:30",
      sunday:    "11:00–23:30",
    },
    menu: [
      { id: 1, name: "Steamed Veg Momos",  price: 120, tag: "Bestseller", veg: true  },
      { id: 2, name: "Chicken Momos",      price: 150, tag: "Bestseller", veg: false },
      { id: 3, name: "Pan Fried Momos",    price: 140, tag: "Crispy",     veg: true  },
      { id: 4, name: "Jhol Momo",          price: 160, tag: "Spicy",      veg: true  },
      { id: 5, name: "Tandoori Momos",     price: 180, tag: "Hot Pick",   veg: true  },
      { id: 6, name: "Cheese Momos",       price: 160, tag: "Fan Fav",    veg: true  },
    ],
    halal: true,
  };

  return new Response(JSON.stringify(info, null, 2), {
    status: 200,
    headers: {
      "Content-Type":                "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control":               "public, max-age=3600",
    },
  });
}
