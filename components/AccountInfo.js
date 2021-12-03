import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'

export const AccountInfo = (props) => {

    const [usernameModal, setUsernameModal] = useState(false)
    const [emailModal, setEmailModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function handleSubmit() {

        setUsernameModal(false)
        setEmailModal(false)
    }

    return (
        <View style={{ justifyContent: 'space-between', height: '100%' }}>
            <View style={{ flex: 1, margin: '10%' }}>
                <Text style={{ fontSize: 40 }}>Account Info</Text>
                <View style={{ justifyContent: 'center', justifyContent: 'space-between', height: '80%', marginTop: '5%' }}>
                    <View>
                        <Text style={{ fontSize: 20 }}>Username:</Text>
                        <View style={{ borderWidth: 2, borderColor: 'grey', borderRadius: 5 }}>
                            <Text style={{ fontSize: 15, marginLeft: '1%' }}>{props.user.username}</Text>
                            <Button title='Edit Username' name='back' style={{ maxWidth: '20%' }} onPress={() => setUsernameModal(true)}></Button>
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20 }}>Email:</Text>
                        <View style={{ borderWidth: 2, borderColor: 'grey', borderRadius: 5 }}>
                            <Text style={{ fontSize: 15, marginLeft: '1%' }}>{props.user.email}</Text>
                            <Button title='Edit Email' name='back' style={{}} onPress={() => setEmailModal(true)}></Button>
                        </View>
                    </View>

                    <View>
                        <Text style={{ fontSize: 20 }}>Password:</Text>
                        <View style={{ borderWidth: 2, borderColor: 'grey', borderRadius: 5 }}>
                            <Text style={{ fontSize: 15, marginLeft: '1%' }}>**********</Text>
                            <Button title='Change Password' name='back' style={{}} onPress={() => setPasswordModal(true)}></Button>
                        </View>
                    </View>
                </View>
            </View>
            <Button title='< Back' name='back' style={{ minWidth: '100%' }} onPress={() => props.handleChangePage('hub')}></Button>

            <Modal
                animationType='fade'
                transparent={false}
                visible={usernameModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Username</Text>
                        <View style={{ width: '75%', }}>
                            <Text style={{ fontSize: 15 }}>Enter new Username:</Text>
                            <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                <TextInput placeholder={props.user.username} value={username} onChangeText={setUsername} style={[styles.textInput, { textAlign: 'center' }]} />
                                <Button title='Save Changes' onPress={() => handleSubmit(username)} />
                            </View>
                        </View>
                        <Button title='Cancel' onPress={() => setUsernameModal(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType='fade'
                transparent={false}
                visible={emailModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Email</Text>
                        <View style={{ width: '75%', }}>
                            <Text style={{ fontSize: 15 }}>Enter new Email:</Text>
                            <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                <TextInput placeholder={props.user.email} value={email} onChangeText={setEmail} style={[styles.textInput, { textAlign: 'center' }]} />
                                <Button title='Save Changes' onPress={() => handleSubmit(email)} />
                            </View>
                        </View>
                        <Button title='Cancel' onPress={() => setEmailModal(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType='fade'
                transparent={false}
                visible={passwordModal}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 30 }}>Edit Password</Text>
                        <View style={{ width: '75%', height: '30%', justifyContent: 'space-between'}}>
                            <View >
                                <Text style={{ fontSize: 15 }}>Enter current Password:</Text>
                                <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                    <TextInput placeholder='**********' value={password} onChangeText={setPassword} style={[styles.textInput, { textAlign: 'center' }]} />
                                </View>
                            </View>
                            <View >
                                <Text style={{ fontSize: 15 }}>Enter new Password:</Text>
                                <View style={{ borderWidth: 5, borderColor: 'grey', borderRadius: 5 }}>
                                    <TextInput placeholder='**********' value={password} onChangeText={setPassword} style={[styles.textInput, { textAlign: 'center' }]} />
                                </View>
                            </View>
                            <Button title='Submit' onPress={() => handleSubmit(password)} />
                        </View>
                        <Button title='Cancel' onPress={() => setPasswordModal(false)} />
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

export default AccountInfo