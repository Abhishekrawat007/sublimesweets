const products = [
  {
    "id": 1,
    "name": "Paneer Do Pyaza",
    "categories": [
      "food",
      "maincourse",
      "bestseller"
    ],
    "description": "Rich and flavorful Paneer Do Pyaza prepare...end of onions and aromatic masalas that melts in your mouth.",
    "images": [
      "images/Paneer-Tikka-Masala-Recipe-Step-By-Step-Instructions.webp",
      "images/kaju-katli-2.webp"
    ],
    "rating": 4.5,
      // ✅ NEW FIELDS (LOCAL VIDEO + YOUTUBE – OPTIONAL)
  "videoFile": "videos/paneer-do-pyaza-720p.mp4", 
  "video": "https://www.youtube.com/watch?v=YOUR_PANEER_VIDEO_ID",
    "variants": [
      {
        "size": "half",
        "oldPrice": 450,
        "newPrice": 380,
        "discount": "16%",
        "inStock": true
      },
      {
        "size": "full",
        "oldPrice": 880,
        "newPrice": 740,
        "discount": "16%",
        "inStock": true
      },
      {
        "size": "1kg",
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
    "categories": [
      "food",
      "maincourse",
      "trending"
    ],
    "description": "Creamy and royal Shahi Paneer cooked in a rich cashew-tomato gravy, mildly spiced and perfect for special occasions and family dinners.",
    "images": [
      "images/butter-chicken-.webp",
      "images/gulab-jamun-2.webp"
    ],
    "rating": 5,
    "variants": [
      {
        "size": "half",
        "oldPrice": 280,
        "newPrice": 220,
        "discount": "21%",
        "inStock": true
      },
      {
        "size": "full",
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
    "categories": [
      "snacks",
      "street-food"
    ],
    "description": "Crispy, crunchy Kurkure namkeen with bold masala flavours, ideal for tea-time snacking or a quick crunchy bite anytime.",
    "images": [
      "images/kurkure.webp",
      "images/kurkure-2.webp"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "90g",
        "oldPrice": 30,
        "newPrice": 25,
        "discount": "17%",
        "inStock": true
      },
      {
        "size": "160g",
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
    "categories": [
      "mithai",
      "sweets"
    ],
    "description": "Soft and juicy Gulab Jamun balls soaked in fragrant sugar syrup, a classic Indian sweet for every celebration.",
    "images": [
      "images/gulabjamun.webp",
      "images/rasgulla-2.webp"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "500g",
        "oldPrice": 200,
        "newPrice": 165,
        "discount": "18%",
        "inStock": true
      },
      {
        "size": "1kg",
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
    "categories": [
      "streetfood",
      "snacks",
      "bestseller"
    ],
    "description": "Crispy golden samosas stuffed with spiced potato filling, served best with chutney for a perfect evening snack.",
    "images": [
      "images/samosa.webp",
      "images/samosa-2.jpg",
      "images/samosa-3.jpg",
      "images/samosa-4.jpg",
      "images/samosa-5.jpg",
      "images/samosa-6.jpg",
      "images/samosa-7.jpg"
    ],
    "rating": 5,
    "videoFile": "videos/samosa-720p.mp4",
    "variants": [
      {
        "size": "4 pieces",
        "oldPrice": 60,
        "newPrice": 50,
        "discount": "17%",
        "inStock": true
      },
      {
        "size": "8 pieces",
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
    "categories": [
      "maincourse",
      "streetfood"
    ],
    "description": "Smoky and juicy paneer tikka marinated in spicy yogurt masala and grilled to perfection for a restaurant-style taste.",
    "images": [
      "images/paneertikka.webp",
      "images/paneer-tikka-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 180,
        "newPrice": 150,
        "discount": "17%",
        "inStock": true
      },
      {
        "size": "500g",
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
    "categories": [
      "snacks",
      "bestseller"
    ],
    "description": "Light and crispy potato chips with popular Lays flavours, perfect for parties, trips, or quick munching.",
    "images": [
      "images/laychips.webp",
      "images/lays-2.jpg"
    ],
    "rating": 4,
    "variants": [
      {
        "size": "52g",
        "oldPrice": 20,
        "newPrice": 18,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "90g",
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
    "categories": [
      "dairy",
      "snacks"
    ],
    "description": "Fresh and pure Amul milk, ideal for daily use in tea, coffee, cooking, or direct consumption.",
    "images": [
      "images/milk.webp",
      "images/milk-2.jpg"
    ],
    "rating": 5,
    "variants": [
      {
        "size": "500ml",
        "oldPrice": 30,
        "newPrice": 28,
        "discount": "7%",
        "inStock": true
      },
      {
        "size": "1L",
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
    "categories": [
      "dryfruits",
      "trending"
    ],
    "description": "Premium quality cashew nuts, perfect for snacking, gifting, or adding richness to your sweets and gravies.",
    "images": [
      "images/kaju.webp",
      "images/cashew-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 280,
        "newPrice": 240,
        "discount": "14%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 540,
        "newPrice": 470,
        "discount": "13%",
        "inStock": true
      },
      {
        "size": "1kg",
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
    "categories": [
      "dairy",
      "breakfast"
    ],
    "description": "Soft and healthy brown bread, great for sandwiches, toast, and everyday breakfast needs.",
    "images": [
      "images/brownbread.webp",
      "images/bread-2.jpg"
    ],
    "rating": 4,
    "variants": [
      {
        "size": "400g",
        "oldPrice": 45,
        "newPrice": 40,
        "discount": "11%",
        "inStock": false
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": false
  },
  {
    "id": 11,
    "name": "Rasgulla",
    "categories": [
      "mithai",
      "sweets",
      "bestseller"
    ],
    "description": "Rasgulla prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/rasgulla.webp",
      "images/rasgulla-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 100,
        "newPrice": 88,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 200,
        "newPrice": 176,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 400,
        "newPrice": 352,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 12,
    "name": "Rasmalai",
    "categories": [
      "mithai",
      "sweets",
      "bestseller"
    ],
    "description": "Rasmalai prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/rasmalai.jpg",
      "images/rasmalai-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 100,
        "newPrice": 88,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 200,
        "newPrice": 176,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 400,
        "newPrice": 352,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 13,
    "name": "Kaju Katli",
    "categories": [
      "mithai",
      "sweets",
      "bestseller"
    ],
    "description": "Kaju Katli prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/kaju-katli.jpg",
      "images/kaju-katli-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 100,
        "newPrice": 88,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 200,
        "newPrice": 176,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 400,
        "newPrice": 352,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 14,
    "name": "Soan Papdi",
    "categories": [
      "mithai",
      "sweets",
      "bestseller"
    ],
    "description": "Soan Papdi prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/soan-papdi.jpg",
      "images/soan-papdi-2.jpg"
    ],
    "rating": 4.9,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 100,
        "newPrice": 88,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 200,
        "newPrice": 176,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 400,
        "newPrice": 352,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 23,
    "name": "Haldiram Bhujia",
    "categories": [
      "snacks",
      "namkeen"
    ],
    "description": "Haldiram Bhujia prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/haldiram-bhujia.jpg",
      "images/haldiram-bhujia-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "80g",
        "oldPrice": 48,
        "newPrice": 45,
        "discount": "6%",
        "inStock": true
      },
      {
        "size": "150g",
        "oldPrice": 90,
        "newPrice": 87,
        "discount": "3%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 24,
    "name": "Moong Dal Namkeen",
    "categories": [
      "snacks",
      "namkeen"
    ],
    "description": "Moong Dal Namkeen prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/moong-dal-namkeen.jpg",
      "images/moong-dal-namkeen-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "80g",
        "oldPrice": 48,
        "newPrice": 45,
        "discount": "6%",
        "inStock": true
      },
      {
        "size": "150g",
        "oldPrice": 90,
        "newPrice": 87,
        "discount": "3%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 25,
    "name": "Masala Peanuts",
    "categories": [
      "snacks",
      "namkeen"
    ],
    "description": "Masala Peanuts prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/masala-peanuts.jpg",
      "images/masala-peanuts-2.jpg"
    ],
    "rating": 4.8,
    "variants": [
      {
        "size": "80g",
        "oldPrice": 48,
        "newPrice": 45,
        "discount": "6%",
        "inStock": true
      },
      {
        "size": "150g",
        "oldPrice": 90,
        "newPrice": 87,
        "discount": "3%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 26,
    "name": "Diet Mixture",
    "categories": [
      "snacks",
      "namkeen"
    ],
    "description": "Diet Mixture prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/diet-mixture.jpg",
      "images/diet-mixture-2.jpg"
    ],
    "rating": 4.2,
    "variants": [
      {
        "size": "80g",
        "oldPrice": 48,
        "newPrice": 45,
        "discount": "6%",
        "inStock": true
      },
      {
        "size": "150g",
        "oldPrice": 90,
        "newPrice": 87,
        "discount": "3%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 33,
    "name": "Cold Drink - Thums Up",
    "categories": [
      "snacks",
      "beverages"
    ],
    "description": "Cold Drink - Thums Up prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/cold-drink-thums-up.jpg",
      "images/cold-drink-thums-up-2.jpg"
    ],
    "rating": 4.9,
    "variants": [
      {
        "size": "250ml",
        "oldPrice": 15,
        "newPrice": 14,
        "discount": "7%",
        "inStock": true
      },
      {
        "size": "500ml",
        "oldPrice": 30,
        "newPrice": 27,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "1L",
        "oldPrice": 60,
        "newPrice": 54,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 34,
    "name": "Cold Drink - Coca Cola",
    "categories": [
      "snacks",
      "beverages"
    ],
    "description": "Cold Drink - Coca Cola prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/cold-drink-coca-cola.jpg",
      "images/cold-drink-coca-cola-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "250ml",
        "oldPrice": 15,
        "newPrice": 14,
        "discount": "7%",
        "inStock": true
      },
      {
        "size": "500ml",
        "oldPrice": 30,
        "newPrice": 27,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "1L",
        "oldPrice": 60,
        "newPrice": 54,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 43,
    "name": "Pav Bhaji",
    "categories": [
      "streetfood",
      "snacks"
    ],
    "description": "Pav Bhaji prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/pav-bhaji.jpg",
      "images/pav-bhaji-2.jpg"
    ],
    "rating": 4.6,
      // ✅ Only YouTube
  "video": "https://www.youtube.com/watch?v=YOUR_PAVBHAJI_VIDEO_ID",
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 120,
        "newPrice": 108,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 240,
        "newPrice": 216,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 480,
        "newPrice": 432,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 44,
    "name": "Vada Pav",
    "categories": [
      "streetfood",
      "snacks"
    ],
    "description": "Vada Pav prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/vada-pav.jpg",
      "images/vada-pav-2.jpg"
    ],
    "rating": 4.8,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 120,
        "newPrice": 108,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 240,
        "newPrice": 216,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 480,
        "newPrice": 432,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 45,
    "name": "Chole Bhature",
    "categories": [
      "streetfood",
      "snacks"
    ],
    "description": "Chole Bhature prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/chole-bhature.jpg",
      "images/chole-bhature-2.jpg"
    ],
    "rating": 4.2,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 120,
        "newPrice": 108,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 240,
        "newPrice": 216,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 480,
        "newPrice": 432,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 46,
    "name": "Aloo Tikki Chaat",
    "categories": [
      "streetfood",
      "snacks"
    ],
    "description": "Aloo Tikki Chaat prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/aloo-tikki-chaat.jpg",
      "images/aloo-tikki-chaat-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 120,
        "newPrice": 108,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 240,
        "newPrice": 216,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 480,
        "newPrice": 432,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 59,
    "name": "Paneer (Malai)",
    "categories": [
      "dairy",
      "breakfast"
    ],
    "description": "Paneer (Malai) prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/paneer-malai.jpg",
      "images/paneer-malai-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 20,
        "newPrice": 18,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 40,
        "newPrice": 36,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 80,
        "newPrice": 72,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 60,
    "name": "Curd (Dahi)",
    "categories": [
      "dairy",
      "breakfast"
    ],
    "description": "Curd (Dahi) prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/curd-dahi.jpg",
      "images/curd-dahi-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 20,
        "newPrice": 18,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 40,
        "newPrice": 36,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 80,
        "newPrice": 72,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 61,
    "name": "Flavoured Lassi",
    "categories": [
      "dairy",
      "breakfast"
    ],
    "description": "Flavoured Lassi prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/flavoured-lassi.jpg",
      "images/flavoured-lassi-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 20,
        "newPrice": 18,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 40,
        "newPrice": 36,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 80,
        "newPrice": 72,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 71,
    "name": "Almonds (Badam)",
    "categories": [
      "dryfruits",
      "snacks"
    ],
    "description": "Almonds (Badam) prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/almonds-badam.jpg",
      "images/almonds-badam-2.jpg"
    ],
    "rating": 4.2,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 137,
        "newPrice": 120,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 275,
        "newPrice": 242,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 550,
        "newPrice": 484,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 72,
    "name": "Raisins (Kismis)",
    "categories": [
      "dryfruits",
      "snacks"
    ],
    "description": "Raisins (Kismis) prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/raisins-kismis.jpg",
      "images/raisins-kismis-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 137,
        "newPrice": 120,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 275,
        "newPrice": 242,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 550,
        "newPrice": 484,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 81,
    "name": "Vanilla Cup Ice Cream",
    "categories": [
      "icecreams",
      "snacks"
    ],
    "description": "Vanilla Cup Ice Cream prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/vanilla-cup-ice-cream.jpg",
      "images/vanilla-cup-ice-cream-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 180,
        "newPrice": 162,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 360,
        "newPrice": 324,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 720,
        "newPrice": 648,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 82,
    "name": "Chocolate Cone Ice Cream",
    "categories": [
      "icecreams",
      "snacks"
    ],
    "description": "Chocolate Cone Ice Cream prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/chocolate-cone-ice-cream.jpg",
      "images/chocolate-cone-ice-cream-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 180,
        "newPrice": 162,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 360,
        "newPrice": 324,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 720,
        "newPrice": 648,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 93,
    "name": "Dal Makhani",
    "categories": [
      "food",
      "maincourse"
    ],
    "description": "Dal Makhani prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/dal-makhani.jpg",
      "images/dal-makhani-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "half",
        "oldPrice": 130,
        "newPrice": 111,
        "discount": "15%",
        "inStock": true
      },
      {
        "size": "full",
        "oldPrice": 260,
        "newPrice": 213,
        "discount": "18%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 94,
    "name": "Chole Masala",
    "categories": [
      "food",
      "maincourse"
    ],
    "description": "Chole Masala prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/chole-masala.jpg",
      "images/chole-masala-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "half",
        "oldPrice": 130,
        "newPrice": 111,
        "discount": "15%",
        "inStock": true
      },
      {
        "size": "full",
        "oldPrice": 260,
        "newPrice": 213,
        "discount": "18%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 95,
    "name": "Rajma Chawal Combo",
    "categories": [
      "food",
      "maincourse"
    ],
    "description": "Rajma Chawal Combo prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/rajma-chawal-combo.jpg",
      "images/rajma-chawal-combo-2.jpg"
    ],
    "rating": 4.8,
    "variants": [
      {
        "size": "half",
        "oldPrice": 130,
        "newPrice": 111,
        "discount": "15%",
        "inStock": true
      },
      {
        "size": "full",
        "oldPrice": 260,
        "newPrice": 213,
        "discount": "18%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 110,
    "name": "Black Forest Pastry",
    "categories": [
      "pastries",
      "cakes",
      "bakery"
    ],
    "description": "Black Forest Pastry prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/black-forest-pastry.jpg",
      "images/black-forest-pastry-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 160,
        "newPrice": 144,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 320,
        "newPrice": 288,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 640,
        "newPrice": 576,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 111,
    "name": "Chocolate Truffle Pastry",
    "categories": [
      "pastries",
      "cakes",
      "bakery"
    ],
    "description": "Chocolate Truffle Pastry prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/chocolate-truffle-pastry.jpg",
      "images/chocolate-truffle-pastry-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 160,
        "newPrice": 144,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 320,
        "newPrice": 288,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 640,
        "newPrice": 576,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 112,
    "name": "Red Velvet Pastry",
    "categories": [
      "pastries",
      "cakes",
      "bakery"
    ],
    "description": "Red Velvet Pastry prepared fresh for you – perfect for everyday cravings and small celebrations. Packed with quality ingredients and homely taste.",
    "images": [
      "images/red-velvet-pastry.jpg",
      "images/red-velvet-pastry-2.jpg"
    ],
    "rating": 4.2,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 160,
        "newPrice": 144,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "2 pieces",
        "oldPrice": 320,
        "newPrice": 288,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 640,
        "newPrice": 576,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },  {
    "id": 113,
    "name": "Motichoor Laddu",
    "categories": ["mithai", "sweets", "bestseller"],
    "description": "Soft and rich Motichoor laddus, made with desi ghee and boondi pearls for a perfect festive sweet.",
    "images": [
      "images/motichoor-laddu.jpg",
      "images/motichoor-laddu-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 140,
        "newPrice": 125,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 270,
        "newPrice": 240,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 520,
        "newPrice": 470,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 114,
    "name": "Jalebi",
    "categories": ["mithai", "sweets", "streetfood"],
    "description": "Crispy hot jalebis soaked in kesar sugar syrup, best enjoyed with rabri or alone.",
    "images": [
      "images/jalebi.jpg",
      "images/jalebi-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 120,
        "newPrice": 105,
        "discount": "13%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 230,
        "newPrice": 205,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 115,
    "name": "Milk Cake",
    "categories": ["mithai", "sweets"],
    "description": "Traditional milk cake made with slow-cooked milk and sugar, with a rich grainy texture.",
    "images": [
      "images/milk-cake.jpg",
      "images/milk-cake-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 160,
        "newPrice": 140,
        "discount": "13%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 310,
        "newPrice": 275,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 116,
    "name": "Besan Laddu",
    "categories": ["mithai", "sweets"],
    "description": "Homestyle besan laddus roasted in ghee and flavoured with cardamom and dry fruits.",
    "images": [
      "images/besan-laddu.jpg",
      "images/besan-laddu-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 130,
        "newPrice": 115,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 250,
        "newPrice": 225,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 117,
    "name": "Mysore Pak",
    "categories": ["mithai", "sweets"],
    "description": "South Indian style Mysore Pak with rich ghee flavour and soft, melt-in-mouth texture.",
    "images": [
      "images/mysore-pak.jpg",
      "images/mysore-pak-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 170,
        "newPrice": 150,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 320,
        "newPrice": 285,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 118,
    "name": "Kesar Peda",
    "categories": ["mithai", "sweets"],
    "description": "Soft and fragrant peda made with mawa and saffron, perfect for gifting and puja.",
    "images": [
      "images/kesar-peda.jpg",
      "images/kesar-peda-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 190,
        "newPrice": 170,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 360,
        "newPrice": 325,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Kesar", "Plain Mawa"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 119,
    "name": "Boondi Laddu",
    "categories": ["mithai", "sweets"],
    "description": "Fresh boondi laddus made with desi ghee, ideal for prasad and celebrations.",
    "images": [
      "images/boondi-laddu.jpg",
      "images/boondi-laddu-2.jpg"
    ],
    "rating": 4.2,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 130,
        "newPrice": 118,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 250,
        "newPrice": 228,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 120,
    "name": "Kaju Roll",
    "categories": ["mithai", "sweets", "trending"],
    "description": "Premium kaju rolls stuffed with pista filling, perfect for premium gifting.",
    "images": [
      "images/kaju-roll.jpg",
      "images/kaju-roll-2.jpg"
    ],
    "rating": 4.8,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 260,
        "newPrice": 230,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 510,
        "newPrice": 455,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },

  {
    "id": 121,
    "name": "Aloo Bhujia",
    "categories": ["snacks", "namkeen"],
    "description": "Crispy aloo bhujia namkeen with tangy masala flavour, great with tea or cold drinks.",
    "images": [
      "images/aloo-bhujia.jpg",
      "images/aloo-bhujia-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "80g",
        "oldPrice": 35,
        "newPrice": 30,
        "discount": "14%",
        "inStock": true
      },
      {
        "size": "200g",
        "oldPrice": 75,
        "newPrice": 68,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Classic Masala"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 122,
    "name": "Corn Chips Nachos",
    "categories": ["snacks"],
    "description": "Crunchy corn nacho chips, perfect for dips and party snacking.",
    "images": [
      "images/nachos.jpg",
      "images/nachos-2.jpg"
    ],
    "rating": 4.1,
    "variants": [
      {
        "size": "70g",
        "oldPrice": 40,
        "newPrice": 35,
        "discount": "13%",
        "inStock": true
      },
      {
        "size": "150g",
        "oldPrice": 80,
        "newPrice": 72,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Peri Peri", "Cheese Jalapeno"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 123,
    "name": "Salted Popcorn",
    "categories": ["snacks"],
    "description": "Ready-to-eat salted popcorn for movie time and light snacking.",
    "images": [
      "images/salted-popcorn.jpg",
      "images/salted-popcorn-2.jpg"
    ],
    "rating": 4.0,
    "variants": [
      {
        "size": "40g",
        "oldPrice": 30,
        "newPrice": 26,
        "discount": "13%",
        "inStock": true
      },
      {
        "size": "90g",
        "oldPrice": 60,
        "newPrice": 52,
        "discount": "13%",
        "inStock": true
      }
    ],
    "flavors": ["Salted"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 124,
    "name": "Masala Peanut Chaat Bowl",
    "categories": ["snacks", "streetfood"],
    "description": "Spicy masala peanut chaat mixed with onions, tomatoes and chutneys.",
    "images": [
      "images/masala-peanut-chaat.jpg",
      "images/masala-peanut-chaat-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "single bowl",
        "oldPrice": 60,
        "newPrice": 55,
        "discount": "8%",
        "inStock": true
      },
      {
        "size": "family bowl",
        "oldPrice": 120,
        "newPrice": 110,
        "discount": "8%",
        "inStock": true
      }
    ],
    "flavors": ["Extra Spicy", "Mild"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 125,
    "name": "Frooti Mango Drink",
    "categories": ["snacks", "beverages"],
    "description": "Refreshing mango drink, loved by kids and adults for a quick fruity sip.",
    "images": [
      "images/frooti.jpg",
      "images/frooti-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "160ml",
        "oldPrice": 15,
        "newPrice": 14,
        "discount": "7%",
        "inStock": true
      },
      {
        "size": "600ml",
        "oldPrice": 45,
        "newPrice": 40,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": ["Mango"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 126,
    "name": "Masala Soda (Jeera)",
    "categories": ["snacks", "beverages", "streetfood"],
    "description": "Chilled jeera masala soda, a tangy digestive drink to refresh your taste buds.",
    "images": [
      "images/jeera-soda.jpg",
      "images/jeera-soda-2.jpg"
    ],
    "rating": 4.2,
    "variants": [
      {
        "size": "200ml",
        "oldPrice": 25,
        "newPrice": 22,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500ml",
        "oldPrice": 45,
        "newPrice": 40,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": ["Jeera Masala"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 127,
    "name": "Cold Coffee Bottle",
    "categories": ["snacks", "beverages"],
    "description": "Ready-to-drink cold coffee with balanced sweetness and strong coffee kick.",
    "images": [
      "images/cold-coffee.jpg",
      "images/cold-coffee-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "200ml",
        "oldPrice": 45,
        "newPrice": 40,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "300ml",
        "oldPrice": 65,
        "newPrice": 58,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": ["Mocha", "Classic"],
    "defaultVariant": 0,
    "inStock": true
  },

  {
    "id": 128,
    "name": "Veg Burger",
    "categories": ["streetfood", "snacks"],
    "description": "Soft bun burger stuffed with crispy veg patty, veggies and sauces.",
    "images": [
      "images/veg-burger.jpg",
      "images/veg-burger-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "single",
        "oldPrice": 80,
        "newPrice": 70,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "combo (burger + fries)",
        "oldPrice": 140,
        "newPrice": 125,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": ["Classic Veg", "Paneer Patty"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 129,
    "name": "Veg Cheese Pizza Slice",
    "categories": ["streetfood", "snacks"],
    "description": "Cheesy veg pizza slice topped with capsicum, onions and oregano.",
    "images": [
      "images/pizza-slice.jpg",
      "images/pizza-slice-2.jpg"
    ],
    "rating": 4.1,
    "variants": [
      {
        "size": "single slice",
        "oldPrice": 90,
        "newPrice": 80,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "2 slices",
        "oldPrice": 170,
        "newPrice": 150,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": ["Cheese", "Cheese & Corn"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 130,
    "name": "Veg Momos (Steamed)",
    "categories": ["streetfood", "snacks", "trending"],
    "description": "Steamed veg momos served with spicy red chutney, a perfect evening snack.",
    "images": [
      "images/veg-momos.jpg",
      "images/veg-momos-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "6 pieces",
        "oldPrice": 90,
        "newPrice": 80,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "10 pieces",
        "oldPrice": 140,
        "newPrice": 125,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": ["Steamed", "Fried"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 131,
    "name": "Paneer Kathi Roll",
    "categories": ["streetfood", "snacks"],
    "description": "Soft rumali roti wrap filled with spicy paneer tikka and veggies.",
    "images": [
      "images/paneer-kathi-roll.jpg",
      "images/paneer-kathi-roll-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "single",
        "oldPrice": 120,
        "newPrice": 110,
        "discount": "8%",
        "inStock": true
      },
      {
        "size": "double combo",
        "oldPrice": 230,
        "newPrice": 210,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Spicy", "Mild"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 132,
    "name": "Chole Kulche",
    "categories": ["streetfood", "maincourse", "food"],
    "description": "Delhi style chole served with soft buttered kulche.",
    "images": [
      "images/chole-kulche.jpg",
      "images/chole-kulche-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "single plate",
        "oldPrice": 110,
        "newPrice": 99,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "jumbo plate",
        "oldPrice": 160,
        "newPrice": 145,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },

  {
    "id": 133,
    "name": "Fresh Malai Paneer Block",
    "categories": ["dairy"],
    "description": "Soft and fresh malai paneer block ideal for sabzis and tikkas.",
    "images": [
      "images/fresh-paneer-block.jpg",
      "images/fresh-paneer-block-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "200g",
        "oldPrice": 90,
        "newPrice": 82,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "400g",
        "oldPrice": 175,
        "newPrice": 158,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 134,
    "name": "Amul Butter",
    "categories": ["dairy", "breakfast"],
    "description": "Classic Amul salted butter, perfect for parathas, toast and cooking.",
    "images": [
      "images/amul-butter.jpg",
      "images/amul-butter-2.jpg"
    ],
    "rating": 4.9,
    "variants": [
      {
        "size": "100g",
        "oldPrice": 60,
        "newPrice": 58,
        "discount": "3%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 290,
        "newPrice": 275,
        "discount": "5%",
        "inStock": true
      }
    ],
    "flavors": ["Salted"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 135,
    "name": "Processed Cheese Slices",
    "categories": ["dairy", "breakfast"],
    "description": "Cheese slices ideal for sandwiches and burgers.",
    "images": [
      "images/cheese-slices.jpg",
      "images/cheese-slices-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "10 slices pack",
        "oldPrice": 90,
        "newPrice": 82,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "20 slices pack",
        "oldPrice": 170,
        "newPrice": 155,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Plain"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 136,
    "name": "Buttermilk (Chaas)",
    "categories": ["dairy", "beverages"],
    "description": "Cool and light buttermilk seasoned with jeera and salt.",
    "images": [
      "images/buttermilk.jpg",
      "images/buttermilk-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "200ml",
        "oldPrice": 20,
        "newPrice": 18,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "1L family pack",
        "oldPrice": 60,
        "newPrice": 54,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Salted", "Masala"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 137,
    "name": "Flavoured Milk (Kesar Badam)",
    "categories": ["dairy", "beverages"],
    "description": "Chilled flavoured milk with kesar and badam, kids favourite.",
    "images": [
      "images/flavoured-milk-kesar-badam.jpg",
      "images/flavoured-milk-kesar-badam-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "200ml",
        "oldPrice": 35,
        "newPrice": 32,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "6 bottle pack",
        "oldPrice": 210,
        "newPrice": 192,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Kesar Badam"],
    "defaultVariant": 0,
    "inStock": true
  },

  {
    "id": 138,
    "name": "Pistachios (Pista)",
    "categories": ["dryfruits", "snacks"],
    "description": "Premium quality roasted pistachios, lightly salted.",
    "images": [
      "images/pista.jpg",
      "images/pista-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 320,
        "newPrice": 285,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 630,
        "newPrice": 565,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Salted"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 139,
    "name": "Walnuts (Akhrot)",
    "categories": ["dryfruits", "snacks"],
    "description": "Halved walnut kernels, great for snacking and baking.",
    "images": [
      "images/walnuts.jpg",
      "images/walnuts-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "250g",
        "oldPrice": 340,
        "newPrice": 300,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "500g",
        "oldPrice": 670,
        "newPrice": 595,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 140,
    "name": "Mixed Dry Fruit Box",
    "categories": ["dryfruits", "mithai"],
    "description": "Gift box with assorted dry fruits like almonds, cashews, raisins and pista.",
    "images": [
      "images/mixed-dry-fruits.jpg",
      "images/mixed-dry-fruits-2.jpg"
    ],
    "rating": 4.8,
    "variants": [
      {
        "size": "500g box",
        "oldPrice": 580,
        "newPrice": 520,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "1kg box",
        "oldPrice": 1150,
        "newPrice": 1025,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },

  {
    "id": 141,
    "name": "Kulfi Stick (Malai)",
    "categories": ["icecreams", "snacks"],
    "description": "Traditional malai kulfi on stick, rich and creamy.",
    "images": [
      "images/malai-kulfi.jpg",
      "images/malai-kulfi-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 40,
        "newPrice": 36,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 piece family pack",
        "oldPrice": 150,
        "newPrice": 135,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Malai", "Kesar Pista"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 142,
    "name": "Family Pack Ice Cream (Vanilla)",
    "categories": ["icecreams", "snacks"],
    "description": "1 litre vanilla family pack ice cream, perfect for desserts and parties.",
    "images": [
      "images/vanilla-family-pack.jpg",
      "images/vanilla-family-pack-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "500ml",
        "oldPrice": 150,
        "newPrice": 135,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "1L",
        "oldPrice": 260,
        "newPrice": 235,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Vanilla"],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 143,
    "name": "Chocolate Brownie Sundae",
    "categories": ["icecreams", "dessert", "snacks"],
    "description": "Warm brownie topped with ice cream, nuts and chocolate sauce.",
    "images": [
      "images/choco-brownie-sundae.jpg",
      "images/choco-brownie-sundae-2.jpg"
    ],
    "rating": 4.8,
    "variants": [
      {
        "size": "single serving",
        "oldPrice": 180,
        "newPrice": 160,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "sharing bowl",
        "oldPrice": 320,
        "newPrice": 290,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Chocolate", "Walnut"],
    "defaultVariant": 0,
    "inStock": true
  },

  {
    "id": 144,
    "name": "Veg Biryani",
    "categories": ["food", "maincourse", "bestseller"],
    "description": "Aromatic veg biryani cooked with basmati rice, veggies and spices.",
    "images": [
      "images/veg-biryani.jpg",
      "images/veg-biryani-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "regular",
        "oldPrice": 180,
        "newPrice": 160,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "family pack",
        "oldPrice": 340,
        "newPrice": 310,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Plain", "Paneer"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 145,
    "name": "Jeera Rice",
    "categories": ["food", "maincourse"],
    "description": "Fluffy jeera rice, perfect pairing with dals and curries.",
    "images": [
      "images/jeera-rice.jpg",
      "images/jeera-rice-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "single serve",
        "oldPrice": 110,
        "newPrice": 99,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "family bowl",
        "oldPrice": 210,
        "newPrice": 190,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 146,
    "name": "Butter Naan",
    "categories": ["food", "maincourse"],
    "description": "Tandoor baked butter naan brushed with desi ghee.",
    "images": [
      "images/butter-naan.jpg",
      "images/butter-naan-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "2 pieces",
        "oldPrice": 70,
        "newPrice": 60,
        "discount": "14%",
        "inStock": true
      },
      {
        "size": "4 pieces",
        "oldPrice": 130,
        "newPrice": 115,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": ["Plain", "Garlic"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 147,
    "name": "Deluxe Veg Thali",
    "categories": ["food", "maincourse"],
    "description": "Full Indian meal with 2 sabzis, dal, rice, roti, salad and sweet.",
    "images": [
      "images/deluxe-veg-thali.jpg",
      "images/deluxe-veg-thali-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "single thali",
        "oldPrice": 260,
        "newPrice": 230,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "jumbo thali",
        "oldPrice": 340,
        "newPrice": 305,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },

  {
    "id": 148,
    "name": "Pineapple Pastry",
    "categories": ["pastries", "cakes", "bakery"],
    "description": "Soft sponge pastry layered with pineapple cream and pieces.",
    "images": [
      "images/pineapple-pastry.jpg",
      "images/pineapple-pastry-2.jpg"
    ],
    "rating": 4.1,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 140,
        "newPrice": 125,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "4 pieces box",
        "oldPrice": 540,
        "newPrice": 490,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Pineapple"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 149,
    "name": "Butterscotch Pastry",
    "categories": ["pastries", "cakes", "bakery"],
    "description": "Butterscotch pastry with crunchy praline and caramel drizzle.",
    "images": [
      "images/butterscotch-pastry.jpg",
      "images/butterscotch-pastry-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 150,
        "newPrice": 135,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces box",
        "oldPrice": 580,
        "newPrice": 525,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Butterscotch"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 150,
    "name": "Chocolate Truffle Cake 1kg",
    "categories": ["cakes", "bakery", "bestseller"],
    "description": "Rich chocolate truffle cake, fully covered in dark chocolate ganache.",
    "images": [
      "images/chocolate-truffle-cake.jpg",
      "images/chocolate-truffle-cake-2.jpg"
    ],
    "rating": 4.9,
    "variants": [
      {
        "size": "500g",
        "oldPrice": 520,
        "newPrice": 480,
        "discount": "8%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 950,
        "newPrice": 880,
        "discount": "7%",
        "inStock": true
      }
    ],
    "flavors": ["Chocolate"],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 151,
    "name": "Fresh Fruit Cake",
    "categories": ["cakes", "bakery"],
    "description": "Vanilla base cake topped with seasonal fresh fruits and light cream.",
    "images": [
      "images/fresh-fruit-cake.jpg",
      "images/fresh-fruit-cake-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "500g",
        "oldPrice": 560,
        "newPrice": 510,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "1kg",
        "oldPrice": 1050,
        "newPrice": 960,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Vanilla Fruit"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 152,
    "name": "Red Velvet Cream Cake",
    "categories": ["cakes", "bakery", "pastries"],
    "description": "Premium red velvet cream cake with cheese frosting layers.",
    "images": [
      "images/red-velvet-cake.jpg",
      "images/red-velvet-cake-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "500g",
        "oldPrice": 590,
        "newPrice": 540,
        "discount": "8%",
        "inStock": false
      },
      {
        "size": "1kg",
        "oldPrice": 1120,
        "newPrice": 1020,
        "discount": "9%",
        "inStock": false
      }
    ],
    "flavors": ["Red Velvet"],
    "defaultVariant": 0,
    "inStock": false
  },  {
    "id": 153,
    "name": "Chocolate Cone Ice Cream",
    "categories": ["icecreams", "snacks"],
    "description": "Crispy waffle cone filled with rich chocolate ice cream and choco chips on top.",
    "images": [
      "images/choco-cone.jpg",
      "images/choco-cone-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "single cone",
        "oldPrice": 45,
        "newPrice": 40,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "4 cones pack",
        "oldPrice": 170,
        "newPrice": 150,
        "discount": "12%",
        "inStock": true
      }
    ],
    "flavors": ["Chocolate"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 154,
    "name": "Mango Duet Bar",
    "categories": ["icecreams", "snacks"],
    "description": "Creamy vanilla core wrapped in tangy mango ice shell for a perfect summer treat.",
    "images": [
      "images/mango-duet.jpg",
      "images/mango-duet-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 35,
        "newPrice": 32,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "6 pieces pack",
        "oldPrice": 210,
        "newPrice": 190,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Mango Vanilla"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 155,
    "name": "Strawberry Scoop Cup",
    "categories": ["icecreams", "dessert"],
    "description": "Single-serve strawberry ice cream cup topped with fruit chunks.",
    "images": [
      "images/strawberry-cup.jpg",
      "images/strawberry-cup-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "100ml cup",
        "oldPrice": 40,
        "newPrice": 36,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "500ml tub",
        "oldPrice": 170,
        "newPrice": 155,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Strawberry"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 156,
    "name": "Kesar Pista Family Pack",
    "categories": ["icecreams", "dessert"],
    "description": "Traditional kesar pista ice cream with real nuts in a family pack tub.",
    "images": [
      "images/kesar-pista-icecream.jpg",
      "images/kesar-pista-icecream-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "500ml",
        "oldPrice": 190,
        "newPrice": 170,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "1L",
        "oldPrice": 340,
        "newPrice": 310,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Kesar Pista"],
    "defaultVariant": 1,
    "inStock": true
  },
  {
    "id": 157,
    "name": "Cassata Slice",
    "categories": ["icecreams", "dessert"],
    "description": "Colourful layered cassata ice cream with nuts and sponge base.",
    "images": [
      "images/cassata.jpg",
      "images/cassata-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "single slice",
        "oldPrice": 80,
        "newPrice": 72,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 slice pack",
        "oldPrice": 310,
        "newPrice": 280,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Mixed Flavours"],
    "defaultVariant": 0,
    "inStock": true
  },

  {
    "id": 158,
    "name": "Black Forest Pastry",
    "categories": ["pastries", "cakes", "bakery"],
    "description": "Classic black forest pastry with layers of chocolate sponge, cream and cherries.",
    "images": [
      "images/black-forest-pastry.jpg",
      "images/black-forest-pastry-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 150,
        "newPrice": 135,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "4 pieces box",
        "oldPrice": 580,
        "newPrice": 530,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Black Forest"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 159,
    "name": "Chocolate Lava Pastry",
    "categories": ["pastries", "dessert", "bakery"],
    "description": "Gooey chocolate lava filled pastry with rich molten centre.",
    "images": [
      "images/choco-lava-pastry.jpg",
      "images/choco-lava-pastry-2.jpg"
    ],
    "rating": 4.7,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 170,
        "newPrice": 155,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "4 pieces box",
        "oldPrice": 640,
        "newPrice": 590,
        "discount": "8%",
        "inStock": true
      }
    ],
    "flavors": ["Chocolate Lava"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 160,
    "name": "Opera Coffee Pastry",
    "categories": ["pastries", "bakery"],
    "description": "Premium coffee-flavoured pastry with layers of sponge and ganache.",
    "images": [
      "images/opera-pastry.jpg",
      "images/opera-pastry-2.jpg"
    ],
    "rating": 4.3,
    "variants": [
      {
        "size": "1 piece",
        "oldPrice": 170,
        "newPrice": 150,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "4 pieces box",
        "oldPrice": 640,
        "newPrice": 580,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": ["Coffee"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 161,
    "name": "Mini Muffin Assorted Pack",
    "categories": ["pastries", "bakery", "snacks"],
    "description": "Box of assorted mini muffins in chocolate, vanilla and fruit flavours.",
    "images": [
      "images/mini-muffins.jpg",
      "images/mini-muffins-2.jpg"
    ],
    "rating": 4.2,
    "variants": [
      {
        "size": "6 pieces",
        "oldPrice": 170,
        "newPrice": 155,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "12 pieces",
        "oldPrice": 320,
        "newPrice": 295,
        "discount": "8%",
        "inStock": true
      }
    ],
    "flavors": ["Chocolate", "Vanilla", "Fruit Mix"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 162,
    "name": "Dry Fruit Slice Cake",
    "categories": ["pastries", "cakes", "bakery"],
    "description": "Slice cake loaded with raisins, cashews and tutti-frutti.",
    "images": [
      "images/dry-fruit-cake.jpg",
      "images/dry-fruit-cake-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "1 slice",
        "oldPrice": 80,
        "newPrice": 72,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "400g loaf",
        "oldPrice": 260,
        "newPrice": 235,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Dry Fruit"],
    "defaultVariant": 1,
    "inStock": true
  },

  {
    "id": 163,
    "name": "Paneer Butter Masala",
    "categories": ["food", "maincourse", "bestseller"],
    "description": "Restaurant-style paneer butter masala cooked in rich tomato-butter gravy.",
    "images": [
      "images/paneer-butter-masala.jpg",
      "images/paneer-butter-masala-2.jpg"
    ],
    "rating": 4.9,
    "variants": [
      {
        "size": "half",
        "oldPrice": 260,
        "newPrice": 230,
        "discount": "12%",
        "inStock": true
      },
      {
        "size": "full",
        "oldPrice": 490,
        "newPrice": 450,
        "discount": "8%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 164,
    "name": "Dal Makhani",
    "categories": ["food", "maincourse"],
    "description": "Slow-cooked creamy dal makhani with authentic Punjabi flavours.",
    "images": [
      "images/dal-makhani.jpg",
      "images/dal-makhani-2.jpg"
    ],
    "rating": 4.6,
    "variants": [
      {
        "size": "single serve",
        "oldPrice": 180,
        "newPrice": 160,
        "discount": "11%",
        "inStock": true
      },
      {
        "size": "family bowl",
        "oldPrice": 330,
        "newPrice": 300,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 165,
    "name": "Rajma Chawal Bowl",
    "categories": ["food", "maincourse"],
    "description": "Comfort food combo of Punjabi rajma served with steamed rice.",
    "images": [
      "images/rajma-chawal.jpg",
      "images/rajma-chawal-2.jpg"
    ],
    "rating": 4.5,
    "variants": [
      {
        "size": "regular bowl",
        "oldPrice": 160,
        "newPrice": 145,
        "discount": "9%",
        "inStock": true
      },
      {
        "size": "large bowl",
        "oldPrice": 210,
        "newPrice": 190,
        "discount": "9%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 166,
    "name": "Veg Manchurian with Fried Rice",
    "categories": ["food", "maincourse", "trending"],
    "description": "Chinese combo of veg manchurian gravy served with veg fried rice.",
    "images": [
      "images/veg-manchurian-rice.jpg",
      "images/veg-manchurian-rice-2.jpg"
    ],
    "rating": 4.4,
    "variants": [
      {
        "size": "regular combo",
        "oldPrice": 210,
        "newPrice": 190,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "jumbo combo",
        "oldPrice": 260,
        "newPrice": 235,
        "discount": "10%",
        "inStock": true
      }
    ],
    "flavors": ["Gravy", "Semi-dry"],
    "defaultVariant": 0,
    "inStock": true
  },
  {
    "id": 167,
    "name": "Chole Bhature Plate",
    "categories": ["food", "maincourse", "streetfood"],
    "description": "North Indian favourite chole served with 2 fluffy bhature, pickle and onions.",
    "images": [
      "images/chole-bhature.jpg",
      "images/chole-bhature-2.jpg"
    ],
    "rating": 4.8,
    "variants": [
      {
        "size": "standard plate",
        "oldPrice": 150,
        "newPrice": 135,
        "discount": "10%",
        "inStock": true
      },
      {
        "size": "extra chole plate",
        "oldPrice": 190,
        "newPrice": 170,
        "discount": "11%",
        "inStock": true
      }
    ],
    "flavors": [],
    "defaultVariant": 0,
    "inStock": true
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
