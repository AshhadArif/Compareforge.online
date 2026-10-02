import type { Source } from "@/data/types";

// ============================================
// Category dataset model
// Shared infrastructure, category-specific fields.
// Nothing in here is estimated: a value is either
// transcribed from the source listed on the record
// or it is null and renders as "Not verified".
// ============================================

export type SpecFieldType = "number" | "text" | "boolean";

export interface CategorySpecField {
  key: string;
  label: string;
  group: string;
  type: SpecFieldType;
  unit?: string;
  /** Rendered under the value when the field needs a caveat (e.g. measurement method). */
  note?: string;
}

export interface CategoryProduct {
  id: string;
  brand: string;
  model: string;
  fullName: string;
  /** Region / SKU scope caveat. Shown with the record, never normalised away. */
  regionNote?: string;
  specs: Record<string, string | number | boolean | null>;
  sources: Source[];
}

export interface CategoryDataset {
  id: string;
  label: string;
  singular: string;
  /** Canonical route for this dataset. */
  route: string;
  fields: CategorySpecField[];
  products: CategoryProduct[];
  /** How many columns the tool allows side by side. */
  maxCompare: number;
}

const v = (
  url: string,
  siteName: string,
  field = "*",
  dateAccessed = "2026-10-01"
): Source => ({ field, url, siteName, dateAccessed, confidence: "verified" });

// --------------------------------------------
// CPU
// --------------------------------------------

const cpuFields: CategorySpecField[] = [
  { key: "architecture", label: "Architecture", group: "Basics", type: "text" },
  { key: "releaseDate", label: "Release date", group: "Basics", type: "text" },
  { key: "processNode", label: "Process node", group: "Basics", type: "text" },
  { key: "cores", label: "Cores", group: "Cores and clocks", type: "number" },
  { key: "threads", label: "Threads", group: "Cores and clocks", type: "number" },
  { key: "baseClock", label: "Base clock", group: "Cores and clocks", type: "number", unit: "GHz" },
  { key: "boostClock", label: "Boost clock", group: "Cores and clocks", type: "number", unit: "GHz" },
  { key: "cache", label: "Cache", group: "Cores and clocks", type: "text" },
  { key: "socket", label: "Socket", group: "Platform", type: "text" },
  { key: "memorySupport", label: "Memory support", group: "Platform", type: "text" },
  { key: "pcieSupport", label: "PCI Express", group: "Platform", type: "text" },
  { key: "integratedGpu", label: "Integrated graphics", group: "Graphics and power", type: "text" },
  { key: "tdp", label: "Processor power rating", group: "Graphics and power", type: "text" },
];

const cpuProducts: CategoryProduct[] = [
  {
    id: "amd-ryzen-7-9800x3d",
    brand: "AMD",
    model: "Ryzen 7 9800X3D",
    fullName: "AMD Ryzen 7 9800X3D",
    specs: {
      architecture: "Zen 5 (Granite Ridge)",
      releaseDate: "7 Nov 2024",
      processNode: "TSMC 4nm FinFET",
      cores: 8,
      threads: 16,
      baseClock: 4.7,
      boostClock: 5.2,
      cache: "L1 640 KB, L2 8 MB, L3 96 MB",
      socket: "AM5",
      memorySupport: "DDR5, up to 256 GB",
      pcieSupport: "PCIe 5.0",
      integratedGpu: "AMD Radeon Graphics",
      tdp: "120 W",
    },
    sources: [v("https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9800x3d.html", "AMD")],
  },
  {
    id: "amd-ryzen-9-9950x",
    brand: "AMD",
    model: "Ryzen 9 9950X",
    fullName: "AMD Ryzen 9 9950X",
    specs: {
      architecture: "Zen 5 (Granite Ridge)",
      releaseDate: "15 Aug 2024",
      processNode: "TSMC 4nm FinFET (CPU), TSMC 6nm FinFET (I/O die)",
      cores: 16,
      threads: 32,
      baseClock: 4.3,
      boostClock: 5.7,
      cache: "L1 1280 KB, L2 16 MB, L3 64 MB",
      socket: "AM5",
      memorySupport: "DDR5, up to 256 GB",
      pcieSupport: "PCIe 5.0",
      integratedGpu: "AMD Radeon Graphics",
      tdp: "170 W",
    },
    sources: [v("https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9950x.html", "AMD")],
  },
  {
    id: "intel-core-ultra-9-285k",
    brand: "Intel",
    model: "Core Ultra 9 285K",
    fullName: "Intel Core Ultra 9 285K",
    specs: {
      architecture: "Arrow Lake-S",
      releaseDate: "24 Oct 2024",
      processNode: "TSMC N3B (3 nm)",
      cores: 24,
      threads: 24,
      baseClock: 3.7,
      boostClock: 5.7,
      cache: "L2 40 MB, L3 36 MB",
      socket: "Intel Socket 1851",
      memorySupport: "DDR5, up to 256 GB, dual-channel",
      pcieSupport: "PCIe 5.0 x20 + PCIe 4.0 x4 (CPU)",
      integratedGpu: "Intel Arc Xe-LPG graphics (64 EU)",
      tdp: "125 W base (PL2 250 W)",
    },
    sources: [v("https://www.techpowerup.com/cpu-specs/core-ultra-9-285k.c3773", "TechPowerUp")],
  },
  {
    id: "intel-core-i9-14900k",
    brand: "Intel",
    model: "Core i9-14900K",
    fullName: "Intel Core i9-14900K",
    specs: {
      architecture: "Raptor Lake Refresh",
      releaseDate: "17 Oct 2023",
      processNode: "Intel 7 (10 nm)",
      cores: 24,
      threads: 32,
      baseClock: 3.2,
      boostClock: 6.0,
      cache: "L3 36 MB",
      socket: "Intel Socket 1700",
      memorySupport: "DDR4 and DDR5, up to 192 GB, dual-channel",
      pcieSupport: "PCIe 5.0 x16 + PCIe 4.0 x4 (CPU)",
      integratedGpu: "Intel UHD Graphics 770",
      tdp: "125 W base (PL2 253 W)",
    },
    sources: [v("https://www.techpowerup.com/cpu-specs/core-i9-14900k.c3269", "TechPowerUp")],
  },
];

// --------------------------------------------
// GPU
// --------------------------------------------

const gpuFields: CategorySpecField[] = [
  { key: "architecture", label: "Architecture", group: "Basics", type: "text" },
  { key: "vram", label: "Video memory", group: "Memory", type: "number", unit: "GB" },
  { key: "memoryType", label: "Memory type", group: "Memory", type: "text" },
  { key: "memoryBus", label: "Memory bus", group: "Memory", type: "text" },
  { key: "memoryBandwidth", label: "Memory bandwidth", group: "Memory", type: "text" },
  { key: "cores", label: "Shading units", group: "Cores and clocks", type: "number" },
  {
    key: "boostClock",
    label: "Boost clock",
    group: "Cores and clocks",
    type: "text",
    note: "Clock units are shown as published and are not converted.",
  },
  { key: "tdp", label: "Board power", group: "Power and platform", type: "text" },
  { key: "interface", label: "Host interface", group: "Power and platform", type: "text" },
  { key: "rayTracing", label: "Hardware ray tracing", group: "Display outputs", type: "boolean" },
  { key: "outputs", label: "Display outputs", group: "Display outputs", type: "text" },
];

const gpuProducts: CategoryProduct[] = [
  {
    id: "nvidia-geforce-rtx-5070-ti",
    brand: "NVIDIA",
    model: "GeForce RTX 5070 Ti",
    fullName: "NVIDIA GeForce RTX 5070 Ti",
    specs: {
      architecture: "Blackwell",
      vram: 16,
      memoryType: "GDDR7",
      memoryBus: "256-bit",
      memoryBandwidth: "896 GB/s",
      cores: 8960,
      boostClock: "2.45 GHz",
      tdp: "300 W",
      interface: "PCIe 5.0",
      rayTracing: true,
      outputs: "3x DisplayPort, 1x HDMI",
    },
    sources: [
      v("https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/", "NVIDIA"),
      v("https://www.nvidia.com/en-us/geforce/graphics-cards/compare", "NVIDIA", "memoryBandwidth"),
    ],
  },
  {
    id: "nvidia-geforce-rtx-5060",
    brand: "NVIDIA",
    model: "GeForce RTX 5060",
    fullName: "NVIDIA GeForce RTX 5060",
    specs: {
      architecture: "Blackwell",
      vram: 8,
      memoryType: "GDDR7",
      memoryBus: "128-bit",
      memoryBandwidth: "448 GB/s",
      cores: 3840,
      boostClock: "2.50 GHz",
      tdp: "145 W",
      interface: "PCIe 5.0",
      rayTracing: true,
      outputs: "3x DisplayPort, 1x HDMI",
    },
    sources: [
      v("https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5060-family/", "NVIDIA"),
      v("https://www.nvidia.com/en-us/geforce/graphics-cards/compare", "NVIDIA", "memoryBandwidth"),
    ],
  },
  {
    id: "amd-radeon-rx-9070-xt",
    brand: "AMD",
    model: "Radeon RX 9070 XT",
    fullName: "AMD Radeon RX 9070 XT",
    specs: {
      architecture: "RDNA 4",
      vram: 16,
      memoryType: "GDDR6",
      memoryBus: "256-bit",
      memoryBandwidth: "Up to 640 GB/s",
      cores: 4096,
      boostClock: "2970 MHz",
      tdp: "304 W",
      interface: "PCIe 5.0 x16",
      rayTracing: true,
      outputs: "DisplayPort 2.1a, HDMI 2.1b",
    },
    sources: [v("https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070xt.html", "AMD")],
  },
];

// --------------------------------------------
// TV
// --------------------------------------------

const tvFields: CategorySpecField[] = [
  { key: "releaseYear", label: "Model year", group: "Panel", type: "number" },
  { key: "screenSize", label: "Screen size", group: "Panel", type: "number", unit: "in" },
  { key: "resolution", label: "Resolution", group: "Panel", type: "text" },
  { key: "panelType", label: "Panel technology", group: "Panel", type: "text" },
  { key: "refreshRate", label: "Refresh rate", group: "Panel", type: "number", unit: "Hz" },
  { key: "hdrFormats", label: "HDR formats", group: "Panel", type: "text" },
  { key: "hdmiPorts", label: "HDMI ports", group: "Games and inputs", type: "number" },
  { key: "hdmi21", label: "HDMI 2.1", group: "Games and inputs", type: "boolean" },
  { key: "vrr", label: "Variable refresh rate", group: "Games and inputs", type: "boolean" },
  { key: "smartPlatform", label: "Smart platform", group: "Platform and build", type: "text" },
  { key: "dimensions", label: "Dimensions (without stand)", group: "Platform and build", type: "text" },
  { key: "weight", label: "Weight", group: "Platform and build", type: "number", unit: "kg" },
];

const tvProducts: CategoryProduct[] = [
  {
    id: "samsung-oled-s95f-65",
    brand: "Samsung",
    model: "OLED S95F 65\" (QN65S95FAPXPA)",
    fullName: "Samsung OLED S95F 65-inch",
    regionNote: "Latin America / Caribbean SKU. Panel, HDR and gaming features vary by region and screen size.",
    specs: {
      releaseYear: 2025,
      screenSize: 65,
      resolution: "4K (3,840 x 2,160)",
      panelType: "OLED",
      refreshRate: 120,
      hdrFormats: "OLED HDR Pro; HDR10+ (Adaptive, Gaming)",
      hdmiPorts: 4,
      hdmi21: null,
      vrr: true,
      smartPlatform: "Tizen OS",
      dimensions: "1443.5 x 829.4 x 11.0 mm",
      weight: 18.9,
    },
    sources: [v("https://www.samsung.com/latin_en/tvs/oled-tv/s95f-65-inch-oled-4k-smart-tv-qn65s95fapxpa", "Samsung")],
  },
  {
    id: "tcl-qm7k-65",
    brand: "TCL",
    model: "QM7K 65\" (65QM7K)",
    fullName: "TCL QM7K 65-inch QD-Mini LED",
    regionNote: "US series page. The QM7K series spans 55\" to 115\"; specifications differ by screen size.",
    specs: {
      releaseYear: 2025,
      screenSize: 65,
      resolution: "Native 3840 x 2160",
      panelType: "QD-Mini LED",
      refreshRate: 144,
      hdrFormats: "Dolby Vision IQ; HDR10+, HDR10, HLG",
      hdmiPorts: 4,
      hdmi21: null,
      vrr: null,
      smartPlatform: "Google TV",
      dimensions: null,
      weight: null,
    },
    sources: [v("https://us.tcl.com/products/qm7k-series-qd-mini-led-qled-4k-uhd-smart-tv-with-google-tv", "TCL")],
  },
  {
    id: "vizio-v4k65m-0804",
    brand: "VIZIO",
    model: "V4K65M-0804 65\"",
    fullName: "VIZIO V-Series 65-inch 4K",
    regionNote: "US model. Smart TV functionality requires a VIZIO account.",
    specs: {
      releaseYear: null,
      screenSize: 65,
      resolution: "3840 x 2160",
      panelType: "Full Array LED",
      refreshRate: 60,
      hdrFormats: "Dolby Vision, HDR10+, HDR10, HLG",
      hdmiPorts: 3,
      hdmi21: true,
      vrr: true,
      smartPlatform: "VIZIO OS",
      dimensions: "1445.8 x 829.8 x 74.7 mm",
      weight: 17.1,
    },
    sources: [v("https://www.vizio.com/en/tv/4k/V4K65M-0804", "VIZIO")],
  },
  {
    id: "panasonic-z95b-65",
    brand: "Panasonic",
    model: "Z95B 65\" (TV-65Z95BP)",
    fullName: "Panasonic Z95B 65-inch OLED",
    regionNote: "US / North America model, 120 V. Visible screen size 64.5 in.",
    specs: {
      releaseYear: 2025,
      screenSize: 65,
      resolution: "4K Ultra HD (3,840 x 2,160)",
      panelType: "Primary RGB Tandem OLED",
      refreshRate: 144,
      hdrFormats: "HDR10+ Adaptive, HDR10, HLG, Dolby Vision IQ",
      hdmiPorts: 4,
      hdmi21: true,
      vrr: true,
      smartPlatform: "Fire TV",
      dimensions: "1448 x 888 x 52 mm",
      weight: 24.0,
    },
    sources: [
      v("https://help.na.panasonic.com/answers/features-and-specifications-television-amazon-fire-oled-model-tv-65z95bp", "Panasonic"),
      v("https://news.panasonic.com/global/2025/01/07/01", "Panasonic Newsroom", "releaseYear"),
    ],
  },
];

// --------------------------------------------
// Smartwatch
// --------------------------------------------

const smartwatchFields: CategorySpecField[] = [
  { key: "caseSize", label: "Case size", group: "Case and display", type: "text" },
  { key: "displayType", label: "Display", group: "Case and display", type: "text" },
  { key: "displaySize", label: "Display size", group: "Case and display", type: "number", unit: "in" },
  { key: "resolution", label: "Resolution", group: "Case and display", type: "text" },
  { key: "weight", label: "Weight", group: "Case and display", type: "number", unit: "g" },
  { key: "os", label: "Operating system", group: "Software", type: "text" },
  { key: "compatibility", label: "Phone compatibility", group: "Software", type: "text" },
  {
    key: "batteryClaim",
    label: "Battery claim",
    group: "Battery and charging",
    type: "text",
    note: "Quoted exactly as the manufacturer states it. These are claims, not test results.",
  },
  { key: "charging", label: "Charging", group: "Battery and charging", type: "text" },
  { key: "gps", label: "GPS", group: "Radio and location", type: "boolean" },
  { key: "cellular", label: "Cellular", group: "Radio and location", type: "boolean" },
  { key: "nfc", label: "NFC", group: "Radio and location", type: "boolean" },
  { key: "bluetooth", label: "Bluetooth", group: "Radio and location", type: "text" },
  { key: "waterResistance", label: "Water resistance", group: "Durability", type: "text" },
  { key: "sensors", label: "Sensors", group: "Sensors", type: "text" },
];

const smartwatchProducts: CategoryProduct[] = [
  {
    id: "apple-watch-series-12",
    brand: "Apple",
    model: "Watch Series 12",
    fullName: "Apple Watch Series 12",
    specs: {
      caseSize: "42 mm / 46 mm",
      displayType: "Always-On Retina, wide-angle OLED, LTPO3",
      displaySize: null,
      resolution: "374 x 446 px (42 mm), 416 x 496 px (46 mm)",
      weight: null,
      os: "watchOS",
      compatibility: "iPhone 11 or later with iOS 27 or later",
      batteryClaim: "All-day battery life, up to 24 hours of normal use",
      charging: "Fast charge: up to 80% in about 30 minutes",
      gps: true,
      cellular: true,
      nfc: null,
      bluetooth: "Bluetooth 5.3",
      waterResistance: "50 m swimproof, ISO 22810:2010",
      sensors:
        "Second-generation electrical heart sensor, optical heart sensor, blood oxygen, temperature, compass, always-on altimeter, high-g accelerometer, gyroscope, ambient light, depth gauge to 6 m, water temperature",
    },
    sources: [v("https://www.apple.com/apple-watch-series-12/specs", "Apple")],
  },
  {
    id: "samsung-galaxy-watch8-classic",
    brand: "Samsung",
    model: "Galaxy Watch8 Classic 46 mm",
    fullName: "Samsung Galaxy Watch8 Classic (Bluetooth)",
    regionNote: "UK / EEA Bluetooth SKU (SM-L500NZKAEUA). Cellular variants and weights differ by region.",
    specs: {
      caseSize: "46 mm",
      displayType: "Super AMOLED",
      displaySize: 1.3,
      resolution: "438 x 438",
      weight: 63.5,
      os: "Wear OS powered by Samsung",
      compatibility: "Android 11.0 or above",
      batteryClaim: "Usage time up to 40 h (AOD off), up to 30 h (AOD on)",
      charging: "Wireless charging",
      gps: true,
      cellular: false,
      nfc: true,
      bluetooth: "Bluetooth 5.3",
      waterResistance: "5 ATM",
      sensors:
        "Accelerometer, barometer, bioelectrical impedance, electrical heart sensor, gyro, geomagnetic, hall, infrared temperature, light, optical heart rate",
    },
    sources: [v("https://www.samsung.com/uk/watches/galaxy-watch/galaxy-watch8-classic-46mm-black-bluetooth-sm-l500nzkaeua/", "Samsung UK")],
  },
  {
    id: "garmin-fenix-8-47-amoled",
    brand: "Garmin",
    model: "fēnix 8 47 mm AMOLED",
    fullName: "Garmin fēnix 8 47 mm AMOLED (Sapphire, Titanium)",
    regionNote: "Singapore product page for the 47 mm AMOLED sapphire/titanium variant.",
    specs: {
      caseSize: "47 mm",
      displayType: "AMOLED",
      displaySize: 1.4,
      resolution: "454 x 454",
      weight: 73,
      os: null,
      compatibility: "iPhone and Android",
      batteryClaim: "Smartwatch mode up to 16 days (7 days with always-on display)",
      charging: "Garmin proprietary plug charger",
      gps: true,
      cellular: null,
      nfc: null,
      bluetooth: "Bluetooth, ANT+, Wi-Fi",
      waterResistance: "10 ATM",
      sensors:
        "Multi-band GNSS (GPS, GLONASS, Galileo, QZSS, BeiDou) with SatIQ, wrist heart rate, Pulse Ox, barometric altimeter, compass, gyroscope, thermometer, ambient light, depth sensor to 40 m",
    },
    sources: [v("https://www.garmin.com.sg/products/wearables/fenix-8-47-amoled-orange", "Garmin")],
  },
  {
    id: "google-pixel-watch-5",
    brand: "Google",
    model: "Pixel Watch 5",
    fullName: "Google Pixel Watch 5",
    specs: {
      caseSize: "41 mm / 45 mm",
      displayType: "Actua 360, AMOLED LTPO, 320 ppi, DCI-P3",
      displaySize: null,
      resolution: null,
      weight: null,
      os: "Wear OS 7.0",
      compatibility: "Android 12.0 or newer",
      batteryClaim: "Up to 30 h with always-on display (41 mm), up to 40 h (45 mm)",
      charging: "Quick Charge Dock",
      gps: true,
      cellular: true,
      nfc: true,
      bluetooth: "Bluetooth 6.0",
      waterResistance: "5 ATM; IP68",
      sensors:
        "Compass, altimeter, red and infrared SpO2 sensors, electrical sensors compatible with ECG app, multi-path optical heart rate, accelerometer, gyroscope, ambient light, electrodermal activity, skin temperature, barometer, magnetometer",
    },
    sources: [v("https://support.google.com/googlepixelwatch/answer/12651869?hl=en", "Google")],
  },
];

// --------------------------------------------
// Projector
// --------------------------------------------

const projectorFields: CategorySpecField[] = [
  { key: "nativeResolution", label: "Native resolution", group: "Image", type: "text" },
  { key: "technology", label: "Projection technology", group: "Image", type: "text" },
  {
    key: "brightness",
    label: "Brightness",
    group: "Image",
    type: "number",
    unit: "lumens",
    note: "Measurement standards differ (ANSI, ISO 21118, IDMS). Values are not interchangeable.",
  },
  {
    key: "brightnessNote",
    label: "Brightness as published",
    group: "Image",
    type: "text",
  },
  {
    key: "contrast",
    label: "Contrast as published",
    group: "Image",
    type: "text",
    note: "Contrast ratios are measured differently between manufacturers and are not directly comparable.",
  },
  { key: "throwRatio", label: "Throw ratio", group: "Placement", type: "text" },
  { key: "projectionSize", label: "Projection size", group: "Placement", type: "text" },
  { key: "refreshRate", label: "Refresh rate", group: "Placement", type: "text" },
  { key: "hdrSupport", label: "HDR", group: "Sources and media", type: "text" },
  { key: "inputs", label: "Inputs", group: "Sources and media", type: "text" },
  { key: "builtInSpeakers", label: "Built-in speakers", group: "Sources and media", type: "boolean" },
  { key: "dimensions", label: "Dimensions", group: "Build", type: "text" },
  { key: "weight", label: "Weight", group: "Build", type: "number", unit: "kg" },
  { key: "lightSource", label: "Light source", group: "Light source", type: "text" },
  {
    key: "lightSourceLife",
    label: "Light source life",
    group: "Light source",
    type: "text",
    note: "Manufacturer figures depend on the mode selected and are not a warranty of image quality.",
  },
];

const projectorProducts: CategoryProduct[] = [
  {
    id: "benq-tk705sti",
    brand: "BenQ",
    model: "TK705STi",
    fullName: "BenQ TK705STi",
    specs: {
      nativeResolution: "4K UHD (3840 x 2160)",
      technology: "DLP",
      brightness: 3000,
      brightnessNote: "3000 ANSI lumens",
      contrast: "600,000:1 (FOFO)",
      throwRatio: "0.8",
      projectionSize: null,
      refreshRate: "23-60 Hz vertical scan rate",
      hdrSupport: null,
      inputs: "2x HDMI (HDCP 2.2), USB-A x2, USB-C (DisplayPort / PD out / reader), 12 V trigger",
      builtInSpeakers: true,
      dimensions: "229.2 x 168.2 x 249.7 mm (W x H x D)",
      weight: 3.8,
      lightSource: "4LED",
      lightSourceLife: "Normal 20,000 h, ECO 30,000 h",
    },
    sources: [v("https://www.benq.com/en-us/projector/cinema/tk705sti/spec.html", "BenQ")],
  },
  {
    id: "optoma-uhd55",
    brand: "Optoma",
    model: "UHD55",
    fullName: "Optoma UHD55",
    regionNote: "Australian product page.",
    specs: {
      nativeResolution: "UHD (3840 x 2160)",
      technology: "DLP",
      brightness: 3600,
      brightnessNote: "3600 lumens (measurement standard not stated on the page)",
      contrast: "1,200,000:1 (dynamic)",
      throwRatio: "1.21:1 to 1.59:1",
      projectionSize: "34.1\" to 302.4\" diagonal",
      refreshRate: "240 Hz at 1080p; vertical scan rate 24 to 120 Hz",
      hdrSupport: "HDR10, HLG",
      inputs: "2x HDMI 2.0, VGA (YPbPr/RGB), 3.5 mm audio",
      builtInSpeakers: true,
      dimensions: "315 x 270 x 118 mm (W x D x H)",
      weight: 3.9,
      lightSource: "Lamp",
      lightSourceLife: "4,000 h (Bright), 15,000 h (Dynamic), 10,000 h (Eco)",
    },
    sources: [v("https://au.optoma.com/product/uhd55", "Optoma")],
  },
  {
    id: "xgimi-horizon-ultra",
    brand: "XGIMI",
    model: "HORIZON Ultra",
    fullName: "XGIMI HORIZON Ultra",
    specs: {
      nativeResolution: "3840 x 2160",
      technology: "DLP",
      brightness: 2300,
      brightnessNote: "2300 ISO lumens, white light output measured to ISO 21118",
      contrast: null,
      throwRatio: "1.2 to 1.5:1",
      projectionSize: "40\" to 200\"",
      refreshRate: null,
      hdrSupport: "HDR10, HLG, Dolby Vision",
      inputs: "2x HDMI (one with eARC), USB-A x2, LAN, DC",
      builtInSpeakers: true,
      dimensions: "170 x 224 x 265 mm (H x W x D)",
      weight: 5.2,
      lightSource: "Dual light (LED + laser)",
      lightSourceLife: "25,000 hours",
    },
    sources: [v("https://us.xgimi.com/products/horizon-ultra", "XGIMI")],
  },
  {
    id: "epson-home-cinema-ls6000",
    brand: "Epson",
    model: "Home Cinema LS6000",
    fullName: "Epson Home Cinema LS6000",
    specs: {
      nativeResolution: "4K display technology 3840 x 2160 (dual axis 1920 x 1080)",
      technology: "3-chip 3LCD",
      brightness: 3400,
      brightnessNote: "Colour brightness 3,400 lm (IDMS 15.4); white brightness 3,400 lm (ISO 21118)",
      contrast: "Up to 800,000:1 with dynamic contrast in Normal and auto iris on",
      throwRatio: "1.32 to 2.15",
      projectionSize: "40\" to 300\"",
      refreshRate: "120 Hz",
      hdrSupport: "HDR10, HLG",
      inputs: "2x HDMI 2.1 (HDCP 2.3, one eARC), USB-A x2, mini USB, 3.5 mm audio out, LAN",
      builtInSpeakers: null,
      dimensions: "17.3 x 12.4 x 6.3 in (W x D x H) including feet",
      weight: null,
      lightSource: "True laser diode array",
      lightSourceLife: "Up to 20,000 hours (Normal mode)",
    },
    sources: [v("https://epson.com/For-Home/Projectors/Home-Cinema/Home-Cinema-LS6000-4K-HDR-Laser-Projector/p/V11HC38020", "Epson")],
  },
];

// --------------------------------------------
// Printer
// --------------------------------------------

const printerFields: CategorySpecField[] = [
  { key: "printerType", label: "Printer type", group: "Type", type: "text" },
  { key: "technology", label: "Print technology", group: "Type", type: "text" },
  { key: "colorCapability", label: "Colour", group: "Type", type: "text" },
  {
    key: "printSpeed",
    label: "Print speed as published",
    group: "Speed and quality",
    type: "text",
    note: "Speeds are quoted under different standards (ISO, ESAT, draft) and are not directly comparable.",
  },
  { key: "printResolution", label: "Print resolution", group: "Speed and quality", type: "text" },
  { key: "paperSizes", label: "Paper sizes", group: "Paper handling", type: "text" },
  { key: "duplex", label: "Automatic two-sided printing", group: "Paper handling", type: "text" },
  { key: "scanner", label: "Scanner", group: "Paper handling", type: "text" },
  { key: "adf", label: "Automatic document feeder", group: "Paper handling", type: "text" },
  { key: "connectivity", label: "Connectivity", group: "Connectivity", type: "text" },
  { key: "mobilePrinting", label: "Mobile printing", group: "Connectivity", type: "text" },
  { key: "dimensions", label: "Dimensions", group: "Build", type: "text" },
  { key: "weight", label: "Weight", group: "Build", type: "number", unit: "kg" },
  { key: "inkOrToner", label: "Ink or toner system", group: "Consumables", type: "text" },
  {
    key: "officialYield",
    label: "Stated yield",
    group: "Consumables",
    type: "text",
    note: "Yields are quoted to a stated standard and page coverage. They are not a prediction of what you will get.",
  },
];

const printerProducts: CategoryProduct[] = [
  {
    id: "hp-officejet-pro-9015e",
    brand: "HP",
    model: "OfficeJet Pro 9015e",
    fullName: "HP OfficeJet Pro 9015e All-in-One",
    specs: {
      printerType: "All-in-one inkjet",
      technology: "HP thermal inkjet",
      colorCapability: "Colour",
      printSpeed:
        "ISO: up to 22 ppm black, up to 18 ppm colour; draft: up to 32 ppm black, up to 32 ppm colour",
      printResolution: "1200 x 1200 rendered dpi (black); up to 4800 x 1200 optimized dpi (colour)",
      paperSizes: "A4, A5, A6, B5 (JIS), cards, photo (10x15, 13x18 cm), envelopes, 8.5 x 13 in",
      duplex: "Automatic (standard)",
      scanner: "Flatbed glass with dual-pass 2-sided ADF",
      adf: "35 sheets",
      connectivity: "USB 2.0, host USB, Ethernet, Wi-Fi 802.11a/b/g/n, 2x RJ-11",
      mobilePrinting: "HP app, Apple AirPrint, Wi-Fi Direct, Mopria, Chrome OS",
      dimensions: "439.3 x 342.5 x 278 mm (W x D x H)",
      weight: 9.29,
      inkOrToner: "4 separate cartridges (black, cyan, magenta, yellow)",
      officialYield: null,
    },
    sources: [v("https://www.hp.com/ph-en/products/printers/product-details/product-specifications/2101416772", "HP")],
  },
  {
    id: "epson-ecotank-et-2850",
    brand: "Epson",
    model: "EcoTank ET-2850",
    fullName: "Epson EcoTank ET-2850",
    specs: {
      printerType: "All-in-one cartridge-free supertank inkjet",
      technology: "4-colour (CMYK) drop-on-demand MicroPiezo inkjet",
      colorCapability: "Colour",
      printSpeed: "10.5 ISO ppm black, 5.0 ISO ppm colour; 6.0 / 4.0 ISO ppm auto 2-sided",
      printResolution: "5760 x 1440 dpi",
      paperSizes: "3.5x5, 4x6, 5x7, 8x10 in, Letter, A4, A6, Legal, Executive, half letter",
      duplex: "Auto 2-sided printing",
      scanner: "Colour flatbed (CIS)",
      adf: null,
      connectivity: "Hi-Speed USB, Wi-Fi 802.11 b/g/n, Wi-Fi Direct",
      mobilePrinting: "Epson Connect, Epson Smart Panel, Remote Print, AirPrint, Mopria",
      dimensions: "375 x 567 x 259 mm printing; 375 x 347 x 187 mm storage",
      weight: 5.4,
      inkOrToner: "4 individual ink bottles (502 series): black 127 mL, colour 70 mL",
      officialYield: "502 Black 127 mL: 7,500 pages; 502 colour 70 mL: 6,000 pages",
    },
    sources: [v("https://mediaserver.goepson.com/ImConvServlet/imconv/074ab2a0b163b09ed480249d5e449ce125366023/original?assetDescr=EcoTank_ET-2850_Printer_Specification_Sheet_CPD-60631R6.pdf", "Epson")],
  },
  {
    id: "brother-hl-l2480dw",
    brand: "Brother",
    model: "HL-L2480DW",
    fullName: "Brother HL-L2480DW Mono Laser",
    specs: {
      printerType: "Wireless monochrome laser multi-function",
      technology: "Electrophotographic laser",
      colorCapability: "Monochrome",
      printSpeed: "Up to 34 pages/minute (A4); up to 36 pages/minute (Letter)",
      printResolution: "1200 x 1200 dpi",
      paperSizes: "A4, Letter, B5 (JIS/ISO), A5, A6, Executive, Legal, Folio, 16K",
      duplex: "Yes (default)",
      scanner: "Flatbed",
      adf: null,
      connectivity: "Ethernet, dual-band Wi-Fi 802.11 a/b/g/n (2.4 / 5 GHz), Hi-Speed USB 2.0",
      mobilePrinting: "AirPrint, Brother Mobile Connect, Mopria, Wi-Fi Direct",
      dimensions: "16.1 x 15.7 x 10.7 in",
      weight: 10.1,
      inkOrToner: "Toner cartridge and drum: starter black toner, DR830 drum unit",
      officialYield: "Starter black toner 700 pages; DR830 drum 15,000 pages",
    },
    sources: [v("https://www.brother-usa.com/products/hll2480dw", "Brother")],
  },
  {
    id: "canon-pixma-tr4720",
    brand: "Canon",
    model: "PIXMA TR4720",
    fullName: "Canon PIXMA TR4720 All-in-One",
    specs: {
      printerType: "Wireless all-in-one inkjet",
      technology: "2-cartridge FINE hybrid ink system",
      colorCapability: "Colour",
      printSpeed:
        "ESAT: approx. 8.8 ipm black, 4.4 ipm colour; 4x6 in borderless photo approx. 65 seconds",
      printResolution: "Up to 4800 x 1200 dpi",
      paperSizes: "4x6, 5x7, 8x10 in, Letter, Legal, US #10 envelopes, custom 4-8.5 in wide",
      duplex: "Auto 2-sided (Letter, plain paper)",
      scanner: "Flatbed with ADF (CIS)",
      adf: "20 sheets Letter, 5 sheets Legal",
      connectivity: "Hi-Speed USB, Wi-Fi 802.11 b/g/n (2.4 GHz), Wireless Direct, Wireless Connect",
      mobilePrinting: "Canon PRINT Inkjet/SELPHY, Canon Print Service, AirPrint, Mopria",
      dimensions: "17.2 x 11.7 x 7.5 in closed; 17.2 x 16.2 x 7.5 in with paper",
      weight: null,
      inkOrToner: "2-cartridge FINE: PG-275 pigment black, CL-276 dye colour",
      officialYield: null,
    },
    sources: [v("https://downloads.canon.com/printer/tr4720/PIXMA_TR4720_Specifications_210817.pdf", "Canon")],
  },
];

// --------------------------------------------
// Registry
// --------------------------------------------

export const categoryDatasets: CategoryDataset[] = [
  { id: "cpus", label: "CPUs", singular: "CPU", route: "/cpu-comparison", fields: cpuFields, products: cpuProducts, maxCompare: 3 },
  { id: "gpus", label: "GPUs", singular: "GPU", route: "/gpu-comparison", fields: gpuFields, products: gpuProducts, maxCompare: 3 },
  { id: "tvs", label: "TVs", singular: "TV", route: "/tv-comparison", fields: tvFields, products: tvProducts, maxCompare: 3 },
  { id: "smartwatches", label: "Smartwatches", singular: "smartwatch", route: "/smartwatch-comparison", fields: smartwatchFields, products: smartwatchProducts, maxCompare: 3 },
  { id: "projectors", label: "Projectors", singular: "projector", route: "/projector-comparison", fields: projectorFields, products: projectorProducts, maxCompare: 3 },
  { id: "printers", label: "Printers", singular: "printer", route: "/printer-comparison", fields: printerFields, products: printerProducts, maxCompare: 3 },
];

export function getCategoryDataset(id: string): CategoryDataset {
  const found = categoryDatasets.find((d) => d.id === id);
  if (!found) throw new Error(`Unknown category dataset: ${id}`);
  return found;
}

/** Note shown wherever a dataset-backed tool appears. */
export function datasetNote(dataset: CategoryDataset): string {
  return `Every value in this table was transcribed from the manufacturer or database page linked under each column and checked on 1 October 2026. The table covers ${dataset.products.length} ${dataset.products.length === 1 ? "record" : "records"} — it is a sample, not a complete market list. A blank cell means the source did not publish that figure; it is shown as "Not verified" rather than filled with an estimate. CompareForge runs no lab tests, publishes no benchmark scores and no prices.`;
}
