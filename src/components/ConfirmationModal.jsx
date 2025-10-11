import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function ConfirmationModal({
  visible,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        {title ? <Dialog.Title>{title}</Dialog.Title> : null}
        {message ? (
          <Dialog.Content>
            <Text>{message}</Text>
          </Dialog.Content>
        ) : null}
        <Dialog.Actions>
          <Button onPress={onCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            mode="contained"
            onPress={onConfirm}
            loading={loading}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
