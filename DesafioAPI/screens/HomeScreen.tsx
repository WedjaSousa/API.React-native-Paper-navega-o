import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Searchbar, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("programação");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchBooks = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=pt`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchQuery);
  }, []);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    fetchBooks(query);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar livro..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      {loading ? (
        <ActivityIndicator animating={true} size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("Details" as never, { book: item } as never)}
            >
              <Card.Cover
                source={{
                  uri:
                    item.volumeInfo.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/128x195.png?text=Sem+Capa",
                }}
              />
              <Card.Content>
                <Text variant="titleMedium">{item.volumeInfo.title}</Text>
                <Text variant="bodySmall">
                  {item.volumeInfo.authors?.join(", ") || "Autor desconhecido"}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    padding: 10,
  },
  searchbar: {
    marginBottom: 10,
  },
  card: {
    marginVertical: 8,
  },
});
