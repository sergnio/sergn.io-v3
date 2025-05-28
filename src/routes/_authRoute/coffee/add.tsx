import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextField,
} from "react-aria-components";
import { Autocomplete } from "~/components/composite/autocomplete";
import { FormEvent, useState } from "react";
import { FileUploader, FileValue } from "~/components/atomic/FileUploader";
import { fetchBrewMethodsQueryOptions } from "~/utils/brewMethod";
import { useQuery } from "@tanstack/react-query";
import { Dropdown, DropdownValue } from "~/components/atomic/Dropdown";
import { useGrinderModelsQuery } from "~/hooks/queries/useGrinderModelsQuery";
import { NumberInput } from "~/components/atomic/NumberInput";
import { useBagSizesQuery } from "~/hooks/queries/useBagSizesQuery";
import { useBrewMethodQuery } from "~/hooks/queries/useBrewMethodQuery";

export const Route = createFileRoute("/_authRoute/coffee/add")({
  component: AddCoffee,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(fetchBrewMethodsQueryOptions());
  },
});

function AddCoffee() {
  const [grinder, setGrinder] = useState<DropdownValue>();
  const [brewMethod, setBrewMethod] = useState<DropdownValue>();
  const [file, setFile] = useState<FileValue>();

  const { brewMethods } = useBrewMethodQuery();
  const { grinderModels } = useGrinderModelsQuery();
  const { bagSizes } = useBagSizesQuery();

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
          label={"Brew Method"}
          options={brewMethods?.map((method) => ({
            id: method.id,
            name: method.name,
          }))}
          value={brewMethod}
          onChange={setBrewMethod}
        />
        <Dropdown
          label="Grinder"
          options={grinderModels.map((model) => ({
            id: model.id,
            name: model.type,
          }))}
          value={grinder}
          onChange={setGrinder}
        />
        <FileUploader file={file} onChange={setFile} />
        <Button type="submit">Add Coffee</Button>
      </Form>
    </div>
  );
}
