export const NO_LAYOUT_PAGES = ['/auth', '/auth/reg', '/auth/forgot-password']

export const PASSWORD_CRITERIA = [
    { id: 1, name: "8+ characters", status: false },
    { id: 2, name: "number", status: false },
    { id: 3, name: "special character", status: false },
    { id: 4, name: "1 lowercase character", status: false },
    { id: 5, name: "1 uppercase character", status: false },
]

export const FOOTER_DATA = [
    {
        title: "Storely",
        desc: "Your one-stop destination for quality products at unbeatable prices. Shop with confidence.",
        buttons: ["Download on App Store", "Get it on Google Play"]
    },
    {
        title: "Company",
        items: ["About Us", "Contact Us", "Careers", "Press"]
    },
    {
        title: "Customer Service",
        items: ["Help Center", "Track Order", "Returns & Refunds", "Shipping Info", "Terms & Conditions", "Privacy Policy"]
    },
    {
        title: "Connect with Us",
        items: ["Facebook", "Instagram", "X", "YouTube"]
    }
]

export const SORT_BY_OPTION = [
    {
        id: 1,
        title: 'Featured'
    },
    {
        id: 2,
        title: 'Price: Low to High'
    },
    {
        id: 3,
        title: 'Price: High to Low'
    },
    {
        id: 4,
        title: 'Avg. Customer Review'
    },
    {
        id: 5,
        title: 'New Arrivals'
    },
]

export const FILTERS_CONFIG = [
    {
        id: 1,
        key: 'category',
        label: 'Category',
        type: 'checkbox',
        options: []
    },
    {
        id: 2,
        key: 'brand',
        label: 'Brand',
        type: 'checkbox',
        options: []
    },
    {
        id: 3,
        key: "price",
        label: 'Price',
        type: 'range'
    },
    {
        id: 4,
        key: "discount",
        label: 'Discount',
        type: 'radio',
        options: [
            { label: '10% Off or more', value: 10 },
            { label: '20% Off or more', value: 20 },
            { label: '30% Off or more', value: 30 },
            { label: '50% Off or more', value: 50 },
        ]
    },
    {
        id: 5,
        key: 'ratings',
        label: 'Customer Ratings',
        type: 'radio',
        options: [
            { label: '4★ & above', value: 4 },
            { label: '3★ & above', value: 3 },
        ]
    },
    {
        id: 6,
        key: 'color',
        label: 'Colour',
        type: 'checkbox',
        options: []
    },
]