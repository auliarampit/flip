import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import arrow from '../assets/icons/arrow.png'
import copy from '../assets/icons/salin.jpeg'

const DetailTransaction = () => {

    const copyAction = (data) => {
        // return navigator.clipboard.writeText('apam')
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>ID TRANSAKSI: </Text>
                <Text style={styles.title}>#FT78756  </Text>
                <TouchableOpacity onPress={() => copyAction('#FT78756')}>
                    <Image style={{ height: 20, width: 25, marginTop: 4 }} source={copy} />
                </TouchableOpacity>
            </View>

            <View style={styles.rowDetail}>
                <Text style={styles.title}>ID TRANSAKSI: </Text>
                <Text style={styles.textDetail}>Tutup</Text>
            </View>

            <View style={styles.containerDetail}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.title}>{'Permata'}</Text>
                    <Image source={arrow} style={styles.img} />
                    <Text style={styles.title}>{'BNI'}</Text>
                </View>

                <View style={styles.containerRow}>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.title}>Name</Text>
                        <Text style={styles.text}>90283927183</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>NOMINAL</Text>
                        <Text style={styles.text}>10.000</Text>
                    </View>
                </View>

                <View style={[styles.containerRow, { marginTop: 20 }]}>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.title}>BERITA TRANSFER</Text>
                        <Text style={styles.text}>Sedang testing</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>KODE UNIK</Text>
                        <Text style={styles.text}>10</Text>
                    </View>
                </View>

                <View style={[styles.containerRow, { marginTop: 20 }]}>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.title}>WAKTU DIBUAT</Text>
                        <Text style={styles.text}>8 April 2020</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 16.5,
        fontWeight: 'bold',
        marginTop: 5,
    },
    rowDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 0.4,
        borderTopColor: 'rgb(220, 220, 220)',
        padding: 20,
    },
    textDetail: {
        color: 'orangered',
        fontWeight: '600',
        fontSize: 15,
    },
    containerDetail: {
        padding: 20,
        borderTopWidth: 0.4,
        borderTopColor: 'rgb(220, 220, 220)',
    },
    img: {
        height: 7,
        width: 14,
        marginTop: 2.5,
        marginHorizontal: 4,
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgb(45, 45, 45)',
        marginTop: 5,
    }
})

export default DetailTransaction
