import { useEffect, useState } from 'react';
import { getAllPatients } from '../BackendFunctionCall/Patient/getPatientList';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
interface Patient {
  PatientID: number;
  FirstName: string;
  LastName: string;
}

export default function PatientListPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);



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

  const toggleExpanded = (id: number) => {
    setExpandedIds(prevExpandedIds =>
      prevExpandedIds.includes(id)
        ? prevExpandedIds.filter(eId => eId !== id)
        : [...prevExpandedIds, id]
    );
  };


  const filter = function(){

  }
  
  

  return (
    <View style={styles.sidebar}>
      <ScrollView style={styles.container}>
        {patients.map((patient) => (
          <View key={patient.PatientID}>
            <TouchableOpacity
              style={styles.tile}
              onPress={() => toggleExpanded(patient.PatientID)}
            >
              <Avatar.Text size={24} label={`${patient.FirstName[0]}${patient.LastName[0]}`} />
              <Text style={styles.name}>{patient.FirstName} {patient.LastName}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={!expandedIds.includes(patient.PatientID)}>
              <View style={styles.details}>
                <Text style={styles.detailText}>Gender: ...</Text>
                <Text style={styles.detailText}>Age: ...</Text>
                <View style={styles.separator} />
                <Text style={styles.detailText}>Weight: ...</Text>
                <Text style={styles.detailText}>Heart Rate: ...</Text>
                <Text style={styles.detailText}>Blood Oxygen: ...</Text>
                <Text style={styles.detailText}>Blood Pressure: ...</Text>
              </View>
            </Collapsible>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#000', 
    marginVertical: 10,
  },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbdea6', 
    padding: 10,
    marginBottom: 10
  },
  name: {
    marginLeft: 10,
  },
  details: {
    backgroundColor: '#FFF8DC', 
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD', 
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  sidebar: {
    width: '15%', 
    backgroundColor: '#d88d63',
    padding: 10,
    flex: 1,
  },

  container: {
    flex: 1,
  },
 
});
