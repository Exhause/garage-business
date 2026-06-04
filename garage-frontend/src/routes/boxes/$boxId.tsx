import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Button,
  Badge,
  Modal,
  TextInput,
  Select,
  Loader,
  Center,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import {
  IconTrash,
  IconPlus,
  IconX,
  IconCalendar,
  IconUser,
  IconCar,
  IconReceipt,
  IconHome,
} from "@tabler/icons-react";
import { useBoxDetail, useAvailableBrands } from "../../api/boxes-api";
import { useDeleteRent, useCreateRent } from "../../api/box-storage-car-api";
import { useDeleteBox } from "../../api/boxes-api";
import { useBrands } from "../../api/brands-api";
import { useAvailableCarsForBox } from "../../api/cars-api";
import {
  useAddSpecialization,
  useDeleteSpecialization,
} from "../../api/box-specialization-brand-api.ts";

export const Route = createFileRoute("/boxes/$boxId")({
  component: BoxDetailPage,
});

function BoxDetailPage() {
  const { boxId } = Route.useParams();
  const id = parseInt(boxId);
  const navigate = useNavigate();
  const { data: box, isLoading } = useBoxDetail(id);
  const { data: availableBrands } = useAvailableBrands(id);
  const { data: allBrands } = useBrands();
  const { data: availableCars } = useAvailableCarsForBox(id);

  const deleteRent = useDeleteRent();
  const createRent = useCreateRent();
  const deleteBox = useDeleteBox();
  const addSpecialization = useAddSpecialization();
  const deleteSpecialization = useDeleteSpecialization();

  const [deleteRentOpened, { open: openDeleteRent, close: closeDeleteRent }] =
    useDisclosure(false);
  const [createRentOpened, { open: openCreateRent, close: closeCreateRent }] =
    useDisclosure(false);
  const [deleteBoxOpened, { open: openDeleteBox, close: closeDeleteBox }] =
    useDisclosure(false);
  const [addBrandOpened, { open: openAddBrand, close: closeAddBrand }] =
    useDisclosure(false);
  const [
    deleteBrandOpened,
    { open: openDeleteBrand, close: closeDeleteBrand },
  ] = useDisclosure(false);

  const [rentForm, setRentForm] = useState({
    carId: "",
    receiptNumber: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    pricePerDay: "",
  });

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedBrandName, setSelectedBrandName] = useState("");

  if (isLoading) {
    return (
      <Center h="100%">
        <Loader color="gray" size="lg" />
      </Center>
    );
  }

  if (!box) {
    return (
      <Center h="100%">
        <Text c="dimmed">Бокс не найден</Text>
      </Center>
    );
  }

  const now = new Date();
  const endDate = box.rentInfo ? new Date(box.rentInfo.endDate) : null;
  const startDate = box.rentInfo ? new Date(box.rentInfo.startDate) : null;
  const isExpired = endDate && endDate < now;
  const isActive = startDate && box.rentInfo && !isExpired && now >= startDate;

  const carsForSelect =
    availableCars?.map((car) => ({
      value: car.id.toString(),
      label: `${car.brandName} - ${car.clientFullName}`,
    })) || [];

  const brandsForAdd =
    allBrands?.filter(
      (brand) => !availableBrands?.some((ab) => ab.id === brand.id),
    ) || [];

  return (
    <Container size="md" py="xl">
      <Paper
        shadow="md"
        p="xl"
        mb="lg"
        style={{
          background:
            "linear-gradient(135deg, #d4c5a9 0%, #c3b091 50%, #b8a37a 100%)",
          border: "2px solid #8b7355",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 115, 85, 0.1) 2px, rgba(139, 115, 85, 0.1) 4px)",
            pointerEvents: "none",
          }}
        />
        <Title order={1} mb="lg" c="#3e2723" style={{ position: "relative" }}>
          Бокс {id}
        </Title>

        {box.rentInfo ? (
          <Stack gap="md" style={{ position: "relative" }}>
            <Paper
              p="md"
              bg="rgba(255,255,255,0.3)"
              style={{ border: "1px solid #8b7355" }}
            >
              <Group gap="xs" mb="xs">
                <IconUser size={16} color="#3e2723" />
                <Text fw={500} c="#3e2723">
                  {box.rentInfo.clientFullName}
                </Text>
              </Group>
              <Group gap="xs" mb="xs">
                <IconHome size={16} color="#3e2723" />
                <Text size="sm" c="#5d4037">
                  {box.rentInfo.clientAddress}
                </Text>
              </Group>
              <Group gap="xs" mb="xs">
                <Group gap="xs">
                  <IconCar size={16} color="#3e2723" />
                  <Text size="sm" c="#3e2723">
                    Авто #{box.rentInfo.carId}
                  </Text>
                </Group>
                <Text size="sm" c="#3e2723">
                  {box.rentInfo.brandName}
                </Text>
              </Group>
              <Group gap="xs" mt="xs">
                <IconReceipt size={16} color="#3e2723" />
                <Text size="sm" c="#5d4037" style={{ fontFamily: "monospace" }}>
                  {box.rentInfo.receiptNumber}
                </Text>
              </Group>
              <Group gap="xs" mt="xs">
                <IconCalendar size={16} color="#3e2723" />
                <Text size="sm" c="#3e2723">
                  {box.rentInfo.startDate} — {box.rentInfo.endDate}
                </Text>
              </Group>
              <Group justify="space-between" mt="md">
                <Badge
                  size="lg"
                  color={isActive ? "green" : "red"}
                  variant="filled"
                >
                  {isActive
                    ? "Активна"
                    : isExpired
                      ? "Истекла"
                      : "Ожидает начала"}
                </Badge>
                <Text fw={600} c="#3e2723">
                  {box.rentInfo.pricePerDay} ₽/день
                </Text>
              </Group>
            </Paper>
            <Button
              color="red"
              leftSection={<IconX size={16} />}
              onClick={openDeleteRent}
              style={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                background: "linear-gradient(180deg, #c62828 0%, #8e0000 100%)",
              }}
            >
              Завершить аренду
            </Button>
          </Stack>
        ) : (
          <Stack gap="md" style={{ position: "relative" }}>
            <Paper
              p="md"
              bg="rgba(255,255,255,0.3)"
              style={{ border: "1px solid #8b7355" }}
            >
              <Text ta="center" c="#5d4037" fs="italic">
                Бокс свободен
              </Text>
            </Paper>
            <Button
              color="green"
              leftSection={<IconPlus size={16} />}
              onClick={openCreateRent}
              style={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                background: "linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%)",
              }}
            >
              Начать аренду
            </Button>
          </Stack>
        )}
      </Paper>

      <Paper
        shadow="md"
        p="xl"
        mb="lg"
        style={{
          background:
            "linear-gradient(135deg, #8b4513 0%, #6d3a0a 50%, #5c2d06 100%)",
          border: "3px solid #d4a574",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(212, 165, 116, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(212, 165, 116, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          }}
        />
        <Box style={{ position: "relative" }}>
          <Group justify="space-between" mb="md">
            <Title
              order={3}
              c="#d4a574"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              Обслуживаемые марки
            </Title>
            <Button
              leftSection={<IconPlus size={16} />}
              color="#d4a574"
              variant="outline"
              onClick={openAddBrand}
              style={{ borderColor: "#d4a574", color: "#d4a574" }}
            >
              Добавить марку
            </Button>
          </Group>
          <Stack gap="xs">
            {availableBrands?.map((brand) => (
              <Paper
                key={brand.id}
                p="sm"
                bg="rgba(139, 69, 19, 0.5)"
                style={{ border: "1px solid #d4a574" }}
              >
                <Group justify="space-between">
                  <Text c="#f5deb3">{brand.name}</Text>
                  <Button
                    size="xs"
                    color="red"
                    variant="subtle"
                    leftSection={<IconX size={14} />}
                    onClick={() => {
                      setSelectedBrandId(brand.id);
                      setSelectedBrandName(brand.name);
                      openDeleteBrand();
                    }}
                  >
                    Удалить
                  </Button>
                </Group>
              </Paper>
            ))}
            {(!availableBrands || availableBrands.length === 0) && (
              <Text ta="center" c="#f5deb3" fs="italic">
                Нет обслуживаемых марок
              </Text>
            )}
          </Stack>
        </Box>
      </Paper>

      <Button
        fullWidth
        size="lg"
        color="red"
        leftSection={<IconTrash size={20} />}
        disabled={!box.free}
        onClick={openDeleteBox}
        style={{
          background: box.free
            ? "linear-gradient(180deg, #d32f2f 0%, #b71c1c 100%)"
            : undefined,
          boxShadow: box.free ? "0 4px 8px rgba(183, 28, 28, 0.4)" : undefined,
          textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
        }}
      >
        Удалить Бокс
      </Button>

      <Modal
        opened={deleteRentOpened}
        onClose={closeDeleteRent}
        title="Завершение аренды"
        centered
        styles={{
          header: { background: "#f5f0e8", borderBottom: "2px solid #8b7355" },
          body: { background: "#faf7f2" },
        }}
      >
        <Stack gap="md">
          <Text c="#3e2723">
            Подтвердите действие. Завершение аренды Бокса {id}
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeDeleteRent}>
              Отмена
            </Button>
            <Button
              color="red"
              onClick={() => {
                deleteRent.mutate(
                  { boxId: id, carId: box.rentInfo!.carId },
                  { onSuccess: closeDeleteRent },
                );
              }}
              loading={deleteRent.isPending}
            >
              Подтвердить
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={createRentOpened}
        onClose={closeCreateRent}
        title={`Начало аренды Бокса ${id}`}
        size="lg"
        centered
        styles={{
          header: { background: "#f5f0e8", borderBottom: "2px solid #8b7355" },
          body: { background: "#faf7f2" },
        }}
      >
        <Stack gap="md">
          <Select
            label="Автомобиль"
            placeholder="Выберите автомобиль"
            data={carsForSelect}
            value={rentForm.carId}
            onChange={(value) =>
              setRentForm({ ...rentForm, carId: value || "" })
            }
            required
          />
          <TextInput
            label="Номер квитанции"
            placeholder="18810065240000054321"
            value={rentForm.receiptNumber}
            onChange={(e) =>
              setRentForm({ ...rentForm, receiptNumber: e.target.value })
            }
            required
          />
          <DatePickerInput
            label="Дата начала"
            placeholder="Выберите дату"
            value={rentForm.startDate}
            onChange={(date) =>
              setRentForm({
                ...rentForm,
                startDate: date ? new Date(date) : new Date(),
              })
            }
            required
          />
          <DatePickerInput
            label="Дата окончания"
            placeholder="Выберите дату"
            value={rentForm.endDate}
            onChange={(date) =>
              setRentForm({
                ...rentForm,
                endDate: date ? new Date(date) : new Date(),
              })
            }
            required
          />
          <TextInput
            label="Цена за день"
            placeholder="100.00"
            value={rentForm.pricePerDay}
            onChange={(e) =>
              setRentForm({ ...rentForm, pricePerDay: e.target.value })
            }
            required
          />
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeCreateRent}>
              Отмена
            </Button>
            <Button
              color="green"
              onClick={() => {
                if (
                  rentForm.startDate &&
                  rentForm.endDate &&
                  rentForm.startDate <= rentForm.endDate
                ) {
                  createRent.mutate(
                    {
                      boxId: id,
                      carId: parseInt(rentForm.carId),
                      receiptNumber: rentForm.receiptNumber,
                      startDate: rentForm
                        .startDate!.toISOString()
                        .split("T")[0],
                      endDate: rentForm.endDate!.toISOString().split("T")[0],
                      pricePerDay: rentForm.pricePerDay,
                    },
                    {
                      onSuccess: () => {
                        closeCreateRent();
                        setRentForm({
                          carId: "",
                          receiptNumber: "",
                          startDate: null,
                          endDate: null,
                          pricePerDay: "",
                        });
                      },
                    },
                  );
                }
              }}
              loading={createRent.isPending}
            >
              Начать аренду
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={deleteBoxOpened}
        onClose={closeDeleteBox}
        title="Удаление Бокса"
        centered
        styles={{
          header: { background: "#fff0f0", borderBottom: "2px solid #c62828" },
          body: { background: "#fff5f5" },
        }}
      >
        <Stack gap="md">
          <Text c="#c62828" fw={500}>
            Подтвердите действие. Удаление Бокса {id}
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeDeleteBox}>
              Отмена
            </Button>
            <Button
              color="red"
              onClick={() => {
                deleteBox.mutate(id, {
                  onSuccess: () => {
                    closeDeleteBox();
                    navigate({ to: "/boxes" });
                  },
                });
              }}
              loading={deleteBox.isPending}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={addBrandOpened}
        onClose={closeAddBrand}
        title={`Добавление марки для Бокса ${id}`}
        centered
        styles={{
          header: { background: "#f5f0e8", borderBottom: "2px solid #8b7355" },
          body: { background: "#faf7f2" },
        }}
      >
        <Stack gap="md">
          {brandsForAdd.length > 0 ? (
            brandsForAdd.map((brand) => (
              <Paper
                key={brand.id}
                p="sm"
                bg="gray.0"
                style={{ cursor: "pointer", border: "1px solid #dee2e6" }}
                onClick={() => {
                  addSpecialization.mutate(
                    { boxId: id, brandId: brand.id },
                    { onSuccess: closeAddBrand },
                  );
                }}
              >
                <Group justify="space-between">
                  <Text>{brand.name}</Text>
                  <IconPlus size={16} color="#2e7d32" />
                </Group>
              </Paper>
            ))
          ) : (
            <Text ta="center" c="dimmed">
              Нет доступных марок для добавления
            </Text>
          )}
        </Stack>
      </Modal>

      <Modal
        opened={deleteBrandOpened}
        onClose={closeDeleteBrand}
        title="Удаление марки"
        centered
        styles={{
          header: { background: "#fff0f0", borderBottom: "2px solid #c62828" },
          body: { background: "#fff5f5" },
        }}
      >
        <Stack gap="md">
          <Text c="#c62828" fw={500}>
            Подтвердите действие. Прекращение поддержки марки{" "}
            {selectedBrandName} для Бокса {id}
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeDeleteBrand}>
              Отмена
            </Button>
            <Button
              color="red"
              onClick={() => {
                deleteSpecialization.mutate(
                  { boxId: id, brandId: selectedBrandId! },
                  { onSuccess: closeDeleteBrand },
                );
              }}
              loading={deleteSpecialization.isPending}
            >
              Подтвердить
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
