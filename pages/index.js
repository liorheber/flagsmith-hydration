import { useFlags } from "flagsmith/react";

function Homepage() {
  const flags = useFlags(["datadog_uf_reporting"]);
  return <div>{JSON.stringify(flags)}</div>;
}

export default Homepage;
