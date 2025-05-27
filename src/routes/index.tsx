import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@radix-ui/themes";
import { Attempt } from "~/components/atomic/Attempt";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <Attempt />
      {/*<Dropdown*/}
      {/*  label={"fadsf"}*/}
      {/*  options={[]}*/}
      {/*  onSelect={(d) => {*/}
      {/*    console.log("selected", d);*/}
      {/*  }}*/}
      {/*  selectedValue={{*/}
      {/*    id: "1",*/}
      {/*    name: "Option 1",*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
}
