# Run on local
1. Install .NET Core **2.2.x**, Node.js >= **8.9**, VS Code
2. Install [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) for VS Code
3. Open Command Line on "**\vega\ClientApp**" folder, and run "**npm install**"
4. Open Command Line on "**\vega**" folder, and run "**dotnet user-secrets set "ConnectionStrings:Default" "Server=*<server_name>*;Database=vega;User Id=*<user_name>*;Password=*<pass_word>*"**"
5. Open Command Line on "**\vega**" folder, and run "**dotnet ef database update**" to restore "**vega**" database or run "**.\sql\migration.sql**" script to create vega DB.
6. Open VS Code, press "**Ctrl+F5**"
# Deploy to Azure
1. Create 1 Azure App Service and 1 Azure SQL database
2. Add 2 app settings: "**ASPNETCORE_ENVIRONMENT**" and "**ConnectionStrings:Default**" to Azure App Service as below:
![App Settings](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Add%20App%20Settings.PNG)
3. Follow this [article](https://docs.microsoft.com/en-us/aspnet/core/tutorials/publish-to-azure-webapp-using-vscode?view=aspnetcore-3.1) to deploy to Azure
# Azure website
* **URL**: https://vega-cars.azurewebsites.net/
* **Username**: user1@tan.com
* **Password**: `4)49(A][:9t2Sh
* **Notes**: Due to current Azure SQL tier limit, please reload homepage twice to kick in
# Screenshots
1. **Home - Guest**\
![Home - Guest](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Home%20-%20Guest.PNG?raw=true)

2. **Vehicle - View**\
![Vehicle - View](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Vehicle%20-%20View.PNG)

3. **Vehicle - View Photos**\
![Vehicle - View Photos](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Vehicle%20-%20View%20Photos.PNG)

4. **Login** (using [Auth0](https://auth0.com/)) \
![Login](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Login%20-%20Ath0.PNG)

5. **Home - Admin**\
![Home - Admin](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Home%20-%20Admin.PNG)

6. **Vehicle - New**\
![Vehicle - New](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Vehicle%20-%20New.PNG)

7. **Vehicle - Edit**\
![Vehicle - Edit](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Vehicle%20-%20Edit.PNG)

8. **Vehicle - Upload Photos**\
![Vehicle - Upload Photos](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Vehicle%20-%20Upload%20Photos.PNG)

9. **Admin Page**\
![Admin Page](https://raw.githubusercontent.com/NhatTanVu/vega/master/_screenshots/Admin%20Page.PNG)
