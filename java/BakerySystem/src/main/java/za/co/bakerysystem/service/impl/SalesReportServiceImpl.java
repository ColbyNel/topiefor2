package za.co.bakerysystem.service.impl;

import java.time.LocalDate;
import java.util.List;
import za.co.bakerysystem.dao.SalesReportDAO;
import za.co.bakerysystem.dao.impl.SalesReportDAOImpl;
import za.co.bakerysystem.model.SalesReport;
import za.co.bakerysystem.model.SalesReportDetails;
import za.co.bakerysystem.service.SalesReportService;

public class SalesReportServiceImpl implements SalesReportService {

    private SalesReportDAO salesReportDAO;

    public SalesReportServiceImpl() {
        this.salesReportDAO = new SalesReportDAOImpl();
    }

    @Override
    public boolean createSale(SalesReport salesReport) {
        return salesReportDAO.createSale(salesReport);
    }

    @Override
    public boolean updateSale(SalesReport salesReport) {
        return salesReportDAO.updateSale(salesReport);
    }

    @Override
    public List<SalesReport> getSales(LocalDate startDate, LocalDate endDate) {
        return salesReportDAO.getSales(startDate, endDate);
    }

    @Override
    public List<SalesReport> getSalesInRange(LocalDate startDate, LocalDate endDate) {
        return salesReportDAO.getSalesInRange(startDate, endDate);
    }

    @Override
    public SalesReport getSale(int saleID) {
        return salesReportDAO.getSale(saleID);
    }

    @Override
    public List<SalesReport> getSalesLast14Days() {
        return salesReportDAO.getSalesLast14Days();
    }

    @Override
    public int getTotalSalesQuantity() {
        return salesReportDAO.getTotalSalesQuantity();
    }

    @Override
    public SalesReport getSaleNoProfit(int saleID) {
        return salesReportDAO.getSaleNoProfit(saleID);
    }

    @Override
    public List<SalesReportDetails> getSalesDetails(int saleID) {
        return salesReportDAO.getSalesDetails(saleID);
    }

    @Override
    public boolean deleteSalesDetail(int reportID) {
        return salesReportDAO.deleteSalesDetail(reportID);
    }

    @Override
    public boolean deleteSales(int saleID) {
        return salesReportDAO.deleteSales(saleID);
    }

}
