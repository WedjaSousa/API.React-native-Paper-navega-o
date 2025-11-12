import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function DetailsScreen() {
  const route = useRoute<RouteProp<{ params: { book: any } }, "params">>();
  const { book } = route.params;

  const info = book.volumeInfo;

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Cover
          source={{
            uri:
              info.imageLinks?.thumbnail ||
              "https://via.placeholder.com/128x195.png?text=Sem+Capa",
          }}
        />
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {info.title}
          </Text>
          <Text variant="bodyMedium">
            Autor(es): {info.authors?.join(", ") || "Desconhecido"}
          </Text>
          <Text variant="bodySmall">Publicado em: {info.publishedDate || "—"}</Text>
          <Text variant="bodyMedium" style={styles.description}>
            {info.description || "Sem descrição disponível."}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    textAlign: "justify",
  },
});
