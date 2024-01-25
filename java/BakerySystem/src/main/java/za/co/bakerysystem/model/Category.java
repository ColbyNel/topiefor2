package za.co.bakerysystem.model;

public class Category {

    private int categoryId;
    private String description;

    public Category(int categoryId, String description) {
        this.categoryId = categoryId;
        this.description = description;
    }

    public Category() {
    }

    public Category(String description) {
        this.description = description;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Category{"
                + "categoryId=" + categoryId
                + ", description='" + description + '\''
                + '}';
    }
}
