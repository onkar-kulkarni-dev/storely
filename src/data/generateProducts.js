import { faker } from "@faker-js/faker";
import fs from "fs";

let PRODUCT_ID = 100000;
const TARGET_PARENT_PRODUCTS = 250;
const IMAGES_PER_PRODUCT = 4;

/* ---------------- COUPONS & PROMOTIONS ---------------- */
const coupons = [
  { id: "C-ELEC-10", code: "ELEC10", type: "PERCENTAGE", value: 10, description: "10% off on Electronics", validTill: "2026-03-31", applicableCategories: ["Electronics"] },
  { id: "C-MOBILE-15", code: "MOB15", type: "PERCENTAGE", value: 15, description: "15% off on Mobiles", validTill: "2026-04-15", applicableCategories: ["Electronics"] },
  { id: "C-SAVE-2000", code: "SAVE2000", type: "FLAT", value: 2000, description: "Flat ₹2000 off on orders above ₹50,000", validTill: "2026-05-01", applicableCategories: ["Electronics"] }
];

const promotions = [
  { id: "P-ELEC-DEAL", title: "Electronics Mega Deal", type: "PERCENTAGE", value: 20, applicableCategories: ["Electronics"], badgeText: "20% OFF", validTill: "2026-02-15" },
  { id: "P-FLASH-15", title: "Flash Sale", type: "PERCENTAGE", value: 15, applicableCategories: ["Electronics"], badgeText: "Flash 15% OFF", validTill: "2026-03-10" },
  { id: "P-WEEKEND-10", title: "Weekend Special", type: "PERCENTAGE", value: 10, applicableCategories: ["Electronics"], badgeText: "Weekend Deal", validTill: "2026-04-01" },
  { id: "P-SUMMER-25", title: "Summer Sale", type: "PERCENTAGE", value: 25, applicableCategories: ["Electronics"], badgeText: "Summer 25% OFF", validTill: "2026-06-01" },
  { id: "P-CLEARANCE", title: "Clearance Offer", type: "PERCENTAGE", value: 30, applicableCategories: ["Electronics"], badgeText: "Clearance 30% OFF", validTill: "2026-07-01" }
];

/* ---------------- PRODUCT LIST ---------------- */
const BASE_PRODUCTS = [
  { name: "Apple iPhone 16", subCategory: "Mobiles", brand: "Apple" },
  { name: "Samsung Galaxy S25", subCategory: "Mobiles", brand: "Samsung" },
  { name: "Xiaomi Redmi Note 12", subCategory: "Mobiles", brand: "Xiaomi" },
  { name: "OnePlus 12", subCategory: "Mobiles", brand: "OnePlus" },
  { name: "Google Pixel 8", subCategory: "Mobiles", brand: "Google" },
  { name: "Apple iPad Pro 12.9", subCategory: "Tablets", brand: "Apple" },
  { name: "Samsung Galaxy Tab S9", subCategory: "Tablets", brand: "Samsung" },
  { name: "Apple MacBook Air M3", subCategory: "Laptops", brand: "Apple" },
  { name: "Dell XPS 13", subCategory: "Laptops", brand: "Dell" },
  { name: "HP Spectre x360", subCategory: "Laptops", brand: "HP" },
  { name: "Lenovo ThinkPad X1", subCategory: "Laptops", brand: "Lenovo" },
  { name: "Sony PlayStation 5", subCategory: "Gaming", brand: "Sony" },
  { name: "Apple Watch Series 10", subCategory: "Smartwatch", brand: "Apple" },
  { name: "Samsung Galaxy Watch 8", subCategory: "Smartwatch", brand: "Samsung" },
  { name: "Amazfit Watch 4", subCategory: "Smartwatch", brand: "Amazfit" },
  { name: "Boat Watch Xtend", subCategory: "Smartwatch", brand: "Boat" },
  { name: "Apple Watch SE 3", subCategory: "Smartwatch", brand: "Apple" },
  { name: "Samsung Fit 4", subCategory: "Smartwatch", brand: "Samsung" },
  { name: "Oppo Enco Buds 2", subCategory: "Headsets", brand: "Oppo" },
  { name: "Oneplus Nord Buds 3", subCategory: "Headsets", brand: "Oneplus" },
  { name: "Boat Airpods Alpha", subCategory: "Headsets", brand: "Boat" },
  { name: "Canon EOS R3 Mirrorless Camera ", subCategory: "Camera", brand: "Canon" },
  { name: "realme T200", subCategory: "Headsets", brand: "realme" },
  { name: "NIKON Z9-BODY Mirrorless Camera", subCategory: "Camera", brand: "Nikon" },
  { name: "GoPro HERO Compact Waterproof Touch Screen Camera", subCategory: "Camera", brand: "GoPro" },
];

const TRENDING_PRODUCTS = ["Apple iPhone 16", "Samsung Galaxy S25", "Sony PlayStation 5"];

const MODEL_SUFFIXES = ["Pro", "Pro Max", "Plus", "Ultra", "5G", "Max", "Prime", "Edge", "Neo", "Lite"];
const RAM_OPTIONS = ["8GB RAM", "12GB RAM", "16GB RAM"];
const STORAGE_OPTIONS = ["128GB", "256GB", "512GB"];

/* ---------------- HELPERS ---------------- */
function slugify(text) { return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function getAvailability(stock) { if (stock === 0) return "OUT_OF_STOCK"; if (stock < 10) return "LOW_STOCK"; return "IN_STOCK"; }
function getDeliveryInfo(price) { return { estimatedDays: faker.number.int({ min: 2, max: 7 }), isFreeDelivery: price > 499, shippingCharge: price > 499 ? 0 : 49 }; }
function getDimensions() { return { heightCm: faker.number.int({ min: 5, max: 30 }), widthCm: faker.number.int({ min: 5, max: 40 }), depthCm: faker.number.int({ min: 1, max: 10 }) }; }
function getWeight() { return faker.number.int({ min: 100, max: 3000 }); }
function getConnectivity(subCategory) { if (["Mobiles", "Tablets", "Laptops"].includes(subCategory)) return ["Wi-Fi", "Bluetooth", "USB-C"]; if (subCategory === "Gaming") return ["Wi-Fi", "HDMI"]; return []; }
function getBatteryLife(subCategory) { if (["Mobiles", "Tablets"].includes(subCategory)) return `${faker.number.int({ min: 3000, max: 6000 })} mAh`; return ""; }
function getFeatures() { return faker.helpers.arrayElements(["Fast Charging", "HDR Support", "Water Resistant", "Dolby Audio", "Touchscreen"], 3); }

function generateReviews(productRating) {
  const reviewCount = faker.number.int({ min: 5, max: 15 });
  const reviews = [];
  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      reviewerName: faker.person.fullName(),
      rating: Number(faker.number.float({ min: 3.5, max: 5, precision: 0.1 })),
      title: faker.helpers.arrayElement(["Excellent", "Very Good", "Worth Buying", "Highly Recommended"]),
      comment: faker.lorem.sentences(2),
      date: faker.date.recent({ days: 90 }).toISOString().split("T")[0]
    });
  }
  return reviews;
}

/* ---------------- REALISTIC TITLE GENERATOR ---------------- */
const usedTitles = new Set();

function generateRealisticTitle(baseName, subCategory) {
  let title;
  do {
    if (["Mobiles", "Tablets", "Laptops"].includes(subCategory)) {
      const suffix = faker.helpers.arrayElement(MODEL_SUFFIXES);
      const ram = faker.helpers.arrayElement(RAM_OPTIONS);
      const storage = faker.helpers.arrayElement(STORAGE_OPTIONS);
      title = `${baseName} ${suffix} (${ram}, ${storage})`;
    } else {
      // Smartwatch, Headsets, Camera → keep baseName + random unique number
      const uniqueId = faker.number.int({ min: 1000, max: 9999 });
      title = `${baseName} ${uniqueId}`;
    }
  } while (usedTitles.has(title));

  usedTitles.add(title);
  return title;
}

/* ---------------- MAIN PRODUCT GENERATION ---------------- */
let products = [];
let subCategoryMap = {};

while (products.length < TARGET_PARENT_PRODUCTS) {
  BASE_PRODUCTS.forEach(prod => {
    if (products.length >= TARGET_PARENT_PRODUCTS) return;

    const id = PRODUCT_ID++;
    const price = faker.number.int({ min: 5000, max: 120000 });
    const discount = faker.number.int({ min: 5, max: 35 });
    const stock = faker.number.int({ min: 0, max: 200 });
    const rating = Number(faker.number.float({ min: 3.5, max: 5, precision: 0.1 }));

    const realisticTitle = generateRealisticTitle(prod.name, prod.subCategory);
    const isTrending = TRENDING_PRODUCTS.includes(prod.name);

    const product = {
      id,
      sku: `SKU-${id}`,
      slug: slugify(`${realisticTitle}-${id}`),
      title: realisticTitle,
      category: "Electronics",
      subCategory: prod.subCategory,
      brand: prod.brand,
      tags: isTrending ? ["trending", "bestseller", "recommended"] :
        faker.helpers.arrayElements(["newArrival", "hot", "bestseller", "recommended"], 2),
      isTodaysDeal: faker.datatype.boolean(),
      price,
      specialPrice: Math.round(price * (1 - discount / 100)),
      discountPercentage: discount,
      stock,
      availabilityStatus: getAvailability(stock),
      rating,
      reviews: generateReviews(rating),
      ratingCount: faker.number.int({ min: 50, max: 20000 }),
      seller: { name: faker.company.name(), rating: Number(faker.number.float({ min: 3.5, max: 5, precision: 0.1 })) },
      manufacturer: { name: prod.brand, country: faker.location.country() },
      description: `${realisticTitle} delivers powerful performance and premium build quality.`,
      whatsInTheBox: ["Main Product", "User Manual", "Warranty Card"],
      delivery: getDeliveryInfo(price),
      returnPolicy: { returnable: true, returnWindowDays: 7 },
      warranty: { available: true, durationMonths: 12 },
      images: Array.from({ length: IMAGES_PER_PRODUCT }).map((_, idx) =>
        `https://placehold.co/400x400?text=${encodeURIComponent(realisticTitle)}+${idx + 1}`
      ),
      promotionIds: promotions.map(p => p.id),
      applicableCouponCodes: coupons.map(c => c.code),
      youMightLike: [],
      colorsAvailable: faker.helpers.arrayElements(["Black", "White", "Blue", "Silver", "Gold"], 3),
      dimensions: getDimensions(),
      weight: getWeight(),
      connectivity: getConnectivity(prod.subCategory),
      batteryLife: getBatteryLife(prod.subCategory),
      features: getFeatures()
    };

    products.push(product);
    subCategoryMap[prod.subCategory] = subCategoryMap[prod.subCategory] || [];
    subCategoryMap[prod.subCategory].push(product.sku);
  });
}

/* ---------------- YOU MIGHT LIKE ---------------- */
products = products.map(prod => {
  let related = subCategoryMap[prod.subCategory].filter(sku => sku !== prod.sku);

  if (related.length < 4) {
    const otherSKUs = products
      .filter(p => p.subCategory !== prod.subCategory && p.sku !== prod.sku)
      .map(p => p.sku);
    related = [...related, ...otherSKUs];
  }

  prod.youMightLike = faker.helpers.arrayElements(related, Math.min(4, related.length));
  return prod;
});

/* ---------------- SAVE ---------------- */
fs.writeFileSync("products.json", JSON.stringify({
  meta: { currency: "INR", generatedAt: new Date().toISOString() },
  coupons,
  promotions,
  products
}, null, 2));

console.log(`✅ products.json generated with ${products.length} realistic products`);
