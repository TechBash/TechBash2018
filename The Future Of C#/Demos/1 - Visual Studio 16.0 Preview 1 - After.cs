using static System.Console;

namespace Demo.Dev16Preview1
{
    class Program
    {
        static void Main(string[] args)
        {
            //NullCoalescingAssignment(null);
            //StringInterpolation();
            DeconstructionWithDefault();
        }

        static void NullCoalescingAssignment(string value)
        {
            value ??= "default";
            WriteLine(value);
        }

        static void StringInterpolation()
        {
            var secretFolderName = "TechBash";
            var secretPath = @$"C:\Secret\{secretFolderName}"; // Order No Longer Important
        }

        static void DeconstructionWithDefault()
        {
            // Tuple Deconstruction
            (int x, int y) = default;
            WriteLine($"x:{x}, y:{y}");
        }
    }
}
