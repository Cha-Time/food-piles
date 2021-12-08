import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'

export const OrganizationInfo = (props) => {

    const [nameModal, setNameModal] = useState(false)
    const [phoneModal, setPhoneModal] = useState(false)
    const [addressModal, setAddressModal] = useState(false)
    const [descriptionModal, setDescriptionModal] = useState(false)

    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState(null);

    function handleSubmit() {

        setUsernameModal(false)
        setEmailModal(false)
    }

    return (
        <View style={{ justifyContent: 'space-between', height: '100%' }}>
            <View style={{ flex: 1, margin: '10%' }}>
                <Text style={{ fontSize: 30 }}>Organization Info</Text>
                <View style={{ justifyContent: 'center', justifyContent: 'space-between', height: '80%', marginTop: '5%' }}>
                    <View>
                        <Text style={{ fontSize: 20 }}>Name:</Text>
                        <View style={{ borderWidth: 2, borderColor: 'grey', borderRadius: 5 }}>
                            <Text style={{ fontSize: 15, marginLeft: '1%' }}>{props.orgInfo.name}</Text>
                            <Button title='Edit Name' name='back' style={{ maxWidth: '20%' }} onPress={() => setNameModal(true)}></Button>
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20 }}>Phone:</Text>
                        <View style={{ borderWidth: 2, borderColor: 'grey', borderRadius: 5 }}>
                            <Text style={{ fontSize: 15, marginLeft: '1%' }}>{props.orgInfo.phoneNumber}</Text>
                            <Button title='Edit Phone' name='back' style={{}} onPress={() => setPhoneModal(true)}></Button>
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20 }}>Address:</Text>
                        <View style={{ borderWidth: 2, borderColor: 'grey', borderRadius: 5 }}>
                            <Text style={{ fontSize: 15, marginLeft: '1%' }}>{props.orgInfo.address}</Text>
                            <Button title='Edit Address' name='back' style={{}} onPress={() => setAddressModal(true)}></Button>
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20 }}>Description:</Text>
                        <View style={{ borderWidth: 2, borderColor: 'grey', borderRadius: 5 }}>
                            <Text numberOfLines={1} style={{ fontSize: 15, marginLeft: '1%' }}>{props.orgInfo.description}</Text>
                            <Button title='Edit Description' name='back' style={{}} onPress={() => setDescriptionModal(true)}></Button>
                        </View>
                    </View>
                </View>
            </View>
            <Button title='< Back' name='back' style={{ minWidth: '100%' }} onPress={() => props.handleChangePage('hub')}></Button>

            <Modal
                animationType='fade'
                transparent={false}
                visible={nameModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Name</Text>
                        <View style={{ width: '75%', }}>
                            <Text style={{ fontSize: 15 }}>Enter new name:</Text>
                            <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                <TextInput placeholder={props.orgInfo.name} value={name} onChangeText={setName} style={[styles.textInput, { textAlign: 'center' }]} />
                                <Button title='Save Changes' onPress={() => handleSubmit(name)} />
                            </View>
                        </View>
                        <Button title='Cancel' onPress={() => setNameModal(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType='fade'
                transparent={false}
                visible={phoneModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Phone</Text>
                        <View style={{ width: '75%', }}>
                            <Text style={{ fontSize: 15 }}>Enter new Phone:</Text>
                            <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                <TextInput placeholder={props.orgInfo.phoneNumber} value={phone} onChangeText={setPhone} style={[styles.textInput, { textAlign: 'center' }]} />
                                <Button title='Save Changes' onPress={() => handleSubmit(phone)} />
                            </View>
                        </View>
                        <Button title='Cancel' onPress={() => setPhoneModal(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType='fade'
                transparent={false}
                visible={addressModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Address</Text>
                        <View style={{ width: '75%', height: '30%', justifyContent: 'space-between'}}>
                            <View >
                                <Text style={{ fontSize: 15 }}>Enter new Address:</Text>
                                <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                    <TextInput placeholder={props.orgInfo.address} value={address} onChangeText={setAddress} style={[styles.textInput, { textAlign: 'center' }]} />
                                    <Button title='Save Changes' onPress={() => handleSubmit(address)} />
                                </View>
                            </View>
                        </View>
                        <Button title='Cancel' onPress={() => setAddressModal(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType='fade'
                transparent={false}
                visible={descriptionModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Address</Text>
                        <View style={{ width: '75%', height: '30%', justifyContent: 'space-between'}}>
                            <View >
                                <Text style={{ fontSize: 15 }}>Enter new Description:</Text>
                                <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                    <TextInput placeholder={props.orgInfo.description} value={address} onChangeText={setDescription} style={[styles.textInput, { textAlign: 'center' }]} />
                                    <Button title='Save Changes' onPress={() => handleSubmit(address)} />
                                </View>
                            </View>
                        </View>
                        <Button title='Cancel' onPress={() => setDescriptionModal(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        padding: 20,
        justifyContent: 'space-between'
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    },
    textInput: {
        backgroundColor: 'whitesmoke',
        color: 'black',

        // borderWidth: 3,
        // borderColor: 'grey',
        // borderRadius: 5
    }
})

export default OrganizationInfo