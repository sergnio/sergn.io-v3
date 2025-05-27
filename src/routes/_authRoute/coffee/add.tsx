import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  useFilter,
} from "react-aria-components";
import { Autocomplete } from "~/components/composite/autocomplete";

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
      <Form onSubmit={handleSubmit}>
        <TextField name="email" type="email" isRequired>
          <Label>Coffee Name</Label>
          <Input required />
          <FieldError />
        </TextField>
        <Autocomplete
          required
          label={"Bought From"}
          options={["SK Coffee", "Avo Coffee Roasters"]}
        />
        <Button type="submit">Add Coffee</Button>
      </Form>
    </div>
  );
}
