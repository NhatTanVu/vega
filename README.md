# How to run
1. Install .NET Core 2.2.0, Node.js >= 8.9, VS Code
3. Install C# extension for VS Code
4. Open Command Line, go to ClientApp folder, and run " npm install "
5. Create database "vega"
6. Open Command Line, go to parent folder, and run " dotnet user-secrets set "ConnectionStrings:Default" "Server=.;Database=vega;User Id=<user_name>;Password=<pass_word>" "
7. Open VS Code, press Ctrl+F5
