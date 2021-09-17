import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity
} from 'react-native'
import arrow from '../assets/icons/arrow.png'
import arrowDown from '../assets/icons/arrowDown.png'
import search from '../assets/icons/search.png'
import ModalComp from '../components/Modal'
import config from '../configs'
import CurrencyFormat from '../helpers/CurrencyFormat'
import NameOfMonth from '../assets/dummy/NamOfMonth'

const Transaction = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [data, setData] = useState(null)
    const [date_time, setDate_time] = useState(null)

    useEffect(() => {
        getData()

    }, [])

    const getData = () => {
        return fetch(config.urlBackend)
            .then((response) => response.json())
            .then((json) => {
                setData(Object.values(json))
                CustomDateTime()
            })
            .catch((error) => {
                console.error(error);
            });

    };

    const CustomDateTime = () => {
        if (data) {
            let date = null
            let month = null
            let year = null

            data.map((i) => {
                return date = i.completed_at.slice(8, 10)

            })

            data.map((i) => {
                return month = i.completed_at.slice(5, 7)

            })

            data.map((i) => {
                return year = i.completed_at.slice(0, 4)

            })

            let dateTime = null

            NameOfMonth.map((i) => {
                if (i.id === month) {
                    return dateTime = date + ' ' + i.name + ' ' + year
                }
            })

            setDate_time(dateTime)
        }
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const BasicPage = ({ item, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.containeRow}>
                <View style={[styles.left, { backgroundColor: item.status ? 'green' : 'orangered' }]} />

                <View style={styles.center}>
                    <View style={styles.desc}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.title}>{item.sender_bank.toUpperCase()}</Text>
                            <Image source={arrow} style={styles.img} />
                            <Text style={styles.title}>{item.beneficiary_bank.toUpperCase()}</Text>
                        </View>

                        <Text style={styles.textName}>{item.beneficiary_name.toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.money}>
                                {CurrencyFormat(item.amount ? parseInt(item.amount) : 0, true, 'Rp')}
                            </Text>
                            <View style={styles.dot} />
                            <Text style={styles.money}>
                                {date_time ? date_time : 0}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.status, {
                        backgroundColor: item.status && 'green',
                        borderColor: item.status ? 'green' : 'orangered'
                    }]}>
                        <Text style={[styles.textStatus, { color: item.status && 'white' }]}>
                            {item.status ? 'Berhasil' : 'Pengecekan'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <ModalComp
                modalVisible={modalVisible}
                closeModal={closeModal}
            />

            <View style={styles.containerHeader}>
                <Image source={search} style={styles.search} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Cari nama, bank, atau nominal'
                />
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Text onPress={() => setModalVisible(true)} style={{ color: 'red' }}>URUTKAN</Text>
                    <Image source={arrowDown} style={styles.arrowDown} />
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={data}
                renderItem={({ item, index }) => (
                    <BasicPage
                        item={item}
                        onPress={() => navigation.navigate('Detail')}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgb(251, 251, 251)',
        paddingHorizontal: 7,
        paddingVertical: 16,
        paddingBottom: 60,
    },
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: -11,
        marginBottom: 5,
    },
    search: {
        height: 17,
        width: 17,
        marginLeft: 2,
    },
    arrowDown: {
        height: 9,
        width: 15,
        marginLeft: 4,
        marginTop: 2,
    },
    textInput: {
        height: '100%',
        flex: 1,
        marginRight: 10,
        marginLeft: 5,
        fontSize: 14,
    },
    containeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 10,
    },
    left: {
        height: '100%',
        width: 6,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    center: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    desc: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,

    },
    img: {
        height: 7,
        width: 14,
        marginTop: 2.5,
        marginHorizontal: 4,
    },
    textName: {
        fontWeight: '600',
        fontSize: 15,
        marginTop: 4,
    },
    money: {
        fontSize: 13,
        marginTop: 4,
        fontWeight: '600'
    },
    status: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'orangered'
    },
    textStatus: {
        fontWeight: '600',
        fontSize: 13,
    },
    dot: {
        height: 5,
        width: 5,
        borderRadius: 5,
        backgroundColor: 'rgb(35, 35, 35)',
        marginTop: 13,
        margin: 5,
    }
})

export default Transaction
