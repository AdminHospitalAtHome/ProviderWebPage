import { useEffect, useState } from 'react';
import { getAllPatients } from '../app/BackendFunctions/Patient/getPatientList';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, Button} from 'react-native';
import { Avatar, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import AllPatientSideBar from '../components/AllPatientsSideBar';
import { filterPatients } from '../app/BackendFunctions/Patient/filterPatient';
interface Patient {
  PatientID: number;
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: string;
}



export default function PatientListPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterPanelVisible, setFilterPanelVisible] = useState(false);
  const [filters, setFilters] = useState({ providerID: null, firstName: null, lastName:null, gender: null });

  


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


  const handleFilterChange = (name: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value === '' ? null : value
    }));
  };
  

  const applyFilters = () => {
    // Convert the filters object into a query string including null values
    const filterParams = Object.entries(filters)
      .map(([key, value]) => `${encodeURIComponent(key)}=${value !== null ? encodeURIComponent(value) : 'null'}`)
      .join('&');
  
    filterPatients(filterParams)
      .then(patientData => {
        setPatients(patientData);
        console.log(patientData);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  };
  
  
  const toggleFilterPanel = () => {
    setShowFilters(!showFilters);
  };

  

  return (
    <View style={styles.sidebar}>
      <View style={styles.filterButton}>
        <TouchableOpacity onPress={() => setFilterPanelVisible(!filterPanelVisible)}>
          <Icon name="filter" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {filterPanelVisible && (
        <View style={styles.filterPanel}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFilterChange('providerID', value)}
            value={filters.providerID}
            placeholder="Provider ID"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFilterChange('FirstName', value)}
            value={filters.firstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFilterChange('LastName', value)}
            value={filters.lastName}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleFilterChange('gender', value)}
            value={filters.gender}
            placeholder="Gender"
          />
          <Button title="Okay" onPress={applyFilters} />
        </View>
      )}

      <AllPatientSideBar patients = {patients}></AllPatientSideBar>
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

  filterButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#eee',
  },
  filterPanel: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
