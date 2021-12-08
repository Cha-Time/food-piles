import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useDispatch } from "react-redux";
import { updateOrganization } from '../store/SingleOrg';

export const OrganizationInfo = (props) => {

    const [foodModal, setFoodModal] = useState(false)
    const [allergensModal, setAllergensModal] = useState(false)

    const [food, setFood] = useState(null);
    const [allergens, setAllergens] = useState(null);

    const dispatch = useDispatch()

    async function handleSubmit(name, value) {
        if (value !== null) {
            const org = {}
            org[name] = value
            await dispatch(updateOrganization(org))

            setFoodModal(false)
            setAllergensModal(false)
        }
    }

    function closeModal() {
        setFood(null)
        setAllergens(null)

        setFoodModal(false)
        setAllergensModal(false)
    }

    return (
        <View style={{ justifyContent: 'space-between', height: '100%' }}>
            <View style={{ flex: 1, margin: '10%' }}>
                <Text style={{ fontSize: 30 }}>Status Details</Text>
                <View style={{ justifyContent: 'center', justifyContent: 'space-between', height: '80%', marginTop: '5%' }}>
                    <View>
                        <Text style={{ fontSize: 20 }}>What are you giving away?</Text>
                        <View style={{ flexDirection: 'column', borderWidth: 2, borderColor: 'grey', borderRadius: 5, justifyContent: 'flex-end', height: '60%' }}>
                            <Text style={{ fontSize: 15, marginLeft: '1%' }}>{props.orgInfo.availableFood}</Text>
                            <Button title='Edit Text' name='back' style={{ maxWidth: '20%' }} onPress={() => setFoodModal(true)}></Button>
                        </View>
                    </View>

                    <View >
                        <Text style={{ fontSize: 20 }}>Any allergen concerns?</Text>
                        <View style={{ flexDirection: 'column', borderWidth: 2, borderColor: 'grey', borderRadius: 5, justifyContent: 'flex-end', height: '50%' }}>
                            <Text style={{ fontSize: 15, marginLeft: '1%' }}>{props.orgInfo.allergens}</Text>
                            <Button title='Edit Text' name='back' style={{}} onPress={() => setAllergensModal(true)}></Button>
                        </View>
                        
                    </View>
                </View>
            </View>
            <Button title='< Back' name='back' style={{ minWidth: '100%' }} onPress={() => props.handleChangePage('hub')}></Button>

            <Modal
                animationType='fade'
                transparent={false}
                visible={foodModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Available Food</Text>
                        <View style={{ width: '75%', }}>
                            <Text style={{ fontSize: 15 }}>Enter new text:</Text>
                            <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                <TextInput placeholder={props.orgInfo.availableFood} value={food} onChangeText={setFood} style={[styles.textInput, { textAlign: 'center' }]} />
                                <Button title='Save Changes' onPress={() => handleSubmit('availableFood', food)} />
                            </View>
                        </View>
                        <Button title='Cancel' onPress={() => closeModal()} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType='fade'
                transparent={false}
                visible={allergensModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Phone</Text>
                        <View style={{ width: '75%', }}>
                            <Text style={{ fontSize: 15 }}>Enter new Phone:</Text>
                            <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                <TextInput placeholder={props.orgInfo.allergens} value={allergens} onChangeText={setAllergens} style={[styles.textInput, { textAlign: 'center' }]} />
                                <Button title='Save Changes' onPress={() => handleSubmit('allergens', allergens)} />
                            </View>
                        </View>
                        <Button title='Cancel' onPress={() => closeModal()} />
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