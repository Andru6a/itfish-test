"use client";
import { getQueryClient } from "./get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";

const NextQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default NextQueryProvider;
