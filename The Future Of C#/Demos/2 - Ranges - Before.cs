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
            var lastValue = values[values.Length - 1];
            WriteLine($"Last Value Is {lastValue}");

            // Print All
            var valuesDisplay = string.Join(", ", values);
            WriteLine($"All Values Are {valuesDisplay}");
        }
    }
}