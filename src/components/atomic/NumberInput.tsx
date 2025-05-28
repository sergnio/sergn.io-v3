import { Button, Flex, Text } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useState } from "react";
import { camelize } from "~/utils/transformers";

interface Props {
  label: string;
  incrementDecrementButtons?: boolean;
}

export const NumberInput = ({ label, incrementDecrementButtons }: Props) => {
  const name = camelize(label);
  const [value, setValue] = useState<number>(0);

  return (
    <Form.Field name={name}>
      <div className="mb-2 flex items-baseline justify-between">
        <Form.Label asChild>
          <Text as="label" size="2" weight="medium">
            {label}
          </Text>
        </Form.Label>
        <Form.Message match="valueMissing" className="text-red-500 text-xs">
          Required
        </Form.Message>
        <Form.Message match="typeMismatch" className="text-red-500 text-xs">
          Must be a number
        </Form.Message>
      </div>

      <Form.Control asChild>
        {incrementDecrementButtons ? (
          <Flex gap="2" align="center">
            <Button
              type="button"
              variant="soft"
              onClick={() => setValue((v) => v - 1)}
            >
              –
            </Button>
            <input
              type="number"
              name={name}
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              required
              className="border px-2 py-1 rounded"
            />
            <Button
              type="button"
              variant="soft"
              onClick={() => setValue((v) => v + 1)}
            >
              +
            </Button>
          </Flex>
        ) : (
          <input
            type="number"
            name={name}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            required
            className="border px-2 py-1 rounded"
          />
        )}
      </Form.Control>
    </Form.Field>
  );
};
