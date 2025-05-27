import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { Button, Theme } from "@radix-ui/themes";

export const AppTheme = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute={"class"}>
      <Theme>{children}</Theme>
    </ThemeProvider>
  );
};
