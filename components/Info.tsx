import React, { FC, useState } from "react";
import { TouchableOpacity, View, Text, Modal, TouchableHighlight } from "react-native";

interface Props {
  uri: string;
}

const Info: FC<Props> = ({ uri }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          flex: 1,
          alignItems: "flex-end"
        }}
      >
        {uri.startsWith("https://is.cuni.cz/studium/index.php") && (
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              borderRadius: 100,
              height: 64,
              width: 64,
              borderColor: "#9f3853",
              backgroundColor: "#fff",
              borderWidth: 2
            }}
          >
            <Text style={{ color: "#9f3853", textAlign: "center", marginTop: 8, fontSize: 30 }}>i</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={open}
      >
        <View
          style={{
            marginTop: "30%",
            marginHorizontal: 20,
            marginBottom: 200,
            backgroundColor: "#fff",
            borderWidth: 2,
            borderColor: "#9f3853",
            padding: 20
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexGrow: 1 }}>
              <Text style={{ fontSize: 20 }}>O SIS CUNI aplikaci</Text>
            </View>

            <TouchableHighlight onPress={() => setOpen(false)}>
              <Text style={{ fontSize: 40, marginTop: -15 }}>×</Text>
            </TouchableHighlight>
          </View>

          <View>
            <Text>
              SIS CUNI je aplikace pro správu informačního systému Univerzity Karlovy. Nejedná se o oficiální aplikaci,
              ale aplikace nesbírá žádné data o uživateli. Aplikace zobrazuje okno prohlížeče do kterého vloží styly
              aplikace.
            </Text>
            <Text style={{ fontSize: 18, marginTop: 10 }}>Github</Text>
            <Text>Kód aplikace je dostupný na githubu pod MIT licensí:</Text>
            <Text></Text>
          </View>
        </View>

      </Modal>
    </>
  );
};

export default Info;
