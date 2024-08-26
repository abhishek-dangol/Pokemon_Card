import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';

const SettingsModal = ({ isVisible, onClose, onDurationChange, onSkipChange, onSetChange }) => {
    const [selectedDuration, setSelectedDuration] = useState(60);
    const [selectedSkips, setSelectedSkips] = useState(3);
    const [selectedSet, setSelectedSet] = useState('setOne');

    const handleSave = () => {
        onDurationChange(selectedDuration);
        onSkipChange(selectedSkips);
        onSetChange(selectedSet); 
        onClose();
    };

    return (
        <Modal
            visible={isVisible}
            animationType='slide'
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                        <MaterialIcons name="close" color="gray" size={30} />
                    </TouchableOpacity>
                    <Text style={styles.label}>Select Set:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedSet(value)}
                        items={[
                            { label: 'Set One', value: 'setOne' },
                            { label: 'Set Two', value: 'setTwo' },
                        ]}
                        style={styles.pickerSelectStyles}
                        value={selectedSet}
                    />
                    <Text style={styles.label}>Game Duration:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedDuration(value)}
                        items={[
                            { label: '10 seconds', value: 10 },
                            { label: '15 seconds', value: 15 },
                            { label: '30 seconds', value: 30 },
                            { label: '60 seconds', value: 60 },
                            { label: '90 seconds', value: 90 },
                            { label: '120 seconds', value: 120 },
                            { label: '150 seconds', value: 150 },
                            { label: '180 seconds', value: 180 },
                        ]}
                        style={styles.pickerSelectStyles}
                        value={selectedDuration}
                    />
                    <Text style={styles.label}>Number of Skips:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedSkips(value)}
                        items={[
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                        ]}
                        style={styles.pickerSelectStyles}
                        value={selectedSkips}
                    />
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SettingsModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        paddingLeft: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalCloseButton: {
        alignSelf: 'flex-end',
    },
    pickerSelectStyles: {
        inputIOS: {
            marginTop: 10,
            marginRight: 20,
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30,
            backgroundColor: '#f0f0f0',
            marginBottom: 20,
        },
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
            backgroundColor: '#f0f0f0',
            marginBottom: 20,
        },
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        marginRight: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
