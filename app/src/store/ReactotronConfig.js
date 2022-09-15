import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

//put your computer ip on the network here, can see on network ui on mac
//https://github.com/infinitered/reactotron/blob/master/docs/troubleshooting.md
const reactotron = Reactotron.configure({
  name: "qrscanner dev",
  host: "10.10.0.57"
}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  //.use(asyncStorage())
  .use(reactotronRedux())
  .connect(); // let's connect!
// reactotron.clear();
// console.tron = Reactotron;
export default reactotron;
