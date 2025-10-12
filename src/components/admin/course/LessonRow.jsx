import { memo } from "react";
import { StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  ProgressBar,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";

const iconFor = (item) =>
  item.type === "video"
    ? "video"
    : item.type === "pdf"
    ? "file"
    : item.type === "audio"
    ? "music"
    : item.type === "image"
    ? "image"
    : "file";

function LessonRow({
  item,
  progress = 0,
  onTitle,
  onTogglePreview,
  onMoveUp,
  onMoveDown,
  onDelete,
}) {
  return (
    <List.Item
      left={(props) => <List.Icon {...props} icon={iconFor(item)} />}
      title={() => (
        <View style={styles.row}>
          <TextInput
            style={styles.title}
            textColor="#000"
            value={item.title || ""}
            onChangeText={onTitle}
            mode="outlined"
            placeholder="Lesson title"
          />
          <View style={styles.rowRight}>
            <Text style={styles.meta}>{item.type || "pending"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginRight: 8 ,color: "#333"}} >Preview</Text>
              <Switch
                value={!!item.isPreview}
                onValueChange={onTogglePreview}
              />
            </View>
            <IconButton icon="arrow-up" onPress={onMoveUp} iconColor="#666" />
            <IconButton icon="arrow-down" onPress={onMoveDown} iconColor="#666" />
            <IconButton icon="delete" onPress={onDelete} iconColor="#e75757" />
          </View>
        </View>
      )}
      description={() =>
        progress > 0 && progress < 100 ? (
          <View style={{ marginTop: 8 }}>
            <ProgressBar progress={progress / 100} />
            <Text style={{ marginTop: 4 }}>{progress}%</Text>
          </View>
        ) : item.url ? (
          <Text style={{ color: "#4caf50" }}>Uploaded</Text>
        ) : (
          <Text style={{ color: "#f44336" }}>Pending upload</Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  title: { flex: 1, marginRight: 12,backgroundColor: "#E0E0E0" },
  rowRight: { flexDirection: "row", alignItems: "center" },
  meta: { marginRight: 12, opacity: 0.7 },
});

export default memo(LessonRow);
