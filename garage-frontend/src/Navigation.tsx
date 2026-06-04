import { Link, useLocation } from "@tanstack/react-router";
import { Stack, Button } from "@mantine/core";
import {
  IconBuildingWarehouse,
  IconCash,
  IconUsers,
  IconBrandVolkswagen,
  IconInfoCircle,
} from "@tabler/icons-react";

const menuItems = [
  { path: "/", label: "О программе", icon: IconInfoCircle },
  { path: "/boxes", label: "Управление Боксами", icon: IconBuildingWarehouse },
  { path: "/prices", label: "Управление Ценами", icon: IconCash },
  { path: "/clients-cars", label: "Клиенты и Автомобили", icon: IconUsers },
  {
    path: "/brands",
    label: "Обслуживаемые Марки",
    icon: IconBrandVolkswagen,
  },
];

interface NavigationProps {
  onClose: () => void;
}

export function Navigation({ onClose }: NavigationProps) {
  const location = useLocation();

  return (
    <Stack gap="xs" p="md">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            fullWidth
            variant={isActive ? "filled" : "light"}
            color={isActive ? "blue" : "gray"}
            leftSection={<item.icon size={18} />}
            justify="start"
            size="md"
            onClick={onClose}
          >
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
}
