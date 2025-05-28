import type { Preview } from "@storybook/react";
import "@radix-ui/themes/styles.css";
import "../src/styles/app.css";
import { RadixThemeProvider } from "~/providers/RadixThemeProvider";

const withTheme = (Story: any) => (
  <RadixThemeProvider>
    <Story />
  </RadixThemeProvider>
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
