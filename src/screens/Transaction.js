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
import LoadingComp from '../components/Loading'
import ModalComp from '../components/Modal'
import config from '../configs'
import CurrencyFormat from '../helpers/CurrencyFormat'
import CustomDateTime from '../helpers/CustomDateTime'

const Transaction = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [filteredData, setFilteredData] = useState(data);
    const [id, setId] = useState(1)

    useEffect(() => {
        getData()

    }, [])

    const getData = () => {
        return fetch(config.urlBackend)
            .then((response) => response.json())
            .then((json) => {
                setData(Object.values(json))
                setFilteredData(Object.values(json))
                setId(1)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error);
            });

    };

    const SetSorting = (item) => {
        setId(item)
        closeModal()
        getData()
    }

    const SetSortingAtoZ = (item) => {
        data.sort((a, b) => {
            let start = a.beneficiary_name.toUpperCase();
            let end = b.beneficiary_name.toUpperCase();
            return (start < end) ? -1 : (start > end) ? 1 : 0;
        });
        setFilteredData(data)
        setId(item)
        closeModal()
    }

    const SetSortingZtoA = (item) => {
        data.sort((a, b) => {
            let start = a.beneficiary_name.toUpperCase();
            let end = b.beneficiary_name.toUpperCase();
            return (start > end) ? -1 : (start < end) ? 1 : 0;
        });
        setFilteredData(data)
        setId(item)
        closeModal()
    }

    const SetSortingNewDate = (item) => {
        data.sort((a, b) => {
            let start = a.completed_at.toUpperCase();
            let end = b.completed_at.toUpperCase();
            return (start < end) ? -1 : (start > end) ? 1 : 0;
        });
        setFilteredData(data)
        setId(item)
        closeModal()
    }

    const SetSortingOldDate = (item) => {
        data.sort((a, b) => {
            let start = a.completed_at.toUpperCase();
            let end = b.completed_at.toUpperCase();
            return (start > end) ? -1 : (start < end) ? 1 : 0;
        });
        setFilteredData(data)
        setId(item)
        closeModal()
    }

    function _searchFilterFunction(searchText, data) {
        let newData = [];
        if (searchText) {
            newData = data.filter(function (item) {
                const itemData = item.beneficiary_name.toUpperCase()
                const itemData2 = item.beneficiary_bank.toUpperCase()
                const itemData3 = JSON.stringify(item.amount).toUpperCase()

                const textData = searchText.toUpperCase()

                return itemData.includes(textData) ?
                    itemData.includes(textData)
                    : itemData2.includes(textData)
                        ? itemData2.includes(textData)
                        : itemData3.includes(textData)
            })
            setFilteredData([...newData])
        } else {
            setFilteredData([...data])
        }
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const closeModalLoading = () => {
        setIsLoading(false)
    }

    const BasicPage = ({ item, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.containeRow}>
                <View style={[styles.left, { backgroundColor: item.status === 'SUCCESS' ? 'green' : 'orangered' }]} />

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
                                {CustomDateTime(data)}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.status, {
                        backgroundColor: item.status === 'SUCCESS' && 'green',
                        borderColor: item.status === 'SUCCESS' ? 'green' : 'orangered'
                    }]}>
                        <Text style={[styles.textStatus, { color: item.status === 'SUCCESS' && 'white' }]}>
                            {item.status === 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
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
                id={id}
                AtoZ={(item) => SetSortingAtoZ(item)}
                ZtoA={(item) => SetSortingZtoA(item)}
                newDate={(item) => SetSortingNewDate(item)}
                oldDate={(item) => SetSortingOldDate(item)}
                sort={(item) => SetSorting(item)}
            />

            <View style={styles.containerHeader}>
                <Image source={search} style={styles.search} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Cari nama, bank, atau nominal'
                    onChangeText={(value) => {
                        _searchFilterFunction(value, data);
                    }
                    }

                />
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Text onPress={() => setModalVisible(true)} style={{ color: 'red' }}>URUTKAN</Text>
                    <Image source={arrowDown} style={styles.arrowDown} />
                </TouchableOpacity>
            </View>

            <View style={{ height: '100%', paddingBottom: 60 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={filteredData}
                    renderItem={({ item, index }) => (
                        <BasicPage
                            item={item}
                            onPress={() => navigation.navigate('Detail', item)}
                        />
                    )}
                />
            </View>
            <LoadingComp
                modalVisible={isLoading}
                closeModal={closeModalLoading}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
        borderWidth: 1,
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
