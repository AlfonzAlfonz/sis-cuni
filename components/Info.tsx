import React, { FC, useState } from "react";
import { TouchableOpacity, View, Text, Modal, TouchableHighlight, Linking } from "react-native";

interface Props {
  active: boolean;
}

const Info: FC<Props> = ({ active }) => {
  const [open, setOpen] = useState(false);

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
        {active && (
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              borderRadius: 100,
              height: 32,
              width: 32,
              borderColor: "#9f3853",
              backgroundColor: "#fff",
              borderWidth: 2
            }}
          >
            <Text style={{ color: "#9f3853", textAlign: "center", marginTop: 3, fontSize: 15 }}>i</Text>
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
            <Text style={{ lineHeight: 20 }}>
              SIS CUNI je aplikace pro správu informačního systému Univerzity Karlovy. Nejedná se o oficiální aplikaci,
              ale aplikace nesbírá žádné data o uživateli. Aplikace zobrazuje okno prohlížeče do kterého vloží styly
              aplikace.
            </Text>
            <Text style={{ fontSize: 18, marginTop: 10, lineHeight: 30 }}>Github</Text>
            <Text style={{ lineHeight: 20 }}>Kód aplikace je dostupný na githubu pod MIT licensí:</Text>
            <TouchableHighlight onPress={() => Linking.openURL("https://github.com/AlfonzAlfonz/sis-cuni")}>
              <Text style={{ textDecorationLine: "underline", lineHeight: 20 }}>https://github.com/AlfonzAlfonz/sis-cuni</Text>
            </TouchableHighlight>
          </View>
        </View>

      </Modal>
    </>
  );
};

export default Info;
