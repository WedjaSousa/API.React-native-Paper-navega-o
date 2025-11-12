import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Provider as PaperProvider, Appbar, Card, Text, ActivityIndicator, Searchbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

type Livro = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string };
    description?: string;
  };
};

const Stack = createStackNavigator();

// 🔎 Tela principal com lista de livros
function HomeScreen({ navigation }: any) {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState('programação');

  const buscarLivros = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&langRestrict=pt&maxResults=10`
      );
      const data = await response.json();
      setLivros(data.items || []);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarLivros(busca);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="📚 Livros em Português" />
      </Appbar.Header>

      <View style={{ padding: 10 }}>
        <Searchbar
          placeholder="Buscar livro..."
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={() => buscarLivros(busca)}
        />
      </View>

      {loading ? (
        <ActivityIndicator animating={true} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={livros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              style={{ margin: 10 }}
              onPress={() => navigation.navigate('Detalhes', { livro: item })}
            >
              <Card.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.volumeInfo.imageLinks?.thumbnail ? (
                    <Image
                      source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                      style={{ width: 60, height: 90, marginRight: 10 }}
                    />
                  ) : null}
                  <View style={{ flexShrink: 1 }}>
                    <Text variant="titleMedium">{item.volumeInfo.title}</Text>
                    <Text variant="bodySmall">
                      {item.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}

// 📖 Tela de detalhes do livro
function DetalhesScreen({ route }: any) {
  const { livro } = route.params;
  const { title, authors, description, imageLinks } = livro.volumeInfo;

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={title} />
      </Appbar.Header>

      <View style={{ padding: 20, alignItems: 'center' }}>
        {imageLinks?.thumbnail && (
          <Image
            source={{ uri: imageLinks.thumbnail }}
            style={{ width: 120, height: 180, marginBottom: 20 }}
          />
        )}
        <Text variant="titleMedium" style={{ textAlign: 'center', marginBottom: 5 }}>
          {title}
        </Text>
        <Text variant="bodySmall" style={{ marginBottom: 10 }}>
          {authors?.join(', ') || 'Autor desconhecido'}
        </Text>
        <Text variant="bodyMedium" style={{ textAlign: 'justify' }}>
          {description || 'Sem descrição disponível.'}
        </Text>
      </View>
    </View>
  );
}

// 🚀 App principal com navegação
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Detalhes" component={DetalhesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
