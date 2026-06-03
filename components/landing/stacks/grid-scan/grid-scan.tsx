"use client";

import * as React from "react";

import dynamic from "next/dynamic";

const GridScanImpl = dynamic(
  () => import("./grid-scan-impl").then((m) => m.GridScanImpl),
  {
    ssr: false,
  },
);

type GridScanProps = React.ComponentProps<typeof GridScanImpl>;

export function GridScan(props: GridScanProps) {
  return <GridScanImpl {...props} />;
}
