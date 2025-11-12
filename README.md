# 📚 Desafio API — React Native + Paper + Navegação

Este projeto é um aplicativo desenvolvido em **React Native** com o **Expo**, utilizando **React Native Paper** para a interface e **React Navigation** para a navegação entre telas.  
O objetivo é consumir uma **API pública de livros (Google Books)** em **português**, exibindo resultados de pesquisa e detalhes de cada livro.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **React Native** — desenvolvimento mobile multiplataforma  
- 🧩 **Expo** — ambiente de execução e build  
- 🎨 **React Native Paper** — componentes visuais com Material Design  
- 🧭 **React Navigation** — navegação entre telas  
- 🌐 **Google Books API** — fonte de dados (livros em português)

---

## 📲 Funcionalidades

- 🔎 Busca de livros em **português** usando a **Google Books API**  
- 📖 Exibição de resultados com **título**, **autor** e **imagem da capa**  
- 🧭 Navegação entre a tela inicial e a tela de detalhes  
- 🎨 Interface estilizada com **React Native Paper**  
- ⚡ Indicador de carregamento e tratamento de erro na busca  

---

## 🖼️ Estrutura das Telas

### 🏠 **Tela Inicial**
- Campo de busca (`Searchbar`)
- Lista de livros retornados pela API
- Cada livro é exibido dentro de um **Card estilizado**

### 📘 **Tela de Detalhes**
- Exibe a **capa**, **título**, **autor** e **descrição** do livro selecionado

---

## 🔗 API Utilizada

📚 **Google Books API**  
Endpoint utilizado:

https://www.googleapis.com/books/v1/volumes?q={TEXTO_DA_BUSCA}&langRestrict=pt&maxResults=10

## ⚙️ Como Executar o Projeto

1. Clone o repositório
   
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git

2. Acesse o diretório

cd NOME_DO_REPOSITORIO

3. Instale as dependências

npm install

4. Execute o app

npx expo start --tunnel

5. Escaneie o QR Code

- Use o aplicativo Expo Go no seu celular (Android ou iOS)

- O app abrirá automaticamente exibindo a tela inicial

## 🧑‍💻 Desenvolvido por

Wedja Sousa

💡 Projeto acadêmico — Faculdade Senac - Matéria Coding.Mobile

📅 2025
