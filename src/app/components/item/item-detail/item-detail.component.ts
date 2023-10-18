import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/services';
import { toStringFormatDate } from 'src/app/share/helpers';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  itemForm!: FormGroup;
  itemId!: number;
  img!: string;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) {
    this.itemForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      categoryId: new FormControl(''),
      unit: new FormControl(''),
      useUnit: new FormControl(''),
      createdAt: new FormControl(''),
      createdBy: new FormControl(''),
      updatedAt: new FormControl(''),
      updatedBy: new FormControl(''),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });
  }

  ngAfterViewInit() {
    this.itemService.getById(this.itemId).subscribe(
      (values) => {
        if (values.imageUrl != '') {
          this.img = values.imageUrl;
        } else {
          this.img =
            'http://res.cloudinary.com/dhnoew5bj/image/upload/v1688537725/No-Image-Placeholder.svg_o0smur.png';
        }

        this.itemForm.patchValue({
          code: values.code,
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          // catalogName: values.catalog.name,
          inStock: values.inStock,
          inUsing: values.inUsing,
          createdDate: toStringFormatDate(values.createdDate),
          createdByUser: values.createdByUser.userName,
          updatedDate: toStringFormatDate(values.updatedDate),
          updatedByUser: values.updatedByUser.userName,
        });
      },
      (err: any) => {
        if (err.status == 404) this.router.navigate(['/notfound']);
        console.log(err);
      }
    );
  }
}
