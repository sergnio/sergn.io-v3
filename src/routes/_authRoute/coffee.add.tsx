import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authRoute/coffee/add")({
  component: AddCoffee,
});

function AddCoffee() {
  return (
    <div className="p-2">
      <h3>Add Coffee</h3>
      <p>Here you can add your favorite coffee.</p>
      {/* Add your form or components to add coffee here */}
    </div>
  );
}
