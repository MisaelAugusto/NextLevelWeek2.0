/* eslint-disable react/require-default-props */
import React, { ReactNode, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import LogoImg from '../../assets/images/logo.png';
import BackIcon from '../../assets/images/icons/back.png';

import styles from './styles';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
  headerRight?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children
}: PageHeaderProps) => {
  const { navigate } = useNavigation();

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  function handleGoBack() {
    navigate('Landing');
  }

  function handleChangeFilterVisibility() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={BackIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={LogoImg} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight && (
          <BorderlessButton>
            <Feather
              name="filter"
              size={20}
              color="#fff"
              onPress={handleChangeFilterVisibility}
            />
          </BorderlessButton>
        )}
      </View>

      {isFiltersVisible && children}
    </View>
  );
};

export default PageHeader;
