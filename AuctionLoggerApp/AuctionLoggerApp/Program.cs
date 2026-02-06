using System;
using LoggerLib;

namespace AuctionLoggerApp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string message = args.Length > 0 ? args[0] : "Default log message";

            FileLogger.CurrentLogger.Log(message);

            Console.WriteLine("Logged: " + message);
        }
    }
}
