import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category, ItemUpdate } from 'src/app/models';
import {
  CategoryService,
  ItemService,
  UploadImageService,
} from 'src/app/services';
import { showError, showMessage } from 'src/app/share/helpers';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent {
  itemForm!: FormGroup;
  itemId!: number;
  img!: string;
  selectedValue!: number;
  isLoading: boolean = false;
  category!: Category[];

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private uploadImage: UploadImageService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.itemForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      imageUrl: new FormControl(''),
      categoryId: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });

    this.img =
      'http://res.cloudinary.com/dhnoew5bj/image/upload/v1688537725/No-Image-Placeholder.svg_o0smur.png';
    this.getCategory();
  }

  ngAfterViewInit() {
    if (this.itemId != null) {
      this.itemService.getById(this.itemId).subscribe(
        (response) => {
          if (response.data.imageUrl != '') this.img = response.data.imageUrl;
          this.itemForm.patchValue({
            code: response.data.code,
            name: response.data.name,
            description: response.data.description,
            imageUrl: this.img,
            categoryId: response.data.category.id,
          });
          this.category.push(response.data.category);
          this.selectedValue = response.data.category.id;
        },
        (err: any) => showError(err, this.toastr)
      );
    } else {
      this.itemForm.patchValue({
        imageUrl: this.img,
      });
    }
  }

  getCategory() {
    const params: any = {
      index: 0,
      size: 0,
      isInactive: false,
    };
    this.categoryService.getCategories(params).subscribe(
      (response) => {
        this.category = response.data;
      },
      (err: any) => showError(err, this.toastr)
    );
  }

  onFileSelected(event: Event) {
    this.isLoading = true;
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.uploadImage.uploadImg(file!).subscribe(
        (response) => {
          this.img = response.url;
          this.itemForm.patchValue({
            imageUrl: response.url,
          });
          this.isLoading = false;
        },
        (error: any) => {
          this.toastr.warning(
            'Upload image error, please try again!',
            'Upload error'
          );
        }
      );
    }
  }

  submitItem() {
    const data: ItemUpdate = {
      code: this.itemForm.value.code,
      name: this.itemForm.value.name,
      description: this.itemForm.value.description,
      imageUrl: this.itemForm.value.imageUrl,
      categoryId: parseInt(this.itemForm.value.categoryId),
    };

    if (this.itemId != null) {
      this.itemService.update(this.itemId, data).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.router.navigate(['/item/' + this.itemId]);
        },
        (err: any) => {
          showError(err, this.toastr);
          this.router.navigate(['/item' + this.itemId]);
        }
      );
    } else {
      this.itemService.create(data).subscribe(
        (response) => {
          showMessage(response, this.toastr);
          this.router.navigate(['/item/' + response.data.id]);
        },
        (err: any) => {
          showError(err, this.toastr);
          this.router.navigate(['/item']);
        }
      );
    }
  }
}
