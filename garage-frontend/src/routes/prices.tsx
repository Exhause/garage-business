import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  NumberInput,
  Button,
  Group,
  Stack,
  Paper,
  Text,
  Loader,
  Center,
} from "@mantine/core";
import { IconSearch, IconPercentage } from "@tabler/icons-react";
import { useOccupiedBoxesWithPrices } from "../api/boxes-api";
import { useMultiplyPrices } from "../api/box-storage-car-api";

export const Route = createFileRoute("/prices")({
  component: PricesPage,
});

function PricesPage() {
  const { data: boxes, isLoading } = useOccupiedBoxesWithPrices();
  const multiplyPrices = useMultiplyPrices();
  const [search, setSearch] = useState("");
  const [factor, setFactor] = useState<number | string>(1);

  const filteredBoxes = boxes?.filter((box) =>
    box.id.toString().includes(search),
  );

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
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          border: "2px solid #c9a96e",
        }}
      >
        <Title
          order={1}
          mb="lg"
          c="#c9a96e"
          style={{
            fontFamily: "Georgia, serif",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            letterSpacing: "0.05em",
          }}
        >
          Управление Ценами на Аренду
        </Title>

        <Group align="flex-end" gap="md">
          <TextInput
            placeholder="Введите номер бокса"
            leftSection={<IconSearch size={16} color="#c9a96e" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
            styles={{
              input: {
                background: "rgba(201, 169, 110, 0.1)",
                border: "1px solid #c9a96e",
                color: "#f5f0e8",
                "&::placeholder": { color: "#c9a96e80" },
              },
            }}
          />
          <NumberInput
            placeholder="Коэффициент"
            value={factor}
            onChange={setFactor}
            min={0.01}
            step={0.01}
            decimalScale={2}
            fixedDecimalScale
            styles={{
              input: {
                background: "rgba(201, 169, 110, 0.1)",
                border: "1px solid #c9a96e",
                color: "#f5f0e8",
                width: "180px",
              },
            }}
          />
          <Button
            leftSection={<IconPercentage size={16} />}
            color="#c9a96e"
            variant="outline"
            onClick={() => {
              if (typeof factor !== "string" && factor > 0) {
                multiplyPrices.mutate(factor);
              }
            }}
            loading={multiplyPrices.isPending}
            styles={{
              root: {
                borderColor: "#c9a96e",
                color: "#c9a96e",
                fontFamily: "Georgia, serif",
                "&:hover": {
                  background: "rgba(201, 169, 110, 0.15)",
                },
              },
            }}
          >
            Применить коэффициент
          </Button>
        </Group>
      </Paper>

      <Stack gap="sm">
        {filteredBoxes?.length === 0 && (
          <Paper
            p="xl"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              border: "1px solid #c9a96e40",
            }}
          >
            <Text
              ta="center"
              c="#c9a96e80"
              fs="italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Занятые боксы не найдены
            </Text>
          </Paper>
        )}
        {filteredBoxes?.map((box) => (
          <Paper
            key={box.id}
            p="md"
            style={{
              background:
                "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",
              border: "1px solid #c9a96e40",
              borderLeft: "3px solid #c9a96e",
            }}
          >
            <Group justify="space-between">
              <Group gap="xl">
                <Text
                  fw={500}
                  size="lg"
                  c="#f5f0e8"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Бокс {box.id}
                </Text>
                <Text c="#c9a96e" style={{ fontFamily: "Georgia, serif" }}>
                  {box.pricePerDay} ₽/день
                </Text>
              </Group>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
