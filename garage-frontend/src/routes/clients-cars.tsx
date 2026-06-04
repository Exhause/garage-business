// routes/clients-cars/index.tsx
import { createFileRoute } from "@tanstack/react-router";
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
  Text,
  Modal,
  Collapse,
  Badge,
  Select,
  Loader,
  Center,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import {
  IconSearch,
  IconPlus,
  IconChevronDown,
  IconChevronUp,
  IconCar,
  IconTrash,
  IconBuildingWarehouse,
  IconUser,
} from "@tabler/icons-react";
import {
  useClientsWithCars,
  useClientsWithCarsRentEndsByDate,
  useCreateClient,
  useDeleteClient,
} from "../api/clients-api";
import { useCreateCar, useDeleteCar } from "../api/cars-api";
import { useBrands } from "../api/brands-api";
import { useBoxesSpecializedOnCar } from "../api/boxes-api";
import { useCreateRent } from "../api/box-storage-car-api";

export const Route = createFileRoute("/clients-cars")({
  component: ClientsCarsPage,
});

function ClientsCarsPage() {
  const [searchName, setSearchName] = useState("");
  const [searchCarId, setSearchCarId] = useState("");
  const [filterByDate, setFilterByDate] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  const { data: allClients, isLoading } = useClientsWithCars();
  const { data: filteredClients } = useClientsWithCarsRentEndsByDate(
    filterDate ? filterDate.toISOString().split("T")[0] : "",
  );

  const createClient = useCreateClient();
  const deleteClient = useDeleteClient();
  const createCar = useCreateCar();
  const deleteCar = useDeleteCar();
  const createRent = useCreateRent();
  const { data: brands } = useBrands();
  const [rentCarId, setRentCarId] = useState<number | null>(null);
  const { data: compatibleBoxes } = useBoxesSpecializedOnCar(rentCarId || 0);

  const [addClientOpened, { open: openAddClient, close: closeAddClient }] =
    useDisclosure(false);
  const [
    deleteClientOpened,
    { open: openDeleteClient, close: closeDeleteClient },
  ] = useDisclosure(false);
  const [addCarOpened, { open: openAddCar, close: closeAddCar }] =
    useDisclosure(false);
  const [deleteCarOpened, { open: openDeleteCar, close: closeDeleteCar }] =
    useDisclosure(false);
  const [rentCarOpened, { open: openRentCar, close: closeRentCar }] =
    useDisclosure(false);

  const [clientForm, setClientForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    address: "",
  });

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedClientName, setSelectedClientName] = useState("");
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [expandedClients, setExpandedClients] = useState<Set<number>>(
    new Set(),
  );

  const [rentForm, setRentForm] = useState({
    boxId: "",
    receiptNumber: "",
    startDate: new Date(),
    endDate: null as Date | null,
    pricePerDay: "",
  });

  const clients = filterByDate && filterDate ? filteredClients : allClients;

  const filteredData = clients?.filter((client) => {
    const matchesName = client.fullName
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesCarId = searchCarId
      ? client.ownedCars.some((car) =>
          car.carId.toString().includes(searchCarId),
        )
      : true;
    return matchesName && matchesCarId;
  });

  const toggleClient = (clientId: number) => {
    setExpandedClients((prev) => {
      const next = new Set(prev);
      if (next.has(clientId)) {
        next.delete(clientId);
      } else {
        next.add(clientId);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <Center h="100%">
        <Loader color="gray" size="lg" />
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
            "linear-gradient(135deg, #3a3f44 0%, #4a5056 50%, #353a3f 100%)",
          border: "2px solid #6c757d",
        }}
      >
        <Title
          order={1}
          mb="lg"
          c="#ced4da"
          style={{
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Клиенты и Автомобили
        </Title>

        <Stack gap="md">
          <Group grow>
            <TextInput
              placeholder="Введите ФИО клиента"
              leftSection={<IconSearch size={16} color="#6c757d" />}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              styles={{
                input: {
                  background: "#2b2f33",
                  border: "1px solid #6c757d",
                  color: "#ced4da",
                  "&::placeholder": { color: "#6c757d" },
                },
              }}
            />
            <TextInput
              placeholder="Введите номер автомобиля"
              leftSection={<IconSearch size={16} color="#6c757d" />}
              value={searchCarId}
              onChange={(e) => setSearchCarId(e.target.value)}
              styles={{
                input: {
                  background: "#2b2f33",
                  border: "1px solid #6c757d",
                  color: "#ced4da",
                  "&::placeholder": { color: "#6c757d" },
                },
              }}
            />
          </Group>
          <Group>
            <Checkbox
              label="Фильтровать по дате окончания аренды"
              checked={filterByDate}
              onChange={(e) => setFilterByDate(e.currentTarget.checked)}
              styles={{ label: { color: "#ced4da" } }}
            />
            <DatePickerInput
              placeholder="Выберите дату"
              value={filterDate}
              onChange={(value) =>
                setFilterDate(value ? new Date(value) : new Date())
              }
              disabled={!filterByDate}
              styles={{
                input: {
                  background: "#2b2f33",
                  border: "1px solid #6c757d",
                  color: "#ced4da",
                },
              }}
            />
          </Group>
          <Button
            leftSection={<IconPlus size={16} />}
            color="#6c757d"
            onClick={openAddClient}
            styles={{
              root: {
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              },
            }}
          >
            Добавить клиента
          </Button>
        </Stack>
      </Paper>

      <Stack gap="sm">
        {filteredData?.length === 0 && (
          <Paper p="xl" bg="#353a3f" style={{ border: "1px solid #6c757d" }}>
            <Text ta="center" c="#6c757d" style={{ fontFamily: "monospace" }}>
              Клиенты не найдены
            </Text>
          </Paper>
        )}
        {filteredData?.map((client) => (
          <Paper
            key={client.id}
            p="md"
            bg="#3a3f44"
            style={{ border: "1px solid #6c757d" }}
          >
            <Stack gap="md">
              <Group justify="space-between">
                <Box>
                  <Group gap="xs">
                    <IconUser size={18} color="#6c757d" />
                    <Text
                      fw={600}
                      c="#ced4da"
                      style={{ fontFamily: "monospace" }}
                    >
                      {client.fullName}
                    </Text>
                  </Group>
                  {client.address && (
                    <Text
                      size="sm"
                      c="#6c757d"
                      mt={4}
                      style={{ fontFamily: "monospace" }}
                    >
                      {client.address}
                    </Text>
                  )}
                </Box>
                <Group gap="xs">
                  <Button
                    variant="subtle"
                    color="#6c757d"
                    size="xs"
                    rightSection={
                      expandedClients.has(client.id) ? (
                        <IconChevronUp size={14} />
                      ) : (
                        <IconChevronDown size={14} />
                      )
                    }
                    onClick={() => toggleClient(client.id)}
                    styles={{ label: { fontFamily: "monospace" } }}
                  >
                    Показать автомобили
                  </Button>
                  <Button
                    variant="subtle"
                    color="#6c757d"
                    size="xs"
                    leftSection={<IconPlus size={14} />}
                    onClick={() => {
                      setSelectedClientId(client.id);
                      openAddCar();
                    }}
                    styles={{ label: { fontFamily: "monospace" } }}
                  >
                    Добавить автомобиль
                  </Button>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    leftSection={<IconTrash size={14} />}
                    disabled={client.ownedCars.some((car) => car.occupyingBox)}
                    onClick={() => {
                      setSelectedClientId(client.id);
                      setSelectedClientName(client.fullName);
                      openDeleteClient();
                    }}
                  >
                    Удалить
                  </Button>
                </Group>
              </Group>

              <Collapse expanded={expandedClients.has(client.id)}>
                <Stack gap="xs" mt="sm">
                  {client.ownedCars.length === 0 && (
                    <Text
                      c="#6c757d"
                      size="sm"
                      style={{ fontFamily: "monospace" }}
                    >
                      Нет автомобилей
                    </Text>
                  )}
                  {client.ownedCars.map((car) => (
                    <Paper
                      key={car.carId}
                      p="sm"
                      bg="#353a3f"
                      style={{ border: "1px solid #495057" }}
                    >
                      <Group justify="space-between">
                        <Box>
                          <Group gap="xs">
                            <IconCar size={16} color="#6c757d" />
                            <Text
                              c="#ced4da"
                              style={{ fontFamily: "monospace" }}
                            >
                              Автомобиль {car.carId}
                            </Text>
                          </Group>
                          <Text
                            size="sm"
                            c="#6c757d"
                            mt={4}
                            style={{ fontFamily: "monospace" }}
                          >
                            Марка: {car.brandName}
                          </Text>
                        </Box>
                        <Group gap="xs">
                          {car.occupyingBox ? (
                            <Badge
                              color="gray"
                              size="lg"
                              style={{
                                cursor: "pointer",
                                fontFamily: "monospace",
                              }}
                              onClick={() => {
                                window.location.href = `/boxes/${car.boxId}`;
                              }}
                            >
                              Бокс {car.boxId}
                            </Badge>
                          ) : (
                            <Button
                              variant="subtle"
                              color="#6c757d"
                              size="xs"
                              leftSection={<IconBuildingWarehouse size={14} />}
                              onClick={() => {
                                setSelectedCarId(car.carId);
                                setRentCarId(car.carId);
                                openRentCar();
                              }}
                            >
                              Арендовать Бокс
                            </Button>
                          )}
                          <Button
                            variant="subtle"
                            color="red"
                            size="xs"
                            leftSection={<IconTrash size={14} />}
                            disabled={car.occupyingBox}
                            onClick={() => {
                              setSelectedCarId(car.carId);
                              openDeleteCar();
                            }}
                          >
                            Удалить
                          </Button>
                        </Group>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Collapse>
            </Stack>
          </Paper>
        ))}
      </Stack>

      <Modal
        opened={addClientOpened}
        onClose={closeAddClient}
        title="Добавление клиента"
        centered
        styles={{
          header: { background: "#3a3f44", borderBottom: "2px solid #6c757d" },
          body: { background: "#2b2f33" },
          title: { color: "#ced4da", fontFamily: "monospace" },
        }}
      >
        <Stack gap="md">
          <TextInput
            label="Имя"
            placeholder="Иван"
            value={clientForm.firstName}
            onChange={(e) =>
              setClientForm({ ...clientForm, firstName: e.target.value })
            }
            required
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
            }}
          />
          <TextInput
            label="Фамилия"
            placeholder="Иванов"
            value={clientForm.lastName}
            onChange={(e) =>
              setClientForm({ ...clientForm, lastName: e.target.value })
            }
            required
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
            }}
          />
          <TextInput
            label="Отчество"
            placeholder="Иванович"
            value={clientForm.middleName}
            onChange={(e) =>
              setClientForm({ ...clientForm, middleName: e.target.value })
            }
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
            }}
          />
          <TextInput
            label="Адрес"
            placeholder="ул. Пушкина, д. Колотушкина"
            value={clientForm.address}
            onChange={(e) =>
              setClientForm({ ...clientForm, address: e.target.value })
            }
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
            }}
          />
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeAddClient}>
              Отмена
            </Button>
            <Button
              color="#6c757d"
              onClick={() => {
                createClient.mutate(
                  {
                    firstName: clientForm.firstName,
                    lastName: clientForm.lastName,
                    middleName: clientForm.middleName || undefined,
                    address: clientForm.address || undefined,
                  },
                  {
                    onSuccess: () => {
                      closeAddClient();
                      setClientForm({
                        firstName: "",
                        lastName: "",
                        middleName: "",
                        address: "",
                      });
                    },
                  },
                );
              }}
              loading={createClient.isPending}
            >
              Добавить
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={deleteClientOpened}
        onClose={closeDeleteClient}
        title="Удаление клиента"
        centered
        styles={{
          header: { background: "#3a0000", borderBottom: "2px solid #dc3545" },
          body: { background: "#2b0000" },
          title: { color: "#dc3545", fontFamily: "monospace" },
        }}
      >
        <Stack gap="md">
          <Text c="#dc3545" fw={500}>
            Подтвердите действие. Удаление Клиента {selectedClientName}
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeDeleteClient}>
              Отмена
            </Button>
            <Button
              color="red"
              onClick={() => {
                deleteClient.mutate(selectedClientId!, {
                  onSuccess: closeDeleteClient,
                });
              }}
              loading={deleteClient.isPending}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={addCarOpened}
        onClose={closeAddCar}
        title="Добавление автомобиля"
        centered
        styles={{
          header: { background: "#3a3f44", borderBottom: "2px solid #6c757d" },
          body: { background: "#2b2f33" },
          title: { color: "#ced4da", fontFamily: "monospace" },
        }}
      >
        <Stack gap="md">
          <Select
            label="Марка автомобиля"
            placeholder="Выберите марку"
            data={
              brands?.map((b) => ({ value: b.id.toString(), label: b.name })) ||
              []
            }
            value={selectedBrandId}
            onChange={setSelectedBrandId}
            required
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
              dropdown: { background: "#3a3f44", border: "1px solid #6c757d" },
              option: { color: "#ced4da" },
            }}
          />
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeAddCar}>
              Отмена
            </Button>
            <Button
              color="#6c757d"
              onClick={() => {
                createCar.mutate(
                  {
                    brandId: parseInt(selectedBrandId!),
                    clientId: selectedClientId!,
                  },
                  {
                    onSuccess: () => {
                      closeAddCar();
                      setSelectedBrandId(null);
                    },
                  },
                );
              }}
              loading={createCar.isPending}
              disabled={!selectedBrandId}
            >
              Добавить
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={deleteCarOpened}
        onClose={closeDeleteCar}
        title="Удаление автомобиля"
        centered
        styles={{
          header: { background: "#3a0000", borderBottom: "2px solid #dc3545" },
          body: { background: "#2b0000" },
          title: { color: "#dc3545", fontFamily: "monospace" },
        }}
      >
        <Stack gap="md">
          <Text c="#dc3545" fw={500}>
            Подтвердите действие. Удаление Автомобиля {selectedCarId}
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeDeleteCar}>
              Отмена
            </Button>
            <Button
              color="red"
              onClick={() => {
                deleteCar.mutate(selectedCarId!, { onSuccess: closeDeleteCar });
              }}
              loading={deleteCar.isPending}
            >
              Удалить
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={rentCarOpened}
        onClose={closeRentCar}
        title="Аренда Бокса"
        size="lg"
        centered
        styles={{
          header: { background: "#3a3f44", borderBottom: "2px solid #6c757d" },
          body: { background: "#2b2f33" },
          title: { color: "#ced4da", fontFamily: "monospace" },
        }}
      >
        <Stack gap="md">
          <Select
            label="Бокс"
            placeholder="Выберите свободный Бокс"
            data={
              compatibleBoxes?.map((id) => ({
                value: id.toString(),
                label: `Бокс ${id}`,
              })) || []
            }
            value={rentForm.boxId}
            onChange={(value) =>
              setRentForm({ ...rentForm, boxId: value || "" })
            }
            required
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
              dropdown: { background: "#3a3f44", border: "1px solid #6c757d" },
              option: { color: "#ced4da" },
            }}
          />
          <TextInput
            label="Номер квитанции"
            placeholder="18810065240000054321"
            value={rentForm.receiptNumber}
            onChange={(e) =>
              setRentForm({ ...rentForm, receiptNumber: e.target.value })
            }
            required
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
            }}
          />
          <DatePickerInput
            label="Дата начала"
            value={rentForm.startDate}
            onChange={(date) =>
              setRentForm({
                ...rentForm,
                startDate: date ? new Date(date) : new Date(),
              })
            }
            required
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
            }}
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
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
            }}
          />
          <TextInput
            label="Цена за день"
            placeholder="100.00"
            value={rentForm.pricePerDay}
            onChange={(e) =>
              setRentForm({ ...rentForm, pricePerDay: e.target.value })
            }
            required
            styles={{
              label: { color: "#ced4da" },
              input: {
                background: "#3a3f44",
                border: "1px solid #6c757d",
                color: "#ced4da",
              },
            }}
          />
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeRentCar}>
              Отмена
            </Button>
            <Button
              color="#6c757d"
              onClick={() => {
                createRent.mutate(
                  {
                    boxId: parseInt(rentForm.boxId),
                    carId: selectedCarId!,
                    receiptNumber: rentForm.receiptNumber,
                    startDate: rentForm.startDate!.toISOString().split("T")[0],
                    endDate: rentForm.endDate!.toISOString().split("T")[0],
                    pricePerDay: rentForm.pricePerDay,
                  },
                  {
                    onSuccess: () => {
                      closeRentCar();
                      setRentForm({
                        boxId: "",
                        receiptNumber: "",
                        startDate: new Date(),
                        endDate: null,
                        pricePerDay: "",
                      });
                    },
                  },
                );
              }}
              loading={createRent.isPending}
            >
              Арендовать
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
