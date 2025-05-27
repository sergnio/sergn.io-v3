import { createFileRoute } from "@tanstack/react-router";
import { Autocomplete } from "~/components/composite/autocomplete";
import { FormEvent } from "react";
import { FileUploader } from "~/components/atomic/FileUploader";
import { fetchBrewMethodsQueryOptions } from "~/utils/brewMethod";
import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "~/components/atomic/Dropdown";
import { useGrinderModels } from "~/hooks/queries/useGrinderModels";
import { NumberInput } from "~/components/atomic/NumberInput";
import { useBagSizes } from "~/hooks/queries/useBagSizes";

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
  const { bagSizes } = useBagSizes();
  console.log("Brew Methods:", brewMethods);
  console.log("Grinder Models:", grinderModels);
  console.log("Bag Sizes:", bagSizes);

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
        <TextField name="roaster" type="text" isRequired>
          <Label>Roaster</Label>
          <Input required />
          <FieldError />
        </TextField>
        <NumberInput label={"Price ($)"} incrementDecrementButtons />
        <Autocomplete
          label={"Size of bag"}
          options={bagSizes.map((size) => ({
            id: size.id,
            name: size.g != null ? `${size.g}g` : `${size.oz}oz`,
          }))}
        />
        <RadioGroup name="unit" defaultValue="g" isRequired>
          <Label>Unit of measurement</Label>
          <span>(always shown in grams)</span>
          <Radio value="g">Grams</Radio>
          <Radio value="oz">Oz</Radio>
        </RadioGroup>
        <Dropdown
          label="Grinder"
          options={grinderModels.map((model) => ({
            id: model.id,
            name: model.type,
          }))}
        />
        <FileUploader />
        <Button type="submit">Add Coffee</Button>
      </Form>
    </div>
  );
}
