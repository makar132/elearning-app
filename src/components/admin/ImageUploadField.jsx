import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  HelperText,
  ProgressBar,
  Text,
} from "react-native-paper";
import { makeImageThumb } from "../../services/cloudinaryHelpers";
import { uploadToCloudinary } from "../../services/cloudinaryUpload";

export default function ImageUploadField({
  value, // { url, publicId } | null
  onChange, // (next) => void
  label = "Course Cover",
  folder = "courses/covers",
  error,
  touched,
}) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.9,
      aspect: [16, 9],
    });
    if (res.canceled) return;
    const uri = res.assets[0].uri;
    setUploading(true);
    setProgress(0);
    try {
      const up = await uploadToCloudinary(uri, folder, setProgress);
      const next = {
        url: up.url,
        publicId: up.publicId,
        thumb: makeImageThumb(up.publicId),
      };
      onChange(next);
    } catch (e) {
      console.warn("Image upload failed", e);
    } finally {
      setUploading(false);
    }
  };

  const clear = () => onChange(null);

  return (
    <Card style={styles.card}>
      <Card.Title title={label} style={{ marginBottom: 8  }} titleStyle={{ fontSize: 16 , color: "#555" }} />
      <Card.Content>
        {value?.url ? (
          <Image source={{ uri: value.url }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>Pick a 16:9 image</Text>
          </View>
        )}
        {uploading && (
          <View style={{ marginTop: 8 }}>
            <ProgressBar progress={progress / 100} />
            <Text style={{ marginTop: 4 }}>{progress}%</Text>
          </View>
        )}
        {touched && !!error && <HelperText type="error">{error}</HelperText>}
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={pickImage} disabled={uploading}>
          Pick Image
        </Button>
        <Button onPress={clear} disabled={!value || uploading}>
          Remove
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16 ,backgroundColor: "#f5f5f5"},
  image: { width: "100%", height: 180, borderRadius: 12 },
  placeholder: {
    height: 180,
    borderWidth: 1,
    borderColor: "#eee",
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
