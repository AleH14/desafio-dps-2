import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import  Card  from "../components/Card";
import platillosData from "../src/assets/data/platillos.json";


export default function Cards({navigation}) {
  const insets = useSafeAreaInsets();
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const onChange = (result) => {
      console.log('Orientation changed:', result.window); // Para debug
      setScreenData(result.window);
    };
    
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  const isLandscape = screenData.width > screenData.height;
  const numColumns = isLandscape ? 2 : 1;

  console.log('Current orientation:', isLandscape ? 'landscape' : 'portrait', 'Columns:', numColumns); // Para debug

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <FlatList
        data={platillosData.platillos}
        keyExtractor={(item) => item.id.toString()}
        key={numColumns} // Force re-render when columns change
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, { width: isLandscape ? '48%' : '100%' }]}>
            <Card item={item} navigation={navigation}/>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={isLandscape ? styles.row : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  cardContainer: {
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
});
