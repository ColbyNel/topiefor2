package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.OrderProfitDAO;
import za.co.bakerysystem.service.OrderProfitService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class OrderProfitServiceImpl implements OrderProfitService {

    private OrderProfitDAO orderProfitDAO;

    public OrderProfitServiceImpl(OrderProfitDAO orderProfitDAO) {
        this.orderProfitDAO = orderProfitDAO;
    }

    @Override
    public List<Map<String, Object>> fetchOrderProfit() {
        return orderProfitDAO.fetchOrderProfit();
    }

    @Override
    public List<Map<String, Object>> fetchOrderProfitLastMonth() {
        return orderProfitDAO.fetchOrderProfitLastMonth();
    }

    @Override
    public List<Map<String, Object>> fetchSaleProfit() {
        return orderProfitDAO.fetchSaleProfit();
    }

    @Override
    public List<Map<String, Object>> fetchSaleProfitLastMonth() {
        return orderProfitDAO.fetchSaleProfitLastMonth();
    }

    @Override
    public List<Map<String, Object>> fetchOrderProfitInRange(LocalDate startDate, LocalDate endDate) {
        return orderProfitDAO.fetchOrderProfitInRange(startDate, endDate);
    }

    @Override
    public List<Map<String, Object>> fetchSaleProfitInRange(LocalDate startDate, LocalDate endDate) {
        return orderProfitDAO.fetchSaleProfitInRange(startDate, endDate);
    }
}
