import { ToastrService } from 'ngx-toastr';
import { ResponseMessage } from 'src/app/models';

export function showError(err: any, toastr: ToastrService) {
  console.log(err);
  switch (err.status) {
    case 400:
      show(err, toastr);
      break;
    case 401:
      toastr.error('Unauthorized! Please login and try again', 'Error');
      break;
    case 403:
      toastr.error('Forbidden! You dont have access', 'Error');
      break;
    case 404:
    case 409:
    case 422:
      show(err, toastr);
      break;
    default:
      toastr.error('Something went wrong! Please try again', 'Error');
      break;
  }
}

export function showMessage(response: any, toastr: ToastrService) {
  console.log(response);
  toastr.success(response.value, response.key);
}

function show(err: any, toastr: ToastrService) {
  if (err.error) {
    if (Array.isArray(err.error)) {
      err.error.forEach((e: ResponseMessage) => {
        if (e.key.includes('$.catalogId'))
          toastr.error('Please select catalog of item', 'Catalog');
        else toastr.error(e.value, e.key);
      });
    } else toastr.error(err.error.value, err.error.key);
  } else {
    toastr.error(err.value, err.key);
  }
}
