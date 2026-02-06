using System;
using System.IO;

namespace LoggerLib
{
    public class FileLogger
    {
        private static FileLogger logger = new FileLogger();

        private FileLogger()
        {
        }

        public static FileLogger CurrentLogger
        {
            get { return logger; }
        }

        public void Log(string message)
        {
            string directory = "D:\\CDAC\\ProjectLogger";

            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            string filePath = Path.Combine(directory, "log.txt");

            FileStream stream;

            if (File.Exists(filePath))
                stream = new FileStream(filePath, FileMode.Append, FileAccess.Write);
            else
                stream = new FileStream(filePath, FileMode.Create, FileAccess.Write);

            string messageData = "Logged at " + DateTime.Now + " - " + message;

            StreamWriter writer = new StreamWriter(stream);
            writer.WriteLine(messageData);

            writer.Close();
            stream.Close();
        }
    }
}
