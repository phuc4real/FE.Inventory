import { ToastrService } from 'ngx-toastr';
import { ResponseMessage } from 'src/app/models';

export function showError(err: any, toastr: ToastrService) {
  switch (err.status) {
    case 400:
      show(err, toastr);
      break;
    case 404:
      toastr.error('Please try again', 'Cannot connect to servers!');
      break;
    case 500:
      toastr.error('Please try again later', 'Something went wrong!');
      break;
    default:
      toastr.error(
        'Please try again or contact to support',
        'Something went wrong!'
      );
      break;
  }
}

export function showMessage(response: any, toastr: ToastrService) {
  console.log(response);
  if (response.message)
    toastr.success(response.message.message, response.message.key);
}

function show(err: any, toastr: ToastrService) {
  if (err.error) {
    if (Array.isArray(err.error)) {
      err.error.forEach((e: ResponseMessage) => {
        if (e.key.includes('$.catalogId'))
          toastr.error('Please select category of item', 'Category');
        else toastr.error(e.value, e.key);
      });
    } else toastr.error(err.error.value, err.error.key);
  } else {
    toastr.error(err.value, err.key);
  }
}
