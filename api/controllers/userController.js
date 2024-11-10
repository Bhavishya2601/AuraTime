const watch = [
    {
        "id": 1,
        "name": "Audemars Piguet Royal Oak Chronograph",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_14.jpg?v=1702265283",
        "price": 8800.00
    },
    {
        "id": 2,
        "name": "Patek Philippe Calatrava 5196G",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_24.jpg?v=1702265389",
        "price": 9200.00
    },
    {
        "id": 3,
        "name": "Rolex Oyster Perpetual 36mm",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_28.jpg?v=1702265274",
        "price": 6400.00
    },
    {
        "id": 4,
        "name": "Jaeger-LeCoultre Master Control Date",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/files/product1_dcdbba4d-9d06-416c-892d-f1a387fc05ba.jpg?v=1702269072",
        "price": 7000.00
    },
    {
        "id": 5,
        "name": "Rolex Datejust 41mm",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_10_69d8537b-bb10-458c-a347-33b936999d39.jpg?v=1702265364",
        "price": 8500.00
    },
    {
        "id": 6,
        "name": "Omega Seamaster Diver 300M",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_27.jpg?v=1702265279",
        "price": 5500.00
    },
    {
        "id": 7,
        "name": "Tudor Black Bay Fifty-Eight",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_26_43877a91-2df2-4c5a-b93f-61a055f2f558.jpg?v=1702265374",
        "price": 3900.00
    },
    {
        "id": 8,
        "name": "Tag Heuer Monaco Calibre 11",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_13_1a5e8ccb-4511-4498-af56-ae3d7f671e61.jpg?v=1702265351",
        "price": 5200.00
    },
    {
        "id": 9,
        "name": "Hublot Classic Fusion Titanium",
        "img": "https://fleir-store-demo.myshopify.com/cdn/shop/products/12.1.png?v=1662457447",
        "price": 9200.00
    },
    {
        "id": 10,
        "name": "Audemars Piguet Royal Oak Offshore Quartz",
        "img": "https://fleir-store-demo.myshopify.com/cdn/shop/products/13.1.png?v=1662457622",
        "price": 7800.00
    },
    {
        "id": 11,
        "name": "Omega Speedmaster Reduced",
        "img": "https://fleir-store-demo.myshopify.com/cdn/shop/products/15.1_fb02f304-59ad-4e64-b388-1c88592dd11f.png?v=1662457983",
        "price": 4100.00
    },
    {
        "id": 12,
        "name": "IWC Pilot’s Watch Mark XVIII",
        "img": "https://dt-watches.myshopify.com/cdn/shop/products/product17_large.jpg?v=1532930073",
        "price": 7200.00
    },
    {
        "id": 13,
        "name": "Breitling Navitimer 8 Automatic 41",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_14.jpg?v=1702265283",
        "price": 6400.00
    },
    {
        "id": 14,
        "name": "Longines Master Collection",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_24.jpg?v=1702265389",
        "price": 3800.00
    },
    {
        "id": 15,
        "name": "Cartier Ronde Louis Cartier",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_28.jpg?v=1702265274",
        "price": 9100.00
    },
    {
        "id": 16,
        "name": "Breguet Tradition 7027",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/files/product1_dcdbba4d-9d06-416c-892d-f1a387fc05ba.jpg?v=1702269072",
        "price": 8300.00
    },
    {
        "id": 17,
        "name": "Girard-Perregaux Laureato 38mm",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_10_69d8537b-bb10-458c-a347-33b936999d39.jpg?v=1702265364",
        "price": 5500.00
    },
    {
        "id": 18,
        "name": "Zenith El Primero Chronomaster 38mm",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_27.jpg?v=1702265279",
        "price": 6900.00
    },
    {
        "id": 19,
        "name": "Cartier Ballon Bleu 33mm",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_26_43877a91-2df2-4c5a-b93f-61a055f2f558.jpg?v=1702265374",
        "price": 8200.00
    },
    {
        "id": 20,
        "name": "Seiko Presage Cocktail Time",
        "img": "https://catier-store-demo.myshopify.com/cdn/shop/products/product_13_1a5e8ccb-4511-4498-af56-ae3d7f671e61.jpg?v=1702265351",
        "price": 3600.00
    }
];

export const getAllWatches = (req, res) => {
    res.json(watch)
}

export const addWatches = (req, res) =>{
    const {name, img, price} = req.body
    const lastWatch = watch[watch.length - 1];
    const nextId = lastWatch ? lastWatch.id + 1 : 1;
    const newWatch = {
        id: nextId,
        name,
        img,
        price
    }
    watch.push(newWatch)
    res.status(201).json(newWatch)
}