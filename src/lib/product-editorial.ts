import { Smartphone } from "@/data/types";
import { products } from "@/lib/products";

export interface NearestPhone {
  product: Smartphone;
  priceDelta: number | null;
  deltaNotes: string[];
}

export interface ProductEditorial {
  overview: string[];
  display: string[];
  performance: string[];
  camera: string[];
  battery: string[];
  software: string[];
  design: string[];
  storage: string[];
  limitations: string[];
  nearest: NearestPhone[];
  priceLadder: string[];
  positionInCategory: string[];
}

function fmtPrice(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/**
 * Build unique, data-only editorial for a product page. Every sentence is
 * constructed from the product record and the rest of our database — nothing
 * is invented, no opinions, no ratings. Different field values produce
 * different prose, so no two product pages share body text.
 */
export function getProductEditorial(product: Smartphone): ProductEditorial {
  const year = product.releaseDate ? product.releaseDate.slice(0, 4) : null;
  const msrp = product.pricing.msrp;

  // ---------- overview ----------
  const overview: string[] = [];
  const statusPhrase =
    product.status === "available"
      ? "on sale"
      : product.status === "discontinued"
        ? "discontinued"
        : product.status === "announced"
          ? "announced but not yet on sale"
          : "upcoming";
  const releasePhrase = product.releaseDate
    ? `released on ${product.releaseDate}`
    : "release date not yet confirmed in our record";
  const pricePhrase = msrp
    ? `launch or listed price of ${fmtPrice(msrp)}`
    : "no confirmed price in our record yet";
  overview.push(
    `The ${product.fullName} is a ${product.category.replace("-", " ")} record in the CompareForge database, ${statusPhrase}, ${releasePhrase}, and tracked at a ${pricePhrase}. ${product.summary}`
  );

  const brandPeers = products.filter(
    (p) => p.brand === product.brand && p.id !== product.id
  );
  if (brandPeers.length > 0) {
    const sameYear = brandPeers.filter(
      (p) => year && p.releaseDate && p.releaseDate.startsWith(year)
    );
    const peerNote =
      sameYear.length > 0
        ? `Alongside ${sameYear
            .slice(0, 2)
            .map((p) => p.model)
            .join(" and ")}, it is one of ${sameYear.length + 1} ${product.brand} models we publish from ${year}`
        : `We also track ${brandPeers.length} other ${product.brand} model${brandPeers.length === 1 ? "" : "s"} in this database`;
    overview.push(
      `${peerNote}, so you can cross-check any specification on this page against the rest of the ${product.brand} lineup before deciding.`
    );
  }

  // ---------- display ----------
  const display: string[] = [];
  if (product.display.size) {
    const sizeCmp =
      product.display.size >= 6.7
        ? "on the larger side of the phones we track"
        : product.display.size <= 6.1
          ? "on the compact side of the phones we track"
          : "mid-sized among the phones we track";
    display.push(
      `The screen measures ${product.display.size} inches diagonally — ${sizeCmp}.`
    );
  }
  if (product.display.panelType) {
    display.push(
      `The panel type recorded for this model is ${product.display.panelType}${
        product.display.resolution ? `, running at a native ${product.display.resolution}` : ""
      }.`
    );
  }
  if (product.display.refreshRate) {
    display.push(
      `Refresh rate is listed at ${product.display.refreshRate} Hz${
        product.display.refreshRate <= 60
          ? " — the baseline rate; higher-rate panels appear on other models in this database"
          : product.display.refreshRate >= 120
            ? ", which matches the high-refresh panels used across our flagship records"
            : ""
      }.`
    );
  }
  if (product.display.peakBrightness) {
    display.push(
      `Peak brightness is documented at ${product.display.peakBrightness.toLocaleString("en-US")} nits.`
    );
  }
  if (product.display.protection) {
    display.push(`Cover glass is listed as ${product.display.protection}.`);
  }
  if (product.display.hdr === true) display.push("HDR support is recorded for this model.");
  if (product.display.hdr === false)
    display.push("HDR support is not listed for this model in our sources.");
  if (display.length === 0)
    display.push(
      "Display specifications for this record are incomplete — check the sources section for the pages we relied on."
    );

  // ---------- performance ----------
  const performance: string[] = [];
  if (product.performance.chipset) {
    performance.push(
      `Processing is handled by the ${product.performance.chipset}${
        product.performance.fabrication ? ` manufactured on a ${product.performance.fabrication} process` : ""
      }.`
    );
  }
  if (product.performance.ram) {
    const ramPeers = products
      .map((p) => p.performance.ram)
      .filter((n): n is number => typeof n === "number");
    const medianRam = ramPeers.sort((a, b) => a - b)[Math.floor(ramPeers.length / 2)];
    const ramCmp =
      product.performance.ram > medianRam
        ? `above the ${medianRam} GB median of phones in this database`
        : product.performance.ram < medianRam
          ? `below the ${medianRam} GB median of phones in this database`
          : `equal to the ${medianRam} GB median of phones in this database`;
    performance.push(
      `The record lists ${product.performance.ram} GB of RAM, ${ramCmp}.`
    );
  }
  if (product.performance.cpuCores) {
    performance.push(
      `CPU configuration is recorded as ${product.performance.cpuCores} cores${
        product.performance.gpuModel ? `, with the ${product.performance.gpuModel} handling graphics` : ""
      }.`
    );
  }
  if (performance.length === 0)
    performance.push("Performance fields for this record are not yet filled in.");

  // ---------- camera ----------
  const camera: string[] = [];
  const lensCount = [product.camera.main, product.camera.ultrawide, product.camera.telephoto].filter(
    Boolean
  ).length;
  if (product.camera.main.mp) {
    camera.push(
      `The main sensor is ${product.camera.main.mp} MP${
        product.camera.main.aperture ? ` with an aperture of ${product.camera.main.aperture}` : ""
      }${product.camera.main.ois ? ", and optical stabilisation is listed" : ""}.`
    );
  }
  if (product.camera.ultrawide?.mp) {
    camera.push(
      `An ultrawide lens of ${product.camera.ultrawide.mp} MP${
        product.camera.ultrawide.aperture ? ` (${product.camera.ultrawide.aperture})` : ""
      } sits alongside it.`
    );
  }
  if (product.camera.telephoto?.mp) {
    camera.push(
      `A ${product.camera.telephoto.mp} MP telephoto is present${
        product.camera.telephoto.opticalZoom
          ? ` with ${product.camera.telephoto.opticalZoom}× optical zoom`
          : ""
      }.`
    );
  } else {
    camera.push(
      "No telephoto lens is recorded for this model — zoom on this phone is digital only, according to our sources."
    );
  }
  if (product.camera.video) {
    camera.push(
      `Video tops out at ${product.camera.video.maxResolution}${
        product.camera.video.maxFps ? ` at ${product.camera.video.maxFps} fps` : ""
      }.`
    );
  }
  if (product.camera.front?.mp) {
    camera.push(`The front camera is ${product.camera.front.mp} MP.`);
  }
  if (product.camera.features.length > 0) {
    camera.push(
      `Camera software features listed for this record: ${product.camera.features.slice(0, 4).join(", ")}.`
    );
  }
  camera.push(
    `That is a ${lensCount}-lens rear configuration as documented — the full specification table below repeats every value with its source.`
  );

  // ---------- battery ----------
  const battery: string[] = [];
  if (product.battery.capacity) {
    const batPeers = products
      .map((p) => p.battery.capacity)
      .filter((n): n is number => typeof n === "number");
    const medianBat = batPeers.sort((a, b) => a - b)[Math.floor(batPeers.length / 2)];
    const batCmp =
      product.battery.capacity > medianBat
        ? `${(product.battery.capacity - medianBat).toLocaleString("en-US")} mAh above`
        : product.battery.capacity < medianBat
          ? `${(medianBat - product.battery.capacity).toLocaleString("en-US")} mAh below`
          : "level with";
    battery.push(
      `Battery capacity is ${product.battery.capacity.toLocaleString("en-US")} mAh — ${batCmp} the ${medianBat.toLocaleString("en-US")} mAh median of our ${batPeers.length} phones with a documented capacity.`
    );
  }
  if (product.battery.wiredCharging) {
    battery.push(
      `Wired charging is listed at ${product.battery.wiredCharging}W${
        product.battery.wirelessCharging
          ? `, with ${product.battery.wirelessCharging}W wireless`
          : ", and no wireless charging figure is recorded"
      }.`
    );
  }
  if (product.battery.reverseWireless === true)
    battery.push("Reverse wireless charging is supported according to our sources.");
  if (product.battery.type) battery.push(`Cell chemistry recorded: ${product.battery.type}.`);
  if (battery.length === 0)
    battery.push("Battery fields for this record are incomplete.");

  // ---------- software ----------
  const software: string[] = [];
  if (product.software.osAtLaunch) {
    software.push(
      `The phone launched on ${product.software.osAtLaunch}${
        product.software.osSkin ? ` with the ${product.software.osSkin} skin` : ""
      }.`
    );
  }
  if (product.software.updateCommitment) {
    software.push(
      `The vendor's update commitment is ${product.software.updateCommitment} years of OS updates${
        product.software.securityCommitment
          ? ` and ${product.software.securityCommitment} years of security patches`
          : ""
      }.`
    );
  }
  if (product.software.aiFeatures.length > 0) {
    software.push(
      `On-device or cloud AI features listed for this model: ${product.software.aiFeatures
        .slice(0, 5)
        .join(", ")}.`
    );
  } else {
    software.push(
      "No AI feature set is listed for this model in our record — fields stay empty rather than being filled with assumptions."
    );
  }

  // ---------- design ----------
  const design: string[] = [];
  if (product.design.weight) {
    const wPeers = products
      .map((p) => p.design.weight)
      .filter((n): n is number => typeof n === "number");
    const medianW = wPeers.sort((a, b) => a - b)[Math.floor(wPeers.length / 2)];
    const wDiff = product.design.weight - medianW;
    design.push(
      `Weight is ${product.design.weight} g${
        wDiff === 0
          ? `, exactly at the ${medianW} g median of our weighted records`
          : `, ${Math.abs(wDiff)} g ${wDiff > 0 ? "heavier" : "lighter"} than the ${medianW} g median of our weighted records`
      }.`
    );
  }
  if (product.design.dimensions) {
    const d = product.design.dimensions;
    if (d.height && d.width && d.depth) {
      design.push(
        `Dimensions measure ${d.height} × ${d.width} × ${d.depth} mm (height × width × depth).`
      );
    }
  }
  if (product.design.frameMaterial || product.design.backMaterial) {
    design.push(
      `Build materials recorded: ${
        [product.design.frameMaterial, product.design.backMaterial].filter(Boolean).join(" frame, ")
      }.`
    );
  }
  if (product.design.waterResistance) {
    design.push(`Water and dust resistance is rated ${product.design.waterResistance}.`);
  }
  if (product.design.colors.length > 0) {
    design.push(
      `Colour options listed: ${product.design.colors.join(", ")}.`
    );
  }

  // ---------- storage ----------
  const storage: string[] = [];
  if (product.storage.options.length > 0) {
    storage.push(
      `Storage options for this model: ${product.storage.options.join(", ")}.`
    );
  }
  if (product.storage.type) storage.push(`Storage type recorded as ${product.storage.type}.`);
  if (product.storage.expandable === true)
    storage.push("Expandable storage is supported — a microSD slot is listed in our sources.");
  if (product.storage.expandable === false)
    storage.push("Expandable storage is not supported on this model.");
  if (product.connectivity.satellite === true)
    storage.push("Satellite connectivity is listed as available.");
  if (product.connectivity.nfc === true)
    storage.push("NFC is present, so contactless pairing and payments are possible where the region allows it.");

  // ---------- limitations (honest, data-derived) ----------
  const limitations: string[] = [];
  if (!product.camera.telephoto)
    limitations.push(
      "There is no telephoto lens in the record — if optical zoom matters to you, other phones in this database document one."
    );
  if (product.display.refreshRate !== null && product.display.refreshRate !== undefined && product.display.refreshRate <= 60)
    limitations.push(
      `The panel is listed at ${product.display.refreshRate} Hz; models with 90 Hz or 120 Hz panels are tracked separately in this database.`
    );
  if (product.battery.wirelessCharging == null)
    limitations.push(
      "Wireless charging is not documented for this record — either the vendor does not list it or our sources did not confirm it."
    );
  if (product.performance.ram !== null && product.performance.ram !== undefined && product.performance.ram <= 4)
    limitations.push(
      `${product.performance.ram} GB of RAM is at the low end of what we publish; heavier multitasking users may want to compare against higher-RAM records first.`
    );
  if (product.storage.expandable === false)
    limitations.push(
      "Storage cannot be expanded on this model, so the variant you choose in the pricing table is the capacity you keep."
    );
  if (product.status === "discontinued")
    limitations.push(
      "The model is marked discontinued in our record — stock may be limited to remaining retail inventory, and prices in the table are the last ones we verified, not a live quote."
    );
  if (limitations.length === 0)
    limitations.push(
      "Nothing in this record stands out as an obvious trade-off against the rest of the database — check the median table and the nearest phones below to judge it in context."
    );

  // ---------- nearest phones (by price proximity, same category or brand) ----------
  const candidates = products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      const sameBrand = p.brand === product.brand;
      const sameCategory = p.category === product.category;
      const priceGap =
        p.pricing.msrp != null && msrp != null ? Math.abs(p.pricing.msrp - msrp) : null;
      // Lower score = closer. Brand/category affinity pulls neighbours in.
      let score = priceGap ?? 99999;
      if (!sameBrand) score += 50;
      if (!sameCategory) score += 150;
      return { p, score, sameBrand, sameCategory, priceGap };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  const nearest: NearestPhone[] = candidates.map(({ p, sameBrand, sameCategory, priceGap }) => {
    const deltaNotes: string[] = [];
    if (priceGap != null && msrp != null) {
      const diff = (p.pricing.msrp ?? 0) - msrp;
      deltaNotes.push(
        diff === 0
          ? "same recorded price"
          : `${fmtPrice(Math.abs(diff))} ${diff > 0 ? "more" : "less"} in our price table`
      );
    }
    if (p.display.size && product.display.size) {
      const d = p.display.size - product.display.size;
      if (Math.abs(d) >= 0.1)
        deltaNotes.push(`${Math.abs(d).toFixed(1)} in ${d > 0 ? "larger" : "smaller"} screen`);
    }
    if (p.battery.capacity && product.battery.capacity) {
      const d = p.battery.capacity - product.battery.capacity;
      if (Math.abs(d) >= 100)
        deltaNotes.push(
          `${Math.abs(d).toLocaleString("en-US")} mAh ${d > 0 ? "bigger" : "smaller"} battery`
        );
    }
    if (p.performance.ram && product.performance.ram && p.performance.ram !== product.performance.ram) {
      deltaNotes.push(
        `${p.performance.ram > product.performance.ram ? "+" : ""}${p.performance.ram - product.performance.ram} GB RAM difference`
      );
    }
    if (sameBrand && !deltaNotes.includes("same brand"))
      deltaNotes.unshift("same brand");
    else if (!sameBrand && sameCategory) deltaNotes.unshift("same category");
    return { product: p, priceDelta: priceGap, deltaNotes };
  });

  // ---------- price ladder ----------
  const priceLadder: string[] = [];
  const priced = product.pricing.variants.filter((v) => v.price != null);
  if (priced.length >= 2 && msrp != null) {
    const sorted = [...priced].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    const low = sorted[0];
    const high = sorted[sorted.length - 1];
    const step = (high.price ?? 0) - (low.price ?? 0);
    const storageJump = sorted
      .map((v) => v.storage)
      .join(" to ");
    priceLadder.push(
      `The pricing table covers ${storageJump}: ${fmtPrice(low.price ?? 0)} at the low end and ${fmtPrice(high.price ?? 0)} at the top — a spread of ${fmtPrice(step)} across ${sorted.length} priced variants.`
    );
    const mid = sorted.find(
      (v, i) => i > 0 && i < sorted.length - 1
    );
    if (mid && mid.price != null) {
      priceLadder.push(
        `The middle variant (${mid.storage}, ${mid.ram} RAM) is listed at ${fmtPrice(mid.price)} — ${fmtPrice((mid.price ?? 0) - (low.price ?? 0))} above the base model in our table.`
      );
    }
    const unp = product.pricing.variants.filter((v) => v.price == null);
    if (unp.length > 0) {
      priceLadder.push(
        `${unp.length} variant${unp.length === 1 ? "" : "s"} (${unp
          .map((v) => `${v.storage} / ${v.ram}`)
          .join(", ")}) appear${unp.length === 1 ? "s" : ""} in the record without a confirmed price — we leave those cells blank rather than estimate.`
      );
    }
  } else if (product.pricing.variants.length > 0) {
    priceLadder.push(
      `The variant table lists ${product.pricing.variants.length} configuration${product.pricing.variants.length === 1 ? "" : "s"} of storage and RAM for this model; each row shows the price only where a source confirmed one.`
    );
  }

  // ---------- position in category ----------
  const positionInCategory: string[] = [];
  const catPeers = products.filter((p) => p.category === product.category && p.id !== product.id);
  if (catPeers.length > 0 && msrp != null) {
    const cheaper = catPeers.filter((p) => p.pricing.msrp != null && p.pricing.msrp < msrp).length;
    const pricedPeers = catPeers.filter((p) => p.pricing.msrp != null).length;
    if (pricedPeers > 0) {
      positionInCategory.push(
        `Within the ${product.category.replace("-", " ")} records that carry a price, ${cheaper} of ${pricedPeers} other models are listed below ${fmtPrice(msrp)} and ${pricedPeers - cheaper} are at or above it.`
      );
    }
    positionInCategory.push(
      `Neighbouring records in this category are linked from the section above — open any of them to run a side-by-side specification comparison with this phone.`
    );
  }

  return {
    overview,
    display,
    performance,
    camera,
    battery,
    software,
    design,
    storage,
    limitations,
    nearest,
    priceLadder,
    positionInCategory,
  };
}
