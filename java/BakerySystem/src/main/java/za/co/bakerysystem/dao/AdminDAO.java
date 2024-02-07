package za.co.bakerysystem.dao;

import za.co.bakerysystem.exception.admin.AdminLoginException;
import za.co.bakerysystem.exception.admin.AdminNotFoundException;
import za.co.bakerysystem.model.Admin;

public interface AdminDAO {

    Admin getAdminById(int adminID) throws AdminNotFoundException;

    boolean createAdmin(Admin admin);

    Admin login(String emailAddress, String password) throws AdminLoginException ;
}
