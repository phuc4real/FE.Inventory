import { Operation } from 'src/app/models';
import { StatusCheck } from 'src/app/models/common/status-check';
import { UserService } from 'src/app/services';

export function setOperation(uS: UserService): Promise<void> {
  return new Promise<void>((resolve) => {
    uS.getUserOperation().subscribe((response) => {
      localStorage.setItem('user-operation', JSON.stringify(response));
    });
    setTimeout(() => {
      resolve();
    }, 100);
  });
}

export function getOperation() {
  let json = localStorage.getItem('user-operation');
  return json != null ? (JSON.parse(json) as Operation) : defaultOperation();
}

export function defaultOperation() {
  let operation: Operation = {
    item: {
      canView: true,
      canEdit: false,
    },
    dashboard: {
      canView: false,
    },
    category: {
      canView: true,
      canEdit: false,
    },
    order: {
      canView: false,
      canEdit: false,
      canApproval: false,
    },
    ticket: {
      canView: true,
      canEdit: false,
      canChangeStatus: false,
      canApproval: false,
    },
    export: {
      canView: false,
      canEdit: false,
    },
    itemHolder: {
      canView: true,
      canEdit: false,
    },
  };
  return operation;
}

export function checkStatusOperation(status: string) {
  let canEditStatus = [
    'In Review',
    'Pending',
    'Processing',
    'Rejected by Admin',
  ];

  let canUpdateStatus = ['Pending', 'Processing'];
  let closeStatus = ['Closed', 'Done', 'Cancel by User'];
  console.log(status);

  console.log(canEditStatus.includes(status));

  let statusCheck: StatusCheck = {
    canUpdateStatus: canUpdateStatus.includes(status),
    canCancel: canEditStatus.includes(status),
    canEdit: canEditStatus.includes(status),
    isClose: closeStatus.includes(status),
  };
  return statusCheck;
}
