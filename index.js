import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { HomeNavigation } from './src/screens/home';

AppRegistry.registerComponent(appName, () => HomeNavigation);
