import type { CategoryDataset, CategorySpecField, CategoryProduct } from "@/data/category-datasets";
import type { Smartphone } from "@/data/types";
import { products } from "@/lib/products";

// ============================================
// Phone camera dataset
// Derived from the existing verified phone records.
// No new values are introduced here: every field is
// read out of a record that already carries a source.
// ============================================

const cameraFields: CategorySpecField[] = [
  { key: "mainMp", label: "Main camera", group: "Main camera", type: "number", unit: "MP" },
  { key: "mainAperture", label: "Main aperture", group: "Main camera", type: "text" },
  { key: "mainOis", label: "Optical image stabilization", group: "Main camera", type: "boolean" },
  { key: "mainOpticalZoom", label: "Optical zoom", group: "Main camera", type: "number", unit: "x" },
  { key: "mainMaxZoom", label: "Maximum zoom", group: "Main camera", type: "number", unit: "x" },
  { key: "uwMp", label: "Ultrawide camera", group: "Additional cameras", type: "number", unit: "MP" },
  { key: "uwAperture", label: "Ultrawide aperture", group: "Additional cameras", type: "text" },
  { key: "teleMp", label: "Telephoto camera", group: "Additional cameras", type: "number", unit: "MP" },
  { key: "teleAperture", label: "Telephoto aperture", group: "Additional cameras", type: "text" },
  { key: "teleOpticalZoom", label: "Telephoto optical zoom", group: "Additional cameras", type: "number", unit: "x" },
  { key: "frontMp", label: "Front camera", group: "Front camera", type: "number", unit: "MP" },
  { key: "frontAperture", label: "Front aperture", group: "Front camera", type: "text" },
  { key: "frontOis", label: "Front stabilization", group: "Front camera", type: "boolean" },
  { key: "videoResolution", label: "Maximum video resolution", group: "Video", type: "text" },
  { key: "videoFps", label: "Maximum frame rate", group: "Video", type: "number", unit: "fps" },
  { key: "videoFeatures", label: "Video features", group: "Video", type: "text" },
  { key: "cameraFeatures", label: "Camera features", group: "Software and processing", type: "text" },
];

function pickCameraSources(phone: Smartphone) {
  const cameraSources = phone.sources.filter(
    (s) => s.field === "camera" || s.field === "*"
  );
  return cameraSources.length > 0 ? cameraSources : phone.sources;
}

function toProduct(phone: Smartphone): CategoryProduct {
  const cam = phone.camera;
  const features = (list: string[] | undefined) =>
    list && list.length > 0 ? list.join(", ") : null;

  return {
    id: phone.slug,
    brand: phone.brand,
    model: phone.model,
    fullName: phone.fullName,
    specs: {
      mainMp: cam.main.mp,
      mainAperture: cam.main.aperture,
      mainOis: cam.main.ois,
      mainOpticalZoom: cam.main.opticalZoom,
      mainMaxZoom: cam.main.maxZoom,
      uwMp: cam.ultrawide?.mp ?? null,
      uwAperture: cam.ultrawide?.aperture ?? null,
      teleMp: cam.telephoto?.mp ?? null,
      teleAperture: cam.telephoto?.aperture ?? null,
      teleOpticalZoom: cam.telephoto?.opticalZoom ?? null,
      frontMp: cam.front?.mp ?? null,
      frontAperture: cam.front?.aperture ?? null,
      frontOis: cam.front?.ois ?? null,
      videoResolution: cam.video?.maxResolution ?? null,
      videoFps: cam.video?.maxFps ?? null,
      videoFeatures: features(cam.video?.features),
      cameraFeatures: features(cam.features),
    },
    sources: pickCameraSources(phone),
  };
}

export const phoneCameraDataset: CategoryDataset = {
  id: "phone-cameras",
  label: "Phone Cameras",
  singular: "phone camera",
  route: "/phone-camera-comparison",
  fields: cameraFields,
  products: products.map(toProduct),
  maxCompare: 3,
};
