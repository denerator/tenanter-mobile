import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { IMAGES, EnStrings } from '../../../../constants';
import { flatService } from '../../../../services/flat.service';

export const DeleteFlatBtn = ({
  flatId,
  navigation,
}: {
  flatId: number;
  navigation: any;
}) => {
  const onDelete = () => {
    Alert.alert(EnStrings.flatDetails.delete.confirm, '', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await flatService.deleteFlat(flatId);
            flatService.filterFlatById(flatId);
            navigation.goBack();
          } catch (error) {
            Alert.alert('Error occurred');
          }
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDelete}>
        <Image style={styles.icon} source={IMAGES.trash} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
