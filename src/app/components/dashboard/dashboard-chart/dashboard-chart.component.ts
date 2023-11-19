import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { ExportService, OrderService, TicketService } from 'src/app/services';
import { showError } from 'src/app/share/helpers';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css'],
})
export class DashboardChartComponent {
  title = 'dashboard-chart';
  labels: string[] = [];

  public barChartLegend = true;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
  };

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private orderService: OrderService,
    private exportService: ExportService,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {
    this.getChartData();
  }

  getChartData() {
    this.orderService.getOrderChart().subscribe(
      (response) => {
        this.barChartData.labels = response.data.map((x) => x.month);
        let orders = {
          data: response.data.map((x) => x.value),
          label: 'Order',
          backgroundColor: 'rgba(63, 39, 245, 0.8)',
        };

        this.barChartData.datasets.push(orders);
        this.chart?.update();
      },
      (err: any) => showError(err, this.toastr)
    );

    // this.exportService.getExportChart().subscribe(
    //   (response) => {
    //     let exports = {
    //       data: response.map((x) => parseInt(x.value)),
    //       label: 'Export',
    //       backgroundColor: 'rgba(245, 39, 39, 0.8)',
    //     };

    //     this.barChartData.datasets.push(exports);
    //     this.chart?.update();
    //   },
    //   (err: any) => showError(err, this.toastr)
    // );
  }
}
