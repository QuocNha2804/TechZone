// ============ DANH MỤC ============
const categories = [
  { id: "phone", name: "Điện thoại", icon: "bi-phone" },
  { id: "laptop", name: "Laptop", icon: "bi-laptop" },
  { id: "tablet", name: "Tablet", icon: "bi-tablet" },
  { id: "accessory", name: "Phụ kiện", icon: "bi-headphones" },
  { id: "watch", name: "Đồng hồ", icon: "bi-smartwatch" },
];

// ============ THƯƠNG HIỆU ============
const brands = [
  {
    id: "apple",
    name: "Apple",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzAgMTcwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICA8cGF0aCBmaWxsPSIjMTExODI3IiBkPSJNMTUwLjM3IDEzMC4yNWMtMi40NSA1LjY2LTUuMzUgMTAuODctOC43MSAxNS42Ni00LjU4IDYuNTMtOC4zMyAxMS4wNS0xMS4yMiAxMy41Ni00LjQ4IDQuMTItOS4yOCA2LjIzLTE0LjQyIDYuMzUtMy42OSAwLTguMTQtMS4wNS0xMy4zMi0zLjE4LTUuMTktMi4xMi05Ljk3LTMuMTctMTQuMzQtMy4xNy00LjU4IDAtOS40OSAxLjA1LTE0Ljc1IDMuMTctNS4yNiAyLjEzLTkuNSAzLjI0LTEyLjc0IDMuMzUtNC4zNS4xMy05LjE2LTEuOS0xNC40Mi02LjA4LTMuNjktMy4wNC03LjY3LTcuODUtMTEuOTQtMTQuNDItNi41My0xMC4wMi0xMS42Ni0yMS43NS0xNS40LTM1LjE5LTMuNzQtMTMuNDQtNS42MS0yNi4yMy01LjYxLTM4LjM3IDAtMTQuODIgMy43NC0yNy4xNCAxMS4yMi0zNi45NiA3LjQ4LTkuODIgMTcuMDctMTQuODUgMjguNzctMTUuMDkgNC4zNSAwIDkuNCAxLjE2IDE1LjE1IDMuNDggNS43NSAyLjMyIDkuNTMgMy41MyAxMS4zNCAzLjYzIDEuNDUgMCA1LjQ4LTEuMjggMTIuMDktMy44NCA2LjYxLTIuNTYgMTIuMTYtMy42OSAxNi42NS0zLjM5IDEyLjYzLjczIDIyLjg0IDUuMzggMzAuNjMgMTMuOTUtMTAuODkgNi41My0xNi4yMiAxNS42Ni0xNiAyNy4zOS4yMiA5LjE0IDMuODIgMTYuOTIgMTAuOCAyMy4zMyA2Ljk4IDYuNDEgMTUuMzUgMTAuMDQgMjUuMTEgMTAuODktMi4wMyA2LjEtNC40OSAxMi4yOC03LjM5IDE4LjU0em0tMjguNzctMTA0LjljMC02Ljc1IDIuNS0xMy4wNiA3LjUtMTcuOTMgNS00Ljg3IDExLjItOC4wOCAxOC42LTkuNjMuMSAxLjQ1LjE1IDIuNjIuMTUgMy41MSAwIDYuNjQtMi42IDEzLjA2LTcuOCAxOC4yNi01LjIgNS4yLTExLjY3IDguMzUtMTkuNDEgOS40NS0uNDgtMS4yLS43Mi0yLjQtLjcyLTMuNjZ6Ii8+Cjwvc3ZnPg==",
    desc: "Thương hiệu công nghệ hàng đầu thế giới",
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDx0ZXh0IHg9IjEyMCIgeT0iNDIiIGZvbnQtZmFtaWx5PSInSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIzNCIgbGV0dGVyLXNwYWNpbmc9IjMiIGZpbGw9IiMwYzRkYTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNBTVNVTkc8L3RleHQ+Cjwvc3ZnPg==",
    desc: "Tập đoàn điện tử lớn nhất Hàn Quốc",
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxyZWN0IHg9IjgiIHk9IjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcng9IjE1IiBmaWxsPSIjZmY2OTAwIi8+CiAgPHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTIzIDIwaDd2MTFjMCAxIC44IDEuOCAxLjggMS44aDMuNGMxIDAgMS44LS44IDEuOC0xLjhWMjBoN3YxMmMwIDQtMy4yIDcuMi03LjIgNy4yaC01Yy00IDAtNy4yLTMuMi03LjItNy4yVjIwem0xNiA3djhoNHYtOGgtNHoiLz4KICA8dGV4dCB4PSI3NCIgeT0iNDEiIGZvbnQtZmFtaWx5PSInSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjgwMCIgZm9udC1zaXplPSIyOCIgZmlsbD0iIzFmMjkzNyI+WGlhb21pPC90ZXh0Pgo8L3N2Zz4=",
    desc: "Công nghệ chất lượng giá tốt, hệ sinh thái đa dạng",
  },
  {
    id: "oppo",
    name: "OPPO",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDx0ZXh0IHg9IjEwMCIgeT0iNDQiIGZvbnQtZmFtaWx5PSInSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIzOCIgbGV0dGVyLXNwYWNpbmc9IjMiIGZpbGw9IiMwMDg0NTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk9QUE88L3RleHQ+Cjwvc3ZnPg==",
    desc: "Chuyên gia camera phone & smartphone trẻ trung",
  },
  {
    id: "sony",
    name: "Sony",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDx0ZXh0IHg9IjEwMCIgeT0iNDQiIGZvbnQtZmFtaWx5PSInVGltZXMgTmV3IFJvbWFuJywgR2VvcmdpYSwgc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LXNpemU9IjM4IiBsZXR0ZXItc3BhY2luZz0iNSIgZmlsbD0iIzExMTgyNyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U09OWTwvdGV4dD4KPC9zdmc+",
    desc: "Đỉnh cao âm thanh & giải trí số Nhật Bản",
  },
  {
    id: "asus",
    name: "ASUS",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDx0ZXh0IHg9IjEwMCIgeT0iNDQiIGZvbnQtZmFtaWx5PSInQXJpYWwgQmxhY2snLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIzNiIgbGV0dGVyLXNwYWNpbmc9IjQiIGZpbGw9IiMwMDUzOWIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFTVVM8L3RleHQ+CiAgPGxpbmUgeDE9IjI1IiB5MT0iMjgiIHgyPSIxNzUiIHkyPSIyOCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgo8L3N2Zz4=",
    desc: "Laptop gaming ROG & Zenbook mỏng nhẹ",
  },
  {
    id: "dell",
    name: "Dell",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSI1NCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA3NmNlIiBzdHJva2Utd2lkdGg9IjciLz4KICA8dGV4dCB4PSI2MCIgeT0iNzMiIGZvbnQtZmFtaWx5PSInSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIzNCIgbGV0dGVyLXNwYWNpbmc9IjEiIGZpbGw9IiMwMDc2Y2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRFTEw8L3RleHQ+Cjwvc3ZnPg==",
    desc: "Laptop doanh nghiệp & đồ họa bền bỉ",
  },
  {
    id: "hp",
    name: "HP",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjYwIiByPSI1NCIgZmlsbD0iIzAwOTZkNiIvPgogIDx0ZXh0IHg9IjYwIiB5PSI3NyIgZm9udC1mYW1pbHk9IidUaW1lcyBOZXcgUm9tYW4nLCBHZW9yZ2lhLCBzZXJpZiIgZm9udC1zdHlsZT0iaXRhbGljIiBmb250LXdlaWdodD0iOTAwIiBmb250LXNpemU9IjUwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ocDwvdGV4dD4KPC9zdmc+",
    desc: "Máy tính cá nhân & thiết bị văn phòng hiện đại",
  },
  {
    id: "lenovo",
    name: "Lenovo",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxyZWN0IHg9IjUiIHk9IjgiIHdpZHRoPSIxOTAiIGhlaWdodD0iNDQiIHJ4PSI0IiBmaWxsPSIjZTIyMzFhIi8+CiAgPHRleHQgeD0iMTAwIiB5PSIzOSIgZm9udC1mYW1pbHk9IidIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iOTAwIiBmb250LXNpemU9IjI4IiBsZXR0ZXItc3BhY2luZz0iMiIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+bGVub3ZvPC90ZXh0Pgo8L3N2Zz4=",
    desc: "Laptop ThinkPad & Legion huyền thoại",
  },
  {
    id: "lg",
    name: "LG",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxjaXJjbGUgY3g9IjM1IiBjeT0iMzAiIHI9IjIyIiBmaWxsPSIjYTUwMDM0Ii8+CiAgPGNpcmNsZSBjeD0iMzUiIGN5PSIzMCIgcj0iMTYuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDxjaXJjbGUgY3g9IjI4IiBjeT0iMjQiIHI9IjIuNSIgZmlsbD0iI2ZmZmZmZiIvPgogIDxwYXRoIGQ9Ik0zNSAxOXYxMWg2LjUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDx0ZXh0IHg9IjcyIiB5PSI0MiIgZm9udC1mYW1pbHk9IidIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iOTAwIiBmb250LXNpemU9IjM0IiBsZXR0ZXItc3BhY2luZz0iMiIgZmlsbD0iI2E1MDAzNCI+TEc8L3RleHQ+Cjwvc3ZnPg==",
    desc: "Màn hình hiển thị & công nghệ cao cấp",
  },
  {
    id: "anker",
    name: "Anker",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDx0ZXh0IHg9IjEwMCIgeT0iNDMiIGZvbnQtZmFtaWx5PSInSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIzNCIgbGV0dGVyLXNwYWNpbmc9IjMiIGZpbGw9IiMwMGEwZGYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFOS0VSPC90ZXh0Pgo8L3N2Zz4=",
    desc: "Thương hiệu phụ kiện sạc số 1 toàn cầu",
  },
  {
    id: "logitech",
    name: "Logitech",
    logo: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDx0ZXh0IHg9IjEwMCIgeT0iNDIiIGZvbnQtZmFtaWx5PSInSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjgwMCIgZm9udC1zaXplPSIzMiIgbGV0dGVyLXNwYWNpbmc9IjEiIGZpbGw9IiMxMTE4MjciIHRleHQtYW5jaG9yPSJtaWRkbGUiPmxvZ2l0ZWNoPC90ZXh0Pgo8L3N2Zz4=",
    desc: "Phụ kiện chuột, bàn phím & gaming đỉnh cao",
  },
];

// ============ SẢN PHẨM (24 món) ============
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    brand: "apple",
    category: "phone",
    price: 29990000,
    oldPrice: 34990000,
    discount: 14,
    rating: 5,
    reviews: 128,
    sold: 345,
    specs: {
      ram: "8GB",
      cpu: "Apple A17 Pro",
      storage: "256GB",
      screen: "6.7 inch Super Retina XDR",
      battery: "4441 mAh",
      camera: "48MP + 12MP + 12MP",
      os: "iOS 17",
    },
    images: [
      "https://picsum.photos/seed/ip15/600/600",
      "https://picsum.photos/seed/ip15b/600/600",
    ],
    colors: ["Titan Tự Nhiên", "Titan Xanh", "Titan Trắng", "Titan Đen"],
    inStock: true,
    isNew: true,
    isHot: true,
    flashSale: true,
    tag: "hot",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 512GB",
    brand: "samsung",
    category: "phone",
    price: 31990000,
    oldPrice: 36990000,
    discount: 13,
    rating: 5,
    reviews: 98,
    sold: 287,
    specs: {
      ram: "12GB",
      cpu: "Snapdragon 8 Gen 3",
      storage: "512GB",
      screen: "6.8 inch AMOLED",
      battery: "5000 mAh",
      camera: "200MP + 50MP + 12MP + 10MP",
      os: "Android 14",
    },
    images: [
      "https://picsum.photos/seed/s24/600/600",
      "https://picsum.photos/seed/s24b/600/600",
    ],
    colors: ["Đen Titan", "Xám Titan", "Tím Titan"],
    inStock: true,
    isNew: true,
    isHot: true,
    flashSale: true,
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro 5G 256GB",
    brand: "xiaomi",
    category: "phone",
    price: 18990000,
    oldPrice: 22990000,
    discount: 17,
    rating: 5,
    reviews: 76,
    sold: 198,
    specs: {
      ram: "12GB",
      cpu: "Snapdragon 8 Gen 3",
      storage: "256GB",
      screen: "6.73 inch AMOLED",
      battery: "4880 mAh",
      camera: "50MP Leica",
      os: "HyperOS",
    },
    images: [
      "https://picsum.photos/seed/mi14/600/600",
      "https://picsum.photos/seed/mi14b/600/600",
    ],
    colors: ["Đen", "Trắng", "Xanh"],
    inStock: true,
    isNew: true,
    isHot: false,
    flashSale: true,
  },
  {
    id: 4,
    name: "MacBook Pro 14 M3 Pro",
    brand: "apple",
    category: "laptop",
    price: 49990000,
    oldPrice: 56990000,
    discount: 12,
    rating: 5,
    reviews: 54,
    sold: 89,
    specs: {
      ram: "18GB",
      cpu: "Apple M3 Pro",
      storage: "512GB SSD",
      screen: "14.2 inch Liquid Retina XDR",
      battery: "70Wh",
      camera: "1080p",
      os: "macOS Sonoma",
    },
    images: [
      "https://picsum.photos/seed/mbp14/600/600",
      "https://picsum.photos/seed/mbp14b/600/600",
    ],
    colors: ["Xám Không Gian", "Bạc"],
    inStock: true,
    isNew: true,
    isHot: true,
    flashSale: false,
  },
  {
    id: 5,
    name: "Dell XPS 15 9530",
    brand: "dell",
    category: "laptop",
    price: 42990000,
    oldPrice: 47990000,
    discount: 10,
    rating: 4,
    reviews: 42,
    sold: 67,
    specs: {
      ram: "16GB",
      cpu: "Intel Core i7-13700H",
      storage: "1TB SSD",
      screen: "15.6 inch OLED",
      battery: "86Wh",
      camera: "720p",
      os: "Windows 11",
    },
    images: [
      "https://picsum.photos/seed/dellxps/600/600",
      "https://picsum.photos/seed/dellxpsb/600/600",
    ],
    colors: ["Bạc", "Đen"],
    inStock: true,
    isNew: true,
    isHot: false,
    flashSale: false,
  },
  {
    id: 6,
    name: "ASUS ROG Zephyrus G14",
    brand: "asus",
    category: "laptop",
    price: 35990000,
    oldPrice: 39990000,
    discount: 10,
    rating: 5,
    reviews: 61,
    sold: 102,
    specs: {
      ram: "16GB",
      cpu: "AMD Ryzen 9 7940HS",
      storage: "1TB SSD",
      screen: "14 inch QHD 165Hz",
      battery: "76Wh",
      camera: "1080p",
      os: "Windows 11",
    },
    images: [
      "https://picsum.photos/seed/rog/600/600",
      "https://picsum.photos/seed/rogb/600/600",
    ],
    colors: ["Trắng", "Xám"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: true,
  },
  {
    id: 7,
    name: "iPad Pro 12.9 M2 256GB",
    brand: "apple",
    category: "tablet",
    price: 28990000,
    oldPrice: 32990000,
    discount: 12,
    rating: 5,
    reviews: 47,
    sold: 78,
    specs: {
      ram: "8GB",
      cpu: "Apple M2",
      storage: "256GB",
      screen: "12.9 inch Liquid Retina XDR",
      battery: "10758 mAh",
      camera: "12MP + 10MP",
      os: "iPadOS 17",
    },
    images: [
      "https://picsum.photos/seed/ipadpro/600/600",
      "https://picsum.photos/seed/ipadprob/600/600",
    ],
    colors: ["Xám", "Bạc"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: false,
  },
  {
    id: 8,
    name: "Samsung Galaxy Tab S9 Ultra",
    brand: "samsung",
    category: "tablet",
    price: 24990000,
    oldPrice: 27990000,
    discount: 11,
    rating: 4,
    reviews: 33,
    sold: 54,
    specs: {
      ram: "12GB",
      cpu: "Snapdragon 8 Gen 2",
      storage: "256GB",
      screen: "14.6 inch AMOLED",
      battery: "11200 mAh",
      camera: "13MP + 8MP",
      os: "Android 13",
    },
    images: [
      "https://picsum.photos/seed/tabs9/600/600",
      "https://picsum.photos/seed/tabs9b/600/600",
    ],
    colors: ["Xám", "Be"],
    inStock: true,
    isNew: false,
    isHot: false,
    flashSale: false,
  },
  {
    id: 9,
    name: "AirPods Pro 2 USB-C",
    brand: "apple",
    category: "accessory",
    price: 5490000,
    oldPrice: 6990000,
    discount: 21,
    rating: 5,
    reviews: 189,
    sold: 567,
    specs: {
      ram: "-",
      cpu: "Apple H2",
      storage: "-",
      screen: "-",
      battery: "6 giờ",
      camera: "-",
      os: "-",
    },
    images: [
      "https://picsum.photos/seed/airpods/600/600",
      "https://picsum.photos/seed/airpodsb/600/600",
    ],
    colors: ["Trắng"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: true,
  },
  {
    id: 10,
    name: "Samsung Galaxy Watch 6 Classic",
    brand: "samsung",
    category: "watch",
    price: 7990000,
    oldPrice: 9990000,
    discount: 20,
    rating: 4,
    reviews: 67,
    sold: 145,
    specs: {
      ram: "2GB",
      cpu: "Exynos W930",
      storage: "16GB",
      screen: "1.5 inch AMOLED",
      battery: "425 mAh",
      camera: "-",
      os: "Wear OS 4",
    },
    images: [
      "https://picsum.photos/seed/watch6/600/600",
      "https://picsum.photos/seed/watch6b/600/600",
    ],
    colors: ["Đen", "Bạc"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: true,
  },
  {
    id: 11,
    name: "OPPO Find X7 Ultra",
    brand: "oppo",
    category: "phone",
    price: 21990000,
    oldPrice: 24990000,
    discount: 12,
    rating: 4,
    reviews: 41,
    sold: 88,
    specs: {
      ram: "12GB",
      cpu: "Snapdragon 8 Gen 3",
      storage: "256GB",
      screen: "6.82 inch AMOLED",
      battery: "5000 mAh",
      camera: "50MP Hasselblad",
      os: "ColorOS 14",
    },
    images: [
      "https://picsum.photos/seed/oppo/600/600",
      "https://picsum.photos/seed/oppob/600/600",
    ],
    colors: ["Đen", "Nâu"],
    inStock: true,
    isNew: true,
    isHot: false,
    flashSale: false,
  },
  {
    id: 12,
    name: "HP Spectre x360 14",
    brand: "hp",
    category: "laptop",
    price: 38990000,
    oldPrice: 42990000,
    discount: 9,
    rating: 4,
    reviews: 28,
    sold: 41,
    specs: {
      ram: "16GB",
      cpu: "Intel Core Ultra 7",
      storage: "1TB SSD",
      screen: "14 inch OLED",
      battery: "68Wh",
      camera: "1080p",
      os: "Windows 11",
    },
    images: [
      "https://picsum.photos/seed/hp/600/600",
      "https://picsum.photos/seed/hpb/600/600",
    ],
    colors: ["Đen", "Xanh"],
    inStock: true,
    isNew: false,
    isHot: false,
    flashSale: false,
  },
  {
    id: 13,
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    brand: "lenovo",
    category: "laptop",
    price: 34990000,
    oldPrice: 39990000,
    discount: 12,
    rating: 5,
    reviews: 36,
    sold: 52,
    specs: {
      ram: "16GB",
      cpu: "Intel Core i7-1365U",
      storage: "512GB SSD",
      screen: "14 inch WUXGA",
      battery: "57Wh",
      camera: "1080p",
      os: "Windows 11",
    },
    images: [
      "https://picsum.photos/seed/thinkpad/600/600",
      "https://picsum.photos/seed/thinkpadb/600/600",
    ],
    colors: ["Đen"],
    inStock: true,
    isNew: false,
    isHot: false,
    flashSale: false,
  },
  {
    id: 14,
    name: "Xiaomi Pad 6 Pro",
    brand: "xiaomi",
    category: "tablet",
    price: 8990000,
    oldPrice: 11990000,
    discount: 25,
    rating: 4,
    reviews: 52,
    sold: 134,
    specs: {
      ram: "8GB",
      cpu: "Snapdragon 8+ Gen 1",
      storage: "256GB",
      screen: "11 inch LCD 144Hz",
      battery: "8600 mAh",
      camera: "50MP",
      os: "MIUI Pad 14",
    },
    images: [
      "https://picsum.photos/seed/pad6/600/600",
      "https://picsum.photos/seed/pad6b/600/600",
    ],
    colors: ["Đen", "Xanh", "Tím"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: true,
  },
  {
    id: 15,
    name: "Sạc dự phòng Anker 20000mAh",
    brand: "anker",
    category: "accessory",
    price: 890000,
    oldPrice: 1290000,
    discount: 31,
    rating: 5,
    reviews: 234,
    sold: 892,
    specs: {
      ram: "-",
      cpu: "-",
      storage: "20000mAh",
      screen: "-",
      battery: "20000 mAh",
      camera: "-",
      os: "-",
    },
    images: [
      "https://picsum.photos/seed/anker/600/600",
      "https://picsum.photos/seed/ankerb/600/600",
    ],
    colors: ["Đen", "Trắng"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: true,
  },
  {
    id: 16,
    name: "Apple Watch Ultra 2",
    brand: "apple",
    category: "watch",
    price: 19990000,
    oldPrice: 22990000,
    discount: 13,
    rating: 5,
    reviews: 78,
    sold: 167,
    specs: {
      ram: "2GB",
      cpu: "Apple S9",
      storage: "64GB",
      screen: "1.9 inch LTPO",
      battery: "564 mAh",
      camera: "-",
      os: "watchOS 10",
    },
    images: [
      "https://picsum.photos/seed/watchultra/600/600",
      "https://picsum.photos/seed/watchultrab/600/600",
    ],
    colors: ["Titan Tự Nhiên"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: false,
  },
  {
    id: 17,
    name: "OPPO Reno 11 Pro 5G",
    brand: "oppo",
    category: "phone",
    price: 12990000,
    oldPrice: 14990000,
    discount: 13,
    rating: 4,
    reviews: 45,
    sold: 123,
    specs: {
      ram: "12GB",
      cpu: "Dimensity 8200",
      storage: "256GB",
      screen: "6.7 inch AMOLED",
      battery: "4600 mAh",
      camera: "50MP + 32MP + 8MP",
      os: "ColorOS 14",
    },
    images: [
      "https://picsum.photos/seed/reno11/600/600",
      "https://picsum.photos/seed/reno11b/600/600",
    ],
    colors: ["Xanh", "Xám"],
    inStock: true,
    isNew: true,
    isHot: false,
    flashSale: false,
  },
  {
    id: 18,
    name: "ASUS Zenbook 14 OLED",
    brand: "asus",
    category: "laptop",
    price: 24990000,
    oldPrice: 28990000,
    discount: 14,
    rating: 4,
    reviews: 31,
    sold: 48,
    specs: {
      ram: "16GB",
      cpu: "Intel Core i5-13500H",
      storage: "512GB SSD",
      screen: "14 inch OLED",
      battery: "75Wh",
      camera: "1080p",
      os: "Windows 11",
    },
    images: [
      "https://picsum.photos/seed/zenbook/600/600",
      "https://picsum.photos/seed/zenbookb/600/600",
    ],
    colors: ["Xanh", "Bạc"],
    inStock: true,
    isNew: false,
    isHot: false,
    flashSale: false,
  },
  {
    id: 19,
    name: "Tai nghe Sony WH-1000XM5",
    brand: "sony",
    category: "accessory",
    price: 6990000,
    oldPrice: 8990000,
    discount: 22,
    rating: 5,
    reviews: 156,
    sold: 432,
    specs: {
      ram: "-",
      cpu: "-",
      storage: "-",
      screen: "-",
      battery: "30 giờ",
      camera: "-",
      os: "-",
    },
    images: [
      "https://picsum.photos/seed/sonyxm5/600/600",
      "https://picsum.photos/seed/sonyxm5b/600/600",
    ],
    colors: ["Đen", "Bạc"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: true,
  },
  {
    id: 20,
    name: "Samsung Galaxy Buds 2 Pro",
    brand: "samsung",
    category: "accessory",
    price: 3990000,
    oldPrice: 5490000,
    discount: 27,
    rating: 4,
    reviews: 89,
    sold: 267,
    specs: {
      ram: "-",
      cpu: "-",
      storage: "-",
      screen: "-",
      battery: "8 giờ",
      camera: "-",
      os: "-",
    },
    images: [
      "https://picsum.photos/seed/buds2/600/600",
      "https://picsum.photos/seed/buds2b/600/600",
    ],
    colors: ["Đen", "Trắng", "Tím"],
    inStock: true,
    isNew: false,
    isHot: false,
    flashSale: true,
  },
  {
    id: 21,
    name: "Dell Inspiron 15 3520",
    brand: "dell",
    category: "laptop",
    price: 14990000,
    oldPrice: 17990000,
    discount: 17,
    rating: 4,
    reviews: 38,
    sold: 92,
    specs: {
      ram: "8GB",
      cpu: "Intel Core i5-1235U",
      storage: "512GB SSD",
      screen: "15.6 inch FHD",
      battery: "41Wh",
      camera: "720p",
      os: "Windows 11",
    },
    images: [
      "https://picsum.photos/seed/inspiron/600/600",
      "https://picsum.photos/seed/inspironb/600/600",
    ],
    colors: ["Đen", "Bạc"],
    inStock: true,
    isNew: false,
    isHot: false,
    flashSale: false,
  },
  {
    id: 22,
    name: "Xiaomi Redmi Watch 4",
    brand: "xiaomi",
    category: "watch",
    price: 2490000,
    oldPrice: 3490000,
    discount: 29,
    rating: 4,
    reviews: 112,
    sold: 345,
    specs: {
      ram: "512MB",
      cpu: "-",
      storage: "1GB",
      screen: "1.97 inch AMOLED",
      battery: "470 mAh",
      camera: "-",
      os: "HyperOS",
    },
    images: [
      "https://picsum.photos/seed/redmiwatch/600/600",
      "https://picsum.photos/seed/redmiwatchb/600/600",
    ],
    colors: ["Đen", "Bạc"],
    inStock: true,
    isNew: false,
    isHot: false,
    flashSale: true,
  },
  {
    id: 23,
    name: "MacBook Air 15 M3",
    brand: "apple",
    category: "laptop",
    price: 34990000,
    oldPrice: 38990000,
    discount: 10,
    rating: 5,
    reviews: 43,
    sold: 71,
    specs: {
      ram: "16GB",
      cpu: "Apple M3",
      storage: "512GB SSD",
      screen: "15.3 inch Liquid Retina",
      battery: "66.5Wh",
      camera: "1080p",
      os: "macOS Sonoma",
    },
    images: [
      "https://picsum.photos/seed/mba15/600/600",
      "https://picsum.photos/seed/mba15b/600/600",
    ],
    colors: ["Xám", "Bạc", "Vàng"],
    inStock: true,
    isNew: true,
    isHot: true,
    flashSale: false,
  },
  {
    id: 24,
    name: "iPad Air 5 M1 64GB",
    brand: "apple",
    category: "tablet",
    price: 13990000,
    oldPrice: 15990000,
    discount: 12,
    rating: 5,
    reviews: 65,
    sold: 112,
    specs: {
      ram: "8GB",
      cpu: "Apple M1",
      storage: "64GB",
      screen: "10.9 inch Liquid Retina",
      battery: "7606 mAh",
      camera: "12MP",
      os: "iPadOS 17",
    },
    images: [
      "https://picsum.photos/seed/ipadair/600/600",
      "https://picsum.photos/seed/ipadairb/600/600",
    ],
    colors: ["Xám", "Bạc", "Xanh", "Hồng"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: false,
  },
  {
    id: 25,
    name: "Laptop LG Gram 16 2024 Intel Core Ultra 7",
    brand: "lg",
    category: "laptop",
    price: 36990000,
    oldPrice: 39990000,
    discount: 8,
    rating: 5,
    reviews: 42,
    sold: 89,
    specs: {
      ram: "16GB LPDDR5X",
      cpu: "Intel Core Ultra 7 155H",
      storage: "512GB NVMe SSD",
      screen: "16 inch WQXGA (2560x1600) IPS",
      battery: "80 Wh siêu bền",
      weight: "1.19 kg",
      os: "Windows 11 Home",
    },
    images: [
      "https://picsum.photos/seed/lggram/600/600",
      "https://picsum.photos/seed/lggramb/600/600",
    ],
    colors: ["Trắng Băng Tuyết", "Xám Titan"],
    inStock: true,
    isNew: true,
    isHot: false,
    flashSale: false,
    tag: "new",
  },
  {
    id: 26,
    name: "Chuột không dây Logitech MX Master 3S",
    brand: "logitech",
    category: "accessory",
    price: 2490000,
    oldPrice: 2990000,
    discount: 17,
    rating: 5,
    reviews: 156,
    sold: 412,
    specs: {
      ram: "-",
      cpu: "-",
      storage: "-",
      screen: "-",
      battery: "Pin sạc dùng 70 ngày",
      camera: "-",
      os: "Windows, macOS, iPadOS, Linux",
    },
    images: [
      "https://picsum.photos/seed/logimx/600/600",
      "https://picsum.photos/seed/logimxb/600/600",
    ],
    colors: ["Đen Than Chì", "Xám Nhạt"],
    inStock: true,
    isNew: false,
    isHot: true,
    flashSale: true,
    tag: "hot",
  },
];

// ============ BLOG ============
const blogs = [
  {
    id: 1,
    title: "Đánh giá iPhone 15 Pro Max: Có đáng mua?",
    tag: "Đánh giá",
    date: "2024-03-15",
    author: "Minh Tuấn",
    image: "https://picsum.photos/seed/blog1/600/400",
    excerpt:
      "iPhone 15 Pro Max mang đến nhiều nâng cấp về camera và hiệu năng...",
  },
  {
    id: 2,
    title: "So sánh Galaxy S24 Ultra vs iPhone 15 Pro Max",
    tag: "So sánh",
    date: "2024-03-10",
    author: "Hoàng Anh",
    image: "https://picsum.photos/seed/blog2/600/400",
    excerpt: "Hai flagship đình đám nhất 2024 có gì khác biệt?...",
  },
  {
    id: 3,
    title: "5 mẹo tiết kiệm pin cho laptop Windows",
    tag: "Thủ thuật",
    date: "2024-03-05",
    author: "Thu Hà",
    image: "https://picsum.photos/seed/blog3/600/400",
    excerpt: "Những mẹo đơn giản giúp laptop của bạn chạy lâu hơn...",
  },
  {
    id: 4,
    title: "Top 5 laptop cho sinh viên dưới 15 triệu",
    tag: "Tư vấn",
    date: "2024-03-01",
    author: "Văn Nam",
    image: "https://picsum.photos/seed/blog4/600/400",
    excerpt: "Những mẫu laptop phù hợp học tập với ngân sách tiết kiệm...",
  },
  {
    id: 5,
    title: "Apple chính thức ra mắt iOS 17.4",
    tag: "Tin tức",
    date: "2024-02-28",
    author: "Minh Tuấn",
    image: "https://picsum.photos/seed/blog5/600/400",
    excerpt: "Bản cập nhật lớn với nhiều tính năng mới...",
  },
  {
    id: 6,
    title: "Cách chọn mua tai nghe Bluetooth tốt",
    tag: "Tư vấn",
    date: "2024-02-20",
    author: "Thu Hà",
    image: "https://picsum.photos/seed/blog6/600/400",
    excerpt: "Hướng dẫn chọn tai nghe phù hợp với nhu cầu...",
  },
];

// ============ HELPER ============
function formatPrice(n) {
  return Number(n || 0).toLocaleString("vi-VN") + "₫";
}

function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

function getBrandName(id) {
  const b = brands.find((b) => b.id === id);
  return b ? b.name : id;
}

// Chuyển hướng hoặc sinh URL linh hoạt giữa root (index.html) và thư mục con (html/)
function getRelativePath(targetFile) {
  if (!targetFile) return "";
  const path = window.location.pathname.replace(/\\/g, "/");
  const isInsideHtml = path.includes("/html/");

  // Nếu file đích là trang chủ index.html
  if (targetFile === "index.html" || targetFile.startsWith("index.html#") || targetFile.startsWith("index.html?")) {
    return isInsideHtml ? "../" + targetFile : targetFile;
  }

  // Nếu file đích nằm trong thư mục html/ (ví dụ 'products.html', 'cart.html')
  if (isInsideHtml) {
    // Nếu đang ở trong html/, gọi trực tiếp file anh em
    return targetFile.replace(/^html\//, "");
  } else {
    // Nếu đang ở root, gọi html/targetFile
    return targetFile.startsWith("html/") ? targetFile : "html/" + targetFile;
  }
}

// Tự động nhận diện danh mục theo tên sản phẩm để vẽ icon chính xác
function detectCategoryByName(name) {
  const t = (name || "").toLowerCase();
  if (
    t.includes("laptop") ||
    t.includes("macbook") ||
    t.includes("thinkpad") ||
    t.includes("xps") ||
    t.includes("zenbook") ||
    t.includes("spectre") ||
    t.includes("zephyrus") ||
    t.includes("dell inspiron") || t.includes("lg gram")
  )
    return "laptop";
  if (
    t.includes("ipad") ||
    t.includes("tablet") ||
    t.includes("tab ") ||
    t.includes("pad ")
  )
    return "tablet";
  if (t.includes("watch") || t.includes("đồng hồ")) return "watch";
  if (
    t.includes("tai nghe") ||
    t.includes("airpods") ||
    t.includes("buds") ||
    t.includes("sạc") ||
    t.includes("sony wh") ||
    t.includes("anker") ||
    t.includes("headphone")
  )
    return "accessory";
  return "phone";
}

// Smart SVG Placeholder generator khi ảnh hỏng/chưa load
function getProductSvgPlaceholder(category, name) {
  const cat = category || detectCategoryByName(name);
  const iconMap = {
    phone: `<rect x="130" y="70" width="140" height="260" rx="24" fill="none" stroke="#f59e0b" stroke-width="6"/><circle cx="200" cy="300" r="10" fill="#f59e0b"/><line x1="170" y1="95" x2="230" y2="95" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>`,
    laptop: `<path d="M90 120h220v130H90z" fill="none" stroke="#f59e0b" stroke-width="6" rx="8"/><path d="M60 260h280a10 10 0 0 1 10 10v10H50v-10a10 10 0 0 1 10-10z" fill="#f59e0b"/><rect x="175" y="260" width="50" height="6" rx="3" fill="#1e293b"/>`,
    tablet: `<rect x="100" y="80" width="200" height="240" rx="18" fill="none" stroke="#f59e0b" stroke-width="6"/><circle cx="200" cy="295" r="8" fill="#f59e0b"/>`,
    accessory: `<path d="M120 200v-50a80 80 0 0 1 160 0v50" fill="none" stroke="#f59e0b" stroke-width="6"/><rect x="100" y="190" width="35" height="60" rx="14" fill="#f59e0b"/><rect x="265" y="190" width="35" height="60" rx="14" fill="#f59e0b"/>`,
    watch: `<rect x="160" y="40" width="80" height="320" rx="12" fill="#334155"/><rect x="140" y="130" width="120" height="140" rx="28" fill="#1e293b" stroke="#f59e0b" stroke-width="6"/><circle cx="200" cy="200" r="30" fill="none" stroke="#f59e0b" stroke-width="4"/><line x1="200" y1="200" x2="200" y2="185" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/><line x1="200" y1="200" x2="215" y2="200" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>`,
  };
  const icon = iconMap[cat] || iconMap.phone;
  const safeName = (name || "TechZone").replace(/</g, "").replace(/>/g, "").replace(/"/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#bg)"/>
    <circle cx="200" cy="200" r="130" fill="#f59e0b" fill-opacity="0.08"/>
    ${icon}
    <text x="200" y="360" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="14" fill="#94a3b8" text-anchor="middle">${safeName.slice(0, 32)}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function handleImgError(img, cat = "", name = "") {
  if (!img || img.dataset.failed) return;
  img.dataset.failed = "true";
  const finalCat = cat || detectCategoryByName(name || img.alt);
  img.src = getProductSvgPlaceholder(finalCat, name || img.alt);
}
