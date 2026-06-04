import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  Checkbox,
  Button,
  Group,
  Stack,
  Paper,
  Badge,
  Modal,
  Text,
  Loader,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconPlus, IconSettings } from "@tabler/icons-react";
import { useBoxes, useCreateBox, useFreeBoxes } from "../../api/boxes-api";

export const Route = createFileRoute("/boxes/")({
  component: BoxesPage,
});

function BoxesPage() {
  const navigate = useNavigate();
  const { data: boxes, isLoading } = useBoxes();
  const { data: freeBoxes } = useFreeBoxes();
  const createBox = useCreateBox();
  const [search, setSearch] = useState("");
  const [onlyFree, setOnlyFree] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const filteredBoxes = boxes?.filter((box) => {
    const matchesSearch = box.id.toString().includes(search);
    const matchesFree = onlyFree ? freeBoxes?.includes(box.id) : true;
    return matchesSearch && matchesFree;
  });

  if (isLoading) {
    return (
      <Center h="100%">
        <Loader color="gray" size="lg" />
      </Center>
    );
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="lg" c="gray.8">
        Управление Боксами
      </Title>

      <Paper shadow="xs" p="md" mb="lg" bg="gray.0">
        <Group align="center">
          <TextInput
            placeholder="Введите номер бокса"
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
            miw={180}
          />
          <Checkbox
            label="Показать только свободные"
            checked={onlyFree}
            onChange={(e) => setOnlyFree(e.currentTarget.checked)}
          />
          <Button
            leftSection={<IconPlus size={16} />}
            color="gray.7"
            onClick={open}
          >
            Добавить бокс
          </Button>
        </Group>
      </Paper>

      <Stack gap="sm">
        {filteredBoxes?.length === 0 && (
          <Text ta="center" c="dimmed" py="xl">
            Боксы не найдены
          </Text>
        )}
        {filteredBoxes?.map((box) => (
          <Paper
            key={box.id}
            shadow="xs"
            p="md"
            bg="gray.0"
            style={{
              borderLeft: `4px solid ${box.free ? "#868e96" : "#495057"}`,
            }}
          >
            <Group justify="space-between">
              <Group gap="md">
                <Text fw={600} size="lg" c="gray.8">
                  Бокс {box.id}
                </Text>
                <Badge
                  size="lg"
                  color={box.free ? "gray.5" : "gray.8"}
                  variant="light"
                >
                  {box.free ? "Свободен" : "Занят"}
                </Badge>
              </Group>
              <Button
                variant="subtle"
                color="gray.7"
                leftSection={<IconSettings size={16} />}
                onClick={() => navigate({ to: `/boxes/${box.id}` })}
              >
                Управлять
              </Button>
            </Group>
          </Paper>
        ))}
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        title="Добавление нового Бокса"
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Подтвердите действие. Добавление нового Бокса
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={close}>
              Отмена
            </Button>
            <Button
              color="gray.7"
              onClick={() => {
                createBox.mutate();
                close();
              }}
              loading={createBox.isPending}
            >
              Подтвердить
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
