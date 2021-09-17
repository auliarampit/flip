import React, { useState } from 'react'
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native'
import radioButton from '../assets/icons/radioButton1.jpeg'
import radioButton2 from '../assets/icons/radioButton2.jpeg'

const ModalComp = ({ modalVisible, closeModal }) => {
    const [id, setId] = useState(1)

    const action = (item) => {
        setId(item)
        closeModal()
    }

    const data = [
        {
            id: 1,
            name: 'URUTKAN',
        },
        {
            id: 2,
            name: 'Nama A-Z',
        },
        {
            id: 3,
            name: 'Nama Z-A',
        },
        {
            id: 4,
            name: 'Tanggal Terbaru',
        },
        {
            id: 5,
            name: 'Tanggal Terlama',
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
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={() => action(item.id)}>
                                            <Image
                                                style={styles.img}
                                                source={item.id === id ? radioButton : radioButton2}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.modalText}>{item.name}</Text>
                                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalView: {
        margin: 10,
        width: '90%',
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "flex-start",
        //   shadowColor: "#000",
        //   shadowOffset: {
        //     width: 0,
        //     height: 2
        //   },
        //   shadowOpacity: 0.25,
        //   shadowRadius: 4,
        //   elevation: 5
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
