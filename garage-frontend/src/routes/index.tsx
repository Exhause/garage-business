import { createFileRoute } from "@tanstack/react-router";
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  Avatar,
  Stack,
  Badge,
} from "@mantine/core";
import { IconRocket, IconStar } from "@tabler/icons-react";

export const Route = createFileRoute("/")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <Container size="md" py="xl">
      <Paper
        shadow="xl"
        p="xl"
        radius="lg"
        style={{
          background: "linear-gradient(135deg, #1a1b1e 0%, #2d2f33 100%)",
          color: "white",
        }}
      >
        <Stack align="center" gap="lg">
          <IconRocket size={48} color="#228be6" />

          <Title order={1} ta="center" style={{ fontSize: "2.5rem" }}>
            Гаражный{" "}
            <Text component="span" inherit c="blue.4">
              Бизнес
            </Text>
          </Title>

          <Badge
            size="xl"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            PRO+
          </Badge>

          <Text size="lg" ta="center" c="dimmed" maw={500}>
            Платформа для управления гаражным бизнесом. Боксы, аренда, клиенты —
            всё в одном месте.
          </Text>
        </Stack>
      </Paper>

      <Title order={2} ta="center" mt="xl" mb="lg">
        Команда разработки
      </Title>

      <Group justify="center" gap="xl">
        <Paper shadow="md" p="lg" radius="md" w={220}>
          <Stack align="center" gap="sm">
            <Avatar
              src="./Metrocop_Lambda_Wars.png"
              size="xl"
              radius="xl"
              color="blue"
            />
            <Text fw={600} size="lg">
              Масляков К. Д.
            </Text>
            <Group gap="xs">
              <IconStar size={16} color="#f59f00" />
              <Text size="sm" c="dimmed">
                Full-Stack Dev
              </Text>
            </Group>
          </Stack>
        </Paper>

        <Paper shadow="md" p="lg" radius="md" w={220}>
          <Stack align="center" gap="sm">
            <Avatar src="./empirev.jpg" size="xl" radius="xl" color="cyan" />
            <Text fw={600} size="lg">
              Мусинский К. Е.
            </Text>
            <Group gap="xs">
              <IconStar size={16} color="#f59f00" />
              <Text size="sm" c="dimmed">
                Full-Stack Dev
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Group>
    </Container>
  );
}
