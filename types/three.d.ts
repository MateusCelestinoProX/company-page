// Minimal TS shim for three so the project type-checks.
// The runtime uses the real `three` package.
declare module "three" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const THREE: any;
  export = THREE;
}
