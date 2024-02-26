## Konfiguracja Frontendu
1. Zbudować front komendą
```npm install```
```npm run build```

2. Skonfigurować apache 

Przykładowa konfiguracja 
```
<VirtualHost *>
DocumentRoot "c:/vhost/inzynierkaFront/build"
ServerName front.inzynierka.com
ServerAlias www.inzynierkafront.com
<Directory "c:/vhost/inzynierkaFront/build">
    AllowOverride All
    Require all granted
</Directory>
</VirtualHost>
```
3. Przypisać IP do Domeny w pliku C:\Windows\System32\drivers\etc\hosts
```
127.0.0.1 inzynierka.com
```
4. Dodać plik ``` .htaccess ```  do katalogu ```build``` <br/>
Zawartość ```.htaccess```
```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```
5. W plku ```.env``` dodać zmienne: <br/>
```
REACT_APP_SERVER=http://inzynierka.com
HOST='front.inzynierka.com'
PORT=3001
```

##Przykładowe zrzuty
Rejestracja
![obraz](https://github.com/Marcelinc/inzynierkaFront/assets/82237491/28b147d4-e17d-40a8-aa6f-45130dd56a57)
![obraz](https://github.com/Marcelinc/inzynierkaFront/assets/82237491/abe277f2-1af5-43d5-8ac7-c872f744a8f1)
Zarządzanie gospodarstwem
![obraz](https://github.com/Marcelinc/inzynierkaFront/assets/82237491/1ea84220-a99f-45c4-96a5-30d4a25ea3d5)
![obraz](https://github.com/Marcelinc/inzynierkaFront/assets/82237491/b6677dc9-8c37-4fa9-9465-061ac1a0d7ea)
Realizacja zlecenia
![obraz](https://github.com/Marcelinc/inzynierkaFront/assets/82237491/2f68c6fa-bb2c-43a4-95f7-25efc6fc5577)
Usuwanie działki
![obraz](https://github.com/Marcelinc/inzynierkaFront/assets/82237491/aa44366c-c42e-4f79-b391-8c49a8801c80)



