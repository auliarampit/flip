import React from 'react'
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native'

const LoadingComp = ({ modalVisible, closeModalLoading }) => {
    
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModalLoading}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ActivityIndicator size="large" color='grey' />
                        <Text style={styles.text}>Sedang Memuat Data</Text>
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
        flexDirection: 'row',
        margin: 10,
        width: '90%',
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        textAlign: 'center',
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '600',
        color: 'rgb(60, 60, 60)'
    }
});

export default LoadingComp
