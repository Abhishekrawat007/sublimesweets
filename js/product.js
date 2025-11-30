const products = [
  {
    "id": 1,
    "name": "Paneer Do Pyaza",
    "category": "Main Course",
    "categories": ["food", "main course", "bestseller"],
    "images": [
      "images/Paneer-Tikka-Masala-Recipe-Step-By-Step-Instructions.jpg",
      "images/kaju-katli-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "half",
        "weight": "half",
        "oldPrice": 450,
        "newPrice": 380,
        "discount": "16%",
        "inStock": true
      },
      {
        "size": "full",
        "weight": "full",
        "oldPrice": 880,
        "newPrice": 740,
        "discount": "16%",
        "inStock": true
      },
      {
        "size": "1kg",
        "weight": "1kg",
        "oldPrice": 1700,
        "newPrice": 1450,
        "discount": "15%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 2,
    "name": "Shahi Paneer",
    "category": "",
    "categories": ["main course", "", "trending"],
    "images": [
      "images/butter-chicken-.jpg",
      "images/gulab-jamun-2.jpg"
    ],
    "rating": 5.0,
    "variants": [
      {
        "size": "half",
        "weight": "half",
        "oldPrice": 280,
        "newPrice": 220,
        "discount": "21%",
        "inStock": true
      },
      {
        "size": "full",
        "weight": "full",
        "oldPrice": 520,
        "newPrice": 420,
        "discount": "19%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 3,
    "name": "Kurkure",
    "category": "snacks",
    "categories": ["snacks", "street-food", "bestseller"],
    "images": [
      "images/kurkure.jpg",
      "images/kurkure-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "90g",
        "weight": "90g",
        "oldPrice": 30,
        "newPrice": 25,
        "discount": "17%",
        "inStock": true
      },
      {
        "size": "160g",
        "weight": "160g",
        "oldPrice": 50,
        "newPrice": 42,
        "discount": "16%",
        "inStock": true
      }
    ],
    "flavors": [
      "Masala Munch",
      "Green Chutney Style",
      "Chilli Chatka",
      "Solid Masti"
    ],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 4,
    "name": "Gulab Jamun",
    "category": "mithai",
    "categories": ["mithai", "sweets"],
    "images": [
      "images/gulabjamun.jpeg",
      "images/rasgulla-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "500g",
        "weight": "500g",
        "oldPrice": 200,
        "newPrice": 165,
        "discount": "18%",
        "inStock": true
      },
      {
        "size": "1kg",
        "weight": "1kg",
        "oldPrice": 380,
        "newPrice": 320,
        "discount": "16%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 5,
    "name": "Samosa",
    "category": "street-food",
    "categories": ["street-food", "snacks", "bestseller"],
    "images": [
      "images/samosa.webp",
      "images/samosa-2.jpg"
    ],
    "rating": 5.0,
    "variants": [
      {
        "size": "4 pieces",
        "weight": "4 pcs",
        "oldPrice": 60,
        "newPrice": 50,
        "discount": "17%",
        "inStock": true
      },
      {
        "size": "8 pieces",
        "weight": "8 pcs",
        "oldPrice": 110,
        "newPrice": 95,
        "discount": "14%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 6,
    "name": "Paneer Tikka",
    "category": "main-course",
    "categories": ["main-course", "street-food"],
    "images": [
      "images/paneertikka.jpg",
      "images/paneer-tikka-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "250g",
        "weight": "250g",
        "oldPrice": 180,
        "newPrice": 150,
        "discount": "17%",
        "inStock": true
      },
      {
        "size": "500g",
        "weight": "500g",
        "oldPrice": 340,
        "newPrice": 290,
        "discount": "15%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 7,
    "name": "Lays Chips",
    "category": "snacks",
    "categories": ["snacks", "bestseller"],
    "images": [
      "images/laychips.webp",
      "images/lays-2.jpg"
    ],
    "rating": 4.0,
    "variants": [
      {
        "size": "52g",
        "weight": "52g",
        "oldPrice": 20,
        "newPrice": 18,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "90g",
        "weight": "90g",
        "oldPrice": 35,
        "newPrice": 30,
        "discount": "14%",
        "inStock": true
      }
    ],
    "flavors": [
      "Classic Salted",
      "Magic Masala",
      "American Style Cream & Onion"
    ],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 8,
    "name": "Milk (Amul Fresh)",
    "category": "dairy",
    "categories": ["dairy", "drinks"],
    "images": [
      "images/milk.jpg",
      "images/milk-2.jpg"
    ],
    "rating": 5.0,
    "variants": [
      {
        "size": "500ml",
        "weight": "500ml",
        "oldPrice": 30,
        "newPrice": 28,
        "discount": "7%",
        "inStock": true
      },
      {
        "size": "1L",
        "weight": "1L",
        "oldPrice": 58,
        "newPrice": 54,
        "discount": "7%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 9,
    "name": "Cashew Nuts (Kaju)",
    "category": "dry-fruits",
    "categories": ["dry-fruits", "trending"],
    "images": [
      "images/kaju.jpg",
      "images/cashew-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "250g",
        "weight": "250g",
        "oldPrice": 280,
        "newPrice": 240,
        "discount": "14%",
        "inStock": true
      },
      {
        "size": "500g",
        "weight": "500g",
        "oldPrice": 540,
        "newPrice": 470,
        "discount": "13%",
        "inStock": true
      },
      {
        "size": "1kg",
        "weight": "1kg",
        "oldPrice": 1050,
        "newPrice": 920,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 10,
    "name": "Bread (Brown)",
    "category": "bakery",
    "categories": ["bakery", "breakfast"],
    "images": [
      "images/brownbread.webp",
      "images/bread-2.jpg"
    ],
    "rating": 4.0,
    "variants": [
      {
        "size": "400g",
        "weight": "400g",
        "oldPrice": 45,
        "newPrice": 40,
        "discount": "11%",
        "inStock": false
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": false
  }
];

// Works in browser
if (typeof window !== 'undefined') {
  window.products = products;
}

// Works in Node.js / Netlify
if (typeof module !== 'undefined') {
  module.exports = products;
}
console.log('🔥 Final products length inside product.js:', products.length);
console.log('🔥 Last product object:', products[products.length - 1]);
