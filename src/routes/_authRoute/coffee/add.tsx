import { createFileRoute } from "@tanstack/react-router";
import { Button, Label, Radio, RadioGroup } from "react-aria-components";
import { Autocomplete } from "~/components/composite/autocomplete";
import { FileUploader } from "~/components/atomic/FileUploader";
import { fetchBrewMethodsQueryOptions } from "~/utils/brewMethod";
import { Dropdown, DropdownValue } from "~/components/atomic/Dropdown";
import { useGrinderModelsQuery } from "~/hooks/queries/useGrinderModelsQuery";
import { NumberInput } from "~/components/atomic/NumberInput";
import { useBagSizesQuery } from "~/hooks/queries/useBagSizesQuery";
import { useBrewMethodQuery } from "~/hooks/queries/useBrewMethodQuery";
import { Controller, useForm } from "react-hook-form";
import { Form } from "radix-ui";

export const Route = createFileRoute("/_authRoute/coffee/add")({
  component: AddCoffee,
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(fetchBrewMethodsQueryOptions());
  },
});

type FormValues = {
  coffeeName: string;
  roaster: string;
  unit: "g" | "oz";
  brewMethod: DropdownValue;
  grinder: DropdownValue;
  price: number;
  file: File | null;
};

function AddCoffee() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const { brewMethods } = useBrewMethodQuery();
  const { grinderModels } = useGrinderModelsQuery();
  const { bagSizes } = useBagSizesQuery();

  const onSubmit = (data: FormValues) => {
    console.log("Submitted:", data);
  };

  return (
    <Form.Root className="p-2">
      <h3>Add Coffee</h3>
      <p>Here you can add your favorite coffee.</p>

      <div className="space-y-4">
        <div>
          <Label>Coffee Name</Label>
          <input {...register("coffeeName", { required: true })} />
          {errors.coffeeName && <span className="text-red-600">Required</span>}
        </div>

        <div>
          <Label>Roaster</Label>
          <input {...register("roaster", { required: true })} />
          {errors.roaster && <span className="text-red-600">Required</span>}
        </div>

        <Controller
          name="price"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <NumberInput
              label="Price ($)"
              incrementDecrementButtons
              {...field}
            />
          )}
        />

        <Autocomplete
          label="Size of bag"
          options={bagSizes.map((size) => ({
            id: size.id,
            name: size.g != null ? `${size.g}g` : `${size.oz}oz`,
          }))}
        />

        <Controller
          name="unit"
          control={control}
          defaultValue="g"
          render={({ field }) => (
            <RadioGroup {...field}>
              <Label>Unit of measurement</Label>
              <span>(always shown in grams)</span>
              <Radio value="g">Grams</Radio>
              <Radio value="oz">Oz</Radio>
            </RadioGroup>
          )}
        />

        <Controller
          name="brewMethod"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="Brew Method"
              options={brewMethods.map((method) => ({
                id: method.id,
                name: method.name,
              }))}
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
              }}
            />
          )}
        />

        <Controller
          name="grinder"
          control={control}
          render={({ field }) => (
            <Dropdown
              label="Grinder"
              options={grinderModels.map((model) => ({
                id: model.id,
                name: model.type,
              }))}
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
              }}
            />
          )}
        />

        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <FileUploader
              file={field.value}
              onChange={(val) => {
                field.onChange(val);
              }}
            />
          )}
        />

        <Button onClick={handleSubmit(onSubmit)}>Add Coffee</Button>
      </div>
    </Form.Root>
  );
}
