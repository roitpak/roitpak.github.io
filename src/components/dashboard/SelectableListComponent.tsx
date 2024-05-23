import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Persons, SelectableListComponentProps} from './types';
import CustomTextInput from '../common/CustomTextInput';
import Icon from '../../assets/Icon';
import CustomText from '../common/CustomText';
import SelectableListItem from './SelectableListItem';

const SelectableListComponent = ({data}: SelectableListComponentProps) => {
  const [selectedItemsID, setSelectedItemsID] = useState<number[] | []>([]);
  const [dataSource, setDataSource] = useState<Persons[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  useEffect(() => {
    // Search terms in lower case
    const filteredData = data.filter((item: Persons) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setDataSource(filteredData);
  }, [searchTerm, data]);

  const handleSelect = (item: Persons) => {
    // remove items if selected is clicked again
    setSelectedItemsID((currentSelectedItems: number[]) => {
      if (currentSelectedItems.includes(item.id)) {
        return currentSelectedItems.filter(id => id !== item.id);
      } else {
        return [...currentSelectedItems, item.id];
      }
    });
  };

  const handleClear = () => {
    //Input ref clear can be ignored
    setSearchTerm('');
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          placeholder={'Ram'}
          value={searchTerm}
          onChangeText={value => setSearchTerm(value)}
        />
        {searchTerm.length > 0 && (
          <Icon
            style={styles.cross}
            onPress={handleClear}
            icon="cross"
            size={12}
          />
        )}
      </View>
      <CustomText type="h1" title="Peoples: " />
      {dataSource.map((item: Persons) => (
        <SelectableListItem
          key={item.id}
          selected={selectedItemsID.includes(item.id)}
          onPress={() => handleSelect(item)}
          item={item}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
    width: '100%',
  },
  cross: {
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default SelectableListComponent;
