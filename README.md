# DT193G - Projekt
## API för återförsäljare av köksapparater

Detta repo innehåller källkod för ett API som möjliggör lagring av användare, varor och beställningar. För att få åtkomst till routerna måste man logga in:

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| POST      | /login              | Logga in                                    |

API:et är kopplat till en PostgreSQL databas, hostad på Render. API:et är skapat med ramverket Hapi och använder Bcrypt för att hasha lösenord. För autentisering används npm-paketet jsonwebtokens tillsammans med hapi-auth-jwt2. 

### Roller
Alla användare har tilldelade roller. Användare kan ha två roller; __admin__ och __user__. Som user kan man läsa ut och hantera varor och beställningar. Admin har utöver det även tillgång till hantering av andvändare. Det innebär att admin kan läsa ut användare, skapa nya och tilldela roller.

### Router för användare
Inloggade användare med tilldelad roll har åtkomst till router för produkter och beställningar. LÄNK TILL API:ET

Följande router är till för att användare ska kunna hantera sin egna profil:

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| GET       | /user               | Hämta roll, för-, efter- och användarnamn   |
| PUT       | /user               | Läs ut specifik användare                   |


### Router för admin
Följande router är endast tillgängliga för admin:

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| GET       | /admin/users        | Läs ut alla användare                       |
| GET       | /admin/users/{id}   | Läs ut specifik användare                   |
| POST      | /admin/users        | Skapa ny användare                          |
| PUT       | /admin/users        | Uppdatera roll                              |

För att skapa en ny användare med POST-metoden skickas objekt med följande struktur:
```json
    {
        "role": "admin",
        "fname": "Förnamn",
        "lname": "Efternamn",
        "username": "exempel123",
        "password": "superhemligt"
    }
```

För att uppdatera en användares roll med PUT-metoden skickas objekt med följande struktur:
```json
    {
        "password": "superhemligt",
        "newPassword": "superDUPERhemligt"
    }
```

### Router för produkter

### Router för beställningar