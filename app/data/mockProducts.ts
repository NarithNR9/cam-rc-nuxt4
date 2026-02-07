import type { Product } from '~/types'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'DJI Mavic 3 Pro',
    price: 2199,
    category: 'Drones',
    description: 'The DJI Mavic 3 Pro is the flagship drone featuring a triple-camera system with a 4/3 CMOS Hasselblad camera, 70mm and 166mm tele cameras. Capture stunning 5.1K video and 20MP photos with up to 43 minutes of flight time.',
    specs: [
      { label: 'Sensor', value: '4/3 CMOS Hasselblad', group: 'Camera' },
      { label: 'Video Resolution', value: '5.1K/50fps, 4K/120fps', group: 'Camera' },
      { label: 'Photo Resolution', value: '20MP', group: 'Camera' },
      { label: 'Max Flight Time', value: '43 minutes', group: 'Flight' },
      { label: 'Max Speed', value: '21 m/s', group: 'Flight' },
      { label: 'Max Transmission', value: '15 km', group: 'Transmission' },
      { label: 'Obstacle Sensing', value: 'Omnidirectional', group: 'Flight' },
      { label: 'Weight', value: '958g', group: 'Dimensions' }
    ],
    image: 'https://m.media-amazon.com/images/I/619suQHw+CL._AC_UF894,1000_QL80_.jpg',
    gallery: null,
    stock_status: 'in_stock',
    featured: true,
    date_created: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'DJI Mini 4 Pro',
    price: 759,
    category: 'Drones',
    description: 'Ultra-lightweight and foldable, the DJI Mini 4 Pro weighs under 249g and features a 1/1.3-inch CMOS sensor, 4K/60fps HDR video, omnidirectional obstacle sensing, and up to 34 minutes of flight time.',
    specs: [
      { label: 'Sensor', value: '1/1.3-inch CMOS', group: 'Camera' },
      { label: 'Video Resolution', value: '4K/60fps HDR', group: 'Camera' },
      { label: 'Photo Resolution', value: '48MP', group: 'Camera' },
      { label: 'Max Flight Time', value: '34 minutes', group: 'Flight' },
      { label: 'Max Speed', value: '16 m/s', group: 'Flight' },
      { label: 'Weight', value: '249g', group: 'Dimensions' }
    ],
    image: 'https://m.media-amazon.com/images/I/61d2sc1YAQL._AC_UF894,1000_QL80_.jpg',
    gallery: null,
    stock_status: 'in_stock',
    featured: false,
    date_created: '2024-02-10T10:00:00Z'
  },
  {
    id: '3',
    name: 'DJI Air 3',
    price: 1099,
    category: 'Drones',
    description: 'The DJI Air 3 features dual primary cameras with wide-angle and 3x medium tele lenses. Capture 48MP photos and 4K/60fps HDR video with up to 46 minutes of flight time.',
    specs: [
      { label: 'Sensor', value: '1/1.3-inch CMOS (Dual)', group: 'Camera' },
      { label: 'Video Resolution', value: '4K/60fps HDR', group: 'Camera' },
      { label: 'Photo Resolution', value: '48MP', group: 'Camera' },
      { label: 'Max Flight Time', value: '46 minutes', group: 'Flight' },
      { label: 'Optical Zoom', value: '3x Medium Tele', group: 'Camera' },
      { label: 'Weight', value: '720g', group: 'Dimensions' }
    ],
    image: 'https://www.uavoom.com/cdn/shop/files/1d3a469ea62eb9331238ba2683d39d1d_origin.jpg?v=1690428775',
    gallery: null,
    stock_status: 'low_stock',
    featured: true,
    date_created: '2024-01-20T10:00:00Z'
  },
  {
    id: '4',
    name: 'DJI RS 4 Pro',
    price: 799,
    category: 'Gimbals',
    description: 'Professional 3-axis gimbal stabilizer for cinema cameras. Features a 4.5kg payload capacity, 2nd-gen stabilization algorithm, and native vertical shooting support.',
    specs: [
      { label: 'Payload Capacity', value: '4.5 kg', group: 'Gimbal' },
      { label: 'Battery Life', value: '12 hours', group: 'Battery' },
      { label: 'Stabilization', value: '3-Axis', group: 'Gimbal' },
      { label: 'Tilt Range', value: '-100° to +175°', group: 'Gimbal' },
      { label: 'Roll Range', value: '-220° to +100°', group: 'Gimbal' },
      { label: 'Weight', value: '1.51 kg', group: 'Dimensions' }
    ],
    image: 'https://m.media-amazon.com/images/I/61rhwQDa2nL._AC_UF894,1000_QL80_.jpg',
    gallery: null,
    stock_status: 'in_stock',
    featured: false,
    date_created: '2024-03-01T10:00:00Z'
  },
  {
    id: '5',
    name: 'DJI Ronin 4D-8K',
    price: 7199,
    category: 'Cameras',
    description: 'Revolutionary 4-axis cinema camera with full-frame 8K sensor, internal recording up to 8K/75fps, LiDAR focusing, and built-in gimbal stabilization.',
    specs: [
      { label: 'Sensor', value: 'Full-Frame CMOS', group: 'Camera' },
      { label: 'Video Resolution', value: '8K/75fps', group: 'Video' },
      { label: 'Dynamic Range', value: '14+ stops', group: 'Camera' },
      { label: 'Storage', value: 'PROSSD 1TB', group: 'Storage' },
      { label: 'LiDAR Range', value: '10m', group: 'General' },
      { label: 'Stabilization', value: '4-Axis Gimbal', group: 'Gimbal' }
    ],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG8g2yClzf3-tM_zEWBCSrO9N_j6Y3Rx0ouQ&s',
    gallery: null,
    stock_status: 'pre_order',
    featured: false,
    date_created: '2024-02-25T10:00:00Z'
  },
  {
    id: '6',
    name: 'DJI Osmo Pocket 3',
    price: 519,
    category: 'Cameras',
    description: 'Pocket-sized 3-axis gimbal camera with a 1-inch CMOS sensor. Shoots 4K/120fps video and features a 2-inch rotating touchscreen for easy framing.',
    specs: [
      { label: 'Sensor', value: '1-inch CMOS', group: 'Camera' },
      { label: 'Video Resolution', value: '4K/120fps', group: 'Video' },
      { label: 'Photo Resolution', value: '9.4MP', group: 'Camera' },
      { label: 'Screen', value: '2-inch Rotatable', group: 'General' },
      { label: 'Battery Life', value: '166 minutes', group: 'Battery' },
      { label: 'Weight', value: '179g', group: 'Dimensions' }
    ],
    image: 'https://tiendadedrones.com.ar/wp-content/uploads/2024/08/1000x1000-RCDJI059-1.jpg.webp',
    gallery: null,
    stock_status: 'in_stock',
    featured: true,
    date_created: '2024-03-05T10:00:00Z'
  },
  {
    id: '7',
    name: 'DJI RS 3 Mini',
    price: 299,
    category: 'Gimbals',
    description: 'Compact and lightweight gimbal for mirrorless cameras. Features Bluetooth shutter control, native vertical shooting, and up to 10 hours of battery life.',
    specs: [
      { label: 'Payload Capacity', value: '2 kg', group: 'Gimbal' },
      { label: 'Battery Life', value: '10 hours', group: 'Battery' },
      { label: 'Stabilization', value: '3-Axis', group: 'Gimbal' },
      { label: 'Weight', value: '795g', group: 'Dimensions' },
      { label: 'Bluetooth', value: 'Shutter Control', group: 'General' }
    ],
    image: 'https://djiindiashop.com/cdn/shop/files/4_4c9a45d5-2c47-4c98-9252-445373254cc1.jpg?v=1725863412&width=2560',
    gallery: null,
    stock_status: 'in_stock',
    featured: false,
    date_created: '2024-01-30T10:00:00Z'
  },
  {
    id: '8',
    name: 'DJI Avata 2',
    price: 999,
    category: 'Drones',
    description: 'Immersive FPV drone with 4K/60fps camera, ultra-wide 155° FOV, and intuitive motion controller. Experience flight like never before with the DJI Goggles 3.',
    specs: [
      { label: 'Sensor', value: '1/1.3-inch CMOS', group: 'Camera' },
      { label: 'Video Resolution', value: '4K/60fps', group: 'Camera' },
      { label: 'FOV', value: '155° Ultra-Wide', group: 'Camera' },
      { label: 'Max Flight Time', value: '23 minutes', group: 'Flight' },
      { label: 'Max Speed', value: '27 m/s', group: 'Flight' },
      { label: 'Weight', value: '377g', group: 'Dimensions' }
    ],
    image: 'https://m.media-amazon.com/images/I/71hc7wNXBZL._AC_UF894,1000_QL80_.jpg',
    gallery: null,
    stock_status: 'in_stock',
    featured: false,
    date_created: '2024-02-15T10:00:00Z'
  },
  {
    id: '9',
    name: 'DJI Mic 2',
    price: 349,
    category: 'Accessories',
    description: 'Professional wireless microphone system with 32-bit float internal recording, 250m transmission range, and intelligent noise cancellation.',
    specs: [
      { label: 'Recording', value: '32-bit Float', group: 'General' },
      { label: 'Transmission Range', value: '250m', group: 'Transmission' },
      { label: 'Battery Life', value: '6 hours (TX)', group: 'Battery' },
      { label: 'Noise Cancellation', value: 'Intelligent NC', group: 'General' },
      { label: 'Connectivity', value: 'USB-C, Lightning, 3.5mm', group: 'General' }
    ],
    image: 'https://m.media-amazon.com/images/I/61h78MEXojL._AC_UF894,1000_QL80_.jpg',
    gallery: null,
    stock_status: 'in_stock',
    featured: false,
    date_created: '2024-03-10T10:00:00Z'
  },
  {
    id: '10',
    name: 'DJI Power 1000',
    price: 999,
    category: 'Accessories',
    description: 'Portable power station with 1024Wh capacity and 2200W output. Features fast solar charging and can power drones, cameras, and other devices.',
    specs: [
      { label: 'Capacity', value: '1024Wh', group: 'Battery' },
      { label: 'Output Power', value: '2200W', group: 'Battery' },
      { label: 'Solar Input', value: '800W Max', group: 'Battery' },
      { label: 'AC Outlets', value: '2x Pure Sine Wave', group: 'General' },
      { label: 'USB Ports', value: '2x USB-A, 2x USB-C', group: 'General' },
      { label: 'Weight', value: '12.9 kg', group: 'Dimensions' }
    ],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_moFwEHf-m8nhNGEQnEkM3GYzVDk08sAJLg&s',
    gallery: null,
    stock_status: 'out_of_stock',
    featured: false,
    date_created: '2024-02-20T10:00:00Z'
  },
  {
    id: '11',
    name: 'DJI Action 4',
    price: 399,
    category: 'Cameras',
    description: 'Rugged action camera with 1/1.3-inch sensor, 4K/120fps recording, 155° ultra-wide FOV, and waterproof up to 18m without a case.',
    specs: [
      { label: 'Sensor', value: '1/1.3-inch CMOS', group: 'Camera' },
      { label: 'Video Resolution', value: '4K/120fps', group: 'Video' },
      { label: 'FOV', value: '155° Ultra-Wide', group: 'Camera' },
      { label: 'Waterproof', value: '18m (No Case)', group: 'General' },
      { label: 'Battery Life', value: '160 minutes', group: 'Battery' },
      { label: 'Weight', value: '145g', group: 'Dimensions' }
    ],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGrfkxPEkDZmsCT95gx1hQ4o7s9sPlOMOpA&s',
    gallery: null,
    stock_status: 'in_stock',
    featured: false,
    date_created: '2024-01-25T10:00:00Z'
  },
  {
    id: '12',
    name: 'DJI FPV Goggles 3',
    price: 499,
    category: 'Accessories',
    description: 'Immersive FPV goggles with 1080p/100fps Micro-OLED screens, adjustable diopters, and real-time HD video transmission up to 10km.',
    specs: [
      { label: 'Screen', value: '1080p Micro-OLED', group: 'General' },
      { label: 'Refresh Rate', value: '100fps', group: 'General' },
      { label: 'FOV', value: '44°', group: 'General' },
      { label: 'Transmission', value: '10km', group: 'Transmission' },
      { label: 'Battery Life', value: '2.5 hours', group: 'Battery' },
      { label: 'Weight', value: '290g', group: 'Dimensions' }
    ],
    image: 'https://m.media-amazon.com/images/I/6184JUNS83L._AC_UF894,1000_QL80_.jpg',
    gallery: null,
    stock_status: 'low_stock',
    featured: false,
    date_created: '2024-02-05T10:00:00Z'
  }
]

// Helper to get a mock product by ID
export function getMockProductById(id: string | number): Product | null {
  return mockProducts.find(p => p.id === String(id)) || null
}
