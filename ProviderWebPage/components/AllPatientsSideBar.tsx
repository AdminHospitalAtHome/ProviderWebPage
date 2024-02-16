import { useEffect, useState } from 'react';
import { getAllPatients } from '../app/BackendFunctions/Patient/getPatientList';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Button} from 'react-native';
import { Avatar, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
interface Patient {
  PatientID: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: string;
}


export default function AllPatientSideBar({patients}:{patients:Patient[]}) {
    const [expandedIds, setExpandedIds] = useState<number[]>([]);
    const toggleExpanded = (id: number) => {
        setExpandedIds(prevExpandedIds =>
          prevExpandedIds.includes(id)
            ? prevExpandedIds.filter(eId => eId !== id)
            : [...prevExpandedIds, id]
        );
      };
    return(
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
                <Text style={styles.detailText}>Gender: {patient.Gender}</Text>
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
  
    filterButton: {
      alignSelf: 'flex-end',
      marginBottom: 10,
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
   
    container: {
      flex: 1,
    },
   
  });
  