package za.co.bakerysystem.exception;

public class DuplicateEmailException extends Exception {

    public DuplicateEmailException(String msg) {
        super(msg);
    }
}
