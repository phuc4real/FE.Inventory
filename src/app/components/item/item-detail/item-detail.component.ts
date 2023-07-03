import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  itemId!: Number;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });
  }

  ngAfterViewInit() {
    this.itemService.getById(this.itemId).subscribe(
      (values) => {
        console.log(values);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
