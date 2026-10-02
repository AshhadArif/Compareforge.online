import type { SpecCategoryId } from "@/components/tools/SpecComparison";

export interface CategoryHubConfig {
  slug: string;
  /** Canonical route for this hub. Defaults to `/compare/{slug}`. */
  path?: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** Manual-entry template used when this hub has no published dataset. */
  specCategory?: SpecCategoryId;
  /** Id of a published dataset rendered by the comparison tool instead of a manual template. */
  datasetId?: string;
  toolHeading: string;
  toolIntro: string;
  specificationsHeading: string;
  specificationsIntro: string;
  specGroups: { title: string; body: string }[];
  focusHeading: string;
  focusIntro: string;
  focusItems: { title: string; body: string }[];
  useCaseHeading?: string;
  useCaseIntro?: string;
  useCases?: { title: string; criteria: string[] }[];
  sections?: {
    heading: string;
    paragraphs?: string[];
    steps?: string[];
    items?: { title: string; body: string }[];
  }[];
  faq: { question: string; answer: string }[];
  related: { href: string; label: string; blurb: string }[];
}

/** Canonical route for a hub. */
export function hubPath(hub: CategoryHubConfig): string {
  return hub.path ?? `/compare/${hub.slug}`;
}

export const DATA_NOTE =
  "CompareForge publishes a product record only when every field in it has a source we can cite. Records currently cover smartphones, plus a small set of processors, graphics cards, televisions, smartwatches, projectors and printers — which is why those categories read from records while the tool above reads from the values you enter. We would rather ask you to transcribe two numbers from the manufacturer's specification page than publish an estimate.";

export const categoryHubs: CategoryHubConfig[] = [
  {
    slug: "laptops",
    title: "Laptop Comparison — Compare Laptop Specs Side by Side",
    description:
      "Compare laptops side by side: processor, RAM, storage, display, graphics, battery, weight and ports. Free laptop comparison tool with differences highlighted.",
    h1: "Laptop Comparison",
    intro:
      "Put two laptops side by side and compare the specifications that decide whether a machine suits your work — processor, memory, storage, display, graphics, battery, weight and ports — with every difference labelled.",
    specCategory: "laptops",
    toolHeading: "Compare Laptops Side by Side",
    toolIntro:
      "The template below is preloaded with the laptop specifications that matter most. Edit any value, delete rows you do not care about, and add your own — for example port selection, keyboard layout or warranty length.",
    specificationsHeading: "Compare Laptop Specifications",
    specificationsIntro:
      "These are the fields worth reading on a laptop specification page, and what each one actually tells you. The order roughly follows how often a field changes the decision.",
    specGroups: [
      {
        title: "Processor",
        body: "The exact chip model and its core count. Model names matter more than clock speed: a newer generation with fewer cores often outperforms an older one with more, and the suffix (U, H, HX, G) tells you the power class the chassis is built for.",
      },
      {
        title: "Memory (RAM)",
        body: "Capacity in gigabytes and the DDR generation. 8 GB is workable for browsing and documents; 16 GB is the practical floor for development, large spreadsheets and creative work; beyond that, check whether the memory is soldered before assuming you can upgrade later.",
      },
      {
        title: "Storage",
        body: "Capacity and the SSD standard. Capacity is the headline, but the interface generation determines real throughput, and whether a second slot exists matters more than the number on the label for anyone who upgrades.",
      },
      {
        title: "Display",
        body: "Size, resolution, panel type and refresh rate — and, where the manufacturer publishes it, colour coverage and brightness. A 15.6-inch 1080p panel and a 14-inch 1800p panel are different trade-offs between text clarity and portability.",
      },
      {
        title: "Graphics",
        body: "Integrated or discrete, and which model. This is the single biggest split in the laptop market: integrated graphics are lighter and cheaper, while a discrete GPU is what games and GPU-accelerated rendering actually need.",
      },
      {
        title: "Battery",
        body: "Watt-hour capacity. Watt-hours are comparable across laptops in a way that 'up to X hours' claims are not, because runtime depends entirely on what you are doing. Pair it with the charger wattage to see how fast it can be refilled.",
      },
      {
        title: "Weight and dimensions",
        body: "Weight in kilograms and the chassis measurements. Weight decides whether a laptop lives in your bag permanently, and it usually moves in the opposite direction to battery capacity.",
      },
      {
        title: "Ports and connectivity",
        body: "The exact port list — USB-C generations, USB-A, HDMI version, card reader, headphone jack — plus the Wi-Fi and Bluetooth versions. This is where thin-and-light laptops most often need a dongle, so count the ports you actually use.",
      },
      {
        title: "Operating system",
        body: "The OS shipped and any edition limits. If you rely on specific software, check the platform before comparing anything else.",
      },
    ],
    focusHeading: "What Laptop Specifications Matter?",
    focusIntro:
      "Almost every laptop decision comes down to four trade-offs. Working through them in order keeps you from comparing thirty fields when six would do.",
    focusItems: [
      {
        title: "Portability against battery",
        body: "Weight, chassis size and watt-hours pull against each other. Decide whether the laptop leaves the house first, then set a weight ceiling and read only machines under it.",
      },
      {
        title: "Sustained performance against noise",
        body: "A thin chassis with a fast chip throttles under sustained load. If you render, compile or game for long stretches, look at the power class of the chip rather than the benchmark headline.",
      },
      {
        title: "Memory against upgradeability",
        body: "Soldered RAM cannot be changed after purchase, so the capacity at checkout is permanent. Soldered storage is rarer but equally final — check both before assuming you can fix a shortfall later.",
      },
      {
        title: "Display against everything else",
        body: "You look at the screen for every minute you use the machine. Resolution, panel type and brightness are felt constantly; an extra few percentage points of processor speed usually is not.",
      },
    ],
    useCaseHeading: "Laptop Comparison for Different Use Cases",
    useCaseIntro:
      "The weights below are the criteria we would apply for each kind of use. They are a starting framework, not a ranking — set your own priorities and let the table above do the arithmetic.",
    useCases: [
      {
        title: "For students",
        criteria: [
          "Weight and battery life first: it is carried between buildings all day",
          "Enough RAM for many browser tabs alongside lecture notes",
          "A durable chassis and a keyboard you can type on for hours",
          "A visible, upgradeable storage option if you keep the machine for years",
        ],
      },
      {
        title: "For gaming",
        criteria: [
          "Discrete GPU model and its video memory, ahead of the CPU",
          "Display refresh rate and response time, not just resolution",
          "Cooling and power class: sustained performance beats peak numbers",
          "Upgradeable RAM and a second storage slot",
        ],
      },
      {
        title: "For productivity",
        criteria: [
          "Sustained multi-core performance for large spreadsheets and compilations",
          "16 GB of memory or more, ideally not soldered",
          "A high-resolution, low-glare panel for long document sessions",
          "Port coverage so the laptop works at a desk without adapters",
        ],
      },
      {
        title: "For creative work",
        criteria: [
          "Colour coverage and factory calibration of the display",
          "Discrete graphics for GPU-accelerated exports and 3D work",
          "Fast, high-capacity storage for large project files",
          "Sustained cooling so long exports do not throttle",
        ],
      },
    ],
    sections: [
      {
        heading: "What Is a Laptop Comparison Tool?",
        paragraphs: [
          "A laptop comparison tool takes the specification sheets of two or more machines and puts them in the same rows, in the same units, so the differences are visible at a glance. That is the whole job: manufacturers publish the same categories in different orders, different units and different levels of detail, which makes side-by-side reading slow and error-prone.",
          "The tool on this page does exactly that and nothing more. It does not score laptops, does not weight the rows for you and does not have a database of machines behind it — you bring the values from each manufacturer's specification page, and the tool computes the differences between them. Rows you leave empty are shown as unavailable rather than filled with a typical figure.",
        ],
      },
      {
        heading: "How to Compare Laptops",
        steps: [
          "Set your constraints first: budget ceiling, operating system, and whether the laptop travels every day.",
          "Open both specification pages and enter the same fields into the same rows — the template loads processor, memory, storage, display, graphics, battery, weight, ports and operating system.",
          "Read memory and storage before the processor. Both are usually soldered, so what you buy is what the machine has for its whole life.",
          "Read the display rows next: size, resolution, panel type and refresh rate together, because they jointly decide sharpness and comfort.",
          "Check ports against the peripherals you actually use — this is where thin-and-light machines most often need adapters.",
          "Use the differences column to drop the rows that are identical, then add your own rows for anything the manufacturer publishes that we have not listed.",
        ],
      },
      {
        heading: "Which Laptop Should I Buy?",
        paragraphs: [
          "We do not know your answer, and a page that pretends otherwise would be guessing. What we can give you is the framework most laptop decisions resolve into — work through it, then use the table above to see which of your candidates satisfies it.",
          "Decide in this order: first the budget, because it removes machines immediately. Then the operating system, because it removes software. Then whether the laptop leaves the house, which sets a weight ceiling. Then the display, because you look at it for every minute of use. Then memory, because it is usually permanent. Then storage capacity and whether it can be expanded. Then processor and graphics, which matter only after the previous rows are settled. Then battery capacity in watt-hours and the charger wattage. Then ports, wireless versions and any expansion you need.",
          "Enter the two or three machines still standing into the tool, apply your own weights, and let the differences decide it. If a specification is missing from either manufacturer's page, it will appear as unavailable — which is itself useful information about how completely a machine is documented.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare laptop specifications?",
        answer:
          "Collect both manufacturers' specification pages, then enter the same fields for each machine in the tool above. Start with processor, RAM, storage, display, graphics, battery, weight and ports — the template loads those rows for you.",
      },
      {
        question: "What is the most important laptop specification?",
        answer:
          "It depends on what you do, which is why there is no universal answer. For most people the sequence that works is: decide weight and battery ceiling, then memory (because it is usually not upgradeable), then display, then processor and graphics.",
      },
      {
        question: "Can I compare laptop specifications for gaming or for students?",
        answer:
          "Yes. The use-case section above lists the criteria we would weight for gaming, student, productivity and creative use. The tool does not rank machines for you — it shows the numbers so you can apply your own weights.",
      },
      {
        question: "Do you publish laptop reviews or scores?",
        answer:
          "No. CompareForge does not run lab tests and does not assign review scores. We compare specification values and show where they came from.",
      },
      {
        question: "Does CompareForge have laptop records in its database?",
        answer:
          "Not yet. Our verified product records cover smartphones today, plus processors, graphics cards, televisions, smartwatches, projectors and printers. Laptop records will be added only when every field has a citable source — until then, the comparison tool uses the values you enter.",
      },
      {
        question: "Which laptop should I buy?",
        answer:
          "That is a decision the tool deliberately does not make. Work through the four trade-offs above, decide your own weights, and use the table to see which of your two candidates meets them.",
      },
    ],
    related: [
      { href: "/compare", label: "Product Comparison", blurb: "The hub that links every comparison category." },
      { href: "/compare/tablets", label: "Tablet Comparison", blurb: "Compare the lighter alternative for the same work." },
      { href: "/compare/monitors", label: "Monitor Comparison", blurb: "Compare the display the laptop drives." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "The tool on this page, for any category." },
      { href: "/tools/decision-matrix", label: "Weighted Decision Matrix", blurb: "Score both laptops against your own weighted criteria." },
      { href: "/tools/percentage-difference-calculator", label: "Percentage Difference", blurb: "Quantify any two figures from the spec sheets." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "What the common specification terms actually mean." },
      { href: "/compare/phones", label: "Phone Comparison", blurb: "The same approach, running on our verified database." },
    ],
  },
  {
    slug: "tablets",
    title: "Tablet Comparison — Compare Tablets Side by Side",
    description:
      "Compare tablets side by side: display size, resolution, refresh rate, chipset, storage, battery, dimensions and operating system. Free tablet comparison tool.",
    h1: "Tablet Comparison",
    intro:
      "Compare two tablets across display, performance, battery, storage, size and operating system — with each difference labelled, using the values you bring from the manufacturers' own specification pages.",
    specCategory: "tablets",
    toolHeading: "Compare Tablets Side by Side",
    toolIntro:
      "The tablet template loads display, chipset, memory, storage, battery, camera, weight, dimensions, operating system and price. Change any value or add rows for stylus support, keyboard attachment or cellular connectivity.",
    specificationsHeading: "Compare Tablet Specifications",
    specificationsIntro:
      "A tablet is mostly screen and battery, so those two areas carry more of the decision than they do on a laptop. The fields below are the ones worth transcribing first.",
    specGroups: [
      {
        title: "Display and resolution",
        body: "Size in inches, pixel count, panel type and refresh rate. Diagonal size plus resolution gives you pixel density, which is what determines whether text looks crisp at reading distance — the difference between a 10-inch 1200p and a 11-inch 1600p panel is visible on every page of text.",
      },
      {
        title: "Refresh rate",
        body: "Measured in hertz. 60 Hz is adequate for reading and video; higher rates make scrolling, drawing and system animation feel noticeably smoother, and matter most if you use a stylus.",
      },
      {
        title: "Performance",
        body: "Chipset model, CPU core count and memory capacity. The chipset name is the reliable comparable — core counts alone are misleading across manufacturers, and memory capacity determines how many apps stay open.",
      },
      {
        title: "Battery",
        body: "Capacity in milliamp-hours. Like laptops, tablet runtime claims are measured under conditions you will not reproduce, so capacity is the honest figure to compare — alongside the charger that ships in the box.",
      },
      {
        title: "Storage",
        body: "Capacity and whether it is expandable. Tablet storage is often fixed at purchase, so buy for the larger end of what you will need; check whether a card slot exists before assuming you can grow it later.",
      },
      {
        title: "Dimensions and weight",
        body: "Height, width, depth and weight. A tablet is held in one hand for long periods, so weight and the width across the back matter more than the screen size alone suggests.",
      },
      {
        title: "Operating system",
        body: "OS at launch and the manufacturer's update commitment. This is the specification with the longest effect on the device: it determines which apps you can run and how long the tablet stays secure.",
      },
      {
        title: "Cameras",
        body: "Rear and front sensor resolution in megapixels, plus video capability. On tablets the front camera usually matters more — it is what video calls use — so compare its resolution and position rather than the headline rear figure.",
      },
    ],
    focusHeading: "What to Look for When Comparing Tablets",
    focusIntro:
      "Tablets fail in predictable ways. These are the four checks that catch most of them before you buy.",
    focusItems: [
      {
        title: "Intended use before specs",
        body: "A drawing tablet, a reading tablet and a laptop replacement need different things. Decide which one you are buying, then compare only the rows that follow from it.",
      },
      {
        title: "Software commitment",
        body: "Update years are published, comparable and permanent. A tablet that stops receiving security updates in two years is a different purchase from one supported for six, whatever the chipset.",
      },
      {
        title: "Memory cannot be added later",
        body: "On most tablets RAM and storage are soldered. The capacity on the box is the capacity for the life of the device, so treat it as a floor rather than a starting point.",
      },
      {
        title: "Accessories are part of the cost",
        body: "If you need a stylus or a keyboard, check whether they are included, whether they attach magnetically or by Bluetooth, and what they cost separately before comparing prices.",
      },
    ],
    sections: [
      {
        heading: "How to Use the Tablet Comparison Tool",
        steps: [
          "Open both manufacturers' specification pages in separate tabs.",
          "Enter the same field for each tablet in the same row — the template above already loads display, chipset, memory, storage, battery, camera, weight, dimensions, operating system and price.",
          "Delete any row you do not care about, and add rows for stylus support, keyboard attachment or cellular connectivity if they matter to your use.",
          "Read the differences column first: identical rows can be skipped, and a row with no value is a data gap rather than a difference.",
          "If two candidates are still close, add the rows that decide it for you — accessories, update commitment, charger — and let the table show the trade-off.",
        ],
      },
      {
        heading: "Tablet Size Comparison",
        paragraphs: [
          "Size on a tablet is three separate numbers, and they pull in different directions. Diagonal screen size decides how much you can see; the width across the back decides whether the tablet is comfortable to hold in one hand; depth decides which case and keyboard cover fit.",
          "Weight matters more here than on almost any other device, because a tablet is held rather than rested. Two tablets with similar screens can differ enough in weight that one is a reading device and the other is a desk device. Compare weight together with screen size rather than separately, and treat the width figure as the one-handed usability test.",
          "Where a manufacturer has not published dimensions or weight, the row is shown as unavailable rather than estimated — a size comparison built on guesses would be worse than no size comparison at all.",
        ],
      },
      {
        heading: "Tablet Display Comparison",
        paragraphs: [
          "Start with screen size and resolution together, because their ratio is what produces pixel density. Density is what you actually perceive when reading: at the same distance, a 10-inch 1200p panel and an 11-inch 1600p panel do not feel like a one-inch difference, they feel like a different generation of sharpness.",
          "Refresh rate is the second display decision. 60 Hz is adequate for reading, video and office work; higher rates make scrolling and system animation visibly smoother and matter most if you draw with a stylus or play games on the device. Where a manufacturer does not publish the rate, we show it as unavailable rather than assuming 60 Hz.",
          "Brightness and panel type are worth reading where they are published. Brightness decides whether the screen stays usable opposite a window, and panel type governs viewing angles and contrast — both are listed when the manufacturer states them and left blank when they do not.",
        ],
      },
      {
        heading: "Tablet Performance Comparison",
        paragraphs: [
          "Compare the chipset model first. It is the single row that determines the generation of the device, and it is the only performance specification that is comparable across manufacturers without a benchmark — core counts and clock speeds are not comparable between different architectures, which is why we do not rank tablets by them.",
          "Memory capacity is the second performance row, and it is usually the more permanent one: on most tablets memory and storage are soldered, so the capacity at purchase is the capacity for the life of the device. Compare it against how many applications you keep open rather than against a number that sounds large.",
          "We publish no benchmark scores, no frame-rate figures and no speed rankings. If a specification is not on the manufacturer's specification page, it does not appear in this comparison.",
        ],
      },
      {
        heading: "Tablet Storage Comparison",
        paragraphs: [
          "Capacity is the headline, but the two rows that matter around it are whether storage expands and what the operating system reserves for itself. A fixed 128 GB tablet and a fixed 256 GB tablet are different purchases for someone who keeps offline video or large art files.",
          "Check for a card slot before assuming you can grow storage later. Where expansion is supported, note the maximum supported capacity and the card format, because those vary between manufacturers and are easy to discover too late.",
          "Where a manufacturer publishes the available capacity after system software, we show it; where they do not, the row is left as a data gap rather than filled with a typical figure.",
        ],
      },
      {
        heading: "Tablet Connectivity",
        paragraphs: [
          "Wi-Fi standard and Bluetooth version are the rows to compare for any tablet used at home or in an office: they determine sustained throughput, how many accessories can be attached at once, and how the tablet behaves with a keyboard, stylus and headphones all connected together.",
          "Cellular connectivity is a separate purchase decision. If you need mobile data, compare the supported bands and whether the device takes a physical SIM or uses an eSIM — and remember the tablet costs more in both purchase price and an ongoing data plan.",
          "Physical connections vary more than the specification sheet suggests: USB-C generation, whether the port supports display output and charging power, a headphone jack, and any card slot. If you plan to attach a keyboard, mouse, external display or storage, check these rows before comparing anything else.",
        ],
      },
    ],
    faq: [
      {
        question: "What should I look for when comparing tablets?",
        answer:
          "Decide the use first, then compare display size and resolution, chipset and memory, battery capacity, storage (which is usually fixed), weight and the software update commitment. The tool above loads all of those rows for you.",
      },
      {
        question: "How do I compare tablet sizes?",
        answer:
          "Enter height, width, depth and weight for both tablets. Width across the back is the figure that decides whether a tablet is comfortable to hold one-handed, and it does not always track screen size.",
      },
      {
        question: "Is a bigger tablet screen always better?",
        answer:
          "No. A larger screen increases weight and width at the same time it improves reading and video. Compare screen size together with weight rather than separately.",
      },
      {
        question: "Can I compare iPad and Android tablets?",
        answer:
          "Yes — the tool is platform-agnostic, so you can put any two models side by side. Compare the hardware rows directly, and treat the operating system row as a compatibility question rather than a score.",
      },
      {
        question: "Do you publish tablet reviews or ratings?",
        answer:
          "No. We do not run lab tests and do not assign scores. The comparison reports specification differences and shows where each value came from.",
      },
      {
        question: "Does CompareForge have tablet records in its database?",
        answer:
          "Not yet — our verified product records currently cover smartphones, processors, graphics cards, televisions, smartwatches, projectors and printers. We add a category only once every field has a citable source, so for tablets the tool uses the specifications you enter.",
      },
    ],
    related: [
      { href: "/compare", label: "Product Comparison", blurb: "The hub that links every comparison category." },
      { href: "/compare/phones", label: "Phone Comparison", blurb: "The same approach, running on our verified database." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "The tablet comparison tool, for any category." },
      { href: "/compare/phone-size-comparison", label: "Phone Size Comparison", blurb: "The same to-scale size method, on our database." },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison", blurb: "Draw any two objects to scale, including tablets." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/compare/laptops", label: "Laptop Comparison", blurb: "The tablet's closest competitor for the same job." },
      { href: "/guides/understanding-product-dimensions", label: "Understanding product dimensions", blurb: "How to read size and weight figures." },
    ],
  },
  {
    slug: "monitors",
    title: "Monitor Comparison — Compare Monitors Side by Side",
    description:
      "Compare monitors side by side: screen size, resolution, refresh rate, panel type, response time, brightness, ports and aspect ratio. Free monitor comparison tool.",
    h1: "Monitor Comparison",
    intro:
      "Compare two monitors across size, resolution, refresh rate, panel type, response time, brightness and ports — the specifications that actually determine what a display is good for.",
    specCategory: "monitors",
    toolHeading: "Compare Monitors Side by Side",
    toolIntro:
      "The monitor template covers screen size, resolution, refresh rate, panel type, aspect ratio, response time, brightness, ports, HDR, dimensions and price. Add rows for colour coverage, hub functions or VESA support if they matter to your setup.",
    specificationsHeading: "Compare Monitor Specifications",
    specificationsIntro:
      "Monitor specifications interact more than any other category on this site: resolution and size together define sharpness, refresh rate and response time together define motion, and panel type shapes all three.",
    specGroups: [
      {
        title: "Screen size and resolution",
        body: "Compare them together, never separately. Pixels per inch comes from both — a 27-inch 1440p monitor and a 32-inch 4K monitor have almost identical density despite very different headline numbers, and a 27-inch 1080p panel is visibly soft in comparison.",
      },
      {
        title: "Refresh rate",
        body: "Frames per second the panel can display, in hertz. Above 60 Hz the improvement in cursor and window movement is immediately visible; the gains continue for fast-paced gaming but flatten for office work.",
      },
      {
        title: "Panel type",
        body: "IPS, VA or TN — plus OLED where it appears. This is the specification that governs contrast, viewing angles and colour behaviour. It is a structural choice rather than a better-or-worse one: VA panels trade response time for contrast, IPS trades contrast for viewing angles and consistency.",
      },
      {
        title: "Response time",
        body: "Milliseconds, as published by the manufacturer. Treat these as vendor claims rather than measured facts — the measurement conditions vary — and compare them only alongside the panel type and refresh rate.",
      },
      {
        title: "Brightness and HDR",
        body: "Peak brightness in nits, and the HDR tier the panel claims. Brightness decides whether the display is usable opposite a window, and HDR claims range from a checkbox to a genuinely different experience, so the tier matters more than the word.",
      },
      {
        title: "Aspect ratio",
        body: "16:9, 21:9, 32:9 or taller formats. It determines how much horizontal room you have for side-by-side windows and whether the monitor fits your desk depth and your existing stand.",
      },
      {
        title: "Ports",
        body: "The exact input list and versions — HDMI 2.1 versus 2.0, DisplayPort generation, USB-C with power delivery, and any built-in hub. Check what your computer actually outputs before comparing anything else.",
      },
      {
        title: "Dimensions and weight",
        body: "Width, height, depth with the stand, and weight. Ultrawide monitors need desk depth that the panel size alone does not suggest, and stand footprint determines what else fits underneath.",
      },
    ],
    focusHeading: "What Matters When Choosing a Monitor?",
    focusIntro:
      "A monitor is a set of coupled decisions. Working through them in this order avoids the common trap of buying a fast panel in the wrong resolution.",
    focusItems: [
      {
        title: "Resolution relative to size",
        body: "Fix the pixel density you want first, then choose the size. Distance matters too: a monitor used at arm's length needs more pixels than one viewed closer.",
      },
      {
        title: "Panel type before speed",
        body: "Decide between contrast, viewing angle and response characteristics first. A fast panel in the wrong technology is still the wrong panel for your use.",
      },
      {
        title: "Inputs you can actually drive",
        body: "Your graphics card and cable determine the achievable refresh rate at a given resolution. A 4K 144 Hz claim is irrelevant if your port only carries 4K 60.",
      },
      {
        title: "The stand is part of the product",
        body: "Height adjustment, tilt and VESA compatibility affect daily comfort and are not usually upgradeable. A slightly slower panel with a good stand often serves better over years of use.",
      },
    ],
    faq: [
      {
        question: "How do I compare monitors?",
        answer:
          "Compare screen size and resolution together, then panel type, refresh rate, response time, brightness, aspect ratio and ports. The template above loads those rows so you can enter both monitors from their spec sheets.",
      },
      {
        question: "Which monitor specification matters most?",
        answer:
          "For most people it is the combination of size, resolution and panel type, because those three decide sharpness, contrast and viewing angle. Refresh rate takes over only once you know the monitor is for fast-moving content.",
      },
      {
        question: "Are monitor response time figures reliable?",
        answer:
          "They are manufacturer claims measured under conditions that differ between brands. Compare them only alongside panel type and refresh rate, and treat small differences between models as noise.",
      },
      {
        question: "Can I compare a monitor against a TV?",
        answer:
          "Yes — the tool accepts any values. Enter the same rows for both and add your own for inputs and stand adjustment. Remember viewing distance differs between a desk and a sofa.",
      },
      {
        question: "Do you publish monitor reviews or test results?",
        answer:
          "No. We do not measure displays and do not publish scores, colour-accuracy measurements or input-lag results. We compare published specifications and label where each one came from.",
      },
      {
        question: "Does CompareForge have monitor records in its database?",
        answer:
          "Not yet. Our verified product records currently cover smartphones, processors, graphics cards, televisions, smartwatches, projectors and printers; monitor records will be added when every field has a citable source. Until then this page uses the values you enter.",
      },
    ],
    related: [
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "The tool on this page, for any category." },
      { href: "/tools/percentage-difference-calculator", label: "Percentage Difference", blurb: "Compare refresh rates, brightness or density." },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison", blurb: "Check a monitor fits the desk space you have." },
      { href: "/tools/fit-clearance-checker", label: "Fit & Clearance Checker", blurb: "Does it fit the opening or stand?" },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/compare/laptops", label: "Laptop Comparison", blurb: "Compare the machine driving the display." },
    ],
  },
  {
    slug: "cameras",
    title: "Camera Comparison — Compare Cameras Side by Side",
    description:
      "Compare cameras side by side: sensor format, megapixels, lens mount, video resolution, stabilization, burst rate, weight and battery. Free camera comparison tool.",
    h1: "Camera Comparison",
    intro:
      "Compare two cameras on the specifications that shape what you can shoot — sensor format, resolution, lens system, video capability, stabilization, burst rate, weight and battery life.",
    specCategory: "cameras",
    toolHeading: "Compare Cameras Side by Side",
    toolIntro:
      "The camera template loads type, sensor format, megapixels, lens mount, maximum video, stabilization, ISO range, burst rate, weight, battery life and price. Add rows for weather sealing, card slots or viewfinder specs if you need them.",
    specificationsHeading: "Compare Camera Specifications",
    specificationsIntro:
      "Camera specifications describe the hardware envelope — what the body is capable of, not what a particular photograph will look like. We compare the former and do not claim the latter.",
    specGroups: [
      {
        title: "Camera type",
        body: "Mirrorless, DSLR, compact or interchangeable-lens system. It determines the lens catalogue available to you and the body size, which matters more over a decade of ownership than any single specification.",
      },
      {
        title: "Sensor format and resolution",
        body: "Full-frame, APS-C, Micro Four Thirds or smaller, with megapixels alongside. Sensor size affects depth of field and low-light behaviour; megapixels affect how much you can crop. They trade against each other at a given price and body size.",
      },
      {
        title: "Lens mount",
        body: "The bayonet the body uses. This is a long-term commitment: the mount determines which lenses you can use natively and how large the used market is if you switch later.",
      },
      {
        title: "Video capability",
        body: "Maximum resolution and frame rate, plus any recording limits. 4K at 30 fps and 4K at 60 fps are different tools for different work, and crop factors in video mode change the effective field of view.",
      },
      {
        title: "Stabilization",
        body: "In-body, in-lens, or neither. It is measured in stops where the manufacturer publishes it, and it determines how slow a shutter you can hand-hold — the specification most directly connected to what you can shoot without a tripod.",
      },
      {
        title: "Burst rate and autofocus points",
        body: "Frames per second and the number and type of focus areas. Relevant for action and wildlife; largely irrelevant for landscape and studio work, so weight it against what you shoot.",
      },
      {
        title: "Weight and dimensions",
        body: "Body weight with and without a battery, as published. Carrying a camera is a physical decision: a body plus two lenses is a different proposition from a pocketable compact, whatever the sensor size says.",
      },
      {
        title: "Battery life",
        body: "Shot count per charge under the manufacturer's standard test. It is measured consistently enough to compare between bodies, though real-world figures are always lower.",
      },
    ],
    focusHeading: "What to Compare When Choosing a Camera",
    focusIntro:
      "The specification sheet tells you what a camera can do. These four questions decide whether what it can do matches what you shoot.",
    focusItems: [
      {
        title: "The lens system first",
        body: "You are buying into a mount, not a body. Check the lenses you would need exist and what they cost before comparing body specifications at all.",
      },
      {
        title: "Sensor format against portability",
        body: "A larger sensor usually means a larger body and larger lenses. The total system weight is the honest number, not the body weight alone.",
      },
      {
        title: "Video requirements against stills",
        body: "Video pulls toward resolution, frame rate, recording limits and stabilization; stills pull toward burst rate and viewfinder. If both matter, check the compromise each body makes.",
      },
      {
        title: "Expandable storage and ports",
        body: "Card slot count and type, microphone and headphone jacks, and whether the ports are full-size. On video-focused bodies these decide whether you can work without adapters.",
      },
    ],
    faq: [
      {
        question: "How do I compare cameras?",
        answer:
          "Enter the same fields for both bodies: type, sensor format, resolution, lens mount, video capability, stabilization, burst rate, weight and battery life. The template above loads those rows for you.",
      },
      {
        question: "Which camera specification matters most?",
        answer:
          "For most photographers the lens mount comes first, because it determines what you can shoot for years. After that, sensor format and the balance between body weight and capability usually decide it.",
      },
      {
        question: "Do you compare photo quality or publish camera tests?",
        answer:
          "No. We do not run lab tests, do not publish sample images and do not claim one camera produces better photographs than another. We compare documented hardware specifications and cite where they came from.",
      },
      {
        question: "Does a higher megapixel count mean a better camera?",
        answer:
          "No. It means more pixels, which helps cropping and large prints and costs you file size and, at the same sensor size, potentially low-light performance. It is one row in the table, not a verdict.",
      },
      {
        question: "Can I compare a phone camera against a dedicated camera?",
        answer:
          "You can compare the documented figures — sensor size, aperture, video capability — but the comparison stops at the hardware envelope. We do not publish image-quality comparisons between categories.",
      },
      {
        question: "Does CompareForge have camera records in its database?",
        answer:
          "Not yet. Our verified product records currently cover smartphones plus processors, graphics cards, televisions, smartwatches, projectors and printers. Camera records will be added once every field has a citable source; until then, this page uses the values you enter.",
      },
    ],
    related: [
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "The tool on this page, for any category." },
      { href: "/compare/phones", label: "Phone Comparison", blurb: "Compare phone camera specifications from our records." },
      { href: "/tools/decision-matrix", label: "Weighted Decision Matrix", blurb: "Weight lens, weight and video against each other." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "What the common specification terms mean." },
      { href: "/methodology", label: "Our methodology", blurb: "How we source, verify and qualify data." },
    ],
  },
  {
    slug: "headphones",
    title: "Headphone Comparison — Compare Headphones Side by Side",
    description:
      "Compare headphones side by side: form factor, driver, connectivity, noise cancelling, battery life, weight, codecs and microphone. Free headphone comparison tool.",
    h1: "Headphone Comparison",
    intro:
      "Compare two pairs of headphones across form factor, driver size, connectivity, noise cancelling, battery life, weight, codec support and microphone — the specifications that decide how they fit into your day.",
    specCategory: "headphones",
    toolHeading: "Compare Headphones Side by Side",
    toolIntro:
      "The template loads form factor, driver, connectivity, noise cancelling, battery, weight, codecs, microphone, impedance and price. Add rows for water resistance, multipoint pairing, foldability or included accessories.",
    specificationsHeading: "Compare Headphone Specifications",
    specificationsIntro:
      "Headphone specifications are unusually honest about what they do and do not tell you. These are the fields worth comparing, with their limits stated.",
    specGroups: [
      {
        title: "Form factor",
        body: "Over-ear, on-ear, in-ear or open-back. This single field determines comfort over long sessions, how much sound leaks out, and how much isolation you get before any active electronics are involved.",
      },
      {
        title: "Driver",
        body: "Diameter in millimetres, sometimes with the diaphragm material. Larger drivers are common but not automatically better — in in-ear monitors the acoustic design matters more than the number, so treat it as a comparable fact rather than a ranking.",
      },
      {
        title: "Connectivity",
        body: "Wired, Bluetooth version, or both. The Bluetooth version affects range and efficiency; a wired option removes latency and battery anxiety entirely, which matters for video editing and gaming.",
      },
      {
        title: "Noise cancelling",
        body: "Whether active cancellation is present, and the manufacturer's claimed attenuation in decibels where published. Claims are measured under each company's own conditions, so compare the presence and the type rather than small differences in the number.",
      },
      {
        title: "Battery life",
        body: "Hours per charge, and whether that is with noise cancelling on. Playback figures vary widely between manufacturers' test settings, so compare them as a bracket rather than as a precise value — and check the quick-charge claim for the days you forget to plug in.",
      },
      {
        title: "Weight",
        body: "Grams, measured with the cable or battery included. Comfort over a multi-hour session tracks weight closely, and it is one of the few headphone specifications where lower is unambiguously easier to live with.",
      },
      {
        title: "Codecs",
        body: "The Bluetooth audio codecs supported — SBC, AAC, aptX variants, LDAC. Codec support is only useful if your source device supports the same codec, so compare it against your phone or laptop rather than in isolation.",
      },
      {
        title: "Microphone",
        body: "Microphone count and type, plus any published call-noise reduction. For headset use this decides call quality more than the drivers do; for listening-only use it can be ignored.",
      },
      {
        title: "Impedance and sensitivity",
        body: "Ohms and decibels per milliwatt. Low-impedance headphones are driven easily by phones; high-impedance models usually need an amplifier. Sensitivity tells you how loud they get for a given power.",
      },
    ],
    focusHeading: "What to Compare When Choosing Headphones",
    focusIntro:
      "Headphones are the one category where the specification sheet covers comfort and use before sound. Start here.",
    focusItems: [
      {
        title: "Where and how long you wear them",
        body: "Commutes, flights, office days and gym sessions each rule out different form factors. Weight and isolation usually decide this before any audio specification does.",
      },
      {
        title: "Wireless against wired",
        body: "Wireless adds battery life, codec negotiation and charging; wired removes all three. If you work with audio or game competitively, latency decides it for you.",
      },
      {
        title: "Your source device",
        body: "Codec support and output power must match what you already own. High-impedance headphones on a phone without an amplifier will be quiet regardless of how good they are.",
      },
      {
        title: "Battery and charging behaviour",
        body: "Hours per charge with noise cancelling on, plus quick-charge minutes. A pair that gives two hours from a ten-minute charge behaves differently in practice from one that needs a full cycle.",
      },
    ],
    faq: [
      {
        question: "How do I compare headphones?",
        answer:
          "Enter form factor, driver, connectivity, noise cancelling, battery life, weight, codecs, microphone and impedance for both pairs. The template above loads those rows so you can transcribe them from each manufacturer's page.",
      },
      {
        question: "Which headphone specification matters most?",
        answer:
          "Form factor and use case first, because they determine comfort and isolation. After that, connectivity and battery for wireless models, or impedance and sensitivity if you are driving them from dedicated equipment.",
      },
      {
        question: "Does a bigger driver mean better sound?",
        answer:
          "No. Driver diameter is a documented hardware fact, not a quality measure. Enclosure, tuning and the amplifier driving it matter at least as much, which is why we do not rank headphones by driver size.",
      },
      {
        question: "Do you publish headphone reviews or sound ratings?",
        answer:
          "No. We do not run listening tests and do not score audio quality. We compare specification values with their sources, and we say so plainly when a figure is a manufacturer claim.",
      },
      {
        question: "Can I compare wired and wireless headphones?",
        answer:
          "Yes. Enter both and compare the rows that apply — weight, form factor, impedance and driver apply to either; battery and codecs only to wireless ones. Rows with no value are marked as a data gap rather than a difference.",
      },
      {
        question: "Does CompareForge have headphone records in its database?",
        answer:
          "Not yet. Our verified product records currently cover smartphones plus processors, graphics cards, televisions, smartwatches, projectors and printers. Headphone records will be added when every field has a citable source — until then this page uses the values you enter.",
      },
    ],
    related: [
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "The tool on this page, for any category." },
      { href: "/tools/plan-comparison", label: "Plan Comparison", blurb: "Compare streaming or warranty plans by normalized cost." },
      { href: "/tools/compatibility-checker", label: "Compatibility Checker", blurb: "Check a device works with what you already own." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/compare/cameras", label: "Camera Comparison", blurb: "Another category compared the same way." },
    ],
  },
  {
    slug: "cpus",
    path: "/cpu-comparison",
    title: "CPU Comparison — Compare Processor Specs Side by Side",
    description:
      "Compare desktop processors side by side: cores, threads, clock speed, cache, socket, process node, memory support and power rating. Source-linked CPU comparison for AMD and Intel chips.",
    h1: "CPU Comparison",
    intro:
      "Put two or three desktop processors side by side and compare the specifications that decide whether a chip fits your motherboard, your memory and your workload — with every value traced to the manufacturer's or database's own page.",
    datasetId: "cpus",
    toolHeading: "Compare Processors Side by Side",
    toolIntro:
      "This table reads from CompareForge's verified processor records: choose up to three chips, search by brand or model, and switch on “Differences only” to hide the rows they share. Every column carries a link to the page it was transcribed from. If the processor you want is not listed, the specification comparison tool accepts any values you enter.",
    specificationsHeading: "What to Compare in a CPU",
    specificationsIntro:
      "Processor specifications only make sense read together. The fields below are the ones worth transcribing first, and what each one actually tells you.",
    specGroups: [
      {
        title: "Cores and threads",
        body: "Physical cores and the number of instruction streams they handle. Core count is the crudest comparison between two chip families, because an efficiency core and a performance core are not the same thing — a modern 16-core part and an older 8-core part can trade blows in different tasks. Compare cores alongside the architecture generation rather than in isolation.",
      },
      {
        title: "Clock speed",
        body: "Base frequency and the highest frequency the manufacturer quotes under load. Higher numbers mean more work per second on a single thread, but only within the same architecture: a faster clock on an older design can be slower overall than a slower clock on a newer one.",
      },
      {
        title: "Cache",
        body: "On-die memory in kilobytes and megabytes, split across L1, L2 and L3. Cache reduces how often the processor has to wait for system memory, and it is the specification most often cited for gaming-heavy parts. Compare the shared L3 figure for multi-threaded work and the per-core L2 figure for latency-sensitive work.",
      },
      {
        title: "Socket and chipset",
        body: "The physical socket and the motherboards that accept it. This is a compatibility gate rather than a performance figure: a chip you cannot mount in your board is not a candidate, no matter what the rest of the table says. Socket generations are usually pin-incompatible, so plan the board, memory and chip as one purchase.",
      },
      {
        title: "Process node",
        body: "The manufacturing process in nanometres. Smaller nodes generally mean more transistors in the same area and better performance per watt, but the number is marketing-adjacent: each foundry's nanometre label is not directly comparable with another's. Use it as a generation indicator, not a score.",
      },
      {
        title: "Memory and PCIe support",
        body: "Which memory generation the chip supports, the maximum capacity, and how many PCI Express lanes it provides. Lanes are shared between the graphics card, storage and add-in cards, so a chip with fewer lanes can bottleneck fast NVMe drives long before the processor itself is busy.",
      },
      {
        title: "Integrated graphics",
        body: "Whether the chip includes graphics, and which unit. Integrated graphics let a machine run without a discrete card and are the fallback if that card fails; for gaming or GPU-accelerated rendering they are not a substitute for a discrete GPU.",
      },
      {
        title: "Power rating",
        body: "The processor's rated power draw, and where the manufacturer publishes them, the sustained power limits. Power determines how much cooling and how large a power supply the build needs, and on modern chips the sustained limit often explains real-world behaviour better than the base clock does.",
      },
    ],
    focusHeading: "What Matters When Comparing Processors",
    focusIntro:
      "Two chips with similar headline numbers can be very different purchases. These four checks settle most processor decisions before a benchmark is involved.",
    focusItems: [
      {
        title: "Platform before performance",
        body: "Confirm the socket and chipset support the board you have or plan to buy, then confirm memory generation. A faster chip that needs a new board, new memory and new cooling is a different budget from the sticker suggests.",
      },
      {
        title: "Workload before core count",
        body: "Many small parallel tasks reward cores; few latency-sensitive tasks reward clock speed and cache. Decide which shape of work you have, then read the rows that follow from it rather than the largest number in the table.",
      },
      {
        title: "Sustained power against cooling",
        body: "The rated power is the floor of the cooling problem. A chip that runs at a high sustained limit in a small case will throttle, which is a cooling decision before it is a processor decision.",
      },
      {
        title: "Generation over megahertz",
        body: "Clock speed is only comparable inside one architecture. Between generations, how much work happens per clock changes enough to outweigh a few hundred megahertz, which is why the architecture row sits at the top of the table.",
      },
    ],
    sections: [
      {
        heading: "How to Use the CPU Comparison Tool",
        steps: [
          "Search or scroll the record list and select the processors you are deciding between — up to three at a time.",
          "Read the Platform group first: socket, memory support and PCI Express decide compatibility, and they eliminate candidates fastest.",
          "Switch on “Differences only” to hide the rows the selected chips share, then switch it off again before you finish.",
          "Read cores, threads, clock speed and cache together rather than as four separate numbers.",
          "Check the power rating against the cooler and power supply you intend to use.",
          "Use “Copy shareable link” to keep the exact three-chip view for later, and open the source under any column you intend to act on.",
        ],
      },
      {
        heading: "Why Clock Speed Alone Does Not Decide It",
        paragraphs: [
          "Clock speed is the most readable processor specification and the least decisive on its own. It counts cycles per second, not work per cycle, and work per cycle changes with every architecture revision. Two chips running at very different frequencies can deliver similar performance because the slower one does more in each clock.",
          "That is why the comparison table puts architecture next to clock speed, and why we do not rank processors by frequency. Within a single architecture family a higher clock is meaningful; across families it is not, and a page that treated it as comparable would be giving you a number that looks precise and means very little.",
          "The same applies to core count. Eight cores of one generation and sixteen cores of another are not a like-for-like count, particularly when the newer chip splits them into performance and efficiency cores. Compare the composition of the core configuration as well as the total.",
        ],
      },
      {
        heading: "Choosing a Processor for Your Build",
        paragraphs: [
          "Start with the platform, because it removes options immediately: pick the board and memory first if you have a budget, or the chip first if you have a specific workload. Either way the three have to be bought together, and the cheapest chip on the wrong platform is the expensive choice.",
          "Next decide the workload shape. Compiling, rendering, streaming and video encoding all push toward more cores; high-refresh gaming, large-spreadsheet work and single-threaded applications push toward clock speed and cache. Neither is universally better, and a chip bought for the wrong shape of work will disappoint in the one task you actually do.",
          "Then set the cooling and power budget. The rated power determines the cooler, and the cooler determines the case and often the noise. If the machine lives on a desk in a quiet room, that constraint is worth applying before the benchmark argument starts.",
          "Only after those three steps does the performance comparison become useful. Enter the two or three chips still standing into the table, read the rows that differ, and open the source on any figure you are about to act on.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare two processors?",
        answer:
          "Select both chips in the tool above, then compare them in this order: socket and platform compatibility, cores and threads, clock speed and cache together, memory and PCI Express support, and finally the power rating against your cooling. Turn on “Differences only” to see only the rows where they differ.",
      },
      {
        question: "Is a higher clock speed always faster?",
        answer:
          "No. Clock speed counts cycles, not work per cycle, and the amount of work done in each cycle changes between architectures. A newer chip at a lower frequency can be faster than an older chip at a higher one, which is why the table shows architecture alongside clock speed.",
      },
      {
        question: "More cores versus faster cores — which should I choose?",
        answer:
          "It depends on the shape of your workload. Parallel work such as rendering, compiling and encoding benefits from more cores; latency-sensitive work such as high-refresh gaming benefits from clock speed and cache. The table shows both so you can apply your own weighting rather than taking ours.",
      },
      {
        question: "Do you publish processor benchmark scores?",
        answer:
          "No. CompareForge does not run lab tests and does not publish benchmark scores, FPS figures or performance rankings. We compare the specifications manufacturers and hardware databases publish, and we show where each value came from.",
      },
      {
        question: "Where do the processor specifications on this page come from?",
        answer:
          "Each record is transcribed from the linked AMD, Intel or TechPowerUp page, and the source list under the table shows which page was used and when it was read. Fields the source did not publish are shown as “Not verified” rather than filled in with a typical figure.",
      },
      {
        question: "Which processor should I buy?",
        answer:
          "That depends on your board, your memory, your cooling and your workload — none of which we can see. Work through the four checks above, then use the table to see which of your candidates satisfies them.",
      },
    ],
    related: [
      { href: "/gpu-comparison", label: "GPU Comparison", blurb: "The other half of a desktop build, compared the same way." },
      { href: "/compare/laptops", label: "Laptop Comparison", blurb: "Compare the chips as they appear in complete machines." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "Compare a processor that is not in the records yet." },
      { href: "/tools/compatibility-checker", label: "Compatibility Checker", blurb: "Check a part works with what you already own." },
      { href: "/tools/decision-matrix", label: "Weighted Decision Matrix", blurb: "Weight platform, cores and power against each other." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/methodology", label: "Our methodology", blurb: "How we source, verify and qualify data." },
    ],
  },
  {
    slug: "gpus",
    path: "/gpu-comparison",
    title: "GPU Comparison — Compare Graphics Card Specs Side by Side",
    description:
      "Compare graphics cards side by side: video memory, memory bus and bandwidth, core count, boost clock, board power, interface and ray tracing support. Source-linked GPU comparison.",
    h1: "GPU Comparison",
    intro:
      "Compare two or three graphics cards across memory, clocks, power and platform — the specifications that decide whether a card fits your case, your power supply and your monitor.",
    datasetId: "gpus",
    toolHeading: "Compare Graphics Cards Side by Side",
    toolIntro:
      "Choose up to three verified GPU records and the table fills in. Every value links to the page it came from, clock units are shown exactly as each manufacturer publishes them rather than converted, and a figure the source did not state appears as “Not verified” instead of an estimate.",
    specificationsHeading: "What to Compare in a GPU",
    specificationsIntro:
      "Graphics card specifications split into three questions: will it fit, will it be fed, and is it enough for what you do. The fields below follow that order.",
    specGroups: [
      {
        title: "Video memory capacity",
        body: "The gigabytes of memory on the card, and the type. Capacity sets the ceiling for texture detail and resolution — a card running out of memory stalls and drops frames regardless of how fast its core is. The memory type and bus width together determine how quickly that memory can be used.",
      },
      {
        title: "Memory bandwidth",
        body: "Gigabytes per second the memory can move. It comes from bus width multiplied by effective memory speed, which is why two cards with the same capacity can differ substantially here. At higher resolutions and with large frame buffers, bandwidth is often the constraint before core clock is.",
      },
      {
        title: "Core count and boost clock",
        body: "The number of shading units and the frequency the card sustains under load. Both are architecture-dependent, so a raw comparison across AMD and NVIDIA parts is not meaningful on its own — treat them as within-family comparisons and let the memory rows carry the cross-family read.",
      },
      {
        title: "Board power",
        body: "The card's rated power draw in watts. This decides the power supply headroom, the case airflow and often the physical size, because cooler capacity tracks power. It is also the row that most often catches an otherwise complete build out.",
      },
      {
        title: "Host interface",
        body: "The PCIe generation and lane count the card uses. For current cards this rarely limits gaming, but it matters for older boards, workstations that share lanes with storage, and cards running at reduced lane widths.",
      },
      {
        title: "Physical fit and outputs",
        body: "Slot width, card length and the display outputs. A card can be entirely suitable on paper and still not fit the case, cover the second slot you needed, or lack the connector your monitor ships with. Measure the case and count the outputs before comparing anything else.",
      },
      {
        title: "Ray tracing and display features",
        body: "Whether the card has hardware ray tracing, and which display outputs it carries. Feature support is a generation marker: it determines which upscaling and frame-generation modes the card offers, which in practice affects behaviour at a given resolution more than a few megahertz does.",
      },
    ],
    focusHeading: "What Matters When Comparing Graphics Cards",
    focusIntro:
      "Graphics cards are bought for a monitor, a case and a power supply as much as for a framerate. Working through them in this order avoids the common mismatch.",
    focusItems: [
      {
        title: "Your monitor sets the target",
        body: "Resolution and refresh rate decide how much work the card has to do. A card chosen for 1440p is a different proposition from one chosen for 4K, so start from the display you own rather than the card you like.",
      },
      {
        title: "Fit before speed",
        body: "Slot width, card length and power connectors are hard gates. Measure the case and count the available PCIe slots and power cables before reading any performance row.",
      },
      {
        title: "Memory before megahertz",
        body: "Capacity and bandwidth run out in ways clock speed does not. At higher resolutions a card with more memory and more bandwidth holds up better than a slightly faster card with less of both.",
      },
      {
        title: "Power supply headroom",
        body: "Board power plus transient spikes determine the power supply you need. Undersizing it produces instability that looks like a faulty card, so read this row together with the rest of the build rather than last.",
      },
    ],
    sections: [
      {
        heading: "How to Use the GPU Comparison Tool",
        steps: [
          "Select two or three cards from the record list, or search by brand or model to narrow it down.",
          "Check fit first: host interface, board power and the outputs row.",
          "Turn on “Differences only” to see where the selected cards actually diverge.",
          "Read video memory, memory bus and memory bandwidth as one group rather than three separate numbers.",
          "Compare clock speeds only between cards of the same architecture; across families, let memory and features carry the comparison.",
          "Copy the shareable link to keep the exact selection, and open the source listed under any value before you buy on it.",
        ],
      },
      {
        heading: "Reading Video Memory, Bus Width and Bandwidth Together",
        paragraphs: [
          "Capacity, bus width and bandwidth are three views of the same subsystem, and they are usually read as three unrelated numbers. Capacity is how much data the card can hold; bus width is how many bits move at once; bandwidth is the product of width and speed. A card with generous capacity and a narrow bus can stutter in exactly the situations where its memory should be an advantage.",
          "This is why the table keeps the three in the same group. In practice, capacity tends to be the first limit at higher resolutions and with high-resolution texture packs, while bandwidth becomes the limit when large amounts of data are moving every frame — high refresh rates, large frame buffers and ray-traced effects all push on it.",
          "We publish the figures each manufacturer or database states and do not derive an implied bandwidth where the source does not state one. Where a row is missing, it is marked “Not verified” rather than computed, because a derived figure presented as a published one is exactly the kind of error this page exists to avoid.",
        ],
      },
      {
        heading: "Fitting a Graphics Card into a Complete Build",
        paragraphs: [
          "Start with the physical constraints, because they are the cheapest to check and the most expensive to get wrong. Measure the clearance from the front of the card to the end of the case, count the slots the cooler actually occupies rather than the connector, and confirm the power cables your power supply provides match the card's connectors.",
          "Next, the power budget. Board power is a sustained figure; the peaks a card draws in a frame can exceed it, so leave headroom rather than matching the number exactly. A supply running at its limit is also a supply running its fan at full speed, which is audible in a quiet room.",
          "Then the display chain: confirm the outputs, the cable version and what your monitor accepts. A card capable of the refresh rate is only half of a high-refresh setup.",
          "Only then compare the performance-relevant rows. Put your two or three candidates in the table, switch to differences only, and read the memory group and power row together with the fit rows.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare two graphics cards?",
        answer:
          "Select both cards in the tool above, check fit and power first, then compare video memory, memory bus, bandwidth, core count, boost clock and board power. Turn on “Differences only” to see only the rows where they differ.",
      },
      {
        question: "Is more video memory always better?",
        answer:
          "Only if the rest of the card can use it. Capacity sets a ceiling, but memory bus width and bandwidth determine how quickly that memory is reached. A card with more memory on a narrower bus can still stall, so compare capacity together with the bus and bandwidth rows.",
      },
      {
        question: "Can I compare AMD and NVIDIA graphics cards by core count?",
        answer:
          "Not meaningfully. Shading unit counts are architecture-specific and are not equivalent between manufacturers. Compare video memory, memory bandwidth, board power and feature support across families, and treat core count and clock speed as within-family comparisons.",
      },
      {
        question: "Do you publish GPU benchmarks or frame rates?",
        answer:
          "No. CompareForge does not run a test bench and does not publish FPS figures, benchmark scores or performance rankings. We compare published specifications and cite the page each value came from.",
      },
      {
        question: "Where do the graphics card specifications come from?",
        answer:
          "Each record is transcribed from the NVIDIA or AMD page linked in the source list under the table. Where a manufacturer did not state a figure, the row shows “Not verified” instead of an estimate.",
      },
      {
        question: "How much power supply do I need for a graphics card?",
        answer:
          "Board power in the table gives you the sustained draw; the power supply also needs headroom for transient peaks and for the rest of the system. We do not publish a recommended supply figure, because it depends on components the table cannot see.",
      },
    ],
    related: [
      { href: "/cpu-comparison", label: "CPU Comparison", blurb: "The processor half of the same build, compared the same way." },
      { href: "/compare/monitors", label: "Monitor Comparison", blurb: "The display the card has to drive." },
      { href: "/gaming-monitor-comparison", label: "Gaming Monitor Comparison", blurb: "Refresh rate, adaptive sync and response time." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "Compare a card that is not in the records yet." },
      { href: "/tools/compatibility-checker", label: "Compatibility Checker", blurb: "Check a card works with the board and case you have." },
      { href: "/tools/decision-matrix", label: "Weighted Decision Matrix", blurb: "Weight memory, power and fit against each other." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/methodology", label: "Our methodology", blurb: "How we source, verify and qualify data." },
    ],
  },
  {
    slug: "tvs",
    path: "/tv-comparison",
    title: "TV Comparison — Compare Television Specs Side by Side",
    description:
      "Compare televisions side by side: screen size, resolution, panel technology, refresh rate, HDR formats, HDMI ports, smart platform and dimensions. Source-linked TV comparison.",
    h1: "TV Comparison",
    intro:
      "Compare two or three televisions across panel technology, HDR support, gaming inputs, smart platform and physical size — with region and SKU caveats shown next to each record rather than hidden.",
    datasetId: "tvs",
    toolHeading: "Compare Televisions Side by Side",
    toolIntro:
      "Select up to three verified TV records. Because television model numbers differ by country, each record carries the region it was sourced from, and series pages that cover several screen sizes say so. If your exact model is not listed, enter its values in the specification comparison tool.",
    specificationsHeading: "What to Compare in a TV",
    specificationsIntro:
      "A television is a panel, a set of inputs and a smart platform sold as one product. The fields below cover all three, because a strong panel behind a weak input set is a different purchase from the reverse.",
    specGroups: [
      {
        title: "Screen size and resolution",
        body: "Diagonal size in inches and the pixel count. Compare them together: a 65-inch 4K panel and a 55-inch 4K panel have visibly different pixel density at the same viewing distance, and the size that suits a room depends on how far away you sit rather than on the largest panel available.",
      },
      {
        title: "Panel technology",
        body: "OLED, QD-Mini LED, full-array LED or edge-lit LED. This is the structural choice: emissive panels produce per-pixel contrast and near-instant response, while backlit panels reach higher sustained brightness at lower cost. Neither is universally better, and the label covers several generations of each technology.",
      },
      {
        title: "Refresh rate and variable refresh",
        body: "Panel refresh rate in hertz and whether variable refresh rate is supported. For film and television 60 Hz is adequate; for console and PC gaming the combination of a high refresh rate and VRR is what removes visible stutter when the frame rate changes.",
      },
      {
        title: "HDR formats",
        body: "The high dynamic range formats the set accepts — HDR10, HDR10+, HLG, Dolby Vision and any vendor-specific tier. Formats are not interchangeable: content mastered for a format the set does not support falls back, so check the format your streaming services actually deliver rather than the longest list.",
      },
      {
        title: "HDMI inputs",
        body: "The number of HDMI ports and the version each carries. Port count decides how many devices can be connected without a switch; the version decides the resolution and refresh rate each can carry. A panel capable of 4K at 144 Hz behind HDMI 2.0 inputs cannot deliver it.",
      },
      {
        title: "Smart platform",
        body: "The operating system the set ships with. It determines the interface, the app catalogue, the update commitment and how much of the set's behaviour depends on an account. Where a platform requires a manufacturer account for features, that is worth knowing before purchase.",
      },
      {
        title: "Dimensions and weight",
        body: "Panel dimensions without the stand, and weight. Check the width against the surface it will stand on and the weight against the mount — wall mounts are rated in kilograms, and a panel near the limit of a mount is a safety question rather than a specification one.",
      },
    ],
    focusHeading: "What Matters When Comparing Televisions",
    focusIntro:
      "Television specifications interact: size with seating distance, panel with room light, inputs with the console you already own. These four checks catch most mismatches.",
    focusItems: [
      {
        title: "Room and viewing distance first",
        body: "Decide how far you sit and how bright the room is. Those two facts set the size ceiling and the panel type, and they remove most of the market before any other specification matters.",
      },
      {
        title: "Inputs against your devices",
        body: "Count the HDMI ports and check their version against the console, soundbar and player you have. A set with the right panel and the wrong input count is a set you will be running a switch into.",
      },
      {
        title: "HDR format against your content",
        body: "Match the formats the set supports to the services you subscribe to. A longer format list has no value if the two formats you actually stream are absent.",
      },
      {
        title: "Region and model number",
        body: "Television model numbers are regional. Confirm you are comparing the set that will be sold in your country, and check that the panel, HDR and gaming features carry over — a regional variant can differ in exactly the rows you care about.",
      },
    ],
    sections: [
      {
        heading: "How to Use the TV Comparison Tool",
        steps: [
          "Select two or three sets from the record list and confirm each record's region note matches your market.",
          "Read size together with your viewing distance — do not treat the largest panel as the default winner.",
          "Turn on “Differences only” to see where the selected sets actually diverge.",
          "Check the HDMI group against the devices you already own before reading anything else.",
          "Read HDR formats as a list you match to your services, not as a longer list is better.",
          "Open the source under any row you are about to act on, and copy the shareable link to keep the selection.",
        ],
      },
      {
        heading: "Panel Technology Without the Marketing",
        paragraphs: [
          "Panel labels compress several generations into a word. OLED and its variants emit light per pixel, which gives per-pixel black levels, very wide viewing angles and essentially instant pixel response; the trade-offs are peak full-screen brightness and the risk of image retention with static content over years. Backlit LCD variants — full-array, QD-Mini LED and their local-dimming relatives — reach higher sustained brightness and are usually cheaper at a given size, at the cost of dimming behaviour and off-axis consistency.",
          "None of that is a ranking. A television in a bright room, watched straight on, is a different problem from a television in a dark room, watched from a wide sofa, and the specification that matters depends on which you have. The table shows the panel technology and the refresh rate together so you can read them as one decision rather than as a badge.",
          "We do not publish measured contrast, brightness or response figures, because we do not measure displays and because measurement conditions differ so widely between reviewers that combining them would produce numbers that are not comparable.",
        ],
      },
      {
        heading: "Sizing a Television for a Room",
        paragraphs: [
          "Screen size is decided by distance, not by budget. As a starting point, measure where you sit and divide by roughly 1.5 for 4K content — that gives an approximate diagonal in inches at which individual pixels stop being distinguishable. The figure is a floor for immersion rather than a hard rule, and it should be weighed against the field of view you find comfortable.",
          "Then check the furniture. Measure the surface the stand sits on, the wall space available for a mount, and the weight the mount is rated for. The dimensions row in the table gives panel size without the stand, so add the stand footprint back on before deciding.",
          "Where a record covers a series rather than a single size, the region and model note says so. Specifications such as panel type and HDR support often carry across a series, while brightness, dimming zone counts and weight frequently change with size — so treat a series record as evidence about the family, not as a specification sheet for the size you intend to buy.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare two televisions?",
        answer:
          "Select both sets above, confirm their region notes match your market, then compare size against your viewing distance, panel technology, refresh rate and variable refresh, HDR formats, HDMI port count and version, smart platform and dimensions. “Differences only” shows just the rows where they differ.",
      },
      {
        question: "OLED or QD-Mini LED — which should I choose?",
        answer:
          "It depends on the room rather than on a specification. Emissive panels give per-pixel contrast and fast response; backlit panels reach higher sustained brightness. The table shows the panel technology, HDR formats and refresh rate together so you can weigh them against your own conditions.",
      },
      {
        question: "Do TV model numbers mean the same thing in every country?",
        answer:
          "No. Television model numbers are regional, and regional variants can differ in panel, HDR support and gaming features. Each record on this page carries a region note stating where it was sourced, so check that note against your market before comparing.",
      },
      {
        question: "How many HDMI ports do I need?",
        answer:
          "It depends on how many HDMI devices you connect at once — console, soundbar, player and streaming box each take one. Check both the count and the version: the version determines the resolution and refresh rate each port can carry.",
      },
      {
        question: "Do you publish TV test results or picture quality scores?",
        answer:
          "No. CompareForge does not measure displays and does not publish contrast, brightness, colour-accuracy or input-lag results, and we do not assign picture quality scores. We compare published specifications and state where each value came from.",
      },
      {
        question: "Does CompareForge have television records for my country?",
        answer:
          "The published TV records cover a small number of sets from specific regions, listed with their region note on each column. Where a record covers a series rather than one size, the note says so. We add records only when every field has a citable source.",
      },
    ],
    related: [
      { href: "/gaming-monitor-comparison", label: "Gaming Monitor Comparison", blurb: "The same panel questions at desk distance." },
      { href: "/compare/monitors", label: "Monitor Comparison", blurb: "Compare displays used up close." },
      { href: "/projector-comparison", label: "Projector Comparison", blurb: "The other way to get a very large image." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "Compare a set that is not in the records yet." },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison", blurb: "Draw two panels to scale before buying a mount." },
      { href: "/tools/fit-clearance-checker", label: "Fit & Clearance Checker", blurb: "Does the set fit the stand or the wall?" },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/methodology", label: "Our methodology", blurb: "How we source, verify and qualify data." },
    ],
  },
  {
    slug: "smartwatches",
    path: "/smartwatch-comparison",
    title: "Smartwatch Comparison — Compare Wearables Side by Side",
    description:
      "Compare smartwatches side by side: case size, display, battery claim, charging, water resistance, GPS, sensors and phone compatibility. Source-linked smartwatch comparison.",
    h1: "Smartwatch Comparison",
    intro:
      "Compare two or three smartwatches across display, battery claims, charging, water resistance, radios and sensor loadouts — with manufacturer claims labelled as claims rather than restated as test results.",
    datasetId: "smartwatches",
    toolHeading: "Compare Smartwatches Side by Side",
    toolIntro:
      "Choose up to three verified wearable records. Battery figures are shown exactly as the manufacturer states them — “up to X hours” under named conditions — because conditions differ between brands and we do not test. A figure the source did not publish appears as “Not verified”.",
    specificationsHeading: "What to Compare in a Smartwatch",
    specificationsIntro:
      "A smartwatch is a display, a radio set and a sensor package worn on the wrist. The fields below cover what each part does and how much of it the manufacturer will commit to in writing.",
    specGroups: [
      {
        title: "Case size and display",
        body: "Case diameter or the sizes offered, display technology, and size and resolution where published. Case size decides both fit and battery volume, which is why the two are usually offered together — a smaller case typically means a smaller cell as well as a smaller wrist footprint.",
      },
      {
        title: "Battery claim",
        body: "The manufacturer's stated runtime, in the exact wording the manufacturer uses. These are claims measured under conditions you will not reproduce, and the conditions differ between brands. Compare the shape of the claim — normal use, always-on display, GPS active — rather than the headline hours alone.",
      },
      {
        title: "Charging",
        body: "The charging method and any stated time to a given percentage. Charging determines how the watch behaves in daily use more than the capacity figure does: a watch that gains a day of use from a short top-up behaves differently from one that needs a full overnight cycle.",
      },
      {
        title: "Water resistance",
        body: "The rating and the standard it was tested to — atmospheres, ISO ratings and depth limits are different things. Swimproof and dive-rated watches are separate claims, and neither means the watch is suitable for hot showers or salt water, which is a seal-maintenance question rather than a rating one.",
      },
      {
        title: "Radios and location",
        body: "Bluetooth version, Wi-Fi, NFC for payments, GPS and cellular. Cellular adds a data plan and a second radio; NFC is what enables contactless payments; GPS is what lets a run be tracked without a phone. Compare these against what you intend to do rather than as a longer list is better.",
      },
      {
        title: "Sensors",
        body: "The sensor package: optical heart rate, electrical heart sensor, blood oxygen, skin temperature, barometer, compass, altimeter and any depth or temperature sensing. More sensors only matter if the accompanying software features are ones you will use, so read the list against the features you want rather than as a count.",
      },
      {
        title: "Phone compatibility",
        body: "The operating system and the phones it pairs with. This is a hard gate: a watch restricted to one phone ecosystem is not a candidate if you use the other one, and the update commitment attached to it determines how long it stays current.",
      },
    ],
    focusHeading: "What Matters When Comparing Smartwatches",
    focusIntro:
      "Wearables fail in predictable ways: a case that does not fit, a battery claim read as a test result, a radio that needs a plan. These four checks catch most of them.",
    focusItems: [
      {
        title: "Wrist fit before features",
        body: "Case size decides comfort, visibility and battery volume at once. Measure your wrist and read the case dimensions against it, because a watch you will not wear is not improved by having more sensors.",
      },
      {
        title: "Read the claim, not the number",
        body: "Battery hours are measured under conditions each manufacturer chooses. Compare whether the claim assumes the always-on display off or on, and whether GPS is running, rather than treating the largest number as the winner.",
      },
      {
        title: "Ecosystem before anything else",
        body: "Confirm the watch pairs with the phone you actually use. This eliminates more candidates than any specification in the table, and it cannot be changed after purchase.",
      },
      {
        title: "Water rating against your use",
        body: "A depth rating does not cover hot water, salt water or chemicals. Decide whether you swim with it, then read the rating and the standard it was tested to together rather than the number alone.",
      },
    ],
    sections: [
      {
        heading: "How to Use the Smartwatch Comparison Tool",
        steps: [
          "Select two or three watches and confirm each record's region note, since SKUs differ between markets.",
          "Check phone compatibility first — it eliminates candidates before any feature matters.",
          "Turn on “Differences only” to see where the selected watches diverge.",
          "Read case size together with the display and battery rows, because the three move together.",
          "Read battery claims in the published wording and compare the conditions, not just the hours.",
          "Open the source under any row you intend to rely on, and copy the shareable link to keep the selection.",
        ],
      },
      {
        heading: "Why Battery Claims Are Not Test Results",
        paragraphs: [
          "Every manufacturer states battery life, and almost no two state it the same way. One measures normal use with the always-on display off; another quotes the same mode with it on; a third reports a minimum rather than an average. The numbers are therefore accurate descriptions of each company's own conditions and unreliable as a direct comparison between companies.",
          "That is why this page prints the claim in the manufacturer's wording and does not convert it into a single comparable figure. Converting would require assuming the conditions were the same, and they are not — a derived number presented as a published one would be exactly the sort of error this site exists to avoid.",
          "The practical comparison is qualitative: does the claim assume the display is on, does it assume GPS is running, and does the charging row show a fast top-up? Those three questions tell you more about daily behaviour than the headline hours do.",
        ],
      },
      {
        heading: "Choosing a Smartwatch for How You Actually Use It",
        paragraphs: [
          "Start with the wrist. Case size sets comfort, visibility and battery volume together, and it is the one decision you cannot change after purchase. Measure your wrist and read the case dimensions against it before looking at any feature.",
          "Then the ecosystem. A watch that will not pair with your phone is not a candidate, and neither is one locked to a platform you do not use. This is a compatibility gate, and it is worth applying before the sensor discussion.",
          "Next, the radios. Decide whether you need payments, standalone music, running without a phone, or calls from the wrist — each maps to NFC, storage, GPS and cellular respectively, and cellular is the only one that carries an ongoing cost.",
          "Only then compare sensors and software. Enter your two or three candidates into the table, switch to differences only, and read the sensor group against the features you intend to switch on.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare two smartwatches?",
        answer:
          "Select both watches above, check phone compatibility first, then compare case size, display, battery claim and its conditions, charging, water resistance, radios and sensors. “Differences only” shows just the rows where they differ.",
      },
      {
        question: "Are smartwatch battery life figures comparable between brands?",
        answer:
          "Not directly. Each figure is measured under the conditions that manufacturer chose, and those conditions differ. Compare the wording — always-on display, GPS active, normal use — rather than the headline hours, which is why this page prints claims exactly as published.",
      },
      {
        question: "Which smartwatch specification matters most?",
        answer:
          "For most people it is case size and phone compatibility, because both are decided before anything else and neither can be changed later. After that, radios and sensors follow from what you intend to do with the watch.",
      },
      {
        question: "What does a water resistance rating actually mean?",
        answer:
          "It is a laboratory rating to a stated standard under stated conditions. It does not cover hot water, salt water, chemicals or impact, and depth ratings and swimproof ratings are different claims. Read the standard alongside the number.",
      },
      {
        question: "Do you publish smartwatch reviews or battery tests?",
        answer:
          "No. CompareForge does not run tests and does not publish battery measurements, sensor accuracy results or wearability scores. We compare published specifications and label manufacturer claims as claims.",
      },
      {
        question: "Does CompareForge have smartwatch records?",
        answer:
          "Yes — a small number of records, each transcribed from the manufacturer page linked under its column. Fields the source did not publish are shown as “Not verified”, and records state their region or SKU where that affects the specifications.",
      },
    ],
    related: [
      { href: "/compare/phones", label: "Phone Comparison", blurb: "The device every watch pairs with." },
      { href: "/printer-comparison", label: "Printer Comparison", blurb: "Another category compared from its specification pages." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "Compare a watch that is not in the records yet." },
      { href: "/tools/compatibility-checker", label: "Compatibility Checker", blurb: "Check a watch pairs with the phone you own." },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison", blurb: "Compare case dimensions to scale." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/methodology", label: "Our methodology", blurb: "How we source, verify and qualify data." },
    ],
  },
  {
    slug: "projectors",
    path: "/projector-comparison",
    title: "Projector Comparison — Compare Projector Specs Side by Side",
    description:
      "Compare projectors side by side: native resolution, brightness, contrast, throw ratio, projection size, HDR, inputs, light source and lamp life. Source-linked projector comparison.",
    h1: "Projector Comparison",
    intro:
      "Compare two or three projectors across image, placement, inputs and light source — with brightness and contrast shown in the measurement method each manufacturer used, because those methods are not interchangeable.",
    datasetId: "projectors",
    toolHeading: "Compare Projectors Side by Side",
    toolIntro:
      "Choose up to three verified projector records. Brightness and contrast are printed exactly as the manufacturer states them, together with the standard used where one is stated — ANSI, ISO 21118 and IDMS figures are not the same measurement. Light-source life is a manufacturer figure that depends on the mode selected.",
    specificationsHeading: "What to Compare in a Projector",
    specificationsIntro:
      "Projector specifications divide into the image it makes, the room it fits into, and how long the light source lasts. The fields below follow that order.",
    specGroups: [
      {
        title: "Native resolution",
        body: "The pixel count the panel or chip actually displays, as distinct from any upscaling the set performs. Native resolution decides the sharpness of the image at a given screen size, and the wording matters: “4K display technology” and “4K UHD native” are not the same claim.",
      },
      {
        title: "Brightness",
        body: "Light output in lumens, with the measurement method where the manufacturer states one. ANSI lumens, ISO 21118 and IDMS measure different things under different conditions, so a figure from one method is not directly comparable with a figure from another. Ambient light and screen size decide how much you actually need.",
      },
      {
        title: "Contrast",
        body: "The ratio between the brightest and darkest image, as published. Contrast figures are measured differently between manufacturers — full-on/full-off, dynamic and sequential methods produce very different numbers from the same projector. Compare the method alongside the value, and treat the row as informative rather than decisive.",
      },
      {
        title: "Throw ratio and projection size",
        body: "How far back the projector must sit for a given image width, and the diagonal sizes it can produce. This is the placement decision: a short-throw unit can fill a large image from a few tens of centimetres, which changes where furniture can live far more than the resolution does.",
      },
      {
        title: "Inputs",
        body: "The connector list and versions — HDMI generation, HDCP support, USB, audio out and any control ports. HDMI version determines the resolutions and refresh rates it can carry, and eARC matters if the projector is feeding a soundbar.",
      },
      {
        title: "Light source and life",
        body: "LED, laser or lamp, and the hours the manufacturer states for each operating mode. Lamp figures are usually quoted separately for normal and eco modes; LED and laser sources last far longer but are still quoted as a mode-dependent figure. Brightness, colour behaviour and life trade against each other across the three.",
      },
      {
        title: "Dimensions and weight",
        body: "Chassis measurements and weight. Whether the projector is ceiling-mounted, shelf-mounted or carried between rooms decides how much this matters, and a ceiling install also needs the mount and cable run planned around the throw ratio.",
      },
    ],
    focusHeading: "What Matters When Comparing Projectors",
    focusIntro:
      "A projector is decided by the room before it is decided by the specification sheet. These four checks establish the constraints, then the table resolves the rest.",
    focusItems: [
      {
        title: "Room light decides brightness",
        body: "Measure the ambient light and the screen size you can install. Those two facts set the light output you need, and no specification compensates for a room the projector cannot overcome.",
      },
      {
        title: "Distance decides throw ratio",
        body: "Measure where the projector can physically sit relative to the screen. Throw ratio turns that measurement into the image size you will get, and it eliminates more models than resolution does.",
      },
      {
        title: "Source format decides resolution and inputs",
        body: "Check what you will feed it — console, player, laptop — and confirm the HDMI version and supported formats carry that signal at the resolution and refresh rate you want.",
      },
      {
        title: "Light source decides the maintenance",
        body: "Lamps are replaced; LED and laser sources are effectively sealed for the life of the unit. Compare the stated life together with the brightness figure, because the two are set against each other.",
      },
    ],
    sections: [
      {
        heading: "How to Use the Projector Comparison Tool",
        steps: [
          "Select two or three projectors from the record list.",
          "Measure the throw distance first and read the throw ratio row against it.",
          "Read brightness together with the measurement method noted under the row.",
          "Turn on “Differences only” to see where the selected projectors diverge.",
          "Check the inputs row against the sources you intend to connect.",
          "Read light-source life alongside the mode it applies to, then open the source under any row you act on.",
        ],
      },
      {
        heading: "Why Brightness and Contrast Figures Are Hard to Compare",
        paragraphs: [
          "Two projectors can both publish a lumens figure and be describing different measurements. ANSI lumens are taken across a checkerboard across the screen; ISO 21118 specifies its own procedure and tolerance; IDMS methods are used for colour brightness among others. The numbers look alike and are not the same measurement, which is why this page prints the method alongside the value wherever the manufacturer states one.",
          "Contrast is worse. Full-on/full-off contrast, dynamic contrast and sequential measurements can differ by an order of magnitude on the same hardware. A longer list of contrast ratios is not evidence of a better image, and a page that sorted projectors by that number would be ranking measurement methods.",
          "The practical reading is to take the method first, the number second, and the room third. Ambient light dominates both figures in a lit room, which is why we do not publish a brightness recommendation — it depends on screen size and room light that the table cannot see.",
        ],
      },
      {
        heading: "Planning Where a Projector Will Live",
        paragraphs: [
          "Start with geometry. Measure the distance from where the projector can sit to where the screen can be, then read the throw ratio row: it converts that distance into an image width. A projector that produces the right image from a shelf behind the sofa and one that needs three metres of ceiling are different installations even if their specifications are otherwise identical.",
          "Then the light. Note the ambient light at the time you will actually watch — a room that is dark in the evening and bright in the afternoon is two different environments — and pair it with the screen size to judge how much light output matters.",
          "Then the source list. Confirm the HDMI version carries your console or player at the resolution and refresh rate you intend, and whether audio return is needed for your sound system.",
          "Finally the maintenance question. Lamp projectors need a replacement eventually and dim gradually; laser and LED units mostly do not. Read the stated life together with the operating mode it applies to rather than as a single headline number.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare two projectors?",
        answer:
          "Select both above, then work in this order: throw ratio against your available distance, brightness together with its measurement method, native resolution, inputs, and light-source type and life. “Differences only” shows just the rows where they differ.",
      },
      {
        question: "How bright a projector do I need?",
        answer:
          "It depends on screen size and ambient light, both of which we cannot see, so we do not publish a recommendation. Read the lumens row together with the measurement method stated under it, then judge it against your own room.",
      },
      {
        question: "Are all lumens figures the same measurement?",
        answer:
          "No. ANSI lumens, ISO 21118 and IDMS procedures measure differently and produce numbers that are not directly comparable. This page prints the method alongside the figure wherever the manufacturer states one, and leaves the row as “Not verified” where none is stated.",
      },
      {
        question: "Lamp, laser or LED — which light source should I choose?",
        answer:
          "Lamps are usually cheaper and replaceable; laser and LED sources last far longer with less maintenance. Compare the light-source row together with brightness and the stated life for the mode you would run.",
      },
      {
        question: "Do you publish projector reviews or image quality tests?",
        answer:
          "No. CompareForge does not measure image quality, brightness or noise, and does not assign scores. We compare published specifications, state the measurement method where one is given, and cite the page each value came from.",
      },
      {
        question: "Does CompareForge have projector records?",
        answer:
          "Yes — a small number of records, each transcribed from the manufacturer page linked under its column. Fields the source did not publish appear as “Not verified” rather than an estimate.",
      },
    ],
    related: [
      { href: "/tv-comparison", label: "TV Comparison", blurb: "The other way to get a large image at home." },
      { href: "/compare/monitors", label: "Monitor Comparison", blurb: "Compare the display used up close." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "Compare a projector that is not in the records yet." },
      { href: "/tools/fit-clearance-checker", label: "Fit & Clearance Checker", blurb: "Check the projector and screen fit the space." },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison", blurb: "Compare chassis sizes to scale." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/guides/understanding-product-dimensions", label: "Understanding product dimensions", blurb: "How to read size and weight figures." },
      { href: "/methodology", label: "Our methodology", blurb: "How we source, verify and qualify data." },
    ],
  },
  {
    slug: "printers",
    path: "/printer-comparison",
    title: "Printer Comparison — Compare Printer Specs Side by Side",
    description:
      "Compare printers side by side: printer type, print speed, resolution, paper sizes, duplex, scanner, ADF, connectivity, dimensions and consumable system. Source-linked printer comparison.",
    h1: "Printer Comparison",
    intro:
      "Compare two or three printers across type, speed, paper handling, scanning, connectivity and consumables — with speeds shown in the standard each manufacturer used rather than converted between them.",
    datasetId: "printers",
    toolHeading: "Compare Printers Side by Side",
    toolIntro:
      "Choose up to three verified printer records. Print speeds and consumable yields are printed exactly as each manufacturer publishes them, with the standard stated where one is given — ISO, ESAT, draft and duty-cycle figures are different measurements. A figure the source did not publish appears as “Not verified”.",
    specificationsHeading: "What to Compare in a Printer",
    specificationsIntro:
      "A printer is a paper path, a consumable system and a connection. The fields below cover all three, because the cheapest printer to buy is often the expensive one to run.",
    specGroups: [
      {
        title: "Printer type and technology",
        body: "Inkjet, supertank inkjet or laser, and the print technology underneath. Type determines the cost structure more than it determines the output: inkjets suit occasional colour and photo work, lasers suit high-volume monochrome text, and supertank systems change the consumable cost without changing the print technology.",
      },
      {
        title: "Print speed",
        body: "Pages per minute in the manufacturer's stated standard. ISO, ESAT and draft figures measure different things — draft modes are visibly lighter, and ISO figures are measured on a standard document. Compare like with like, and treat speeds as indicative rather than as a promise about your documents.",
      },
      {
        title: "Print resolution",
        body: "Dots per inch, usually quoted separately for black and colour and often as an optimised figure. Resolution affects fine detail and photographic output; on its own it does not predict real-world print quality, because the ink set, halftoning and paper matter as much as the number.",
      },
      {
        title: "Paper handling",
        body: "Supported paper sizes, automatic two-sided printing, the scanner type and whether an automatic document feeder is fitted. Duplex is a cost and paper decision; the ADF decides whether multi-page copying and scanning is hands-off or a page at a time.",
      },
      {
        title: "Connectivity and mobile printing",
        body: "USB, Ethernet, Wi-Fi band and any wired extensions, plus the mobile printing standards supported — AirPrint, Mopria and the manufacturer's own app. The wireless band and the mobile standard together determine whether phones and laptops can print without the printer becoming a network problem.",
      },
      {
        title: "Dimensions and weight",
        body: "Chassis measurements including the tray and scanner cover, and weight. Measure the shelf the printer will live on with the tray extended, not just the closed footprint, and check whether the output tray has clearance in front.",
      },
      {
        title: "Consumables and stated yield",
        body: "The cartridge or bottle system and the yield figures the manufacturer states. Yields are measured to a standard at a stated page coverage, so they describe a controlled test rather than your documents — but they are still the right figure for comparing the running cost of two systems, provided both are quoted to the same standard.",
      },
    ],
    focusHeading: "What Matters When Comparing Printers",
    focusIntro:
      "Printer decisions are mostly about volume and running cost. These four checks establish both before any speed figure is read.",
    focusItems: [
      {
        title: "Volume first",
        body: "Decide how many pages a month you actually print. Low volume favours a cheap inkjet; sustained volume favours a laser or a supertank system, and the difference is running cost rather than print quality.",
      },
      {
        title: "Consumable system before purchase price",
        body: "Cartridge, bottle or toner determines what you pay per page for the life of the machine. Read the ink or toner row together with the stated yield rather than comparing sticker prices alone.",
      },
      {
        title: "Paper path against your workflow",
        body: "Automatic two-sided printing and an automatic document feeder decide whether multi-page jobs are hands-on. If you scan or copy regularly, the ADF row matters more than the print speed row.",
      },
      {
        title: "Network against your setup",
        body: "Check the wireless band, Ethernet and the mobile printing standards against the devices you use. A printer that only works through one manufacturer's app is a different daily experience from one supporting the platform standards.",
      },
    ],
    sections: [
      {
        heading: "How to Use the Printer Comparison Tool",
        steps: [
          "Select two or three printers from the record list.",
          "Decide your monthly volume, then read the printer type and consumable rows first.",
          "Turn on “Differences only” to see where the selected printers diverge.",
          "Compare speeds only within the same stated standard; read the note under the row before comparing across brands.",
          "Check paper handling — duplex, scanner and document feeder — against the jobs you actually run.",
          "Open the source under any row you are about to rely on, and copy the shareable link to keep the selection.",
        ],
      },
      {
        heading: "Reading Print Speed Without Being Misled",
        paragraphs: [
          "Print speed looks like the most comparable printer specification and is among the least. ISO speeds are measured on a standard document under controlled conditions; ESAT is a different ISO measurement for continuous printing; draft modes produce visibly lighter output to reach their numbers. A printer quoting draft pages per minute next to one quoting ISO pages per minute is comparing two different products.",
          "This page therefore prints the manufacturer's figure with its stated standard and does not convert between standards or average them. Where a manufacturer does not state the standard, the figure is still shown as published, with the note under the row flagging that the method is unstated.",
          "The practical read is volume plus standard: how many pages, and measured how. For most people the honest conclusion is that speeds within a normal range are close enough that paper handling and consumable cost decide the purchase.",
        ],
      },
      {
        heading: "Total Cost of Ownership for a Printer",
        paragraphs: [
          "The purchase price is the smallest part of a printer's cost if you print regularly. The consumable system sets the cost per page for the life of the machine: cartridges are convenient and expensive per page, bottles are cheaper per page and messier to refill, and toner is efficient at volume but gives up photo flexibility.",
          "Start from your own volume. Multiply a realistic monthly figure by the years you expect to keep the machine, then read it against the yield the manufacturer states for each consumable. Yields are tested at a stated coverage, so your documents will usually land somewhere around them rather than exactly on them — which is still enough to compare two systems.",
          "Then weigh the features you use against that cost. Automatic two-sided printing saves paper; an automatic document feeder saves time; a larger input tray means fewer refills. Each is a recurring benefit that outlasts a small difference in the purchase price.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare two printers?",
        answer:
          "Select both above, decide your monthly volume first, then compare printer type, consumable system and stated yield, print speed with its standard, paper handling, connectivity, dimensions and weight. “Differences only” shows just the rows where they differ.",
      },
      {
        question: "Are printer speeds measured the same way across brands?",
        answer:
          "No. ISO, ESAT and draft figures measure different documents under different conditions, and draft output is visibly lighter. This page prints each figure with its stated standard and does not convert between standards.",
      },
      {
        question: "Inkjet or laser — which should I buy?",
        answer:
          "It depends on volume and what you print. Laser suits high-volume monochrome text and has a lower cost per page at volume; inkjet suits occasional use and colour or photo output. Read the printer type row together with your own monthly volume.",
      },
      {
        question: "Do manufacturer page yields predict what I will get?",
        answer:
          "They are measured to a standard at a stated page coverage, so they describe a controlled test rather than your documents. Use them to compare two consumable systems on the same basis rather than as a prediction of your exact results.",
      },
      {
        question: "Do you publish printer reviews or test results?",
        answer:
          "No. CompareForge does not print test pages and does not publish print quality scores, speed measurements or running-cost calculations from our own tests. We compare published specifications and state where each value came from.",
      },
      {
        question: "Does CompareForge have printer records?",
        answer:
          "Yes — a small number of records, each transcribed from the manufacturer page linked under its column. Fields the source did not publish appear as “Not verified” rather than an estimate.",
      },
    ],
    related: [
      { href: "/smartwatch-comparison", label: "Smartwatch Comparison", blurb: "Another category compared from its specification pages." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "Compare a printer that is not in the records yet." },
      { href: "/tools/unit-price-calculator", label: "Unit Price Calculator", blurb: "Work out cost per page from consumable prices." },
      { href: "/tools/fit-clearance-checker", label: "Fit & Clearance Checker", blurb: "Does it fit the shelf with the tray extended?" },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison", blurb: "Compare chassis sizes to scale." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/methodology", label: "Our methodology", blurb: "How we source, verify and qualify data." },
    ],
  },
  {
    slug: "gaming-monitors",
    path: "/gaming-monitor-comparison",
    title: "Gaming Monitor Comparison — Refresh Rate, Response Time and Sync",
    description:
      "Compare gaming monitors side by side: refresh rate, response time, panel type, adaptive sync, HDR tier, resolution, ports and size. Free gaming monitor comparison template.",
    h1: "Gaming Monitor Comparison",
    intro:
      "Compare two gaming monitors on the rows that decide how they feel to play on — refresh rate, response time, panel type, adaptive sync, HDR tier and the ports that have to carry the signal.",
    specCategory: "gaming-monitors",
    toolHeading: "Compare Gaming Monitors Side by Side",
    toolIntro:
      "The template loads screen size, resolution, refresh rate, panel type, response time, brightness, adaptive sync, HDR tier, HDMI and DisplayPort versions, USB hub, speakers, aspect ratio and price. Bring the values from both manufacturers' specification pages, delete rows you do not care about, and add your own for stand adjustability or colour coverage.",
    specificationsHeading: "What to Compare in a Gaming Monitor",
    specificationsIntro:
      "Gaming monitors are a chain: the graphics card produces frames, the cable carries them, and the panel displays them. The specification sheet only helps if every link in that chain can carry the same signal.",
    specGroups: [
      {
        title: "Refresh rate",
        body: "Frames per second the panel can display, in hertz. This is the row that most changes how a game feels, and it is only reachable if the cable and the graphics card can deliver the signal at your chosen resolution.",
      },
      {
        title: "Response time",
        body: "Milliseconds, as published by the manufacturer. Measurement conditions differ between vendors and between overdrive settings, so treat these as vendor claims rather than measured facts — and compare them only alongside the panel type and refresh rate rather than as a ranking.",
      },
      {
        title: "Panel type",
        body: "IPS, VA, TN or OLED. This governs contrast, viewing angles and colour behaviour as well as response characteristics. It is a structural choice rather than a better-or-worse one: VA trades response for contrast, IPS trades contrast for consistency, and OLED gives per-pixel contrast with its own considerations around static content.",
      },
      {
        title: "Adaptive sync",
        body: "The variable refresh standard the monitor supports — G-Sync, FreeSync or both — and its certification tier where published. Adaptive sync removes tearing and stutter when the frame rate fluctuates, which matters more on variable-load games than a few extra hertz of peak refresh rate.",
      },
      {
        title: "HDR tier",
        body: "The HDR level the panel claims and the brightness that supports it. HDR on a monitor ranges from a checkbox to a genuinely different experience, and the deciding factors are peak brightness and dimming behaviour rather than the label. Read the tier together with the brightness row.",
      },
      {
        title: "Inputs and bandwidth",
        body: "HDMI version, DisplayPort version and what each carries at your resolution. A 4K 144 Hz claim is unreachable over a connection that only supports 4K 60, so confirm the port and cable generation against the refresh rate you intend to run.",
      },
      {
        title: "Size, resolution and aspect ratio",
        body: "Screen size, pixel count and shape — 16:9, 21:9 or 32:9. These three together set pixel density and field of view, and they should be read as one decision: the same refresh rate means something different at 1080p ultrawide than it does at 4K.",
      },
    ],
    focusHeading: "What Matters When Comparing Gaming Monitors",
    focusIntro:
      "Gaming monitor specifications are coupled: refresh rate needs the bandwidth, HDR needs the brightness, and panel type shapes both. Working through them in this order avoids buying a fast panel in the wrong configuration.",
    focusItems: [
      {
        title: "The signal path first",
        body: "Confirm your graphics card and cable can carry your target resolution at your target refresh rate. This check costs nothing and eliminates more configurations than any other.",
      },
      {
        title: "Adaptive sync before peak hertz",
        body: "A smooth variable refresh rate across the range you actually play in usually matters more than the top of the range. Check the standard and the certification tier rather than the largest number on the box.",
      },
      {
        title: "Panel type before speed",
        body: "Decide between contrast, viewing angle and response characteristics first. A fast panel in the wrong technology is still the wrong panel for your use.",
      },
      {
        title: "The stand is part of the product",
        body: "Height, tilt and swivel adjustment affect comfort over long sessions and are not upgradeable. A slightly slower panel with a good stand often serves better over years of use.",
      },
    ],
    sections: [
      {
        heading: "How to Use the Gaming Monitor Comparison",
        steps: [
          "Open both manufacturers' specification pages and enter the same rows for each monitor.",
          "Start with the inputs row and confirm both can carry the resolution and refresh rate you intend.",
          "Read refresh rate together with adaptive sync — the two describe how motion is handled, not two separate features.",
          "Treat response time as a claim: compare it alongside panel type rather than as a headline.",
          "Delete rows you do not care about and add your own for stand adjustability, colour coverage or USB ports.",
          "Where a value is missing from a manufacturer's page, leave it empty — the tool shows it as missing rather than filling it in.",
        ],
      },
      {
        heading: "Why the Signal Path Decides the Refresh Rate",
        paragraphs: [
          "A monitor's maximum refresh rate is a statement about the panel, not a guarantee about your setup. Getting there requires the graphics card to produce frames at that rate, the cable to carry them, and the port to accept the bandwidth — and each of those has its own ceiling at a given resolution.",
          "This is why the template puts the HDMI and DisplayPort rows next to the refresh rate. A monitor advertised at 4K 144 Hz will happily run at 4K 60 on a connection that cannot carry more, and the failure presents as a settings option that is missing rather than as an error.",
          "Check the chain in order: what the card outputs, what the port version supports at that resolution, what the cable is rated for, and what the monitor accepts. Only then treat the refresh rate as available to you.",
        ],
      },
      {
        heading: "Reading Response Time and Panel Type Together",
        paragraphs: [
          "Published response times are vendor claims measured under conditions the manufacturer chooses, including which overdrive setting is applied. Overdrive that improves the measured figure can also produce visible overshoot, so the number on the specification sheet does not describe the setting you will actually use.",
          "Panel type is the more durable comparison. It determines contrast, viewing angle and the character of motion, and it is a structural property rather than a setting. Read response time as a hint about the panel's behaviour and panel type as the decision.",
          "We do not publish measured response times or input lag figures, because we do not measure displays. The template shows what each manufacturer claims, in their wording, so you can weigh it against independent testing of your own choosing.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare two gaming monitors?",
        answer:
          "Enter the same rows for both: inputs first, then refresh rate and adaptive sync together, response time alongside panel type, HDR tier with brightness, and size, resolution and aspect ratio as one group. The template above loads those rows for you.",
      },
      {
        question: "Is a higher refresh rate always better for gaming?",
        answer:
          "Within a panel's range, higher refresh rate does feel smoother — but only if the signal path can carry it and your graphics card can produce the frames. Check the port and cable version first, then decide whether the extra hertz are reachable in the games you play.",
      },
      {
        question: "Are monitor response time figures reliable?",
        answer:
          "They are manufacturer claims measured under conditions that differ between brands and often assume a particular overdrive setting. Compare them only alongside panel type and refresh rate, and treat small differences between models as noise.",
      },
      {
        question: "Which panel type is best for gaming?",
        answer:
          "There is no universal answer, which is why we do not rank them. VA trades response for contrast, IPS trades contrast for viewing angles and consistency, and OLED gives per-pixel contrast. Decide which of those you value, then read the rest of the table against it.",
      },
      {
        question: "Do you publish monitor reviews, input lag or response tests?",
        answer:
          "No. CompareForge does not measure displays and does not publish input-lag results, measured response times, colour-accuracy measurements or scores. We compare published specifications and label vendor claims as claims.",
      },
      {
        question: "Does CompareForge have gaming monitor records?",
        answer:
          "Not as a dataset. Our verified records cover smartphones, processors, graphics cards, televisions, smartwatches, projectors and printers — but a gaming monitor dataset would need a citable source for every field we list here. Until then this page uses the template you fill in.",
      },
    ],
    related: [
      { href: "/gpu-comparison", label: "GPU Comparison", blurb: "The card that has to drive the panel." },
      { href: "/compare/monitors", label: "Monitor Comparison", blurb: "The general monitor comparison, without the gaming focus." },
      { href: "/tv-comparison", label: "TV Comparison", blurb: "The same panel questions from the sofa." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "The tool on this page, for any category." },
      { href: "/tools/compatibility-checker", label: "Compatibility Checker", blurb: "Check the signal your card can actually output." },
      { href: "/tools/percentage-difference-calculator", label: "Percentage Difference", blurb: "Quantify refresh rate or brightness gaps." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
    ],
  },
  {
    slug: "phone-cameras",
    path: "/phone-camera-comparison",
    title: "Phone Camera Comparison — Compare Camera Specs Side by Side",
    description:
      "Compare phone camera specifications side by side: main, ultrawide, telephoto and front sensors, apertures, stabilization, optical zoom and video capability. Source-linked records.",
    h1: "Phone Camera Comparison",
    intro:
      "Compare the camera hardware of any two or three phones in our records — sensor resolution, aperture, stabilization, optical zoom and video capability — with every value taken from the phone's own record and its source.",
    datasetId: "phone-cameras",
    toolHeading: "Compare Phone Cameras Side by Side",
    toolIntro:
      "This table reads the camera fields out of CompareForge's verified phone records, so the values and their sources are the same ones published on each phone's page. Choose up to three phones, and remember that camera hardware describes the envelope — it does not predict how a photograph will look.",
    specificationsHeading: "What to Compare in a Phone Camera",
    specificationsIntro:
      "Camera specifications describe capability rather than quality. These are the fields worth comparing, each with what it does and does not tell you.",
    specGroups: [
      {
        title: "Main sensor resolution and aperture",
        body: "Megapixels and the f-number of the primary camera. Aperture affects how much light reaches the sensor, and lower numbers admit more; megapixels affect how much you can crop. Sensor size, which manufacturers rarely publish in a comparable form, matters at least as much as either.",
      },
      {
        title: "Stabilization",
        body: "Whether optical image stabilization is fitted and to which lenses. OIS physically counteracts hand movement, which is what allows a slower shutter without blur — the specification most directly connected to usable handheld results in low light.",
      },
      {
        title: "Additional cameras",
        body: "Ultrawide and telephoto sensors, their resolution and aperture, and the optical zoom they provide. Whether a second lens exists is often more consequential than its specifications: a phone with a real telephoto reframes differently from one cropping the main sensor.",
      },
      {
        title: "Optical and maximum zoom",
        body: "The optical zoom factor and the maximum zoom the manufacturer states. Optical zoom moves real glass and preserves resolution; maximum zoom is usually a mix of optical and digital steps. Compare the two separately rather than reading the larger number as the better camera.",
      },
      {
        title: "Front camera",
        body: "Resolution, aperture and stabilization of the selfie camera. For video calls and front-facing video this is the camera you actually use daily, and it is frequently specified more conservatively than the rear array.",
      },
      {
        title: "Video capability",
        body: "Maximum resolution and frame rate, plus the formats supported — HDR video, log recording, professional codecs. Higher frame rates at a given resolution are a different tool from the maximum resolution itself, and codec support determines what you can edit later.",
      },
      {
        title: "Software features",
        body: "The processing and capture features the manufacturer lists. These change with software updates more readily than hardware does, so treat them as the least permanent row in the table.",
      },
    ],
    focusHeading: "What Matters When Comparing Phone Cameras",
    focusIntro:
      "Camera hardware constrains what a phone can capture; processing decides most of what you see. Keeping those two apart is the whole point of this section.",
    focusItems: [
      {
        title: "The lens array before the megapixel count",
        body: "Whether a real ultrawide and telephoto exist changes how you shoot more than a higher megapixel figure on the main sensor. Read the additional cameras group first.",
      },
      {
        title: "Aperture alongside sensor behaviour",
        body: "A lower f-number admits more light, but sensor size and processing determine how that light is used. Manufacturers rarely publish sensor size comparably, so treat aperture as one input rather than a verdict.",
      },
      {
        title: "Optical zoom against maximum zoom",
        body: "Optical zoom preserves resolution; maximum zoom includes digital steps. Compare the optical figure as the real capability and the maximum figure as a claim about reach.",
      },
      {
        title: "Video against stills",
        body: "Maximum resolution, frame rate and codec support describe video; stabilization and burst behaviour describe stills. If you shoot mostly video, weight the video group ahead of the sensor resolution rows.",
      },
    ],
    sections: [
      {
        heading: "How to Use the Phone Camera Comparison",
        steps: [
          "Select two or three phones from the record list, or search by brand or model.",
          "Read the main camera group first: sensor, aperture, stabilization and optical zoom together.",
          "Turn on “Differences only” to see only where the selected phones' camera hardware differs.",
          "Compare optical zoom against maximum zoom rather than reading the larger number as better.",
          "Read the video group if you shoot video — resolution, frame rate and supported formats are separate capabilities.",
          "Open the source under any row you intend to act on; each value links to the page it was transcribed from.",
        ],
      },
      {
        heading: "Why Camera Hardware Does Not Predict Image Quality",
        paragraphs: [
          "Two phones with identical sensor resolution, aperture and lens configuration can produce visibly different photographs, because most of what you see is computational: how frames are combined, how noise is handled, how highlights are recovered and how the scene is tone-mapped. That processing is rarely published in a comparable form and changes with software updates.",
          "This page therefore compares the hardware envelope and nothing else. It does not publish image quality scores, does not compare photographs, and does not claim that one phone captures a better image than another — not because the question is uninteresting, but because answering it honestly requires testing we do not do.",
          "What the table does give you is the constraint set: which lenses exist, how much light they admit, whether they are stabilized, how far the optical zoom reaches and what the video chain supports. Those facts do not tell you which photo you will prefer, and they do tell you which shots are physically possible.",
        ],
      },
      {
        heading: "Reading Zoom the Honest Way",
        paragraphs: [
          "Marketing zoom figures combine two very different things. Optical zoom moves elements in the lens so the sensor sees a genuinely closer view at full resolution. Digital zoom crops and enlarges the same pixels, and the quality depends on how much of the frame is being thrown away.",
          "The comparison table therefore shows optical zoom and maximum zoom as separate rows. The optical figure is the capability; the maximum figure is the extent to which the phone will keep going after the optics stop. Neither is wrong — they answer different questions, and reading only the larger one is how people end up surprised by a soft photograph.",
          "Where a source publishes only one of the two, the other is left as “Not verified” rather than inferred. A zoom figure derived from a crop factor would be a computed value presented as a published one.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I compare two phone cameras?",
        answer:
          "Select both phones above and read them in this order: main sensor, aperture and stabilization; ultrawide and telephoto; optical zoom against maximum zoom; front camera; then video capability. “Differences only” shows just the rows where they differ.",
      },
      {
        question: "Does a higher megapixel count mean a better camera?",
        answer:
          "No. It means more pixels, which helps cropping and large prints and costs file size. Sensor size, aperture, stabilization and processing matter at least as much, which is why this table shows several rows rather than ranking by megapixels.",
      },
      {
        question: "What is the difference between optical and digital zoom?",
        answer:
          "Optical zoom moves the lens so the sensor captures a closer view at full resolution; digital zoom crops and enlarges the existing pixels. The table shows them as separate rows — the optical figure is the hardware capability and the maximum figure includes digital steps.",
      },
      {
        question: "Do you compare photo quality or publish camera tests?",
        answer:
          "No. We do not run lab tests, do not publish sample images and do not claim one phone produces better photographs than another. We compare documented hardware specifications and cite where each value came from.",
      },
      {
        question: "Where do the camera specifications come from?",
        answer:
          "They are read directly from each phone's verified record in our database, which carries its own source list and verification date. The source under any column links to the page that record was transcribed from.",
      },
      {
        question: "Which phone camera should I buy?",
        answer:
          "That depends on what you shoot, and this page deliberately does not answer it. Read the lens array, the zoom rows and the video group against your own use, then take the comparison to independent image testing if you want a picture-quality verdict.",
      },
    ],
    related: [
      { href: "/compare/phones", label: "Phone Comparison", blurb: "The same records across every specification." },
      { href: "/compare/cameras", label: "Camera Comparison", blurb: "The dedicated-camera equivalent, for interchangeable lenses." },
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "Compare a phone that is not in the records yet." },
      { href: "/tools/decision-matrix", label: "Weighted Decision Matrix", blurb: "Weight zoom, video and stabilization against each other." },
      { href: "/tools/percentage-difference-calculator", label: "Percentage Difference", blurb: "Quantify any two figures from the spec sheets." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/guides/specs-explained", label: "Specs explained", blurb: "Plain-language definitions of specification terms." },
      { href: "/methodology", label: "Our methodology", blurb: "How we source, verify and qualify data." },
    ],
  },
];

export function getCategoryHub(slug: string): CategoryHubConfig | undefined {
  return categoryHubs.find((h) => h.slug === slug);
}
