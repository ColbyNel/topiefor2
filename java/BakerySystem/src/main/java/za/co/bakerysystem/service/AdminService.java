package za.co.bakerysystem.service;

<<<<<<< Updated upstream
import za.co.bakerysystem.exception.admin.AdminLoginException;
import za.co.bakerysystem.exception.admin.AdminNotFoundException;
=======
import za.co.bakerysystem.exception.admin.AdminNotFound;
import za.co.bakerysystem.exception.customer.DuplicateEmailException;
>>>>>>> Stashed changes
import za.co.bakerysystem.model.Admin;

public interface AdminService {

<<<<<<< Updated upstream
    Admin getAdminById(int adminID) throws AdminNotFoundException;

    boolean createAdmin(Admin admin);

    Admin login(String emailAddress, String password) throws AdminLoginException ;
=======
    Admin getAdminById(int adminID) throws AdminNotFound;

    boolean createAdmin(Admin admin);

    Admin login(String emailAddress, String password);

    boolean exists(String email) throws DuplicateEmailException;
>>>>>>> Stashed changes
}
