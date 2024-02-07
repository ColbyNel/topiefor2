package za.co.bakerysystem.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.bakerysystem.dao.AdminDAO;
import za.co.bakerysystem.dao.impl.AdminDAOImpl;

import za.co.bakerysystem.exception.admin.AdminLoginException;
import za.co.bakerysystem.exception.admin.AdminNotFoundException;


import za.co.bakerysystem.exception.customer.DuplicateEmailException;

import za.co.bakerysystem.model.Admin;
import za.co.bakerysystem.service.AdminService;

public class AdminServiceImpl implements AdminService {

    private final AdminDAO adminDAO;

    public AdminServiceImpl() {
        this.adminDAO = new AdminDAOImpl();
    }

    @Override

    public Admin getAdminById(int adminID) throws AdminNotFoundException{
        return adminDAO.getAdminById(adminID);
    }

    @Override
    public Admin login(String emailAddress, String password) throws AdminLoginException {
        return adminDAO.login(emailAddress, password);
    }

    @Override
    public boolean createAdmin(Admin admin) {
        return adminDAO.createAdmin(admin);
    }

    @Override
    public boolean exists(String email) throws DuplicateEmailException {
        List<Admin> getAdmins = new ArrayList<>();

        if (getAdmins.stream().anyMatch(admin -> admin.getEmailAddress().equalsIgnoreCase(email))) {
            throw new DuplicateEmailException("Email provided already exist");
        }

        return false;
    }

    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        AdminService adminService = new AdminServiceImpl();
        
        try {
            //Testing
            
//            List<Admin> getAdmins = new ArrayList<>();
            
            
            
            System.out.println(adminService.exists("test@example.com"));
            
//        // Testing createAdmin
//        Admin newAdmin = new Admin("newadmin@example.com", "newpassword"); // Create a new Admin object
//        boolean adminCreated = adminService.createAdmin(newAdmin);
//        if (adminCreated) {
//            System.out.println("New admin created successfully: " + newAdmin);
//        } else {
//            System.out.println("Failed to create new admin.");
//        }
// Testing getAdminById
//        int adminIdToRetrieve = 1; // Change this to the actual admin ID you want to retrieve
//        Admin retrievedAdmin = adminService.getAdminById(adminIdToRetrieve);
//        if (retrievedAdmin != null) {
//            System.out.println("Admin retrieved successfully: " + retrievedAdmin);
//        } else {
//            System.out.println("Admin with ID " + adminIdToRetrieve + " not found.");
//        }
//
// Testing login
//  String email = "newadmin@example.com"; // Change this to the actual email you want to use for login
//        String password = "newpassword"; // Change this to the actual password you want to use for login
//        Admin loggedInAdmin = adminService.login(email, password);
//        if (loggedInAdmin != null) {
//            System.out.println("Admin logged in successfully: " + loggedInAdmin);
//        } else {
//            System.out.println("Login failed. Incorrect email or password.");
//        }
        } catch (DuplicateEmailException ex) {
            Logger.getLogger(AdminServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
