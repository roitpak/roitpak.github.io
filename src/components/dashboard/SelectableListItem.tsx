import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../../assets/Icon';
import {Persons} from './types';
import CustomText from '../common/CustomText';

interface Props {
  item: Persons;
  selected: boolean;
  onPress: () => void;
}

export default function SelectableListItem({item, selected, onPress}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}>
      <CustomText type="h2" title={item.name} />
      {selected && <Icon icon="checkmark" size={10} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedContainer: {
    backgroundColor: '#c4c4c4',
  },
});
