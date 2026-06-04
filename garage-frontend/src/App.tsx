import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { routeTree } from "./routeTree.gen";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/api";
import { DatesProvider } from "@mantine/dates";

const router = createRouter({
  routeTree,
});

function App() {
  return (
    <MantineProvider>
      <DatesProvider
        settings={{
          locale: "ru",
          firstDayOfWeek: 0,
          weekendDays: [0],
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;
