import React, {useState} from 'react';
import {Platform, StyleSheet} from 'react-native';

import Wrapper from '../../components/common/Wrapper';
import {useTheme} from '../../context/theme/useTheme';
import {Theme} from '../../constants/Types';
import SelectableListComponent from '../../components/dashboard/SelectableListComponent';
import {Persons} from '../../components/dashboard/types';
// import Markdown from 'react-native-markdown-display';
//TODO

function DashboardScreen(): JSX.Element {
  const {theme} = useTheme();

  const [listData, setListData] = useState<Persons[]>([
    {
      name: 'Ram',
      id: 1,
    },
    {
      name: 'Shyam',
      id: 2,
    },
    {
      name: 'Hari',
      id: 3,
    },
  ]);

  return (
    <Wrapper style={styles(theme).mainContainer}>
      <SelectableListComponent data={listData} />
    </Wrapper>
  );
}

const styles = (theme: Theme) =>
  StyleSheet.create({
    flatList: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.sizes.large,
    },
    header2StringContainer: {
      marginBottom: theme.sizes.medium,
      alignSelf: 'center',
    },
    topIcons: {
      flexDirection: 'row',
    },
    exitIcon: {
      marginLeft: theme.sizes.medium,
    },
    topButton: {
      alignSelf: Platform.OS === 'web' ? 'center' : undefined,
    },
    indicator: {
      marginTop: theme.sizes.medium,
    },
    introMessageStyle: {
      textAlign: 'justify',
      marginBottom: theme.sizes.medium,
    },
    mainContainer: {
      paddingBottom: theme.sizes.extra_extra_large * 2,
    },
  });

export default DashboardScreen;
