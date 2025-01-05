import type { Meta, StoryObj } from "@storybook/react";

import Notification from "./Notification";

const meta = {
  component: Notification,
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Info",
    message: "This is a info notification",
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    title: "Success",
    message: "This is a success notification",
    type: "success",
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    message: "This is a waring notification",
    type: "warning",
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    title: "Error",
    message: "This is a success notification",
    type: "error",
    onClose: () => {},
  },
};
