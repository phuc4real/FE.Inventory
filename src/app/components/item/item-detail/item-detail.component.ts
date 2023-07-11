import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services';
import { toStringFormatDate } from 'src/app/share/helpers/utilities-hepler';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  itemForm!: FormGroup;
  itemId!: string;
  img!: string;

  constructor(private route: ActivatedRoute, private itemService: ItemService) {
    this.itemForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      imageUrl: new FormControl(''),
      catalogName: new FormControl(''),
      inStock: new FormControl(''),
      used: new FormControl(''),
      createdDate: new FormControl(''),
      createdByUser: new FormControl(''),
      lastModifiedDate: new FormControl(''),
      modifiedByUser: new FormControl(''),
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
          id: values.id,
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          catalogName: values.catalog.name,
          inStock: values.inStock,
          used: values.used,
          createdDate: toStringFormatDate(values.createdDate),
          createdByUser: values.createdByUser.userName,
          lastModifiedDate: toStringFormatDate(values.lastModifiedDate),
          modifiedByUser: values.modifiedByUser.userName,
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
