import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

const SettingsModal = ({ isVisible, onClose, onDurationChange }) => {
    const [selectedDuration, setSelectedDuration] = useState(60);

  return (
    <Modal
        visible={isVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={onClose}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}Game Settings></Text>
                <Text style={styles.label}>Select Game Duration:</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedDuration(value)}
                    items={[
                        { label: '10 seconds', value: 10 },
                        { label: '15 seconds', value: 15},
                        { label: '30 seconds', value: 30 },
                        { label: '60 seconds', value: 60},
                        { label: '90 seconds', value: 90},
                        { label: '120 seconds', value: 120},
                        { label: '150 seconds', value: 150},
                        { label: '180 seconds', value: 180},
                    ]}
                    style={styles.pickerSelectStyles}
                    value={selectedDuration}
                />
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        onDurationChange(selectedDuration);
                        onClose();
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  )
}

export default SettingsModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      pickerSelectStyles: {
        fontSize: 40,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'blue',
        paddingRight: 30,
        marginBottom: 20,
        alignItems: 'center',
      }
})

