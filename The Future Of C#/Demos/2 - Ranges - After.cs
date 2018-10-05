using System;
using static System.Console;

// Remember, for now you need the support file for the Index and Range types and extensions.

namespace Demo.Ranges
{
    class Program
    {
        static void Main(string[] args)
        {
            var values = new[] { 1, 2, 3, 4, 5 };

            // Print Last
            var lastIndex = ^1;
            var lastValue = values[lastIndex];
            WriteLine($"Last Value Is {lastValue}");

            // Print All
            var valuesDisplay = string.Join(", ", values[1..^1].ToArray()); // Also Valid: '1..', '..^1', '..'
            WriteLine($"All Values Are {valuesDisplay}");

            // Slick String Substring
            var value = "Hello World";
            WriteLine(value[6..]); // Prints: 'World'
        }
    }
}