/// Run At: https://sharplab.io/
// Branch: C# 8.0: Targed-typed new (8 Aug 2018)

using System;
public class Program {
    public static void Main() {
        // Assignment
        Foo x = new ("Scott");
        Console.WriteLine(x.Name);
        
        // Collections
        var y = new Foo[] {
            new ("Scott"),
            new ("Alex"),
            new ("Dave")
        };
        
        // Arguments
        GiveMeFoo(new ("Here!"));
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