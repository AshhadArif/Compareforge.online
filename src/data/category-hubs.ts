import type { SpecCategoryId } from "@/components/tools/SpecComparison";

export interface CategoryHubConfig {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  specCategory: SpecCategoryId;
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
  faq: { question: string; answer: string }[];
  related: { href: string; label: string; blurb: string }[];
}

export const DATA_NOTE =
  "CompareForge publishes a product record only when every field in it has a source we can cite. Our verified database currently covers smartphones, which is why the phone pages read from records and the tool above reads from the values you enter. We would rather ask you to transcribe two numbers from the manufacturer's specification page than publish an estimate.";

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
          "Not yet. Our verified product records cover smartphones today. Laptop records will be added only when every field has a citable source — until then, the comparison tool uses the values you enter.",
      },
      {
        question: "Which laptop should I buy?",
        answer:
          "That is a decision the tool deliberately does not make. Work through the four trade-offs above, decide your own weights, and use the table to see which of your two candidates meets them.",
      },
    ],
    related: [
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
        title: "Size comparison",
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
          "Not yet — our verified product records currently cover smartphones. We add a category only once every field has a citable source, so for tablets the tool uses the specifications you enter.",
      },
    ],
    related: [
      { href: "/tools/spec-comparison", label: "Specification Comparison Tool", blurb: "The tablet comparison tool, for any category." },
      { href: "/compare/phone-size-comparison", label: "Phone Size Comparison", blurb: "The same to-scale size method, on our database." },
      { href: "/tools/dimension-comparison", label: "Dimension Comparison", blurb: "Draw any two objects to scale, including tablets." },
      { href: "/guides/how-to-compare-product-specifications", label: "How to compare specifications", blurb: "A method that works for any product." },
      { href: "/guides/understanding-product-dimensions", label: "Understanding product dimensions", blurb: "How to read size and weight figures." },
      { href: "/compare/laptops", label: "Laptop Comparison", blurb: "The tablet's closest competitor for the same job." },
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
          "Not yet. Our verified product records currently cover smartphones; monitor records will be added when every field has a citable source. Until then this page uses the values you enter.",
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
          "Not yet. Our verified product records currently cover smartphones. Camera records will be added once every field has a citable source; until then, this page uses the values you enter.",
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
          "Not yet. Our verified product records currently cover smartphones. Headphone records will be added when every field has a citable source — until then this page uses the values you enter.",
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
];

export function getCategoryHub(slug: string): CategoryHubConfig | undefined {
  return categoryHubs.find((h) => h.slug === slug);
}
