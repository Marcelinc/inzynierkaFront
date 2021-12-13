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
