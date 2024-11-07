namespace ModuloBackend;

class Modulo {
    record Course(uint Id, string Name, string Code);

    public static void Main(string[] args) {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        WebApplication app = builder.Build();

        app.MapGet("/api/course/get", () => TypedResults.Json<Course[]>([
            new Course(1, "Introduction to Computing", "ITEC 101"),
            new Course(2, "Algebraic Logic I", "MATH 105"),
            new Course(3, "Calculus II", "MATH 206"),
        ]));

        app.Run();
    }
}