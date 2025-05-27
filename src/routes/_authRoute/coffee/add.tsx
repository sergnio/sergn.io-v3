import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Checkbox,
  FieldError,
  Form,
  Group,
  Input,
  Label,
  NumberField,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useFilter,
} from "react-aria-components";
import { Autocomplete } from "~/components/composite/autocomplete";
import { FormEvent } from "react";

export const Route = createFileRoute("/_authRoute/coffee/add")({
  component: AddCoffee,
});

function AddCoffee() {
  const { contains } = useFilter({ sensitivity: "base" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    console.log("Submitted", data);
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
        <NumberField name="price" defaultValue={0} isRequired>
          <Label>Price ($)</Label>
          <Group>
            <Button slot="decrement">-</Button>
            <Input />
            <Button slot="increment">+</Button>
          </Group>
          <FieldError />
        </NumberField>
        <RadioGroup name="unit" defaultValue="g" isRequired>
          <Label>Unit of measurement</Label>
          <Radio value="g">Grams</Radio>
          <Radio value="oz">Oz</Radio>
        </RadioGroup>
        <Button type="submit">Add Coffee</Button>
      </Form>
    </div>
  );
}
