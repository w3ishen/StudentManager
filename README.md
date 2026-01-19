# ABP + Angular Practice Task

## Project Objective
This project aims to understand the standard operating procedure (SOP) of developing an application using ABP Framework + Angular. It focuses on learning the structure, workflow, and fundamental steps required to build a full-stack application.
- Activities include:
    - **Add Entity**
        - Create Entity
        - Register entity in DbContext
    - **DB Migrations**
        - Create migration (run in EntityFrameworkCore project)
        - Apply migration using DbMigrator
    - **Add item list API**
        - Verify endpoints via Swagger (https://localhost:44334/swagger)
        - Implement AppService using CrudAppService
        - Create DTOs (Output DTO, Input DTO)
    - **Angular Integration**
        - Create Angular component + RestService
        - Importing component
        - Create HTML template
        - Implement modals
        - Component-based UI design using Angular (React-style architecture)

---

# Tech Stack

| Category | Tools / Libraries |
|--------|------------------|
| Frontend | Angular, HTML5, Bootstrap 5 |
| Backend | ABP Framework (.NET) |
| Database | LocalDB/ SQL Server  |
| API | REST (ABP CrudAppService)  |
| Security | Authentication & Authorization (OpenIddict) |
| Development | Git, Visual Studio, VS Code, |


# Setup Instructions
   
1. **Clone the repository**
   ```bash
   git clone https://github.com/w3ishen/StudentManager.git
   cd StudentManager
   ```

2. **Install ABP client-side libraries**
   ```bash
   abp install-libs
   ```

3. **Create database migration**
   ```bash
   cd .\aspnet-core\src\StudentManager.EntityFrameworkCore
   dotnet ef migrations add Added_Book_Entity
   ```

4. **Apply migration to database**
   ```bash
   cd .\aspnet-core\src\StudentManager.DbMigrator
   dotnet run
   ```

5. **Run the backend API**
   ```bash
   cd .\aspnet-core\src\StudentManager.HttpApi.Host
   dotnet run
   ```
   - Swagger:
   ```bash
   https://localhost:44334/swagger
   ```

6. **Install Angular dependencies**
   ```bash
   cd .\angular
   npm install
   ```

7. **Run Angular application**
   ```bash
   npm start
   ```
   - Open:
   http://localhost:4200
   - To navigate to student manager, open:
   http://localhost:4200/students/add
   - To navigate to book manager, open:
   http://localhost:4200/books/manage
