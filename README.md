# WorkingStudentProject
Frontend: React zawarty w katalogu client - uruchomienie: **npm i && npm start**
  1. użycie React Redux w celu pobrania danych zwracanych przez Backend
  2. użycie biblioteki **@material-ui/core** do stylizacji strony
  3. użycie Google Login do zalogowania się do aplikacji za pomocą konta Google wymaga:
      - Zaimportowania **gapi** z biblioteki **gapi-script**
      - Zaimportowania **Google Login** z biblioteki **react-google-login**
      - Należy skonfigurować Identyfikator klienta OAuth 2.0 na stronie (https://console.cloud.google.com/)
      - Użyć Hooka **useEffect** aby umożliwić pobranie profilu użytkownika do autoryzacji:
       
        ``` useEffect( () => {
        function start() {
        gapi.client.init({
                clientId: "Id wygenerowane dla skonfigurowanego identyfikatora",
                scope: "",
            })
        }
        gapi.load('client:auth2', start);})
        
Backend: Node.js + Express - uruchomienie: **npm i && npm start**

Baza danych: MongoDB działająca na serwerze producenta. Do uruchomienia aplikacji należy skonfigurować połączenie w pliku **.env.example** a następnie zmienić nazwę na **.env**

