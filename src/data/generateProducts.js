import { faker } from "@faker-js/faker";
import fs from "fs";

/* ---------------- CONFIG ---------------- */

const PRODUCT_COUNT = 200;
let PRODUCT_ID = 100000;

/* ---------------- COUPONS ---------------- */

const coupons = [
  {
    id: "C-ELEC-10",
    code: "ELEC10",
    type: "PERCENTAGE",
    value: 10,
    description: "10% off on Electronics",
    validTill: "2026-03-31",
    applicableCategories: ["Electronics"]
  },
  {
    id: "C-FASH-500",
    code: "FASH500",
    type: "FLAT",
    value: 500,
    description: "Flat ₹500 off on Fashion above ₹2999",
    validTill: "2026-02-28",
    applicableCategories: ["Fashion"]
  }
];

/* ---------------- PROMOTIONS ---------------- */

const promotions = [
  {
    id: "P-ELEC-DEAL",
    title: "Electronics Mega Deal",
    type: "PERCENTAGE",
    value: 20,
    applicableCategories: ["Electronics"],
    badgeText: "20% OFF",
    validTill: "2026-02-15"
  },
  {
    id: "P-FASH-SALE",
    title: "Fashion Sale",
    type: "PERCENTAGE",
    value: 40,
    applicableCategories: ["Fashion"],
    badgeText: "Flat 40% OFF",
    validTill: "2026-02-10"
  }
];

/* ---------------- CATEGORIES ---------------- */

const CATEGORY_MAP = {
  Books: ["Fiction", "Non-Fiction", "Self Help", "Children"],
  Electronics: ["Mobile Phones", "Laptops", "Headphones"],
  Fashion: ["Men T-Shirts", "Women Dresses", "Footwear"],
  Furniture: ["Sofas", "Beds"],
  "Home Essentials": ["Kitchen", "Decor"],
  "Automobile Essentials": ["Car Accessories"],
  Toys: ["Educational", "Board Games"],
  Grocery: ["Snacks", "Staples"]
};

const COLOR_CATEGORIES = ["Fashion", "Electronics", "Furniture"];
const NO_WARRANTY = ["Books", "Grocery", "Toys"];

/* ---------------- HELPERS ---------------- */

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getAvailability(stock) {
  if (stock === 0) return "OUT_OF_STOCK";
  if (stock < 10) return "LOW_STOCK";
  return "IN_STOCK";
}

function getDescription(category, subCategory) {
  return `Premium ${subCategory.toLowerCase()} from trusted brands in ${category.toLowerCase()} category.`;
}

function getWhatsInTheBox(category) {
  const map = {
    Books: ["1 Book"],
    Electronics: ["Main Product", "User Manual", "Warranty Card"],
    Fashion: ["1 Clothing Item"],
    Furniture: ["Furniture Item", "Assembly Manual"],
    "Home Essentials": ["1 Household Item"],
    "Automobile Essentials": ["1 Auto Accessory"],
    Toys: ["1 Toy"],
    Grocery: ["Packed Grocery Item"]
  };
  return map[category] || ["Product"];
}

function getDeliveryInfo(price) {
  return {
    estimatedDays: faker.number.int({ min: 2, max: 7 }),
    isFreeDelivery: price > 499,
    shippingCharge: price > 499 ? 0 : 49
  };
}

/* ---------------- MAIN ---------------- */

let products = [];
let subCategoryMap = {};

for (const category in CATEGORY_MAP) {
  CATEGORY_MAP[category].forEach(subCategory => {
    subCategoryMap[subCategory] = [];

    const countPerSub = Math.floor(PRODUCT_COUNT / 16);

    for (let i = 0; i < countPerSub; i++) {
      const id = PRODUCT_ID++;
      const stock = faker.number.int({ min: 0, max: 200 });

      const price = faker.number.int({ min: 200, max: 50000 });
      const discount = faker.number.int({ min: 5, max: 40 });
      const title = `${faker.commerce.productAdjective()} ${subCategory}`;

      const product = {
        id,
        sku: `SKU-${id}`,
        slug: slugify(`${title}-${id}`),

        title,
        category,
        subCategory,
        brand: faker.company.name(),

        tags: faker.helpers.arrayElements(
          ["trending", "bestseller", "newArrival", "hot"],
          faker.number.int({ min: 1, max: 2 })
        ),

        isTodaysDeal: faker.datatype.boolean(),

        price,
        specialPrice: Math.round(price * (1 - discount / 100)),
        discountPercentage: discount,

        stock,
        availabilityStatus: getAvailability(stock),

        rating: Number(faker.number.float({ min: 3.5, max: 5, precision: 0.1 })),
        ratingCount: faker.number.int({ min: 10, max: 20000 }),

        seller: {
          name: faker.company.name(),
          rating: Number(
            faker.number.float({ min: 3.5, max: 5, precision: 0.1 })
          )
        },

        manufacturer: {
          name: faker.company.name(),
          country: faker.location.country()
        },

        description: getDescription(category, subCategory),
        whatsInTheBox: getWhatsInTheBox(category),

        delivery: getDeliveryInfo(price),

        returnPolicy: {
          returnable: category !== "Grocery",
          returnWindowDays: category === "Grocery" ? 0 : 7
        },

        warranty: {
          available: !NO_WARRANTY.includes(category),
          durationMonths: NO_WARRANTY.includes(category) ? 0 : 12
        },

        images: Array.from({ length: 4 }).map(() =>
          faker.image.urlLoremFlickr({ category: "product" })
        ),

        promotionIds: promotions
          .filter(p => p.applicableCategories.includes(category))
          .map(p => p.id),

        applicableCouponCodes: coupons
          .filter(c => c.applicableCategories.includes(category))
          .map(c => c.code),

        youMightLike: []
      };

      if (COLOR_CATEGORIES.includes(category)) {
        product.colorsAvailable = faker.helpers.arrayElements(
          ["Black", "White", "Blue", "Red", "Green", "Grey"],
          faker.number.int({ min: 2, max: 4 })
        );
      }

      products.push(product);
      subCategoryMap[subCategory].push(product.sku);
    }
  });
}

/* ---------------- YOU MIGHT LIKE ---------------- */

products = products.map(product => {
  const related = subCategoryMap[product.subCategory].filter(
    sku => sku !== product.sku
  );

  product.youMightLike = faker.helpers.arrayElements(
    related,
    Math.min(4, related.length)
  );

  return product;
});

/* ---------------- SAVE ---------------- */

fs.writeFileSync(
  "products.json",
  JSON.stringify(
    {
      meta: {
        currency: "INR",
        generatedAt: new Date().toISOString()
      },
      coupons,
      promotions,
      products
    },
    null,
    2
  )
);

console.log("✅ products.json generated with ALL must-have fields");
