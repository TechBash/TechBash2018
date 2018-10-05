using System;
using BikeSharing.DomainLogic;

namespace Training
{
    public class Workout
    {
        public DateTime Date { get; }
        public TimeSpan Duration { get; set; }
        public double AverageHeartRate { get; set; }
        public string Notes;

        public Workout(DateTime date, TimeSpan duration, double averageHeartRate, string notes)
        {
            Date = date;
            Duration = duration;
            AverageHeartRate = averageHeartRate;
            Notes = notes;
        }
    }

    public class DistanceWorkout : Workout
    {
        public double Distance { get; }
        public double Pace { get; }
        public DistanceWorkout(double distance, DateTime datetime, TimeSpan duration, double rate, string notes) 
            : base(datetime, duration, rate, notes)
        {
            Distance = distance;
            Pace = distance / duration.TotalHours;
        }
    }

    public class BikeWorkout : DistanceWorkout
    {
        public WorkoutType Type { get; }

        public BikeWorkout(WorkoutType type, double distance, DateTime datetime, TimeSpan duration, double rate, string notes) 
            : base(distance, datetime, duration, rate, notes)
        {
            Type = type;
        }

        public void TestOutFunction(out int x, out int y)
        {
            x = DateTime.Now.Minute;
            y = DateTime.Now.Second & 0x33_ff_ee;
        }

        public void TestUseOutFunction()
        {
            int m, n;
            this.TestOutFunction(out m, out n);
            Console.WriteLine($"Minutes: {m}  Seconds: {n}");
        }

        public int TestLocalFunction()
        {
            var c = Multiply(3, 12);
            return c;

            int Multiply(int a, int b)
            {
                return a * b;
            }
        }

        public (string first, string middle, string last) LookupName(long id)
        {
            string first = "Doug", middle = "M", last = "Mair";
            if (id == 5)
                middle = "Matthew";
            return (first: first, middle: middle, last: last);
        }

        public void UseName()
        {
            var ret = LookupName(5);
            Console.WriteLine($"Name: {ret.first}, {ret.middle}, {ret.last}");
        }

        private void TestString()
        {
            string longString = "This is a long string that should be split onto multiple lines.  It has even more than we can see.";
            Console.WriteLine(longString);
        }

        private void MatchExample(object o)
        {
            if (o is null) return;      // Constant Pattern
            if (!(o is int i)) return;  // Type Pattern as "int i"
            Console.WriteLine(i.ToString());
        }

        private void SwitchExample(object obj)
        {
            switch (obj)
            {
                case Workout w1 when (w1.AverageHeartRate > 100):
                    Console.WriteLine($"Rate: {w1.AverageHeartRate}");
                    break;

                case Workout w2:
                    Console.WriteLine($"Avg Avg: {w2.AverageHeartRate / w2.Duration.Minutes}");
                    break;

                case Athlete ath:
                    Console.WriteLine($"Age: {ath.Age}");
                    break;

                default:
                    Console.WriteLine("No match found.  Unrecognized type");
                    break;
            }
        }

    }
}