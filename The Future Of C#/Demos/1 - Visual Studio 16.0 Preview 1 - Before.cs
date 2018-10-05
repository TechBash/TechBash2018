using static System.Console;

namespace Demo.Dev16Preview1
{
    class Program
    {
        static void Main(string[] args)
        {
            NullCoalescingAssignment(null);
            //StringInterpolation();
            //DeconstructionWithDefault();
        }

        static void NullCoalescingAssignment(string value)
        {
            value = value ?? "default";
            WriteLine(value);
        }

        static void StringInterpolation()
        {
            var secretFolderName = "TechBash";
            var secretPath = $@"C:\Secret\{secretFolderName}";
        }

        static void DeconstructionWithDefault()
        {
            // Tuple Deconstruction
            var tuple = (x: 1, y: 2);
            (int x, int y) = tuple;
            WriteLine($"x:{x}, y:{y}");
        }
    }
}
