import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Text,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import {
  gql,
  useQuery,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache,
});

export default function App() {
  const [text, setText] = useState("empty");
  const [fontsLoaded] = useFonts({
    "SF-Mono": require("./assets/fonts/SFMono-Regular.ttf"),
    "Inter-SemiBoldItalic":
      "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
  });
  const { loading, error, data } = useQuery(gql`
    {
      users {
        id
      }
    }
  `);
  console.log("data", data);
  function onChangeText(textNew) {
    const expr = textNew.split("\n");
    const result = expr.map((ex) => {
      try {
        const res = eval(ex);
        console.log(res);
        return res;
      } catch (e) {
        console.error(e.message);
        return ex;
      }
    });
    setText(result.join("\n"));
  }

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.containerScrollView}
          style={styles.container2}
        >
          <TextInput
            style={styles.tInput}
            editable
            multiline
            scrollEnabled={false}
            onChangeText={(text) => onChangeText(text)}
            defaultValue={"hello"}
          />
          <TextInput
            style={styles.tInput2}
            editable={false}
            multiline
            scrollEnabled={false}
            value={text}
          />
        </ScrollView>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffe",

    flex: 1,
  },
  tInput: {
    fontSize: 18,
    lineHeight: 30,
    color: "rgb(198,208,213)",
    fontFamily: "SF-Mono",
    width: "50%",
  },
  tInput2: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: "SF-Mono",
    color: "rgb(157,191,110)",
    textAlign: "right",
    width: "50%",
  },
  container2: {
    backgroundColor: "rgb(39,41,44)",

    color: "white",
    paddingTop: 50,
    // alignItems: "center",
    // justifyContent: "center",
    flex: 1,
  },
  containerScrollView: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    flexDirection: "row",
  },
});
