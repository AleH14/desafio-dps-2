import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function Card({item, navigation}){
    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => navigation.navigate('Detalles', {item})}>
            <View style={styles.imageContainer}>
                <Image source={{uri:item.foto.url}} style={styles.image}/>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.titulo} numberOfLines={2}>{item.nombre}</Text>
                <Text style={styles.descripcion} numberOfLines={3}>{item.descripcion}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.precioLabel}>Precio</Text>
                    <Text style={styles.precio}>${item.precio}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        borderRadius:16,
        margin:4,
        marginHorizontal:8,
        shadowColor:'#000',
        shadowOffset:{width:0, height:4},
        shadowOpacity:0.15,
        shadowRadius:8,
        elevation:8,
        overflow:'hidden',
        borderColor:'#f0f0f0',
        borderWidth:1,
        flex:1, // Permite que la card se adapte al espacio disponible
    },
    imageContainer:{
        position:'relative',
        height:200,
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    contentContainer:{
        padding:16,
    },
    titulo:{
        fontSize:20,
        fontWeight:'700',
        color:'#2c3e50',
        marginBottom:8,
        lineHeight:24,
    },
    descripcion:{
        fontSize:14,
        color:'#7f8c8d',
        lineHeight:20,
        marginBottom:16,
    },
    priceContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:12,
        borderTopWidth:1,
        borderTopColor:'#ecf0f1',
    },
    precioLabel:{
        fontSize:14,
        color:'#95a5a6',
        fontWeight:'500',
    },
    precio:{
        fontSize:22,
        color:'#27ae60',
        fontWeight:'800',
    },
});