import React from 'react'
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native'
import radioButton from '../assets/icons/radioButton1.jpeg'
import radioButton2 from '../assets/icons/radioButton2.jpeg'

const ModalComp = ({ modalVisible, closeModal, AtoZ, ZtoA, newDate, oldDate, sort, id }) => {
    const data = [
        {
            id: 1,
            name: 'URUTKAN',
            onPress: sort,
        },
        {
            id: 2,
            name: 'Nama A-Z',
            onPress: AtoZ,
        },
        {
            id: 3,
            name: 'Nama Z-A',
            onPress: ZtoA,
        },
        {
            id: 4,
            name: 'Tanggal Terbaru',
            onPress: newDate,
        },
        {
            id: 5,
            name: 'Tanggal Terlama',
            onPress: oldDate,
        },
    ]
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            data.map((item) => {
                                return (
                                    <TouchableOpacity onPress={() => item.onPress(item.id)}>
                                        <View style={styles.row}>
                                            <Image
                                                style={styles.img}
                                                source={item.id === id ? radioButton : radioButton2}
                                            />
                                            <Text style={styles.modalText}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    modalView: {
        margin: 10,
        width: '90%',
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "flex-start",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 7,
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
        marginTop: -14,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ModalComp
