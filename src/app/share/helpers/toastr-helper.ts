import { ToastrService } from 'ngx-toastr';

export function showError(err: any, toastr: ToastrService) {
  switch (err.status) {
    case 400:
      show(err, toastr);
      break;
    case 404:
      toastr.error('Please try again', 'Cannot connect to servers!', {
        timeOut: 1000,
      });
      break;
    case 500:
      toastr.error('Please try again later', 'Something went wrong!', {
        timeOut: 1000,
      });
      break;
    default:
      toastr.error(
        'Please try again or contact to support',
        'Something went wrong!',
        { timeOut: 1000 }
      );
      break;
  }
}

export function showMessage(response: any, toastr: ToastrService) {
  if (response.message)
    toastr.success(response.message.message, response.message.key, {
      timeOut: 1000,
    });
}

function show(err: any, toastr: ToastrService) {
  if (err.error) {
    toastr.error(err.error.message.message, err.error.message.key, {
      timeOut: 1000,
    });
  } else toastr.error(err.message.message, err.message.key, { timeOut: 1000 });
}
