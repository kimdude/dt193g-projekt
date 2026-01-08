# DT193G - Projekt
## API för återförsäljare av köksapparater

Hapi, jsonwebtokens, hapi-auth-jwt2, bcrypt, json, render, postgres

### Roller
För åtkomst till router i API:et måste man vara inloggad. Användare kan ha två roller; __admin__ och __user__. Som user kan man läsa ut och hantera varor och beställningar. Admin har utöver det även tillgång till hantering av andvändare. Det innebär att admin kan läsa ut användare, skapa nya och tilldela roller.

### API för admin
Följande router är endast tillgängliga för admin:

| Metod     | Länk                | Resultat                        |
|-----------|---------------------|---------------------------------|
| GET       | /admin/users        | Läs ut alla användare           |
| GET       | /admin/users/{id}   | Läs ut specifik användare       |
| POST      | /admin/users        | Skapa ny användare              |
| PUT       | /admin/users        | Uppdatera roll                  |

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