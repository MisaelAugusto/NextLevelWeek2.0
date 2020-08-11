import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import LandingImg from '../../assets/images/landing.png';
import HeartIcon from '../../assets/images/icons/heart.png';
import StudyIcon from '../../assets/images/icons/study.png';
import GiveClassesIcon from '../../assets/images/icons/give-classes.png';

import api from '../../services/api';

import styles from './styles';

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('connections').then(response => {
      setTotalConnections(response.data.total);
    });
  }, []);

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses');
  }
  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <View style={styles.container}>
      <Image source={LandingImg} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer ?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={StudyIcon} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToGiveClassesPage}
        >
          <Image source={GiveClassesIcon} />

          <Text style={styles.buttonText}>Ensinar</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total de {totalConnections} conexões já realizadas{' '}
        <Image source={HeartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
