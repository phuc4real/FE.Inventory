import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent {
  itemForm!: FormGroup;
  itemId!: Number;
  img!: string;
  isReadOnly: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private uploadImage: UploadImageService
  ) {
    this.itemForm = new FormGroup({
      id: new FormControl(Validators.required),
      name: new FormControl(Validators.required),
      description: new FormControl(),
      imageUrl: new FormControl(),
      catalogName: new FormControl(),
      inStock: new FormControl(),
      used: new FormControl(),
      createdDate: new FormControl(),
      createdByUser: new FormControl(),
      lastModifiedDate: new FormControl(),
      modifiedByUser: new FormControl(),
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
        console.log(values);
        this.img =
          'https://res.cloudinary.com/dhnoew5bj/image/upload//fl_attachment:img_u6qb9e//v1688460220/img_u6qb9e.jpg?_s=public-apps';
        // this.img = values.imageUrl;
        this.itemForm.patchValue({
          id: values.id,
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          catalogName: values.catalog.name,
          inStock: values.inStock,
          used: values.used,
          createdDate: formatDate(values.createdDate, 'yyyy-MM-dd', 'en-US'),
          createdByUser: values.createdByUser.userName,
          lastModifiedDate: formatDate(
            values.lastModifiedDate,
            'yyyy-MM-dd',
            'en-US'
          ),
          modifiedByUser: values.modifiedByUser.userName,
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.uploadImage.uploadImg(file!).subscribe(
        (response) => {
          console.log(response);
          this.itemForm.patchValue({
            imageUrl: response.url,
          });
          console.log(this.itemForm.value.imageUrl);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  updateItemInfo() {}
}
