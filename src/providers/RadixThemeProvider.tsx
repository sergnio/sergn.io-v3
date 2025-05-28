import { Theme } from "@radix-ui/themes";
import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
  isRoot?: boolean;
}
export const RadixThemeProvider = ({
  children,
  isRoot = true,
}: PropsWithChildren<Props>) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent SSR from rendering anything inside the Theme
  if (!isMounted) return null;

  return (
    <Theme
      style={{
        minHeight: isRoot ? "initial" : "100vh",
      }}
    >
      {children}
    </Theme>
  );
};
