import { memo } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

function CourseSubmitBar({ onCancel, onSubmit, loading, disabled }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        marginTop: 16,
      }}
    >
      <Button onPress={onCancel} disabled={loading} textColor="#000" style={{backgroundColor: "#fec1c1"}}>
        Cancel
      </Button>
      <Button
        mode="contained"
        onPress={onSubmit}
        loading={loading}
        disabled={loading || disabled}
      >
        Save
      </Button>
    </View>
  );
}
export default memo(CourseSubmitBar);
