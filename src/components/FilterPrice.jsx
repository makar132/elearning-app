import { Ionicons } from '@expo/vector-icons';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from 'react-native-paper';
import { MyCoursesStyles as styles } from '../../src/utils/myCoursesStyles';

export default function InlineExpandableFilter({ onPriceChange }) {
    const [expanded, setExpanded] = useState(false);
    const [range, setRange] = useState([0, 1000]);

    const toggleExpand = () => setExpanded(!expanded);

    const handleRangeChange = (values) => {
        setRange(values);
        if (onPriceChange) {
            onPriceChange(values);
        }
    };

    return (
        <View style={styles.priceContainer}>
            <TouchableOpacity onPress={toggleExpand} style={styles.priceButton}>
                <Ionicons name="filter" size={24} />
            </TouchableOpacity>

            {expanded && (
                <View style={styles.priceSliderContainer}>
                    <Button
                        style={styles.priceClearFilter}
                        labelStyle={{ fontSize: 13 }}
                        onPress={() => {
                            setRange([0, 1000]);
                            onPriceChange && onPriceChange([0, 1000]);
                        }}
                    >
                        Clear Filter
                    </Button>
                    <Text style={styles.priceRangeText}>
                        ${range[0]} - ${range[1]}
                    </Text>

                    <MultiSlider
                        values={range}
                        onValuesChange={handleRangeChange}
                        min={0}
                        max={1000}
                        step={10}
                        sliderLength={300}
                        selectedStyle={{ backgroundColor: "#1E40AF" }}
                        unselectedStyle={{ backgroundColor: "#ddd" }}
                        markerStyle={{
                            backgroundColor: "#1E40AF",
                            height: 20,
                            width: 20,
                        }}
                    />
                </View>
            )}
        </View>
    );
}