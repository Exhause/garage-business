import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  Button,
  Group,
  Stack,
  Paper,
  Text,
  Modal,
  Loader,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch, IconPlus, IconTrash } from "@tabler/icons-react";
import { useBrands, useCreateBrand, useDeleteBrand } from "../api/brands-api";

export const Route = createFileRoute("/brands")({
  component: BrandsPage,
});

function BrandsPage() {
  const { data: brands, isLoading } = useBrands();
  const createBrand = useCreateBrand();
  const deleteBrand = useDeleteBrand();

  const [search, setSearch] = useState("");
  const [newBrandName, setNewBrandName] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedBrandName, setSelectedBrandName] = useState("");

  const [addOpened, { open: openAdd, close: closeAdd }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const filteredBrands = brands?.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <Center h="100%">
        <Loader color="orange" size="lg" />
      </Center>
    );
  }

  return (
    <Container size="md" py="xl">
      <Paper
        shadow="lg"
        p="xl"
        mb="lg"
        style={{
          background:
            "linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 50%, #2a2a2a 100%)",
          border: "2px solid #ff6b00",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 107, 0, 0.03) 10px,
                rgba(255, 107, 0, 0.03) 20px
              )
            `,
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <Group justify="space-between" align="center" mb="md">
            <Group gap="xs">
              <div
                style={{
                  width: "4px",
                  height: "32px",
                  background:
                    "linear-gradient(180deg, #ff6b00 0%, #ff8533 100%)",
                  borderRadius: "2px",
                }}
              />
              <Title
                order={1}
                c="#ff6b00"
                style={{
                  fontFamily: "Impact, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                Обслуживаемые Марки Автомобилей
              </Title>
            </Group>
          </Group>

          <Group>
            <TextInput
              placeholder="Введите название марки"
              leftSection={<IconSearch size={16} color="#ff6b00" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1 }}
              styles={{
                input: {
                  background: "rgba(255, 107, 0, 0.05)",
                  border: "1px solid #ff6b0040",
                  color: "#e0e0e0",
                  fontFamily: "monospace",
                  "&::placeholder": { color: "#ff6b0080" },
                  "&:focus": {
                    borderColor: "#ff6b00",
                    boxShadow: "0 0 8px rgba(255, 107, 0, 0.3)",
                  },
                },
              }}
            />
            <Button
              leftSection={<IconPlus size={16} />}
              color="#ff6b00"
              onClick={openAdd}
              styles={{
                root: {
                  fontFamily: "Impact, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background:
                    "linear-gradient(180deg, #ff6b00 0%, #cc5500 100%)",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(255, 107, 0, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, #ff8533 0%, #ff6b00 100%)",
                    boxShadow: "0 4px 12px rgba(255, 107, 0, 0.5)",
                  },
                },
              }}
            >
              Добавить марку
            </Button>
          </Group>
        </div>
      </Paper>

      <Stack gap="sm">
        {filteredBrands?.length === 0 && (
          <Paper
            p="xl"
            bg="#2a2a2a"
            style={{
              border: "2px dashed #ff6b0040",
              borderRadius: "4px",
            }}
          >
            <Text ta="center" c="#ff6b0080" style={{ fontFamily: "monospace" }}>
              Марки не найдены
            </Text>
          </Paper>
        )}
        {filteredBrands?.map((brand) => (
          <Paper
            key={brand.id}
            p="md"
            bg="#2a2a2a"
            style={{
              border: "1px solid #ff6b0040",
              borderLeft: "4px solid #ff6b00",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#333333";
              e.currentTarget.style.borderLeftColor = "#ff8533";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2a2a2a";
              e.currentTarget.style.borderLeftColor = "#ff6b00";
            }}
          >
            <Group justify="space-between">
              <Group gap="md">
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    background:
                      "linear-gradient(135deg, #ff6b00 0%, #ff8533 100%)",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 10px rgba(255, 107, 0, 0.3)",
                  }}
                >
                  <Text
                    fw={700}
                    size="xs"
                    c="white"
                    style={{ fontFamily: "monospace" }}
                  >
                    {brand.name.charAt(0)}
                  </Text>
                </div>
                <Text
                  fw={500}
                  size="lg"
                  c="#e0e0e0"
                  style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}
                >
                  Марка {brand.name}
                </Text>
              </Group>
              <Button
                variant="subtle"
                color="red"
                size="xs"
                leftSection={<IconTrash size={14} />}
                onClick={() => {
                  setSelectedBrandId(brand.id);
                  setSelectedBrandName(brand.name);
                  openDelete();
                }}
                styles={{
                  root: {
                    fontFamily: "monospace",
                    "&:hover": {
                      background: "rgba(255, 0, 0, 0.15)",
                    },
                  },
                }}
              >
                Удалить
              </Button>
            </Group>
          </Paper>
        ))}
      </Stack>

      <Modal
        opened={addOpened}
        onClose={closeAdd}
        title="Добавление марки"
        centered
        styles={{
          header: {
            background: "#2a2a2a",
            borderBottom: "2px solid #ff6b00",
          },
          body: { background: "#1a1a1a" },
          title: {
            color: "#ff6b00",
            fontFamily: "Impact, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
        }}
      >
        <Stack gap="md">
          <TextInput
            label="Название марки"
            placeholder="Lamborghini"
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
            required
            styles={{
              label: { color: "#e0e0e0", fontFamily: "monospace" },
              input: {
                background: "#2a2a2a",
                border: "1px solid #ff6b0040",
                color: "#e0e0e0",
                fontFamily: "monospace",
                "&:focus": {
                  borderColor: "#ff6b00",
                  boxShadow: "0 0 8px rgba(255, 107, 0, 0.3)",
                },
              },
            }}
          />
          <Group justify="flex-end">
            <Button
              variant="subtle"
              color="gray"
              onClick={closeAdd}
              styles={{ label: { fontFamily: "monospace" } }}
            >
              Отмена
            </Button>
            <Button
              color="#ff6b00"
              onClick={() => {
                createBrand.mutate(
                  { name: newBrandName },
                  {
                    onSuccess: () => {
                      closeAdd();
                      setNewBrandName("");
                    },
                  },
                );
              }}
              loading={createBrand.isPending}
              disabled={!newBrandName.trim()}
              styles={{
                root: {
                  fontFamily: "Impact, sans-serif",
                  textTransform: "uppercase",
                  background:
                    "linear-gradient(180deg, #ff6b00 0%, #cc5500 100%)",
                  border: "none",
                },
              }}
            >
              Добавить
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={deleteOpened}
        onClose={closeDelete}
        title="Удаление марки"
        centered
        styles={{
          header: {
            background: "#2a0000",
            borderBottom: "2px solid #dc3545",
          },
          body: { background: "#1a0000" },
          title: {
            color: "#dc3545",
            fontFamily: "Impact, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
        }}
      >
        <Stack gap="md">
          <Text c="#dc3545" fw={500} style={{ fontFamily: "monospace" }}>
            Подтвердите действие. Удаление марки {selectedBrandName}
          </Text>
          <Group justify="flex-end">
            <Button
              variant="subtle"
              color="gray"
              onClick={closeDelete}
              styles={{ label: { fontFamily: "monospace" } }}
            >
              Отмена
            </Button>
            <Button
              color="red"
              onClick={() => {
                deleteBrand.mutate(selectedBrandId!, {
                  onSuccess: closeDelete,
                });
              }}
              loading={deleteBrand.isPending}
              styles={{
                root: {
                  fontFamily: "Impact, sans-serif",
                  textTransform: "uppercase",
                },
              }}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
