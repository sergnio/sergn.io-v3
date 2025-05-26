import { createFileRoute } from "@tanstack/react-router";
import { Autocomplete } from "~/components/composite/autocomplete";

export const Route = createFileRoute("/_authRoute/coffee/add")({
  component: AddCoffee,
});

function AddCoffee() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Coffee added!");
  };

  return (
    <div className="p-2">
      <h3>Add Coffee</h3>
      <p>Here you can add your favorite coffee.</p>
      {/* Add your form or components to add coffee here */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="coffeeName">Coffee Name:</label>
          <input type="text" id="coffeeName" name="coffeeName" required />
        </div>
        <div>
          <Autocomplete
            required
            label={"Bought From"}
            options={["SK Coffee", "Avo Coffee Roasters"]}
          />
        </div>
        <button type="submit">Add Coffee</button>
      </form>
    </div>
  );
}
