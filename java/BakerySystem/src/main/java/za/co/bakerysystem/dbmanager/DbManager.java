package za.co.bakerysystem.dbmanager;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.dbcp2.BasicDataSource;

public class DbManager {

    private static DbManager instance = null;
    private BasicDataSource dataSource = null;

//    private DbManager() {
//        dataSource = new BasicDataSource();
//        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
//        dataSource.setUrl("jdbc:mysql://localhost:3306/bakery?useSSL=false");
//        dataSource.setUsername("root");
//        dataSource.setPassword("root");
//
//        // Set additional connection pool properties
//        dataSource.setMaxTotal(20); // Maximum number of active connections
//        dataSource.setMaxIdle(10); // Maximum number of idle connections
//        dataSource.setMinIdle(5); // Minimum number of idle connections
//        dataSource.setMaxWaitMillis(10000); // Maximum time to wait for a connection
//    }
    private DbManager() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(DbManager.class.getName()).log(Level.SEVERE, "Error loading JDBC driver", ex);
            throw new IllegalStateException("Error loading JDBC driver", ex);
        }
    }

    // Singleton
    public static DbManager getInstance() {
        if (instance == null) {
            instance = new DbManager();
        }
        return instance;
    }

//    public Connection getConnection() {
//        try {
//            return dataSource.getConnection();
//        } catch (SQLException ex) {
//            Logger.getLogger(DbManager.class.getName()).log(Level.SEVERE, "Error getting connection: " + ex.getMessage(), ex);
//            return null;
//        }
//    }
    public Connection getConnection() {
        try {
            String url = "jdbc:mysql://localhost:3306/bakery?useSSL=false";
            String username = "root";
            String password = "root";
            return DriverManager.getConnection(url, username, password);
        } catch (SQLException ex) {
            Logger.getLogger(DbManager.class.getName()).log(Level.SEVERE, "Error getting connection: " + ex.getMessage(), ex);
            return null;
        }
    }

    public boolean closeConnection() {
        if (dataSource != null) {
            try {
                dataSource.close();
                return true;
            } catch (SQLException ex) {
                Logger.getLogger(DbManager.class.getName()).log(Level.SEVERE, "Error getting connection: " + ex.getMessage(), ex);
            }
        }
        return false;
    }
}
