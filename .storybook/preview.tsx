import type { Preview } from "@storybook/react";
import "@radix-ui/themes/styles.css";
import "../src/styles/app.css";
import { Theme } from "@radix-ui/themes";

const withTheme = (Story: any) => (
  <Theme>
    <Story />
  </Theme>
);

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
