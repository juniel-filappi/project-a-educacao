import { EventBus } from "@/plugins/event-bus";

export default function useToast() {
  const success = (title: string, message: string) => {
    EventBus.$emit("toast", {
      title: title,
      text: message,
      color: "success",
    });
  };

  const error = (title: string, message: string) => {
    EventBus.$emit("toast", {
      title: title,
      text: message,
      color: "error",
    });
  }

  return {
    success,
    error
  };
}
