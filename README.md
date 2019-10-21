# How to run
1. Install .NET Core **2.2.0**, Node.js >= **8.9**, VS Code
2. Install "**C# extension**" for VS Code
3. Open Command Line on "**\vega\ClientApp**" folder, and run "**npm install**"
4. Open Command Line on "**\vega**" folder, and run "**dotnet user-secrets set "ConnectionStrings:Default" "Server=.;Database=vega;User Id=*<user_name>*;Password=*<pass_word>*"**"
5. Open Command Line on "**\vega**" folder, and run "**dotnet ef database update**" to restore "**vega**" database
6. Open VS Code, press "**Ctrl+F5**"
