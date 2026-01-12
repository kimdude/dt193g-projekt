# DT193G - Projekt
## API för återförsäljare av köksapparater

Detta repo innehåller källkod för ett API som möjliggör lagring av användare, varor och beställningar/inköp. Grundlänken för api:et är [https://dt193g-projekt.onrender.com/](https://dt193g-projekt.onrender.com/).

För att få åtkomst till routerna måste man logga in:

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
| DELETE    | /products/{id}      | Ta bort produkt samt beställningsinfo       |

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
Följande router används för hantering av produkter:

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| GET       | /shelfs             | Läs ut hyllplan                             |
| GET       | /products           | Läs ut alla produkter                       |
| GET       | /products/{id}      | Läs ut specifik produkt                     |
| POST      | /product            | Lägg till produkt                           |
| PUT       | /products/{id}      | Uppdatera produktinfo                       |
| PUT       | /products/{id}/stock| Uppdatera antal och lagerstatus             |
| DELETE    | /products/{id}      | Ta bort produkt samt beställningsinfo       |

DELETE tar även bort beställningsinformation om produkten och är därför endast tillgänglig för admin. För att skapa en ny produkt skickas ett objekt med följande struktur:

```json
    {
        "ean_code": "1234567891111",
        "name": "Exempel produkt",
        "label": "Exempel märke",
        "category": "Köksassistenter",
        "description": "Tålig och prisvärd köksmaskin som passar alla.",
        "price": 7399,
        "amount": 15,
        "status": "I lager",
        "shelf_id": 4
    }
```

För att uppdatera en produkt skickas ett liknande objekt, men utan __status__ och __amount__. För att uppdatera lagersaldu på en produkt skickas endast status och amount.


### Router för beställningar
Följande router används för hantering av ordrar:

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| GET       | /orders             | Läs ut alla ordrar                          |
| GET       | /orders/{id}        | Läs ut specifik order                       |
| POST      | /orders             | Lägg till ny order                          |
| PUT       | /orders/{id}        | Uppdatera status för order                  |
| DELETE    | /orders  /{id}      | Ta bort order                               |

För att lägga till en ny order skickas ett en array med produkter enligt följande struktur:

```json
    {
        { 
            "products":
            [
                {
                    "product_id": 2,
                    "amount": 5,
                    "totalPrice": 35000
                },
                {
                    "product_id": 1,
                    "amount": 2,
                    "totalPrice": 2000
                } 
            ]
        }
    }
```

__totalPrice__ är den sammanlagda summan för produkten. I ovan exempel är 35000 alltså det sammanlagda priset för dem fem produkterna med id 2.

Statusen för en order ges ett default värde av false, vilket betyder att den inte blivit levererad än. För att uppdatera den till true, att den blivit levererad, skickas ett object med PUT-metoden enligt följande:

```json
    {
        "status": true
    }
```