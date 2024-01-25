package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.SalesReportDetailsDAO;
import za.co.bakerysystem.dao.impl.SalesReportDetailsDAOImpl;
import za.co.bakerysystem.model.SalesReportDetails;
import za.co.bakerysystem.service.SalesReportDetailsService;

import java.util.List;

public class SalesReportDetailsServiceImpl implements SalesReportDetailsService {

    private SalesReportDetailsDAO salesReportDetailsDAO;

    public SalesReportDetailsServiceImpl() {
        this.salesReportDetailsDAO = new SalesReportDetailsDAOImpl();
    }

    @Override
    public boolean createSaleDetail(SalesReportDetails salesReportDetails) {
        return salesReportDetailsDAO.createSaleDetail(salesReportDetails);
    }

    @Override
    public boolean updateSaleDetail(SalesReportDetails salesReportDetails) {
        return salesReportDetailsDAO.updateSaleDetail(salesReportDetails);
    }

    @Override
    public List<SalesReportDetails> getSalesDetails(int saleID) {
        return salesReportDetailsDAO.getSalesDetails(saleID);
    }

    @Override
    public boolean deleteSaleDetail(int reportID) {
        return salesReportDetailsDAO.deleteSaleDetail(reportID);
    }

}
