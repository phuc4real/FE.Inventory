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
  if (response.message)
    toastr.success(response.message.message, response.message.key);
}

function show(err: any, toastr: ToastrService) {
  if (err.error) {
    toastr.error(err.error.message.message, err.error.message.key);
  } else toastr.error(err.message.message, err.message.key);
}
