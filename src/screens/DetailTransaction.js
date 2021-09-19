import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Clipboard, ToastAndroid } from 'react-native'
import arrow from '../assets/icons/arrow.png'
import copy from '../assets/icons/salin.jpeg'
import CurrencyFormat from '../helpers/CurrencyFormat'
import CustomDateTime from '../helpers/CustomDateTime'

const DetailTransaction = ({ route }) => {
    const { params } = route

    const [show, setShow] = useState(true)

    const showToastWithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            "ID Transaksi Disalin",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };


    const copyAction = () => {
        Clipboard.setString(params.id.toUpperCase())
        showToastWithGravityAndOffset()
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>ID TRANSAKSI: </Text>
                <Text style={styles.title}>#{params.id.toUpperCase()}  </Text>
                <TouchableOpacity onPress={copyAction}>
                    <Image style={{ height: 20, width: 25, marginTop: 4 }} source={copy} />
                </TouchableOpacity>
            </View>

            <View style={styles.rowDetail}>
                <Text style={styles.title}>DETAIL TRANSAKSI: </Text>
                <Text onPress={() => setShow(!show)} style={styles.textDetail}>{show ? 'Tutup' : 'Lihat'}</Text>
            </View>

            {
                show &&
                <View style={styles.containerDetail}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title}>{params.sender_bank.toUpperCase()}</Text>
                        <Image source={arrow} style={styles.img} />
                        <Text style={styles.title}>{params.beneficiary_bank.toUpperCase()}</Text>
                    </View>

                    <View style={styles.containerRow}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.title}>{params.beneficiary_name.toUpperCase()}</Text>
                            <Text style={styles.text}>{params.account_number}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>NOMINAL</Text>
                            <Text style={styles.text}>
                                {CurrencyFormat(params ? parseInt(params.amount) : 0, true, 'Rp')}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.containerRow, { marginTop: 20 }]}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.title}>BERITA TRANSFER</Text>
                            <Text style={styles.text}>{params.remark}</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>KODE UNIK</Text>
                            <Text style={styles.text}>{params.unique_code}</Text>
                        </View>
                    </View>

                    <View style={[styles.containerRow, { marginTop: 20 }]}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.title}>WAKTU DIBUAT</Text>
                            <Text style={styles.text}>{CustomDateTime([params])}</Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
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
        borderBottomWidth: 0.4,
        borderBottomColor: 'rgb(220, 220, 220)',
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
