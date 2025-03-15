import { useEffect } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../../styles/splash.style';
import { checkToken, getRole } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';


type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;
type SplashScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface SplashProps {
    navigation: SplashScreenNavigationProp;
    route?: SplashScreenRouteProp; // Make route optional
}

const Splash: React.FC<SplashProps> = ({ navigation }) => {
    const text1Position = useSharedValue(-200);
    const text2Position = useSharedValue(200);
    const loaderOpacity = useSharedValue(0);

    useEffect(() => {
        text1Position.value = withTiming(0, { duration: 1000 });
        text2Position.value = withTiming(0, { duration: 1000 });

        const timeout1 = setTimeout(() => {
            text1Position.value = withTiming(200, { duration: 1000 });
            text2Position.value = withTiming(-200, { duration: 1000 });
        }, 4000);

        const timeout2 = setTimeout(() => {
            navigation.replace('Login');
        }, 5000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };

        const checkAuth = async () => {
            const token = await checkToken();
            if (token) {
              const role = await getRole(token);
              if (role === 'client') {
                navigation.navigate('HomeClient');
              } else {
                navigation.navigate('Login');
              }
            } else {
              navigation.navigate('Login');
            }
        };

        checkAuth();
    }, [navigation]);

  
    const animatedText1Style = useAnimatedStyle(() => ({
        transform: [{ translateX: text1Position.value }]
    }));

    const animatedText2Style = useAnimatedStyle(() => ({
        transform: [{ translateX: text2Position.value }]
    }));

    const loaderStyle = useAnimatedStyle(() => ({
        opacity: loaderOpacity.value,
    }));

    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.container}>
                <Animated.Text style={[styles.text, animatedText1Style]}>Voie Rapide</Animated.Text>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/icon.png')} style={styles.logo} />
                </View>

                {/* Loader avec trois points animés */}
                <Animated.View style={[styles.loaderContainer, loaderStyle]}>
                    <Ionicons name='radio-button-off-outline' style={styles.loaderText} />
                    <Ionicons name='radio-button-off-outline' style={styles.loaderText} />
                    <Ionicons name='radio-button-off-outline' style={styles.loaderText} />
                </Animated.View>
                <Animated.Text style={[styles.text, animatedText2Style]}>Tongasoa !</Animated.Text>
            </View>
        </SafeAreaView>
    );
};

export default Splash;