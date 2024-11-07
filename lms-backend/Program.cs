namespace ModuloBackend;

class Modulo {
    public static void Main(String[] args) {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        WebApplication app = builder.Build();
        app.MapGet("/", () => "Hello World!");
        app.Run();
    }
}