// Run At: https://sharplab.io/
// Branch: C# 8.0: Targed-typed new (8 Aug 2018)

using System;
public class Program {
    public static void Main() {
        // Assignment
        var x = new Foo("Scott");
        Console.WriteLine(x.Name);
        
        // Collections
        var y = new [] {
            new Foo("Scott"),
            new Foo("Alex"),
            new Foo("Tom")
        };
        
        // Arguments
        GiveMeFoo(new Foo("Here!"));
    }
    
    public static void GiveMeFoo(Foo foo) {
    }
}

public class Foo {
    public Foo(string name) {
        Name = name;
    }
    
    public string Name { get; set; }

    public override string ToString() => Name;
}