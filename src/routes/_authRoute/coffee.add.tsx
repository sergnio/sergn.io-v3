import { createFileRoute } from "@tanstack/react-router";
import {
  Autocomplete,
  Button,
  Input,
  Label,
  Menu,
  MenuItem,
  SearchField,
  useFilter,
} from "react-aria-components";

export const Route = createFileRoute("/_authRoute/coffee/add")({
  component: AddCoffee,
});

function AddCoffee() {
  const { contains } = useFilter({ sensitivity: "base" });

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
          <Autocomplete filter={contains}>
            <SearchField>
              <Label>Commands</Label>
              <Input placeholder="Search commands...." />
              <Button>✕</Button>
            </SearchField>
            <Menu>
              <MenuItem>Avo Roasters</MenuItem>
              <MenuItem>SK Coffee</MenuItem>
              <MenuItem>La Tulipa </MenuItem>
            </Menu>
          </Autocomplete>
        </div>
        <Button type="submit">Add Coffee</Button>
      </form>
    </div>
  );
}
