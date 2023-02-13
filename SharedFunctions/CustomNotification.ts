import { showNotification } from "@mantine/notifications";
import { DefaultMantineColor } from "@mantine/styles";
type TitleProp = "Success" | "Failed";
type NotificationProp = {
  title: TitleProp;
  message: string;
};
export default function customNotification(prop: NotificationProp) {
  var isSuccess: boolean = prop.title == "Success";
  var color: DefaultMantineColor = isSuccess ? "green" : "red";
  showNotification({
    title: prop.title,
    message: prop.message,
    disallowClose: true,
    autoClose: 3000,
    color: color,
    styles: (theme) => ({
      root: {
        userSelect: "none",
        backgroundColor: isSuccess
          ? theme.colors.green[6]
          : theme.colors.red[6],
        borderColor: isSuccess ? theme.colors.green[6] : theme.colors.red[6],
        "&::before": { backgroundColor: theme.white },
      },
      title: { color: theme.white },
      description: { color: theme.white },
      closeButton: {
        color: theme.white,
        "&:hover": {
          backgroundColor: isSuccess
            ? theme.colors.green[7]
            : theme.colors.red[7],
        },
      },
    }),
  });
  return;
}
