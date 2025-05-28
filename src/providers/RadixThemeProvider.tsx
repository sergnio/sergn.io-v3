import { Theme } from "@radix-ui/themes";
import { useState, useEffect } from "react";

export const RadixThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent SSR from rendering anything inside the Theme
  if (!isMounted) return null;

  return <Theme>{children}</Theme>;
};
