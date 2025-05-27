import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  FieldError,
  Form,
  Group,
  Input,
  Label,
  NumberField,
  Radio,
  RadioGroup,
  TextField,
  useFilter,
} from "react-aria-components";
import { Autocomplete } from "~/components/composite/autocomplete";
import { FormEvent } from "react";
import { FileUploader } from "~/components/atomic/FileUploader";
import { fetchBrewMethodsQueryOptions } from "~/utils/brewMethod";
import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "~/components/atomic/Dropdown";
import { useGrinderModels } from "~/hooks/queries/useGrinderModels";

export const Route = createFileRoute("/_authRoute/coffee/add")({
  component: AddCoffee,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(fetchBrewMethodsQueryOptions());
  },
});

function AddCoffee() {
  const { contains } = useFilter({ sensitivity: "base" });

  const { data: brewMethods } = useQuery(fetchBrewMethodsQueryOptions());
  const { grinderModels } = useGrinderModels();
  console.log("Brew Methods:", brewMethods);
  console.log("Grinder Models:", grinderModels);

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
          <span>(always shown in grams)</span>
          <Radio value="g">Grams</Radio>
          <Radio value="oz">Oz</Radio>
        </RadioGroup>
        <FileUploader />
        <Dropdown
          label="Grinder"
          options={grinderModels.map((model) => ({
            id: model.id,
            name: model.type,
          }))}
        />
        <Button type="submit">Add Coffee</Button>
      </Form>
    </div>
  );
}
