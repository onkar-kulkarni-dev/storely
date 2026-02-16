import { faker } from "@faker-js/faker";
import fs from "fs";

let PRODUCT_ID = 100000;
const TOTAL_PRODUCTS = 200;
const IMAGES_PER_PRODUCT = 4;

/* ---------------- COUPONS & PROMOTIONS ---------------- */
const coupons = [
  { id: "C-ELEC-10", code: "ELEC10", type: "PERCENTAGE", value: 10, description: "10% off on Electronics", validTill: "2026-03-31", applicableCategories: ["Electronics"] }
];
const promotions = [
  { id: "P-ELEC-DEAL", title: "Electronics Mega Deal", type: "PERCENTAGE", value: 20, applicableCategories: ["Electronics"], badgeText: "20% OFF", validTill: "2026-02-15" }
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
  { name: "Nikon D850 DSLR", subCategory: "Cameras", brand: "Nikon" },
  { name: "Canon EOS R6", subCategory: "Cameras", brand: "Canon" },
  { name: "Sony Alpha 7 IV", subCategory: "Cameras", brand: "Sony" },
  { name: "Sony WH-1000XM5", subCategory: "Headphones", brand: "Sony" },
  { name: "Bose QuietComfort 45", subCategory: "Headphones", brand: "Bose" },
  { name: "Apple AirPods Pro 2", subCategory: "Headphones", brand: "Apple" },
  { name: "Apple Watch Series 9", subCategory: "Smart Watches", brand: "Apple" },
  { name: "Samsung Galaxy Watch 6", subCategory: "Smart Watches", brand: "Samsung" },
  { name: "Fitbit Versa 4", subCategory: "Smart Watches", brand: "Fitbit" },
  { name: "Anker PowerCore 20000", subCategory: "Power Banks", brand: "Anker" },
  { name: "Xiaomi 20000mAh Power Bank", subCategory: "Power Banks", brand: "Xiaomi" },
  { name: "Sony PlayStation 5", subCategory: "Gaming", brand: "Sony" },
  { name: "Xbox Series X", subCategory: "Gaming", brand: "Microsoft" },
  { name: "Samsung T7 SSD 1TB", subCategory: "Storage", brand: "Samsung" },
  { name: "SanDisk Extreme Pro 512GB", subCategory: "Storage", brand: "SanDisk" },
  { name: "Philips Norelco Series 9000", subCategory: "Grooming", brand: "Philips" },
  { name: "Braun Series 7", subCategory: "Grooming", brand: "Braun" },
  { name: "Omron Blood Pressure Monitor", subCategory: "Healthcare", brand: "Omron" },
  { name: "Fitbit Charge 6", subCategory: "Healthcare", brand: "Fitbit" }
];

const TRENDING_PRODUCTS = ["Apple iPhone 16", "Samsung Galaxy S25", "Sony PlayStation 5"];

/* ---------------- HELPERS ---------------- */
function slugify(text) { return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
function getAvailability(stock) { if (stock === 0) return "OUT_OF_STOCK"; if (stock < 10) return "LOW_STOCK"; return "IN_STOCK"; }
function getDeliveryInfo(price) { return { estimatedDays: faker.number.int({ min: 2, max: 7 }), isFreeDelivery: price > 499, shippingCharge: price > 499 ? 0 : 49 }; }
function getDimensions() { return { heightCm: faker.number.int({ min: 5, max: 30 }), widthCm: faker.number.int({ min: 5, max: 40 }), depthCm: faker.number.int({ min: 1, max: 10 }) }; }
function getWeight() { return faker.number.int({ min: 100, max: 3000 }); }
function getConnectivity(subCategory) { if (["Mobiles", "Tablets", "Laptops"].includes(subCategory)) return ["Wi-Fi", "Bluetooth", "USB-C"]; if (subCategory === "Cameras") return ["Wi-Fi", "Bluetooth"]; if (subCategory === "Headphones") return ["Bluetooth", "Wired"]; if (subCategory === "Smart Watches") return ["Bluetooth", "Wi-Fi"]; if (subCategory === "Power Banks") return ["USB-C", "Type-A"]; return []; }
function getBatteryLife(subCategory) { if (["Mobiles", "Tablets", "Smart Watches"].includes(subCategory)) return `${faker.number.int({ min: 2000, max: 5000 })} mAh`; if (subCategory === "Headphones") return `${faker.number.int({ min: 10, max: 40 })} hrs`; if (subCategory === "Power Banks") return `${faker.number.int({ min: 5000, max: 30000 })} mAh`; return ""; }
function getFeatures(subCategory) { return faker.helpers.arrayElements(["Bluetooth 5.0", "Noise Cancellation", "Fast Charging", "Water Resistant", "HDR Support", "Touchscreen"], 2); }
function generateReviews(productRating) {
  const reviewCount = faker.number.int({ min: 3, max: 10 });
  const reviews = [];
  for (let i = 0; i < reviewCount; i++) {
    const rating = Math.max(1, Math.min(5, Number((faker.number.float({ min: productRating - 1, max: productRating + 0.5, precision: 0.1 })).toFixed(1))));
    reviews.push({
      reviewerName: faker.person.fullName(),
      rating,
      title: faker.helpers.arrayElement([
        "Excellent Product",
        "Good Value",
        "Not bad",
        "Highly Recommended",
        "Could be better",
        "Disappointed",
        "Exceeded Expectations"
      ]),
      comment: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
      date: faker.date.recent({ days: 90 }).toISOString().split("T")[0]
    });
  }
  return reviews;
}

/* ---------------- MAIN PRODUCT GENERATION ---------------- */
let products = [];
let subCategoryMap = {};
const replicationFactor = Math.ceil(TOTAL_PRODUCTS / BASE_PRODUCTS.length);

for (let i = 0; i < replicationFactor; i++) {
  BASE_PRODUCTS.forEach(prod => {
    const id = PRODUCT_ID++;
    const price = faker.number.int({ min: 500, max: 120000 });
    const discount = faker.number.int({ min: 5, max: 35 });
    const stock = faker.number.int({ min: 0, max: 200 });
    const rating = Number(faker.number.float({ min: 3.5, max: 5, precision: 0.1 }));

    const isTrending = TRENDING_PRODUCTS.includes(prod.name);
    const product = {
      id,
      sku: `SKU-${id}`,
      slug: slugify(`${prod.name}-${id}`),
      title: prod.name,
      category: "Electronics",
      subCategory: prod.subCategory,
      brand: prod.brand,
      // ✅ Add recommended tag
      tags: isTrending
        ? ["trending", "bestseller", "recommended"]
        : faker.helpers.arrayElements(["newArrival", "hot", "bestseller", "recommended"], 2),
      isTodaysDeal: faker.datatype.boolean(),
      price,
      specialPrice: Math.round(price * (1 - discount / 100)),
      discountPercentage: discount,
      stock,
      availabilityStatus: getAvailability(stock),
      rating: Number(faker.number.float({ min: 3.5, max: 5, precision: 0.1 })),
      reviews: generateReviews(rating),
      ratingCount: faker.number.int({ min: 10, max: 20000 }),
      seller: { name: faker.company.name(), rating: Number(faker.number.float({ min: 3.5, max: 5, precision: 0.1 })) },
      manufacturer: { name: prod.brand, country: faker.location.country() },
      description: `${prod.name} is a premium ${prod.subCategory.toLowerCase()} with excellent performance and build quality.`,
      whatsInTheBox: ["Main Product", "User Manual", "Warranty Card"],
      delivery: getDeliveryInfo(price),
      returnPolicy: { returnable: true, returnWindowDays: 7 },
      warranty: { available: true, durationMonths: 12 },
      images: Array.from({ length: IMAGES_PER_PRODUCT }).map((_, idx) =>
        `https://placehold.co/400x400?text=${encodeURIComponent(prod.name)}+${idx + 1}`
      ),
      promotionIds: promotions.map(p => p.id),
      applicableCouponCodes: coupons.map(c => c.code),
      youMightLike: [],
      colorsAvailable: faker.helpers.arrayElements(["Black", "White", "Blue", "Red", "Silver", "Gold"], 3),
      dimensions: getDimensions(),
      weight: getWeight(),
      connectivity: getConnectivity(prod.subCategory),
      batteryLife: getBatteryLife(prod.subCategory),
      features: getFeatures(prod.subCategory)
    };

    products.push(product);
    subCategoryMap[prod.subCategory] = subCategoryMap[prod.subCategory] || [];
    subCategoryMap[prod.subCategory].push(product.sku);
  });
}

/* ---------------- YOU MIGHT LIKE ---------------- */
products = products.map(prod => {
  let related = subCategoryMap[prod.subCategory].filter(sku => sku !== prod.sku);

  // ✅ Ensure always 4 items, pick from other subcategories if needed
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

console.log(`✅ products.json generated with ${products.length} products, recommended tags, reliable images, and full youMightLike functionality!`);
