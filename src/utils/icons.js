/* eslint-disable camelcase */
import FontAwesome_ttf from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import Entypo_ttf from 'react-native-vector-icons/Fonts/Entypo.ttf';
import AntDesign_ttf from 'react-native-vector-icons/Fonts/AntDesign.ttf';

const IconsCSS = `
@font-face {
  src: url(${FontAwesome_ttf});
  font-family: FontAwesome;
}
@font-face {
  src: url(${Entypo_ttf});
  font-family: Entypo;
}
@font-face {
  src: url(${AntDesign_ttf});
  font-family: AntDesign;
}
`;

const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) style.styleSheet.cssText = IconsCSS;
else style.appendChild(document.createTextNode(IconsCSS));

document.head.appendChild(style);