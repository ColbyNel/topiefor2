package za.co.bakerysystem.service;

import za.co.bakerysystem.exception.admin.AdminLoginException;
import za.co.bakerysystem.exception.admin.AdminNotFoundException;
import za.co.bakerysystem.model.Admin;

public interface AdminService {

    Admin getAdminById(int adminID) throws AdminNotFoundException;

    boolean createAdmin(Admin admin);

    Admin login(String emailAddress, String password) throws AdminLoginException ;
}
