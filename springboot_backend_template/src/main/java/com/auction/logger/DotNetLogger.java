package com.auction.logger;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;

public class DotNetLogger {

	private static final String EXE_PATH = "D:\\CDAC\\Project2\\Logger\\AuctionLoggerApp\\AuctionLoggerApp\\bin\\Debug\\net8.0\\win-x64\\publish\\AuctionLoggerApp.exe";

    public static void log(String message) {
        // Use CompletableFuture so the Java app doesn't wait for the .exe to finish
        CompletableFuture.runAsync(() -> {
            try {
                File exeFile = new File(EXE_PATH);
                
                if (!exeFile.exists()) {
                    System.err.println("Logger Error: .exe not found at " + exeFile.getAbsolutePath());
                    return;
                }

                // ProcessBuilder handles the command line arguments
                ProcessBuilder pb = new ProcessBuilder(exeFile.getAbsolutePath(), message);
                
                Process process = pb.start();
                
                // Wait for it to finish (runs on the background thread)
                int exitCode = process.waitFor();
                
                if (exitCode != 0) {
                    System.err.println(".NET Logger exited with error code: " + exitCode);
                }

            } catch (IOException | InterruptedException e) {
                System.err.println("Failed to execute .NET Logger: " + e.getMessage());
                Thread.currentThread().interrupt();
            }
        });
    }
}