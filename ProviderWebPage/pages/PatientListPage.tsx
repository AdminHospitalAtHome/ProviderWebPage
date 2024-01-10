import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getAllPatients } from '../BackendFunctionCall/Patient/getPatientList';


export default function PatientListPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getAllPatients()
    .then(patientData => {
      
      console.log(patientData);
      setPatients(patientData)
    })
    .catch(error => {
      
      console.error('Error fetching patients:', error);
    });
  }, [])

  return (
    <View>

    </View>
  );
}
