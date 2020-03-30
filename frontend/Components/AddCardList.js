import React,{useCallback} from 'react';
import {StyleSheet, Image,View } from 'react-native';
import {List, ListItem, Icon } from '@ui-kitten/components';

const CheckIcon = (props) => (
  <Icon {...props} name='checkmark-outline' fill={props.status ? '#47D547' : ''}/>

);

const Item = ({item, index, onPress}) => {
    return (
    <ListItem	
        key = {index}
        title={item.business_name}
        icon={() => <CheckIcon status={item.status}></CheckIcon>}
        style={styles.item}
        titleStyle={{flex:1}}
        columnWrapperStyle={{flex:1}}
        onPress={() => {
          onPress(index)}
        }
    />)
}

export default ({data, onPress}) => {
    return <List
      style={{width:'80%'}}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={(props) => <Item {...props} onPress={onPress}></Item>}
    />
};


const styles = StyleSheet.create({
    contentContainer: { paddingHorizontal: 8, flex:1 }
  });
  