/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package za.co.bakerysystem.model;

public class Ingredient {

    private int ID;
    private String name;
    private double pricePerKG;
    private String note;
    private int grams;

    public Ingredient(int ID, String name, double pricePerKG, String note,int grams) {
        this.ID = ID;
        this.name = name;
        this.pricePerKG = pricePerKG;
        this.note = note;
        this.grams=grams;
    }

    public Ingredient(String name, double pricePerKG, String note,int grams) {
        this.name = name;
        this.pricePerKG = pricePerKG;
        this.note = note;
        this.grams=grams;
    }

    public int getGrams() {
        return grams;
    }

    public void setGrams(int grams) {
        this.grams = grams;
    }

    
    public Ingredient() {
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPricePerKG() {
        return pricePerKG;
    }

    public void setPricePerKG(double pricePerKG) {
        this.pricePerKG = pricePerKG;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Override
    public String toString() {
        return "Ingredient{" + "ID=" + ID + ", name=" + name + ", pricePerKG=" + pricePerKG + ", note=" + note + ", grams=" + grams + '}';
    }

   
}
