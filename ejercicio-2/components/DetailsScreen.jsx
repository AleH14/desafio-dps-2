import {Text, View, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect } from 'react';

export default function DetailsScreen({route}){
    const {item} = route.params;
    const insets = useSafeAreaInsets();
    const [screenData, setScreenData] = useState(Dimensions.get('window'));
  
    useEffect(() => {
        const onChange = (result) => {
            setScreenData(result.window);
        };
        
        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription?.remove();
    }, []);

    const isLandscape = screenData.width > screenData.height;

    return(
        <SafeAreaView style={[
            styles.safeArea, 
            { 
                paddingTop: insets.top, 
                paddingBottom: insets.bottom,
                paddingLeft: isLandscape ? insets.left + 20 : insets.left,
                paddingRight: isLandscape ? insets.right + 20 : insets.right
            }
        ]}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Hero Image */}
                <View style={[styles.imageContainer, { 
                    height: isLandscape ? 200 : 250,
                    width: isLandscape ? '80%' : '90%',
                    alignSelf: 'center'
                }]}>
                    <Image source={{uri:item.foto.url}} style={styles.image}/>
                    <View style={[styles.imageOverlay, { 
                        paddingRight: isLandscape ? 60 : 20, // Más espacio en horizontal
                        paddingBottom: isLandscape ? 15 : 20 
                    }]}>
                        <View style={styles.priceTag}>
                            <Text style={styles.priceTagText}>${item.precio}</Text>
                        </View>
                    </View>
                </View>

                {/* Content */}
                <View style={[styles.contentContainer, { 
                    paddingHorizontal: isLandscape ? 80 : 20,  // Más padding en horizontal
                    marginHorizontal: isLandscape ? 20 : 0     // Margen adicional en horizontal
                }]}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <Text style={styles.titulo}>{item.nombre}</Text>
                        <View style={styles.regionContainer}>
                            <View style={styles.regionBadge}>
                                <Text style={styles.regionText}>{item.region}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Two Column Layout for Landscape */}
                    {isLandscape ? (
                        <View style={styles.twoColumnContainer}>
                            {/* Left Column */}
                            <View style={styles.leftColumn}>
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Descripción</Text>
                                    <Text style={styles.descripcion}>{item.descripcion}</Text>
                                </View>
                            </View>

                            {/* Right Column */}
                            <View style={styles.rightColumn}>
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Ingredientes</Text>
                                    <View style={styles.ingredientesContainer}>
                                        {item.ingredientes.map((ingrediente, index) => (
                                            <View key={index} style={styles.ingredienteItem}>
                                                <View style={styles.ingredienteBullet}></View>
                                                <Text style={styles.ingredienteText}>{ingrediente}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                        /* Single Column Layout for Portrait */
                        <>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Descripción</Text>
                                <Text style={styles.descripcion}>{item.descripcion}</Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Ingredientes</Text>
                                <View style={styles.ingredientesContainer}>
                                    {item.ingredientes.map((ingrediente, index) => (
                                        <View key={index} style={styles.ingredienteItem}>
                                            <View style={styles.ingredienteBullet}></View>
                                            <Text style={styles.ingredienteText}>{ingrediente}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    imageContainer: {
        position: 'relative',
        height: 250, // Tamaño medio por defecto
        width: '90%', // Ancho medio por defecto
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
    },
    priceTag: {
        backgroundColor: '#27ae60',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginRight: 0, // Asegura que no se desborde
    },
    priceTagText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },
    contentContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -20,
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 40,
        minHeight: 400,
    },
    headerSection: {
        marginBottom: 24,
    },
    titulo: {
        fontSize: 28,
        fontWeight: '800',
        color: '#2c3e50',
        marginBottom: 12,
        lineHeight: 34,
    },
    regionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    regionBadge: {
        backgroundColor: '#3498db',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    regionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    section: {
        marginBottom: 28,
    },
    twoColumnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    leftColumn: {
        flex: 1,
        paddingRight: 10,
    },
    rightColumn: {
        flex: 1,
        paddingLeft: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#ecf0f1',
    },
    descripcion: {
        fontSize: 16,
        color: '#5d6d7e',
        lineHeight: 24,
        textAlign: 'justify',
    },
    ingredientesContainer: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
    },
    ingredienteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 4,
    },
    ingredienteBullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e74c3c',
        marginRight: 12,
    },
    ingredienteText: {
        fontSize: 16,
        color: '#34495e',
        lineHeight: 22,
        flex: 1,
    },
});