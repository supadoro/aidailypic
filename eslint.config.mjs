import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", ".next-build/**", ".next-build-*/**", ".next-prod/**", ".open-next/**", "out_build/**", "node_modules/**"],
  },
  ...nextVitals,
];

export default config;
