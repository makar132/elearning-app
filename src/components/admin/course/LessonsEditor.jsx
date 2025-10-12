import React from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useLessons } from "../../../hooks/useLessons";
import LessonRow from "./LessonRow";

export default function LessonsEditor({
  value = [],
  onChange,
  label = "Lessons",
  folder = "courses/lessons",
  onUploadingChange,
}) {
  const {
    isUploading,
    sorted,
    addLessonFromPicker,
    updateItem,
    removeItem,
    move,
    progressMap,
  } = useLessons(value, onChange, folder);

  React.useEffect(() => {
    if (onUploadingChange) {
      onUploadingChange(isUploading);
    }
  }, [isUploading, onUploadingChange]);

  const renderItem = ({ item }) => (
    <LessonRow
      item={item}
      progress={progressMap[item.id]*100 ?? 0}
      onTitle={(t) => updateItem(item.id, { title: t })}
      onTogglePreview={(v) => updateItem(item.id, { isPreview: !!v })}
      onMoveUp={() => move(item.id, "up")}
      onMoveDown={() => move(item.id, "down")}
      onDelete={() => removeItem(item.id)}
    />
  );

  return (
    <Card style={{ marginTop: 16 }}>
      <Card.Title
        title={label}
        right={() => <Button onPress={addLessonFromPicker}>Add</Button>}
      />
      <Card.Content>
        {sorted.length === 0 ? (
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ opacity: 0.6 }}>
              No lessons yet. Click “Add” to upload video / PDF / audio / image.
            </Text>
          </View>
        ) : (
          <FlatList
            data={sorted}
            keyExtractor={(item) => String(item.id || item.publicId)}
            renderItem={renderItem}
            initialNumToRender={8}
            windowSize={8}
            removeClippedSubviews
          />
        )}
      </Card.Content>
    </Card>
  );
}
