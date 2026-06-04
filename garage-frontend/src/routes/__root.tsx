import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Navigation } from "../Navigation";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding={{ base: "md", sm: "xl" }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3} c="blue.8">
            Гаражный Бизнес
          </Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navigation onClose={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
