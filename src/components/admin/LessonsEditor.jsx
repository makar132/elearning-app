import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  IconButton,
  List,
  ProgressBar,
  Switch,
  Text,
  TextInput,
} from "react-native-paper";
import { thumbFor } from "../../services/cloudinaryHelpers";
import { uploadToCloudinary } from "../../services/cloudinaryUpload";

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export default function LessonsEditor({
  value = [],
  onChange,
  label = "Lessons",
}) {
  const [uploadingIds, setUploadingIds] = useState({}); // {id: pct}

  const setProgress = (id, pct) =>
    setUploadingIds((prev) => ({ ...prev, [id]: pct }));

  const addLessonFromPicker = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["video/*", "application/pdf", "audio/*"],
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (res.canceled) return;
    const file = res.assets[0];
    const id = uid();
    // const newItem = {
    //   id,
    //   title: file.name?.replace(/\.[^.]+$/, "") || "Untitled Lesson",
    //   order: value.length,
    // };
    // onChange([...value, newItem]);
    const baseTitle = file.name?.replace(/\.[^.]$/, "") || "Untitled Lesson";
    onChange((prev = []) => {
      const order = prev.length;
      const newItem = { id, title: baseTitle, order };
      return [...prev, newItem];
    });

    try {
      setProgress(id, 0);
      const up = await uploadToCloudinary(file.uri, "courses/lessons", (p) =>
        setProgress(id, p)
      );
      const ext = (up.format || "").toLowerCase();
      const type =
        up.resourceType === "video"
          ? "video"
          : ext === "pdf"
          ? "pdf"
          : up.resourceType === "image"
          ? "image"
          : up.resourceType === "raw" && ext === "mp3"
          ? "audio"
          : "file";
      const patch = {
        publicId: up.publicId,
        url: up.url,
        type,
        format: up.format,
        bytes: up.bytes,
        duration: up.duration,
        width: up.width,
        height: up.height,
        thumbnailUrl: up.publicId
          ? thumbFor(up.resourceType, up.publicId)
          : undefined,
      };
      // onChange(value.map((v) => (v.id === id ? { ...v, ...patch } : v)));
      onChange((prev = []) =>
        prev.map((v) => (v.id === id ? { ...v, ...patch } : v))
      );
    } catch (e) {
      console.warn("Lesson upload failed", e);
      // mark row as failed? Here we simply keep the stub so title can be edited; user can delete it.
    } finally {
      setUploadingIds((prev) => {
        const n = { ...prev };
        delete n[id];
        return n;
      });
    }
  };

  // const updateItem = (id, patch) =>
  //   onChange(value.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  const updateItem = (id, patch) =>
    onChange((prev = []) =>
      prev.map((v) => (v.id === id ? { ...v, ...patch } : v))
    );
  // const removeItem = (id) =>
  //   onChange(
  //     value.filter((v) => v.id !== id).map((v, i) => ({ ...v, order: i }))
  //   );
  const removeItem = (id) =>
    onChange((prev = []) =>
      prev.filter((v) => v.id !== id).map((v, i) => ({ ...v, order: i }))
    );

  // const move = (id, dir) => {
  //   const idx = value.findIndex((v) => v.id === id);
  //   if (idx < 0) return;
  //   const j = dir === "up" ? idx - 1 : idx + 1;
  //   if (j < 0 || j >= value.length) return;
  //   const arr = [...value];
  //   const tmp = arr[idx];
  //   arr[idx] = arr[j];
  //   arr[j] = tmp;
  //   onChange(arr.map((v, i) => ({ ...v, order: i })));
  // };

  const move = (id, dir) => {
    onChange((prev = []) => {
      const arr = [...prev];
      const idx = arr.findIndex((v) => v.id === id);
      if (idx < 0) return prev;
      const j = dir === "up" ? idx - 1 : idx + 1;
      if (j < 0 || j >= arr.length) return prev;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return arr.map((v, i) => ({ ...v, order: i }));
    });
  };
  return (
    <Card style={{ marginTop: 16 }}>
      <Card.Title
        title={label}
        right={() => <Button onPress={addLessonFromPicker}>Add</Button>}
      />
      <Card.Content>
        {value.length === 0 && (
          <Text style={{ opacity: 0.7 }}>
            No lessons yet. Click Add to upload a video, PDF, or audio.
          </Text>
        )}
        <List.Section>
          {[...value]
            .sort((a, b) => a.order - b.order)
            .map((item) => (
              <List.Item
                key={item.id}
                title={() => (
                  <View style={styles.row}>
                    <TextInput
                      style={styles.title}
                      value={item.title || ""}
                      onChangeText={(t) => updateItem(item.id, { title: t })}
                      mode="outlined"
                      placeholder="Lesson title"
                    />
                    <View style={styles.rowRight}>
                      <Text style={styles.meta}>{item.type || "pending"}</Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{ marginRight: 8 }}>Preview</Text>
                        <Switch
                          value={!!item.isPreview}
                          onValueChange={(v) =>
                            updateItem(item.id, { isPreview: v })
                          }
                        />
                      </View>
                      <IconButton
                        icon="arrow-up"
                        onPress={() => move(item.id, "up")}
                        disabled={item.order === 0}
                      />
                      <IconButton
                        icon="arrow-down"
                        onPress={() => move(item.id, "down")}
                        disabled={item.order === value.length - 1}
                      />
                      <IconButton
                        icon="delete"
                        onPress={() => removeItem(item.id)}
                      />
                    </View>
                  </View>
                )}
                description={() =>
                  uploadingIds[item.id] ? (
                    <View style={{ marginTop: 8 }}>
                      <ProgressBar progress={uploadingIds[item.id] / 100} />
                      <Text style={{ marginTop: 4 }}>
                        {uploadingIds[item.id]}%
                      </Text>
                    </View>
                  ) : item.url ? (
                    <Text style={{ color: "#4caf50" }}>Uploaded</Text>
                  ) : (
                    <Text style={{ color: "#f44336" }}>Pending upload</Text>
                  )
                }
                left={(props) => <List.Icon {...props} icon={iconFor(item)} />}
              />
            ))}
        </List.Section>
      </Card.Content>
    </Card>
  );
}

const iconFor = (item) =>
  item.type === "video"
    ? "video"
    : item.type === "pdf"
    ? "file-pdf"
    : item.type === "audio"
    ? "music"
    : item.type === "image"
    ? "image"
    : "file";

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  title: { flex: 1, marginRight: 12 },
  rowRight: { flexDirection: "row", alignItems: "center" },
  meta: { marginRight: 12, opacity: 0.7 },
});
