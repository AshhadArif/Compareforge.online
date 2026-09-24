"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function NoIndexEffect() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hasParams = Array.from(searchParams.keys()).length > 0;
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (hasParams) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "robots";
        document.head.appendChild(meta);
      }
      meta.content = "noindex,follow";
    } else if (meta && meta.content.includes("noindex")) {
      // Landing without params: leave default (index) if we set noindex earlier this session
      meta.content = "index,follow";
    }
    return () => {
      // no cleanup needed; landing navigation re-runs effect
    };
  }, [pathname, searchParams]);

  return null;
}

export default function DynamicNoIndex() {
  return (
    <Suspense fallback={null}>
      <NoIndexEffect />
    </Suspense>
  );
}
