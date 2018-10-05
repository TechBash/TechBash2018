using System;
using static System.Console;

[module: System.Runtime.CompilerServices.NonNullTypes]

namespace Demo.Nullable
{
    class Program
    {
        static void Main(string[] args)
        {
            // Dependency Injection
            var r = new Resource(new Required(), null);

            // Method Arguments
            var name = GetNameOrNull();
            if (ThirdPartyCheck.IsNotNull(name))
                PrintName(name!);
        }

        static string? GetNameOrNull() => new Random().NextDouble() < 0.50 ? "Scott" : null;
        
        static void PrintName(string name)
         => WriteLine($"My name is {name}, it is {name.Length} characters long.");
    }

    class Resource
    {
        private readonly Required required;
        private readonly Optional? optional;

        public Resource(Required required, Optional? optional)
        {
            this.required = required;
            this.optional = optional;
        }
    }
    
    // Simulating Third Party Library Without Nullable Flow Analysis
    [System.Runtime.CompilerServices.NonNullTypes(false)]
    static class ThirdPartyCheck
    {
        public static bool IsNotNull(string value) => value != null;
    }

    class Required { }
    class Optional { }
}
